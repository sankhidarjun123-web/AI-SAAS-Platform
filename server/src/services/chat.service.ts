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

        const namePrompt = await readFile(
            path.join(__dirname, "../../config/namePrompt.txt"),
            "utf8"
        )

        let content: Content[] = [];

        let name: string | null = null;

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
${message}
                `,
            });

            name = nameQuery?.text?.trim() || null;

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

        return { response, name };
    } catch (err) {
        throw err;
    }
}