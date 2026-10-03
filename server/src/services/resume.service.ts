import { fixResumePrompt, resumeAnalyzerPrompt } from "../utils/resumePrompts.js";
import { ai } from "./gemini.service.js";
import type { FixedResume, ResumePage } from "../types/resume.types.js";

export interface ResumeAnalysis {

    // =========================================
    // RESUME DETAILS
    // =========================================

    candidateName: string | null;

    address: string | null;

    accounts: {
        email: string | null;
        phone: string | null;
        linkedin: string | null;
        github: string | null;
        portfolio: string | null;
        other: string[];
    };

    about: string | null;

    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
        languages: string[];
        frameworks: string[];
        databases: string[];
        cloud: string[];
        other: string[];
    };

    experience: {
        company: string | null;
        role: string | null;
        location: string | null;
        startDate: string | null;
        endDate: string | null;
        currentlyWorking: boolean;
        description: string[];
        technologies: string[];
    }[];

    projects: {
        name: string | null;
        description: string | null;
        technologies: string[];
        url: string | null;
        github: string | null;
        highlights: string[];
    }[];

    education: {
        institution: string | null;
        degree: string | null;
        fieldOfStudy: string | null;
        location: string | null;
        startDate: string | null;
        endDate: string | null;
        grade: string | null;
        description: string | null;
    }[];

    certifications: {
        name: string;
        issuer: string | null;
        date: string | null;
        credentialUrl: string | null;
    }[];

    achievements: string[];

    // =========================================
    // ATS ANALYSIS
    // =========================================

    atsScore: number;

    strengths: string[];

    weaknesses: string[];

    missingSkills: string[];

    projectsFeedback: string;

    summary: string;

    improvements: string[];
}


export const resumeAnalyzer = async (
    resumeInfo: ResumePage[],
    resumeFile: Express.Multer.File
): Promise<ResumeAnalysis> => {

    try {

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: [

                    {

                        text: resumeAnalyzerPrompt(resumeInfo)

                    }, {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: resumeFile.buffer.toString("base64")
                        }
                    }
                ]
            });


        let text = response.text?.trim();

        if (!text) {
            throw new Error("Gemini returned an empty response.");
        }

        text = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        const analysis = JSON.parse(text) as ResumeAnalysis;

        return analysis;


    } catch (error) {

        console.error(
            "Resume analysis failed:",
            error
        );

        throw error;
    }
};



// resume fixing service

export const resumeFixer = async (resumeDetails: any): Promise<FixedResume> => {


    try {


        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: [
                {
                    parts: [
                        {
                            text: fixResumePrompt(resumeDetails)
                        }
                    ]
                }
            ]
        });

        let text = response.text?.trim();

        if (!text) {
            throw new Error("Gemini returned an empty response.");
        }
        text = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        const fixedResume = JSON.parse(text);

        return fixedResume;
    } catch (err) {
        console.error(err);
        throw new Error("Internal Server Error");
    }
}