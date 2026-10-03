import pool from "../connection.js";
import type { Request, Response } from "express";
import { askGemini } from "../services/chat.service.js";
import { ai } from "../services/gemini.service.js";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import path from "path";


export const createChat = async (req: Request, res: Response) => {

    try {

        const userId = req.userId;
        const { msg } = req.body;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const namePrompt = await readFile(
            path.join(__dirname, "../../config/namePrompt.txt"),
            "utf8"
        )

        if (!userId) {
            return res.status(401).json({
                success: false,
                persisted: false,
                message: "Unauthorized"
            });
        }

            const chatId = await pool.query(`
        INSERT INTO chats (user_id)
        VALUES ($1)
        RETURNING id
            `, [
                userId
            ]);

        let name: string | null = null;

        const nameQuery = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                temperature: 0.2,
                systemInstruction: namePrompt,
            },
            contents: `
        Generate a short title for this conversation.
        
        Rules:
        - 2-6 words.
        - Summarize the main topic.
        - No quotes.
        - No punctuation at the end.
        - Return ONLY the title.
        - If the message is empty or contains no meaningful content, return exactly: null
        
        Message:
        ${msg}
                        `,
        });

        name = nameQuery?.text?.trim() || msg;

        if (name) {
            await pool.query(
                `
        UPDATE chats
        SET name = $1
        WHERE id = $2
        `,
                [
                    name,
                    chatId.rows[0].id,
                ]
            );
        }

        res.status(200).json({
            success: true,
            chatId: chatId.rows[0].id,
            persisted: true,
            name: name || "New Chat"
        });
    } catch (err) {

        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const sendPrompt = async (req: Request, res: Response) => {
    try {
        const { msg } = req.body;
        const chatId = req?.params?.chatId as string | undefined;

        if (!msg) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        /*
         * ==========================================
         * GUEST / NO CHAT ID
         * ==========================================
         *
         * The user can still use the AI, but their
         * conversation is not persisted.
         */
        if (!chatId) {
            const response = await askGemini(msg, null);

            return res.status(200).json({
                aiResponse: response?.text?.trim(),
                chatId: null,
                persisted: false,
            });
        }

        /*
         * ==========================================
         * EXISTING CHAT
         * ==========================================
         */

        // Store user's message
        await pool.query(
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

        // Send prompt to Gemini
        const response = await askGemini(msg, chatId);

        // Store Gemini response
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

        return res.status(201).json({
            aiResponse: response?.text?.trim(),
            chatId,
            persisted: true,
        });

    } catch (err: any) {
        console.error(err);

        if (err?.status === 429) {
            return res.status(429).json({
                message: "AI service quota exceeded. Please try again later.",
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


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
            ORDER BY created_at DESC
            LIMIT $2
            OFFSET $3
        `, [
                chat.rows[0].id,
                LIMIT,
                SKIP
            ])]);

        const total = Number(countResult.rows[0].count);
        const retrieved = messagesResult.rowCount || 0;
        const nextSkip = SKIP + retrieved;

        res.status(200).json({
            message: "Success",
            conversationMessages: messagesResult.rows.map((msg) => ({
                ...msg,
                newMessage: false,
            })),
            nextSkip,
            limitReached: nextSkip >= total,
        });

    } catch (err) {

        console.error(err);
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
                 ORDER BY created_at DESC
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


