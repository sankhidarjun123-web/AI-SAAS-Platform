import {
    GoogleGenAI,
    LiveServerMessage,
    Modality,
    Type
} from "@google/genai";
import { interviewPrompt } from "../utils/interviewPrompt";


export const startGeminiSession = async (
    token: string,

    interviewDetails: any,

    resumeDetails: any,

    onQuestion: (question: string) => void,

    onAudio: (audioBase64: string) => void,

    onCandidateTranscript: (
        transcript: string
    ) => void,

    onTurnComplete: () => void,

    endInterview: () => void
) => {

    const ai = new GoogleGenAI({
        apiKey: token,
    });

    let questionBuffer = "";



    const resumeContext =
        JSON.stringify(
            resumeDetails,
            null,
            2
        );

    console.log("Resume Details: ", resumeDetails, "\nResume Context: ", resumeContext);


    const session =
        await ai.live.connect({

            model:
                "gemini-3.1-flash-live-preview",


            config: {

                responseModalities: [
                    Modality.AUDIO
                ],

                tools: [
                    {
                        functionDeclarations: [
                            {
                                name: "endInterview",

                                description:
                                    "Ends the interview immediately.",

                                parameters: {
                                    type: Type.OBJECT,

                                    properties: {
                                        reason: {
                                            type: Type.STRING
                                        }
                                    },

                                    required: ["reason"]
                                }
                            }
                        ]
                    }
                ],

                inputAudioTranscription: {},

                outputAudioTranscription: {},

                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Kore",
                        },
                    },
                },

                realtimeInputConfig: {
                    automaticActivityDetection: {
                        disabled: false,
                        prefixPaddingMs: 300,
                        silenceDurationMs: 800,
                    },
                },

                systemInstruction: interviewPrompt({ interviewDetails, resumeDetails }),
            },


            callbacks: {

                onopen: () => {

                    console.log(
                        "Gemini Live connected"
                    );

                },


                onmessage: async (
                    message: LiveServerMessage
                ) => {

                    console.log(
                        "FULL GEMINI MESSAGE:",
                        message
                    );

                    console.log(
                        "TOOL CALL:",
                        message.toolCall
                    );

                    if (message.toolCall?.functionCalls) {

                        console.log(
                            "Tool calls:",
                            message.toolCall.functionCalls
                        );

                        for (
                            const functionCall
                            of message.toolCall.functionCalls
                        ) {

                            console.log(
                                "Gemini requested function:",
                                functionCall.name
                            );

                            if (
                                functionCall.name ===
                                "endInterview"
                            ) {

                                console.log(
                                    "Interview ending because Gemini requested it"
                                );

                                // Respond to Gemini first
                                session.sendToolResponse({
                                    functionResponses: [
                                        {
                                            id: functionCall.id,
                                            name: functionCall.name,
                                            response: {
                                                success: true
                                            }
                                        }
                                    ]
                                });

                                // End interview
                                await endInterview();

                                return;
                            }
                        }

                        return;
                    }


                    const content =
                        message.serverContent;

                    if (!content) {
                        return;
                    }

                    // ==============================
                    // CANDIDATE TRANSCRIPT
                    // ==============================

                    if (content.inputTranscription) {

                        const transcript =
                            content.inputTranscription.text;

                        if (transcript) {

                            console.log(
                                "Candidate chunk:",
                                transcript
                            );

                            onCandidateTranscript(
                                transcript
                            );
                        }
                    }

                    // ==============================
                    // ANNA TRANSCRIPT
                    // ==============================

                    if (content.outputTranscription) {

                        const text =
                            content.outputTranscription.text;

                        if (text) {

                            // Accumulate Anna's streaming text
                            questionBuffer += text;

                            console.log(
                                "Anna chunk:",
                                text
                            );

                            console.log(
                                "Anna complete so far:",
                                questionBuffer
                            );
                        }
                    }


                    // ==============================
                    // ANNA AUDIO
                    // ==============================

                    if (
                        content.modelTurn?.parts
                    ) {

                        for (
                            const part
                            of content.modelTurn.parts
                        ) {

                            if (
                                part.inlineData?.data
                            ) {

                                onAudio(
                                    part.inlineData.data
                                );
                            }
                        }
                    }


                    // ==============================
                    // TURN COMPLETE
                    // ==============================

                    if (content.turnComplete) {

                        const completeQuestion =
                            questionBuffer.trim();

                        if (completeQuestion) {

                            console.log(
                                "Anna complete question:",
                                completeQuestion
                            );

                            onQuestion(
                                completeQuestion
                            );
                        }

                        // Clear buffer for the next Anna turn
                        questionBuffer = "";

                        onTurnComplete();
                    }


                    // ==============================
                    // INTERRUPTION
                    // ==============================

                    if (
                        content.interrupted
                    ) {

                        console.log(
                            "Candidate interrupted Anna"
                        );
                    }
                },


                onerror: (error) => {

                    console.error(
                        "Gemini error:",
                        error
                    );

                },


                onclose: (event) => {

                    console.log(
                        "Gemini closed:",
                        event
                    );

                },

            },

        });


    return session;
};