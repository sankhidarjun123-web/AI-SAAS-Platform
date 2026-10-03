import type { Request, Response, NextFunction } from "express";
import pool from "../connection.js";

const allowedTables = [
    "messages",
    "resumes",
    "interviews"
];

export const planLimit = (feature: string, maxRequests: number[], databaseTable: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;
            const plan = req.plan;
            const maxRequest = plan === "committed" ? maxRequests[0] ?? 10 : maxRequests[1] ?? 3;

            if (!allowedTables.includes(databaseTable)) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid database table"
                });
            }
            const requests = await pool.query(
                `
            SELECT COUNT(*) AS count FROM ${databaseTable} WHERE user_id = $1 AND created_at::date = CURRENT_DATE
            `,
                [userId]
            );

            const reqCount = parseInt(requests.rows[0].count);


            if (reqCount >= maxRequest) {
                return res.status(400).json({
                    success: false,
                    message: `${feature} limit exceeded`
                });
            }

            next();
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}