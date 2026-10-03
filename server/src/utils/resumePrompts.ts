import type { ResumePage } from "../types/resume.types.js";


export const resumeAnalyzerPrompt = (resumeInfo: ResumePage[]): string => {

    const resumePages: any = [];
    resumeInfo.forEach((resumePage: ResumePage) => {
        const orderedText = [...resumePage.text]
            .sort((a, b) => {
                // PDF coordinates usually have Y increasing upward,
                // so higher Y values appear earlier on the page.
                if (Math.abs(a.y - b.y) > 5) {
                    return b.y - a.y;
                }

                return a.x - b.x;
            })
            .map((item, index) => ({
                order: index + 1,
                text: item.text,
                position: {
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height
                },
                style: {
                    fontSize: item.fontSize ?? null,
                    fontName: item.fontName ?? null
                }
            }));

        const resumePageData = {
            page: {
                pageNumber: resumePage.pageNumber,
                width: resumePage.width,
                height: resumePage.height
            },

            textContent: orderedText,

            links: resumePage.links.map((link, index) => ({
                order: index + 1,
                text: link.text ?? null,
                url: link.url ?? null,
                position: {
                    x: link.x,
                    y: link.y,
                    width: link.width,
                    height: link.height
                }
            })),

            images: resumePage.images ? resumePage.images.map((image, index) => ({
                order: index + 1,
                position: {
                    x: image.x,
                    y: image.y,
                    width: image.width,
                    height: image.height
                }
            })) : "No Images"
        }

        resumePages.push(resumePageData);
    });

    return `
You are an expert resume parser and ATS resume analyzer.

You are given structured information extracted directly from one or more pages of a candidate's resume using PDF.js.

You are also provided with the original PDF file of the resume. You can directly analyze the PDF to understand its actual content, visual layout, formatting, images, colors, typography, sections, columns, and overall design.

Use BOTH sources together:

Original PDF
Use the PDF to understand the actual visual appearance and overall resume design.
Analyze the page layout, columns, sections, colors, typography, images, spacing, alignment, visual hierarchy, and other design elements.
Use the PDF as the visual source of truth.
PDF.js structured data
Use the extracted text to accurately identify and preserve the information written in the resume.
Use X/Y coordinates to understand the position and relationship of elements.
Use font information to understand text styling and hierarchy.
Use hyperlinks to identify the actual URLs associated with visible text.
Use image information to identify the position and presence of visual elements.

The PDF.js information is provided in the following strict order for each page:

Page metadata
Text elements in approximate reading order
Hyperlinks
Images

Use the positional information to understand the visual structure and relationships between elements on each page.

Do not assume that the PDF.js text extraction order represents the semantic order of the resume. Use the coordinates and the original PDF together to understand columns, sidebars, headings, sections, and other layout relationships.

If information is available in both the PDF and the PDF.js data, preserve the exact information from the resume and use the PDF to resolve visual or structural ambiguity.

The information is provided in a strict order:
1. Page metadata
2. Text elements in approximate reading order
3. Hyperlinks
4. Images

Use the positional information to understand the visual structure and
relationships between different elements on the page.

Do NOT assume that the order of the text elements alone represents the
semantic order of the resume. Use their X/Y coordinates to understand
columns, sections, headings, sidebars, and relationships between elements.

========================
PAGES INFORMATION
========================

${JSON.stringify(resumePages, null, 2)}}

========================
HOW TO INTERPRET THE DATA
========================

TEXT:
Each text element represents text actually extracted from the PDF.

- "text" is the exact text extracted from the PDF.
- "x" and "y" represent its position on the page.
- "width" and "height" represent its bounding box.
- "fontSize" represents the estimated font size.
- "fontName" represents the PDF font identifier.
- Do not invent text that is not present.
- Preserve the candidate's actual wording.
- Use position, size, and font information to identify headings,
  names, sections, body text, and other visual hierarchy.

LINKS:
Each link represents a hyperlink detected in the PDF.

- "text" is the visible text associated with the hyperlink when available.
- "url" is the actual URL detected from the PDF.
- Use the URL exactly as provided.
- If a URL is present, preserve it exactly.
- Do not invent URLs.

IMAGES:
Each image represents an image object detected on the page.

Images may include:
- Candidate profile photographs
- LinkedIn/GitHub icons
- Company logos
- QR codes
- Decorative graphics
- Other visual elements

Do not assume that every image is a profile photograph.
Use its position and surrounding text to determine its likely purpose.

IMPORTANT:
The structured data is extracted from the actual PDF.
Do not fabricate information that is not present in this data.

========================
TASK
========================

Perform TWO tasks.

TASK 1 — RESUME INFORMATION EXTRACTION

Extract ALL candidate information that is actually present in the
provided resume page.

CANDIDATE INFORMATION:
- Candidate name
- Address/location
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
For EVERY experience entry:
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
For EVERY project:
- Project name
- Description
- Technologies used
- GitHub URL
- Live/project URL
- Important features/highlights

EDUCATION:
For EVERY education entry:
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
Extract every explicitly mentioned:
- Award
- Competition
- Hackathon
- Publication
- Scholarship
- Other achievement

========================
TASK 2 — ATS ANALYSIS
========================

Analyze the resume based ONLY on the information actually present.

Evaluate:

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
on the candidate's existing technical/career profile.

Do not randomly recommend unrelated technologies.

PROJECTS FEEDBACK:
Provide useful feedback about the candidate's projects.

SUMMARY:
Provide a concise professional assessment.

IMPROVEMENTS:
Provide concrete improvements the candidate can make.

========================
IMPORTANT RULES
========================

1. Return ONLY valid JSON.
2. Do NOT wrap the JSON in markdown.
3. Do NOT include explanations outside the JSON.
4. Do NOT invent information.
5. Do NOT infer personal information that is not explicitly present.
6. If a scalar field is not present, return null.
7. If an array has no information, return [].
8. Preserve the candidate's information accurately.
9. Do not change the candidate's name.
10. Do not fabricate companies, roles, technologies, links,
    achievements, education, certifications, or experience.
11. Extract EVERY entry when multiple entries exist.
12. Extract URLs exactly as they appear.
13. Extract email and phone exactly when present.
14. Preserve dates as they appear whenever possible.
15. Do not add skills that are not supported by the resume.
16. Do not assume an image is a profile photo.
17. Use text positions and image positions to understand the layout.
18. If information appears fragmented across multiple text elements,
    combine it only when the positional information clearly indicates
    that the elements belong together.
19. Do not treat PDF extraction order as semantic truth.
20. The supplied PDF data is the source of truth.

========================
RETURN EXACTLY THIS JSON
========================

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
            "name": null,
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

Return ONLY the JSON object.
`;
};





