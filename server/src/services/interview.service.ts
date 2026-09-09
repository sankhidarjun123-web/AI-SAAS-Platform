import { Modality } from "@google/genai";
import { ai } from "./gemini.service.js";
import pool from "../connection.js";
import {
    createUserContent,
    createPartFromUri,
} from "@google/genai";
import { interviewAnalyzerPrompt } from "../utils/interviewAnalyzerPrompt.js";

export const createInterviewSession = async (): Promise<string | undefined> => {

    const expireTime = new Date(
        Date.now() + 30 * 60 * 1000
    ).toISOString();

    const newSessionExpireTime = new Date(
        Date.now() + 60 * 1000
    ).toISOString();

    const token = await ai.authTokens.create({
        config: {
            uses: 1,
            expireTime,
            newSessionExpireTime,

            liveConnectConstraints: {
                model: "gemini-3.1-flash-live-preview",

                config: {
                    responseModalities: [
                        Modality.AUDIO
                    ],
                    sessionResumption: {}
                }
            }
        }
    });

    return token.name;
};


export const saveInterviewQA = async (
    interviewId: string,
    interviewQA: {
        question: string;
        answer: string;
    }[]
) => {

    if (!interviewQA || interviewQA.length === 0) return;

    for (let i = 0; i < interviewQA.length; i++) {

        if (interviewQA[i]) {
            await pool.query(
                `
            INSERT INTO interview_questions
            (
                interview_id,
                question_number,
                question,
                answer
            )
            VALUES ($1, $2, $3, $4)
            `,
                [
                    interviewId,
                    i + 1,
                    interviewQA[i]?.question,
                    interviewQA[i]?.answer
                ]
            );
        }
    }
};



interface InterviewQA {
    question: string;
    answer: string | undefined;
}


export const analyzeInterview = async (
    interviewQA: InterviewQA[],
    interviewVideo: Express.Multer.File
) => {

    try {

        // -----------------------------------------
        // 1. Convert Multer Buffer → Blob
        // -----------------------------------------

        const videoBlob = new Blob(
            [new Uint8Array(interviewVideo.buffer)],
            {
                type: interviewVideo.mimetype
            }
        );


        // -----------------------------------------
        // 2. Upload directly to Gemini
        // -----------------------------------------

        const uploadedVideo = await ai.files.upload({
            file: videoBlob,
            config: {
                mimeType: interviewVideo.mimetype,
                displayName: interviewVideo.originalname
            }
        });


        console.log(
            "Gemini video uploaded:",
            uploadedVideo.name
        );


        // Wait until Gemini finishes processing

        let videoFile = uploadedVideo;

        while (videoFile.state === "PROCESSING") {

            console.log(
                "Gemini is processing video..."
            );

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

            videoFile = await ai.files.get({
                name: uploadedVideo.name!
            });
        }


        // Check if video is ready

        if (videoFile.state !== "ACTIVE") {

            throw new Error(
                `Gemini video processing failed. State: ${videoFile.state}`
            );

        }


        console.log(
            "Gemini video is ACTIVE"
        );


        // -----------------------------------------
        // 3. Validate Gemini upload
        // -----------------------------------------

        if (
            !videoFile.uri ||
            !videoFile.mimeType
        ) {

            throw new Error(
                "Gemini video upload failed"
            );

        }


        // -----------------------------------------
        // 4. Prepare Interview Q&A
        // -----------------------------------------

        const qaText = interviewQA
            .map((item, index) => {

                return `
Question ${index + 1}:

${item.question}

Candidate Answer:

${item.answer}
`;

            })
            .join("\n");


        // -----------------------------------------
        // 5. Prompt Gemini
        // -----------------------------------------

        const prompt = interviewAnalyzerPrompt(qaText);


        // -----------------------------------------
        // 6. Send VIDEO + Q&A together
        // -----------------------------------------

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: createUserContent([

                    createPartFromUri(
                        videoFile.uri,
                        videoFile.mimeType
                    ),

                    prompt

                ]),

                config: {

                    responseMimeType:
                        "application/json"

                }

            });


        // -----------------------------------------
        // 7. Validate response
        // -----------------------------------------

        if (!response.text) {

            throw new Error(
                "Gemini did not return interview analysis"
            );

        }


        // -----------------------------------------
        // 8. Parse JSON
        // -----------------------------------------

        const analysis =
            JSON.parse(response.text);


        return analysis;

    } catch (error) {

        console.error(
            "Interview analysis error:",
            error
        );

        throw new Error(
            "Failed to analyze interview"
        );

    }

};