import pool from '../connection.js';
import type { Request, Response, NextFunction } from 'express';



const planFeatures: Record<string, string[]> = {

    observer: ["chat", "basic_resume"],
    committed: ["chat", "advanced_resume", "interview", "resume_fix"]
}


export const requiredFeature = (feature: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            const user = await pool.query(`
                SELECT plan, subscription_start, subscription_end FROM accounts WHERE id = $1
            `, [userId]);

            if (user.rowCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const { plan, subscription_end } = user.rows[0];

            if (!plan) {
                return res.status(403).json({
                    success: false,
                    message: "No active subscription"
                });
            }

            const hasActiveSubscription: boolean = plan === "observer" || new Date(subscription_end).getTime() > Date.now();

            const allowed =
                hasActiveSubscription &&
                planFeatures[plan]?.includes(feature);

            if (!allowed) {
                return res.status(403).json({
                    success: false,
                    message: "Upgrade your plan to access this feature"
                });
            }

            req.feature = feature;
            req.plan = plan;
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error",
                success: false
            });
        }
    }
}