import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import pool from "../connection.js";

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {
        const { userId } = getAuth(req);

        if (!userId) {
            req.userId = null;
            next();
        }

        const clerkId = userId;

        const result = await pool.query(
            `
    SELECT id
    FROM accounts
    WHERE clerkid = $1
    `,
            [clerkId]
        );

        if (result.rows.length === 0) {
            req.userId = null;
        }

        else req.userId = result.rows[0].id;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}