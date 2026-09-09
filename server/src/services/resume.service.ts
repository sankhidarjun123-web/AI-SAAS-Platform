import { ai } from "./gemini.service.js";

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
    fileUrl: string
): Promise<ResumeAnalysis> => {

    try {

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: [

                    {
                        fileData: {
                            fileUri: fileUrl,
                            mimeType: "application/pdf",
                        },
                    },

                    {
                        text: `
Analyze this resume carefully and extract ALL information that is
actually present in the resume.

Your task has TWO parts:

1. Extract the candidate's resume details.
2. Perform a detailed ATS/resume analysis.

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT wrap the response in markdown.
- Do NOT include explanations outside the JSON.
- Do NOT invent information.
- Do NOT infer personal information that is not explicitly present.
- If a field is not present in the resume, return null.
- For arrays, return [] when no information is available.
- Preserve the information from the resume accurately.
- Do not omit important information that is explicitly present.
- Keep dates exactly as they appear when possible.
- Do not change the candidate's name.
- Do not fabricate companies, roles, technologies, links, achievements,
  education, certifications, or experience.
- If a section contains multiple entries, return every entry.
- Extract URLs exactly when they are present.
- Extract email and phone number exactly when present.
- For skills, categorize them appropriately, but do not add skills
  that are not present in the resume.

Extract the following:

CANDIDATE INFORMATION:
- Candidate Name
- Address/location
- Contact information
- Email
- Phone
- LinkedIn
- GitHub
- Portfolio
- Other professional accounts/links

ABOUT:
- Professional summary
- Objective
- About/profile section

SKILLS:
- Technical skills
- Programming languages
- Frameworks
- Libraries
- Tools
- Databases
- Cloud technologies
- Soft skills
- Other explicitly mentioned skills

EXPERIENCE:
For EVERY experience entry extract:
- Company
- Job title/role
- Location
- Start date
- End date
- Whether currently working there
- Responsibilities
- Achievements
- Technologies used

PROJECTS:
For EVERY project extract:
- Project name
- Description
- Technologies used
- GitHub URL
- Live/project URL
- Important features/highlights

EDUCATION:
For EVERY education entry extract:
- Institution
- Degree
- Field of study
- Location
- Start date
- End date
- Grade/GPA/percentage
- Description

CERTIFICATIONS:
For EVERY certification:
- Certification name
- Issuer
- Date
- Credential URL

ACHIEVEMENTS:
Extract all explicitly mentioned:
- Awards
- Competitions
- Hackathons
- Publications
- Scholarships
- Other achievements

Then perform the ATS analysis.

ATS ANALYSIS:

Evaluate the resume for:
- ATS compatibility
- Skills relevance
- Experience quality
- Project quality
- Achievement strength
- Keyword usage
- Resume structure
- Clarity
- Professional impact
- Missing skills for a general software/technical role
- Areas that could improve ATS performance

ATS SCORE:
Return a score from 0 to 100.

STRENGTHS:
List the strongest aspects of the resume.

WEAKNESSES:
List the major weaknesses.

MISSING SKILLS:
List relevant technical skills that appear to be missing based ONLY
on the candidate's career/technical profile and the technologies already
mentioned in the resume. Do not randomly add unrelated skills.

PROJECTS FEEDBACK:
Provide useful feedback about the candidate's projects.

SUMMARY:
Provide a concise professional assessment of the resume.

IMPROVEMENTS:
Provide concrete improvements the candidate can make to the resume.


RETURN EXACTLY THIS JSON STRUCTURE:

{
    "candidateName": null,

    "address": null,

    "accounts": {
        "email": null,
        "phone": null,
        "linkedin": null,
        "github": null,
        "portfolio": null,
        "other": []
    },

    "about": null,

    "skills": {
        "technical": [],
        "soft": [],
        "tools": [],
        "languages": [],
        "frameworks": [],
        "databases": [],
        "cloud": [],
        "other": []
    },

    "experience": [
        {
            "company": null,
            "role": null,
            "location": null,
            "startDate": null,
            "endDate": null,
            "currentlyWorking": false,
            "description": [],
            "technologies": []
        }
    ],

    "projects": [
        {
            "name": null,
            "description": null,
            "technologies": [],
            "url": null,
            "github": null,
            "highlights": []
        }
    ],

    "education": [
        {
            "institution": null,
            "degree": null,
            "fieldOfStudy": null,
            "location": null,
            "startDate": null,
            "endDate": null,
            "grade": null,
            "description": null
        }
    ],

    "certifications": [
        {
            "name": "",
            "issuer": null,
            "date": null,
            "credentialUrl": null
        }
    ],

    "achievements": [],

    "atsScore": 0,

    "strengths": [],

    "weaknesses": [],

    "missingSkills": [],

    "projectsFeedback": "",

    "summary": "",

    "improvements": []
}

Remember:
Return ONLY the JSON object.
`
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