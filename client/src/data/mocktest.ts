import {
    Brain,
    Code2,
    Database,
    Cpu,
    Boxes,
    Terminal,
    Cloud,
    GitBranch,
    Server,
    Shield,
    Layout,
    Users,
    MessageSquare,
    ClipboardCheck,
    Bug,
    Lightbulb,
    type LucideIcon,
} from "lucide-react";


export type Difficulty =
    | "Beginner"
    | "Intermediate"
    | "Advanced";


export type MockTestSeries = {
    name: string;
    description: string;

    icon: LucideIcon;

    totalTests: number;
    duration: string;

    difficulty: Difficulty;

    category: string;
};


export const mockTestSeries: MockTestSeries[] = [

    {
        name: "Aptitude",
        description:
            "Practice quantitative aptitude, logical reasoning, verbal ability, and problem-solving.",

        icon: Brain,

        totalTests: 25,
        duration: "30–45 min",

        difficulty: "Beginner",

        category: "Placement",
    },


    {
        name: "DSA & Coding",
        description:
            "Test your knowledge of data structures, algorithms, and competitive programming.",

        icon: Code2,

        totalTests: 50,
        duration: "60–90 min",

        difficulty: "Intermediate",

        category: "Programming",
    },


    {
        name: "Core Computer Science",
        description:
            "Practice Operating Systems, DBMS, Computer Networks, OOP, and other CS fundamentals.",

        icon: Cpu,

        totalTests: 40,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Computer Science",
    },


    {
        name: "SQL & Databases",
        description:
            "Practice SQL queries, joins, normalization, transactions, indexing, and database concepts.",

        icon: Database,

        totalTests: 30,
        duration: "30–60 min",

        difficulty: "Intermediate",

        category: "Database",
    },


    {
        name: "Frontend Development",
        description:
            "Test your HTML, CSS, JavaScript, React, browser APIs, and frontend development knowledge.",

        icon: Layout,

        totalTests: 35,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Development",
    },


    {
        name: "Backend Development",
        description:
            "Practice APIs, servers, authentication, databases, security, and backend development concepts.",

        icon: Server,

        totalTests: 35,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Development",
    },


    {
        name: "MERN Stack",
        description:
            "Test your complete MERN stack knowledge including MongoDB, Express, React, and Node.js.",

        icon: Boxes,

        totalTests: 30,
        duration: "60–90 min",

        difficulty: "Intermediate",

        category: "Full Stack",
    },


    {
        name: "System Design",
        description:
            "Practice scalable system architecture, APIs, databases, caching, and distributed systems.",

        icon: Lightbulb,

        totalTests: 25,
        duration: "60–90 min",

        difficulty: "Advanced",

        category: "Architecture",
    },


    {
        name: "Debugging",
        description:
            "Identify bugs, fix logical errors, solve runtime issues, and improve application performance.",

        icon: Bug,

        totalTests: 30,
        duration: "30–60 min",

        difficulty: "Intermediate",

        category: "Programming",
    },


    {
        name: "Linux",
        description:
            "Practice Linux commands, file systems, permissions, processes, networking, and shell basics.",

        icon: Terminal,

        totalTests: 30,
        duration: "30–45 min",

        difficulty: "Beginner",

        category: "Operating System",
    },


    {
        name: "Git & GitHub",
        description:
            "Test your knowledge of version control, branches, commits, pull requests, and Git workflows.",

        icon: GitBranch,

        totalTests: 20,
        duration: "20–40 min",

        difficulty: "Beginner",

        category: "Developer Tools",
    },


    {
        name: "Cloud Computing",
        description:
            "Practice cloud computing concepts including compute, storage, networking, IAM, and scaling.",

        icon: Cloud,

        totalTests: 30,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Cloud",
    },


    {
        name: "DevOps",
        description:
            "Test your knowledge of Docker, Kubernetes, CI/CD, infrastructure, monitoring, and automation.",

        icon: Server,

        totalTests: 35,
        duration: "45–75 min",

        difficulty: "Advanced",

        category: "DevOps",
    },


    {
        name: "Cybersecurity",
        description:
            "Practice web security, authentication, encryption, networking, vulnerabilities, and OWASP.",

        icon: Shield,

        totalTests: 30,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Security",
    },


    {
        name: "AI & Machine Learning",
        description:
            "Test your knowledge of Python, machine learning, statistics, neural networks, and AI concepts.",

        icon: Brain,

        totalTests: 35,
        duration: "60–90 min",

        difficulty: "Advanced",

        category: "Artificial Intelligence",
    },


    {
        name: "Technical Interview",
        description:
            "Prepare for technical interview questions covering programming, projects, CS fundamentals, and problem solving.",

        icon: MessageSquare,

        totalTests: 20,
        duration: "45–60 min",

        difficulty: "Intermediate",

        category: "Interview",
    },


    {
        name: "HR & Behavioral",
        description:
            "Practice communication, teamwork, leadership, conflict resolution, and common HR interview questions.",

        icon: Users,

        totalTests: 15,
        duration: "20–30 min",

        difficulty: "Beginner",

        category: "Interview",
    },


    {
        name: "Full Placement Mock",
        description:
            "Experience a complete placement simulation including aptitude, coding, technical questions, and interviews.",

        icon: ClipboardCheck,

        totalTests: 10,
        duration: "90–120 min",

        difficulty: "Advanced",

        category: "Placement",
    },

];
