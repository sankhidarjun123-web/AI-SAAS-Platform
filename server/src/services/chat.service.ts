import { ai } from "./gemini.service.js";
import pool from "../connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";


type Parts = {
    text: string
}

type Content = {
    role: "user" | "model",
    parts: Parts[]
}

export const askGemini = async (message: string, chat_id: string | null = null) => {

    try {

        if (!message) {
            throw new Error("Message not provided");
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const mentorSystemPrompt = await readFile(
            path.join(__dirname, "../../config/systemPrompt.txt"),
            "utf8"
        );

        let content: Content[] = [];

        // option 1: the user has a token the history is saved in the database
        if (chat_id) {
            const prevMessages = await pool.query(`
            SELECT role, content FROM messages
            WHERE chat_id=$1 
            ORDER BY created_at DESC
            LIMIT 20`, [
                chat_id
            ]);

            content = prevMessages.rows.map((msg, _) => {

                return {
                    role: msg.role,
                    parts: [{
                        text: msg.content
                    }]
                }
            });

        }
        // option 2: the user is unauthenticated in that case there is no
        // past chat history to send along
        content.push({
            role: "user",
            parts: [
                {
                    text: message
                }
            ]
        });

        const response = await ai.models.generateContent({
            config: {
                systemInstruction: mentorSystemPrompt
            },
            model: "gemini-2.5-flash",
            contents: content,
        });

        return response;
    } catch (err) {
        throw err;
    }
}