export const fixResumePrompt = (resumeDetails: any): string => {
    return `
You are an expert resume writer, ATS optimization specialist, and professional career coach.

Your task is to improve and rewrite the following resume so that it is:
- ATS-friendly
- Professional and concise
- Grammatically correct
- Impact-oriented
- Easy for recruiters to scan
- Relevant to the candidate's existing skills and experience
- Strongly written without exaggerating or inventing information

IMPORTANT RULES:

1. Do NOT invent jobs, internships, projects, companies, degrees,
   certifications, achievements, skills, metrics, technologies, or experiences.

2. Do NOT change factual information such as:
   - candidate name
   - email
   - phone
   - company names
   - job titles
   - dates
   - education
   - CGPA/grades
   - project names
   - technologies
   - links

3. You may rewrite sentences, improve grammar, improve wording,
   remove unnecessary content, and make bullet points more impactful.

4. Where possible, convert weak descriptions into achievement-oriented
   bullet points using strong action verbs.

5. Use measurable results ONLY when they already exist in the original resume.
   NEVER fabricate numbers, percentages, users, performance improvements,
   revenue, rankings, or other metrics.

6. Preserve the candidate's actual technical skills.
   Do not add technologies simply because they are commonly requested
   by recruiters or ATS systems.

7. Do not remove valid skills from the original resume unless they are
   clearly duplicates or formatting variations of the same skill.

8. Do not fabricate content for empty sections.
   If an array is empty in the original resume, keep it empty.

9. Preserve all original factual information even when rewriting it.

10. Do not add new top-level fields.

11. Do not remove any top-level fields.

12. Do not rename any top-level fields.

13. Preserve the EXACT JSON structure of the input resume.

14. Preserve the data type of every field.
    Strings must remain strings.
    Arrays must remain arrays.
    Objects must remain objects.
    null values must remain null when no factual replacement exists.

15. Preserve the structure of nested objects and arrays as well.

16. The output should be a cleaned and improved version of the input,
    NOT a newly designed resume schema.

17. The output must contain the same top-level keys as the input.

18. The output must contain the same nested keys as the input objects.

19. Do not move information from one field to another.
    For example, do not move "about" into "summary" or "candidate_name"
    into "personalInfo".

20. Do not create fields such as "personalInfo", "summary", "libraries",
    "bullets", "field", or any other field that does not exist in the
    original input.

FOR EXPERIENCE AND PROJECT CONTENT:

- Start bullets with strong action verbs where appropriate.
- Clearly describe what the candidate actually did.
- Mention technologies when they are already associated with the
  relevant experience/project.
- Highlight functionality, impact, or outcomes when supported by
  the original information.
- Avoid vague phrases such as "worked on", "helped with", or
  "responsible for" when a more direct statement is possible.
- Do not fabricate metrics or achievements.

FOR SKILLS:

- Preserve the existing skill categories.
- Preserve the existing skills.
- You may normalize obvious formatting variations such as:
  "Javascript" → "JavaScript"
  "Node.Js" → "Node.js"
  "Spring Boots" → "Spring Boot"
- Do not add skills that are not present in the original resume.
- Do not arbitrarily move skills between categories.

FOR PERSONAL INFORMATION:

- Preserve the candidate's actual contact information.
- You may improve formatting, but do not change factual values.
- Do not invent missing URLs or contact information.
- If a value is null or missing, keep it null or missing according
  to the original structure.

FOR EMPTY SECTIONS:

If the original value is:

[]

then return:

[]

Do not create content for that section.

If the original value is null, preserve null unless there is
actual information elsewhere in the provided resume that can
legitimately populate it.

ORIGINAL RESUME:

${JSON.stringify(resumeDetails, null, 2)}

CRITICAL OUTPUT REQUIREMENTS:

Return ONLY valid JSON.

The returned JSON MUST have EXACTLY the same structure as the
original resume.

Do NOT return markdown.
Do NOT return code fences.
Do NOT return explanations.
Do NOT return comments.

The output must be directly usable by the backend without
transforming the JSON structure.

Before returning the answer, internally verify:

- Same top-level keys
- Same nested keys
- Same array/object/string/null types
- No invented information
- No missing information
- No renamed fields
- No additional fields

Return the improved resume JSON now.
`;
};