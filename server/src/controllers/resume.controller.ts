import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import pool from "../connection.js";
import { resumeAnalyzer } from "../services/resume.service.js";
import { uploadResume, deleteResume as deleteResumeFromCloudinary } from "../services/cloudinary.service.js";


export const addResume = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = req.userId;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Resume is required",
            });
            return;
        }

        const uploadedResume = await uploadResume(req.file.buffer);

        const analysis = await resumeAnalyzer(
            uploadedResume.secure_url
        );

        const result = await pool.query(
            `
    INSERT INTO resumes (
        user_id,
        resume_name,
        resume_key,

        candidate_name,
        address,
        accounts,
        about,
        skills,
        experience,
        projects,
        education,
        certifications,
        achievements,

        ats_score,
        strengths,
        weaknesses,
        missing_skills,
        projects_feedback,
        summary,
        improvements
    )
    VALUES (
        $1, $2, $3,
        $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18, $19, $20
    )
    RETURNING id
    `,
            [
                userId,
                req.file.originalname,
                uploadedResume.public_id,

                analysis.candidateName,
                analysis.address,

                JSON.stringify(analysis.accounts),
                analysis.about,
                JSON.stringify(analysis.skills),
                JSON.stringify(analysis.experience),
                JSON.stringify(analysis.projects),
                JSON.stringify(analysis.education),
                JSON.stringify(analysis.certifications),
                JSON.stringify(analysis.achievements),

                analysis.atsScore,
                analysis.strengths,
                analysis.weaknesses,
                analysis.missingSkills,
                analysis.projectsFeedback,
                analysis.summary,
                analysis.improvements,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Resume uploaded and analyzed successfully.",
            analysis,
            resumeId: result.rows[0].id
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error " });
    }
}


export const getResume = async (
    req: Request,
    res: Response
) => {


    try {


        const userId = req.userId;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const resumeId = req.params.resumeId;

        if (!resumeId) return res.status(400).json({ message: "Bad request, resume id is required" });

        const resumeData = await pool.query(`
            SELECT * FROM resumes
            WHERE id=$1 AND user_id=$2
        `, [
            resumeId, userId
        ]);

        res.status(200).json({
            resumeData: resumeData.rows[0]
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const getAllResumes = async (
    req: Request,
    res: Response
) => {


    const LIMIT = Number(req.query.limit) || 5;
    const SKIP = Number(req.query.skip) || 0;

    try {

        const userId = req.userId;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const resumeList = await pool.query(
            `
            SELECT * FROM resumes
            WHERE user_id = $1
            LIMIT $2
            OFFSET $3
            `, [
            userId, LIMIT, SKIP
        ]
        );

        const total = await pool.query(
            `
            SELECT COUNT(*) AS totalResumes FROM resumes WHERE user_id = $1;
            `, [
            userId
        ]
        );

        const remaining = Number(total.rows[0].totalResumes);

        const reviews = resumeList.rows.map((resume) => ({
            ...resume,

            resume_url: cloudinary.url(resume.resume_key, {
                resource_type: "raw",
                secure: true
            })
        }));

        res.status(200).json({
            reviews: reviews,
            nextSkip: SKIP + LIMIT,
            limitReached: remaining <= SKIP
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const deleteResume = async (
    req: Request,
    res: Response
) => {

    const userId = req.userId;
    const resumeId = req.params.resumeId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!resumeId) return res.status(400).json({ message: "Bad request, resume id is required" });
    try {

        const resumeData = await pool.query(`
            SELECT (resume_key) FROM resumes
            WHERE id=$1 AND user_id=$2`,
            [
                resumeId, userId
            ]);

        if (resumeData.rowCount === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const isDeleted = await deleteResumeFromCloudinary(resumeData.rows[0].resume_key);

        if (isDeleted === false) {
            console.error("Failed to delete resume from Cloudinary");
            return res.status(500).json({ message: "Internal Server Error" });
        }

        await pool.query(`
            DELETE FROM resumes
            WHERE id=$1 AND user_id=$2`,
            [
                resumeId, userId
            ]);

        return res.status(200).json({ message: "Resume Deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}