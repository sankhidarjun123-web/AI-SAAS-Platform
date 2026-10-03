import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../connection.js";


const router = Router();
const avaliable_batches = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'
];

router.get("/info", async (req: Request, res: Response) => {


    const userId = req.userId;


    if(!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let resumeAnalyzed = 0;
    let interviewTaken = 0;
    const batches = [];
    let progress = 0;

    try {

        const [resumeNo, interviewNo, batch] = await Promise.all([
            pool.query(`SELECT COUNT(*) FROM resumes`), 
            pool.query(`SELECT COUNT(*) FROM interviews`),
            pool.query(`SELECT batch FROM accounts WHERE id=$1`, [
                userId
            ])
        ]);

        resumeAnalyzed = Number(resumeNo.rows[0].count);

        interviewTaken = Number(interviewNo.rows[0].count);

        for(const b of avaliable_batches) {
            batches.push(b);
            if(b === batch.rows[0].batch) break;
        }

        progress = interviewTaken*100/50;
        if(progress > 100) progress = 100;

        res.status(200).json({
            message: "Details accuired",
            details: {
                resumeAnalyzed,
                interviewTaken,
                progress,
                batches
            }
        });

    } catch (err) {

        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get("/interview/list", async(req: Request, res: Response) => {

    const userId = req.userId;
    if(!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const LIMIT = Number(req.query.limit) || 10;
    const SKIP = Number(req.query.skip) || 0;
    try {


        const interviews = await pool.query(`
            SELECT ir.overall_score, i.created_at, i.interview_type, i.id FROM interview_reviews AS ir
            JOIN interviews AS i ON i.id = ir.interview_Id
            WHERE i.user_id = $1
            ORDER BY i.created_at DESC
            LIMIT $2
            OFFSET $3
            `, [
                userId,
                LIMIT,
                SKIP
            ]);

        const limitReached = Number(interviews.rowCount) >= LIMIT + SKIP;
        const nextSkip = LIMIT + SKIP;
        res.status(200).json({
            persisted: true,
            message: "Interview Data fetched",
            interviewData: interviews.rows,
            nextSkip,
            limitReached
        });

    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/interview/total", async(req: Request, res: Response) => {


    const userId = req.userId;

    if(!userId) {
        return res.status(401).json({ message: "Unathorized" });
    }

    try {

        const interviews = await pool.query(`
            SELECT
            CASE
            WHEN ir.overall_score BETWEEN '90.00' AND '100.00' THEN 'exc'
            WHEN ir.overall_score BETWEEN '70.00' AND '89.00' THEN 'good'
            WHEN ir.overall_score BETWEEN '50.00' AND '69.00' THEN 'average'
            ELSE 'need improvement'
            END AS scores, COUNT(*) AS interview_counts
            FROM interview_reviews AS ir
            JOIN interviews AS i ON ir.interview_id = i.id
            WHERE i.user_id = $1
            GROUP BY CASE
            WHEN overall_score BETWEEN '90.00' AND '100.00' THEN 'exc'
            WHEN overall_score BETWEEN '70.00' AND '89.00' THEN 'good'
            WHEN overall_score BETWEEN '50.00' AND '69.00' THEN 'average'
            ELSE 'need improvement'
            END
            `, [
                userId
            ]);

        res.status(200).json({
            presisted: true,
            interviews: interviews.rows,
            message: "Interview details fetched",
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;