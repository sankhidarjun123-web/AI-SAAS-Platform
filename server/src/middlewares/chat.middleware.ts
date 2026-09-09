import type { Request, Response, NextFunction } from "express";
import pool from "../connection.js";

export const checkDailyLimit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const maxChat = req.isSubscribed ? 100 : 10;
        const chatId = req.body.chatId || req.params.chatId;
        const { msg } = req.body;

        const result = await pool.query(
            `
            INSERT INTO mentor_chat_usage
                (user_id, chat_used, usage_date)
            VALUES
                ($1, 1, CURRENT_DATE)

            ON CONFLICT (user_id)
            DO UPDATE SET
                chat_used = CASE
                    WHEN mentor_chat_usage.usage_date = CURRENT_DATE
                        THEN mentor_chat_usage.chat_used + 1
                    ELSE 1
                END,
                usage_date = CURRENT_DATE

            WHERE
                mentor_chat_usage.usage_date <> CURRENT_DATE
                OR mentor_chat_usage.chat_used < $2

            RETURNING chat_used
            `,
            [req.userId, maxChat]
        );

        if (result.rows.length === 0) {
            let message: string;

            if (req.isSubscribed) {
                message =
                    `You have reached your daily chat limit of ${maxChat}. ` +
                    `Come back tomorrow, my dear apprentice.`;
            } else {
                message =
                    `You have reached your daily chat limit of ${maxChat}. ` +
                    `If you want to keep enchanting yourself, I recommend getting Committed, my dear apprentice.`;
            }
            if (chatId) {
                await pool.query(
                    `
        INSERT INTO messages (content, role, chat_id)
        VALUES ($1, $2, $3), ($4, $5, $6)
        `,
                    [
                        msg,
                        "user",
                        chatId,
                        message,
                        "model",
                        chatId]
                );
            }

            return res.status(403).json({
                message: `You have reached your daily limit of ${maxChat} mentor chats.`,
                aiResponse: message
            });
        }

        next();

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};