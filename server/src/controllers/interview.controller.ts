import type { Request, Response } from "express";
import pool from "../connection.js";
import { createInterviewSession, saveInterviewQA } from "../services/interview.service.js";
import { analyzeInterview } from "../services/interview.service.js";

type Candidate = {
    targetRole: string,
    interviewType: "Technical" | "HR" | "Behavioral" | "Technical+Behavioral",
    interviewTone: "Assertive" | "Professional" | "Friendly",
    difficulty: 'beginner' | 'easy' | 'intermediate' | 'hard' | 'advanced' | 'expert'
}

export const createInterview = async (
    req: Request,
    res: Response
) => {


    try {

        const userId = req.userId;
        const { resumeId, candidate }: {
            resumeId: string;
            candidate: Candidate;
        } = req.body;

        if (!resumeId) {
            return res.status(400).json({ message: "Bad Request" });
        }

        if (candidate && typeof candidate !== "object") {
            return res.status(400).json({ message: "Bad Request" });
        }

        const {
            targetRole,
            interviewType
        } = candidate;

        let { interviewTone, difficulty } = candidate;

        if (!targetRole) {
            return res.status(400).json({
                message: "Target role is required"
            });
        }


        if (!interviewType) {
            return res.status(400).json({
                message: "Interview type is required"
            });
        }

        if (!interviewTone) {
            interviewTone = "Professional";
        }

        if (!difficulty) {
            difficulty = 'beginner';
        }

        // Make sure the resume belongs to this user
        const resumeResult = await pool.query(
            `
            SELECT id
            FROM resumes
            WHERE id = $1
            AND user_id = $2
            `,
            [resumeId, userId]
        );

        if (resumeResult.rowCount === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }


        // Create interview in database
        const result = await pool.query(
            `
            INSERT INTO interviews (
                user_id,
                resume_id,
                target_role,
                interview_type,
                interview_tone,
                difficulty,
                status
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, 'created'
            )
            RETURNING id
            `,
            [
                userId,
                resumeId,
                targetRole,
                interviewType,
                interviewTone,
                difficulty
            ]
        );

        const interviewId = result.rows[0].id;

        return res.status(201).json({
            message: "Interview created successfully",
            interviewId
        });
    } catch (err) {

        console.error("Create interview error:", err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export const startInterview = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const interviewId = req.params.interviewId;

        if (!interviewId) {
            return res.status(400).json({ message: "Interview Id required" });
        }

        const interview = await pool.query(`
            SELECT * FROM interviews
            WHERE id = $1 AND user_id = $2
        `, [
            interviewId,
            userId
        ]);

        if (interview.rowCount === 0) {
            return res.status(404).json({ message: "Interview not found" });
        }
        const interviewDetails = interview.rows[0];

        if (interviewDetails.status === "in_progress" || interviewDetails.status === "completed") {
            return res.status(400).json({ message: "Seems like the interview alreay started" });
        }

        if (interviewDetails.status === "cancelled") {
            return res.status(400).json({ message: "The interview was cancelled" });
        }

        const resume = await pool.query(`
            SELECT * FROM resumes
            WHERE id = $1 AND user_id = $2
        `, [
            interviewDetails.resume_id,
            userId
        ]);

        if (resume.rowCount === 0) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const resumeDetails = resume.rows[0];

        const token = await createInterviewSession();

        if (!token) {
            return res.status(500).json({
                message: "Failed to create interview session"
            });
        }

        await pool.query(`
            UPDATE interviews
            SET status = $1,
            started_at = CURRENT_TIMESTAMP
            WHERE id = $2 AND user_id = $3
        `, [
            "in_progress",
            interviewId,
            userId
        ]);

        res.status(200).json({
            message: "Interview started sucessfully",
            token,
            interviewDetails,
            resumeDetails
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const endInterview = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = req.userId;
        const interviewId = req.params.interviewId as string;
        let interviewQA = req.body.interviewQA;

        if (typeof interviewQA === "string") {
            try {
                interviewQA = JSON.parse(interviewQA);
            } catch {
                return res.status(400).json({
                    message: "Invalid interviewQA format"
                });
            }
        }


        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!interviewId) {
            return res.status(400).json({
                message: "Interview ID is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Interview recording is unavailable" });
        }

        // Check that the interview belongs to this user
        const interviewResult = await pool.query(
            `
            SELECT id, status
            FROM interviews
            WHERE id = $1
            AND user_id = $2
            `,
            [interviewId, userId]
        );

        if (interviewResult.rowCount === 0) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }

        const interviewVideo = req.file;


        const analysis = await analyzeInterview(interviewQA, interviewVideo);

        const interview = interviewResult.rows[0];

        // Don't end an interview that isn't running
        if (interview.status !== "in_progress") {
            return res.status(400).json({
                message: `Interview cannot be ended because it is currently ${interview.status}`
            });
        }

        if (interviewQA && interviewQA.length > 0) {
            await saveInterviewQA(
                interviewId,
                interviewQA
            );
        }


        // Mark interview as completed
        await pool.query(
            `
    UPDATE interviews
    SET
        status = 'completed',
        completed_at = CURRENT_TIMESTAMP
    WHERE id = $1
    AND user_id = $2
    RETURNING
        id,
        status,
        completed_at
    `,
            [
                interviewId,
                userId
            ]
        );


        await pool.query(
            `
    INSERT INTO interview_reviews (
        interview_id,
        overall_score,
        answer_quality_score,
        technical_score,
        communication_score,
        presentation_score,
        strengths,
        weaknesses,
        question_analysis,
        video_analysis,
        important_moments,
        final_feedback
    )
    VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12
    )
    `,
            [
                interviewId,
                analysis.overallScore,
                analysis.answerQualityScore,
                analysis.technicalScore,
                analysis.communicationScore,
                analysis.presentationScore,

                // PostgreSQL TEXT[]
                analysis.strengths,
                analysis.weaknesses,

                // PostgreSQL JSON / JSONB
                JSON.stringify(analysis.questionAnalysis),
                JSON.stringify(analysis.videoAnalysis),
                JSON.stringify(analysis.importantMoments),

                analysis.finalFeedback
            ]
        );

        return res.status(200).json({
            message: "Interview ended successfully"
        });

    } catch (error) {

        console.error(
            "End interview error:",
            error
        );

        return res.status(500).json({
            message: "Failed to end interview"
        });
    }
};


export const getInterviews = async (
    req: Request,
    res: Response
) => {

    const LIMIT = Number(req.query.limit) || 10;
    const SKIP = Number(req.query.skip) || 0;

    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const gotInterviews = await pool.query(
            `
    SELECT *
    FROM interviews
    WHERE user_id = $1
    AND status NOT IN ('in_progress', 'cancelled')
    ORDER BY created_at ASC
    LIMIT $2
    OFFSET $3
    `,
            [
                userId,
                LIMIT,
                SKIP
            ]
        );

        const interviews = gotInterviews.rows;

        const total = await pool.query(
            `
    SELECT COUNT(*) AS totalInterviews
    FROM interviews
    WHERE user_id = $1
    AND status NOT IN ('in_progress', 'cancelled')
    `,
            [userId]
        );
        const remaining = Number(total.rows[0].totalInterviews);

        res.status(200).json({
            interviews,
            nextSkip: SKIP + LIMIT,
            limitReached: remaining <= SKIP
        });
    } catch (err) {
        console.error(err);
    }
}


