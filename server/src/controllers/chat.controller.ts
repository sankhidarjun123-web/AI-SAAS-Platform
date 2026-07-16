import pool from "../connection.js";
import type { Request, Response } from "express";
import { askGemini } from "../services/chat.service.js";

export const sendPrompt = async (req: Request, res: Response) => {
    try {

        const userId = req.userId!;

        const { msg } = req.body;

        let chatId = null;

        const { chatId: chatIdFromBody } = req.body;

        // option 1: The user is authenticated in that case if the does not exists
        // it is created and the message is also stored both the user and the model
        // for later retrieval and usage
        if (userId) {

            if (!chatIdFromBody) {
                const chat = await pool.query(
                    `
                    INSERT INTO chats (user_id)
                    VALUES ($1)
                    RETURNING *
                    `,
                    [userId]
                );

                chatId = chat.rows[0].id;
            } else {
                chatId = chatIdFromBody;
            }

            const message = await pool.query(
                `
            INSERT INTO messages (chat_id, content, role)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
                [
                    chatId,
                    msg,
                    "user",
                ]
            );
        }

        const { response, name } = await askGemini(msg, chatId);   // sending the google gemini the prompt

        if(name) {
            await pool.query(
                `
                UPDATE chats
                SET name = $1
                WHERE id = $2
                `,
                [
                    name,
                    chatId
                ]
            )
        }

        if (userId) {
            await pool.query(
                `
                INSERT INTO messages (chat_id, content, role)
                VALUES ($1, $2, $3)
                `,
                [
                    chatId,
                    response?.text?.trim(),
                    "model",
                ]
            );
        }

        // option 2: The user is unauthenticated the reply of the prompt is still generated but not
        // stored in the database in any form
        return res.status(201).json({
            aiResponse: response?.text?.trim(),
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error(err);
    }
}


export const getConversation = async (req: Request, res: Response) => {

    const LIMIT = Number(req.query.limit) || 5;
    const SKIP = Number(req.query.skip) || 0;
    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const chatId = req.params?.chatId;

        if (!chatId) {
            return res.status(400).json({ message: "Chat Id missing" });
        }

        const chat = await pool.query(`
            SELECT name, id, created_at, updated_at FROM chats
            WHERE user_id = $1 AND id = $2
        `, [
            userId, chatId
        ]);

        if (!chat || chat.rows[0].isDeleted) {
            return res.status(404).json({ messages: "Conversation not found" });
        }


        const [countResult, messagesResult] = await Promise.all([
            pool.query(`
                SELECT COUNT(*) FROM messages
                WHERE chat_id = $1
            `, [
                chat.rows[0].id
            ]),
            pool.query(`
            SELECT * FROM messages
            WHERE chat_id = $1
            LIMIT $2
            OFFSET $3
        `, [
                chat.rows[0].id,
                LIMIT,
                SKIP
            ])]);

        const total = Number(countResult.rows[0].count);
        const retrieved = messagesResult.rowCount || 0;

        res.status(200).json({
            message: "Success",
            conversationMessages: messagesResult.rows,
            nextSkip: SKIP + LIMIT,
            limitReached: total <= LIMIT + retrieved
        })

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getConversations = async (req: Request, res: Response) => {

    const LIMIT = Number(req.query.limit) || 10;
    const SKIP = Number(req.query.skip) || 0;

    try {

        const userId = req.userId!;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const [totalConversations, conversations] = await Promise.all([
            pool.query(`
                SELECT COUNT(*) FROM chats
                WHERE user_id = $1
            `, [
                userId
            ]),
            pool.query(
                `SELECT * FROM chats
                 WHERE user_id = $1
                 LIMIT $2
                 OFFSET $3
            `, [
                userId,
                LIMIT,
                SKIP
            ]
            )
        ]);

        const total = Number(totalConversations.rows[0].count);
        const retrieved = totalConversations.rowCount || 0;

        res.status(200).json(
            {
                message: "Success",
                conversations: conversations.rows,
                nextSkip: SKIP + LIMIT,
                limitReached: total <= SKIP + retrieved
            }
        );
    } catch (err) {

        res.status(500).json({ message: "Internal Server Error " });
    }
}


