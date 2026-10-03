import type { FixedResume } from "../types/resume.types.js";
import puppeteer from "puppeteer";

export const generateResumeHTML = (resume: FixedResume): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />

        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
                font-family: Arial, Helvetica, sans-serif;
                color: #222;
                background: white;
                font-size: 11px;
                line-height: 1.4;
            }

            .resume {
                width: 210mm;
                min-height: 297mm;
                padding: 15mm 16mm;
                margin: auto;
                background: white;
            }

            .header {
                text-align: center;
                margin-bottom: 14px;
            }

            .name {
                font-size: 26px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .contact {
                font-size: 10px;
                color: #444;
            }

            .contact a {
                color: #222;
                text-decoration: none;
            }

            .section {
                margin-top: 13px;
            }

            .section-title {
                font-size: 13px;
                font-weight: bold;
                text-transform: uppercase;
                border-bottom: 1px solid #222;
                padding-bottom: 3px;
                margin-bottom: 7px;
            }

            .summary {
                text-align: justify;
            }

            .item {
                margin-bottom: 9px;
            }

            .item-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
            }

            .item-title {
                font-weight: bold;
                font-size: 11.5px;
            }

            .item-date {
                font-size: 10px;
                color: #555;
            }

            .company {
                font-weight: 600;
            }

            ul {
                margin: 4px 0 0 17px;
                padding: 0;
            }

            li {
                margin-bottom: 2px;
            }

            .skills-row {
                margin-bottom: 3px;
            }

            .skill-title {
                font-weight: bold;
            }

            .technologies {
                font-style: italic;
                color: #444;
            }

            @page {
                size: A4;
                margin: 0;
            }
        </style>
    </head>

    <body>

        <div class="resume">

            <!-- HEADER -->

            <div class="header">

                <div class="name">
                    ${resume.candidate_name}
                </div>

                <div class="contact">

                    ${resume.accounts.email}

                    ${resume.accounts.phone
            ? ` | ${resume.accounts.phone}`
            : ""
        }

                    ${resume.address
            ? ` | ${resume.address}`
            : ""
        }

                    ${resume.accounts.linkedin
            ? ` |
                                <a href="${resume.accounts.linkedin}">
                                    LinkedIn
                                </a>`
            : ""
        }

                    ${resume.accounts.github
            ? ` |
                                <a href="${resume.accounts.github}">
                                    GitHub
                                </a>`
            : ""
        }

                    ${resume.accounts.portfolio
            ? ` |
                                <a href="${resume.accounts.portfolio}">
                                    Portfolio
                                </a>`
            : ""
        }

                </div>

            </div>


            <!-- ABOUT -->

            ${resume.about
            ? `
                    <div class="section">

                        <div class="section-title">
                            Professional Summary
                        </div>

                        <div class="summary">
                            ${resume.about}
                        </div>

                    </div>
                    `
            : ""
        }


            <!-- SKILLS -->

            <div class="section">

                <div class="section-title">
                    Technical Skills
                </div>

                ${resume.skills.languages.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Languages:
                            </span>

                            ${resume.skills.languages.join(", ")}
                        </div>
                        `
            : ""
        }

                ${resume.skills.frameworks.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Frameworks:
                            </span>

                            ${resume.skills.frameworks.join(", ")}
                        </div>
                        `
            : ""
        }

                ${resume.skills.databases.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Databases:
                            </span>

                            ${resume.skills.databases.join(", ")}
                        </div>
                        `
            : ""
        }

                ${resume.skills.tools.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Tools:
                            </span>

                            ${resume.skills.tools.join(", ")}
                        </div>
                        `
            : ""
        }

                ${resume.skills.cloud.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Cloud:
                            </span>

                            ${resume.skills.cloud.join(", ")}
                        </div>
                        `
            : ""
        }

                ${resume.skills.other.length
            ? `
                        <div class="skills-row">
                            <span class="skill-title">
                                Other:
                            </span>

                            ${resume.skills.other.join(", ")}
                        </div>
                        `
            : ""
        }

            </div>


            <!-- EXPERIENCE -->

            ${resume.experience.length
            ? `
                    <div class="section">

                        <div class="section-title">
                            Experience
                        </div>

                        ${resume.experience
                .map(
                    (experience) => `
                                <div class="item">

                                    <div class="item-header">

                                        <div>

                                            <span class="item-title">
                                                ${experience.role}
                                            </span>

                                            ${experience.company
                            ? ` — 
                                                    <span class="company">
                                                        ${experience.company}
                                                    </span>`
                            : ""
                        }

                                        </div>

                                        <div class="item-date">

                                            ${experience.startDate ?? ""
                        }

                                            ${experience.endDate
                            ? ` - ${experience.endDate}`
                            : ""
                        }

                                        </div>

                                    </div>

                                    ${experience.location
                            ? `
                                            <div>
                                                ${experience.location}
                                            </div>
                                            `
                            : ""
                        }

                                    ${experience.highlights?.length
                            ? `
                                            <ul>
                                                ${experience.highlights
                                .map(
                                    (highlight) =>
                                        `<li>${highlight}</li>`
                                )
                                .join("")}
                                            </ul>
                                            `
                            : ""
                        }

                                </div>
                                `
                )
                .join("")}

                    </div>
                    `
            : ""
        }


            <!-- PROJECTS -->

            ${resume.projects.length
            ? `
                    <div class="section">

                        <div class="section-title">
                            Projects
                        </div>

                        ${resume.projects
                .map(
                    (project) => `
                                <div class="item">

                                    <div class="item-header">

                                        <div class="item-title">
                                            ${project.name}
                                        </div>

                                    </div>

                                    ${project.technologies.length
                            ? `
                                            <div class="technologies">
                                                ${project.technologies.join(
                                " • "
                            )}
                                            </div>
                                            `
                            : ""
                        }

                                    ${project.description
                            ? `
                                            <div>
                                                ${project.description}
                                            </div>
                                            `
                            : ""
                        }

                                    ${project.highlights.length
                            ? `
                                            <ul>
                                                ${project.highlights
                                .map(
                                    (highlight) =>
                                        `<li>${highlight}</li>`
                                )
                                .join("")}
                                            </ul>
                                            `
                            : ""
                        }

                                </div>
                                `
                )
                .join("")}

                    </div>
                    `
            : ""
        }


            <!-- EDUCATION -->

            ${resume.education.length
            ? `
                    <div class="section">

                        <div class="section-title">
                            Education
                        </div>

                        ${resume.education
                .map(
                    (education) => `
                                <div class="item">

                                    <div class="item-header">

                                        <div class="item-title">

                                            ${education.degree}

                                            ${education.fieldOfStudy
                            ? ` in ${education.fieldOfStudy}`
                            : ""
                        }

                                        </div>

                                        <div class="item-date">

                                            ${education.startDate ?? ""
                        }

                                            ${education.endDate
                            ? ` - ${education.endDate}`
                            : ""
                        }

                                        </div>

                                    </div>

                                    <div>
                                        ${education.institution}
                                    </div>

                                    ${education.location
                            ? `
                                            <div>
                                                ${education.location}
                                            </div>
                                            `
                            : ""
                        }

                                    ${education.grade
                            ? `
                                            <div>
                                                ${education.grade}
                                            </div>
                                            `
                            : ""
                        }

                                </div>
                                `
                )
                .join("")}

                    </div>
                    `
            : ""
        }


            <!-- CERTIFICATIONS -->

            ${resume.certifications.length
            ? `
                    <div class="section">

                        <div class="section-title">
                            Certifications
                        </div>

                        <ul>
                            ${resume.certifications
                .map(
                    (certification) =>
                        `<li>${certification}</li>`
                )
                .join("")}
                        </ul>

                    </div>
                    `
            : ""
        }


            <!-- ACHIEVEMENTS -->

            ${resume.achievements.length
            ? `
                    <div class="section">

                        <div class="section-title">
                            Achievements
                        </div>

                        <ul>
                            ${resume.achievements
                .map(
                    (achievement) =>
                        `<li>${achievement}</li>`
                )
                .join("")}
                        </ul>

                    </div>
                    `
            : ""
        }

        </div>

    </body>

    </html>
    `;
};

export const generateResumePDF = async (
    html: string
): Promise<Buffer> => {

    const browser = await puppeteer.launch({
        headless: true
    });

    try {
        const page = await browser.newPage();

        await page.setContent(html);

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        return Buffer.from(pdf);

    } finally {
        await browser.close();
    }
};