export interface Accounts {
    email: string;
    other: string[];
    phone: string;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
}

export interface Skills {
    soft: string[];
    cloud: string[];
    other: string[];
    tools: string[];
    databases: string[];
    languages: string[];
    technical: string[];
    frameworks: string[];
}

export interface Experience {
    company: string;
    role: string;
    location: string;
    startDate: string | null;
    endDate: string | null;
    highlights: string[];
    description: string | null;
}

export interface Project {
    url: string | null;
    name: string;
    github: string | null;
    highlights: string[];
    description: string;
    technologies: string[];
}

export interface Education {
    grade: string | null;
    degree: string;
    endDate: string | null;
    location: string | null;
    startDate: string | null;
    description: string | null;
    institution: string;
    fieldOfStudy: string;
}

export interface FixedResume {
    candidate_name: string;
    address: string;
    accounts: Accounts;
    about: string;
    skills: Skills;
    experience: Experience[];
    projects: Project[];
    education: Education[];
    certifications: string[];
    achievements: string[];
}



// resume extracted information types


export interface TextContent {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize?: number;
    fontName?: string;
}

export interface Link {
    text?: string;
    url?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}


export interface ResumePage {
    pageNumber: number;
    width: number;
    height: number;

    text: TextContent[];
    links: Link[];
    images: Image[] | null;
}


export interface Image {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
    buffer?: Buffer;
    mimeType?: string | undefined;
    imageKind: number;
}