export const getConductedInterviewDetails = async(
    req: Request,
    res: Response
) => {


    const userId = req.userId;
    const { interviewId } = req.params;
    
    if(!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if(!interviewId) {
        return res.status(400).json({ message: "Interview id is required" });
    }

    try {

        const [interview, interviewQuestions] = await Promise.all([
            pool.query(`
                SELECT
                i.*,
                ir.overall_score,
                ir.answer_quality_score,
                ir.technical_score,
                ir.communication_score,
                ir.presentation_score,
                ir.strengths,
                ir.weaknesses,
                ir.question_analysis,
                ir.video_analysis,
                ir.final_feedback,
                ir.important_moments
                FROM interviews i
                JOIN interview_reviews ir
                ON i.id = ir.interview_id
                WHERE i.id = $1
                AND i.user_id = $2
                AND i.status = 'completed'
                `, [
                    interviewId,
                    userId
                ]), pool.query(`
                    SELECT * FROM interview_questions
                    WHERE interview_id = $1
                `, [
                    interviewId
                ])
        ]);

        if(interview.rowCount === 0) {
            return res.status(404).json({ message: "Interview review not found" });
        }

        const interviewReview = interview.rows[0];
        const interviewQA = interviewQuestions.rows;

        res.status(200).json({
            message: "Interview found",
            persistance: true,
            interviewReview,
            interviewQA
        });

    } catch (err : unknown) {

        if(err instanceof Error) {
            return res.status(500).json({ 
                message: "Internal Server Error",
                error: err.message,
                persistance: false
            });
        }

        return res.status(500).json({ 
            message: "Internal Server Error",
            persistance: false
        });
    }
}