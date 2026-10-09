import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { usePaginationFetch } from "../../hooks/usePaginationFetch";
import { getAllResumes } from "../../api/resume.api";
import CommonLoader from "../../ui/loader/CommonLoader";
import { createInterview } from "../../api/interview.api";

type Difficulty = 'beginner' | 'easy' | 'intermediate' | 'hard' | 'expert';

interface PastReview {
    id: string;
    ats_score?: number;
    summary?: string;
    created_at?: string;
    resume_key?: string;
}

type InterviewDetails = {
    targetRole: string,
    interviewType: "Technical" | "HR" | "Behavioral" | "Technical+Behavioral",
    interviewTone: "Friendly" | "Professional" | "Assertive",
    difficulty: 'beginner' | 'easy' | 'intermediate' | 'hard' | 'advanced' | 'expert'
}

export interface InterviewData {
    resumeId: string;

    candidate: InterviewDetails;
}

const InterviewHome: React.FC = () => {
    const difficulties = [
        {
            name: "beginner",
            color: "bg-green-400"
        },
        {
            name: "easy",
            color: "bg-indigo-500"
        },
        {
            name: "intermediate",
            color: "bg-amber-400"
        },
        {
            name: "advanced",
            color: "bg-amber-600"
        },
        {
            name: "expert",
            color: "bg-red-700"
        }
    ];
    const navigate = useNavigate();
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [intLoading, setIntLoading] = useState<boolean>(false);

    const [selectedResume, setSelectedResume] =
        useState<string | null>(null);

    const [candidate, setCandidate] = useState<InterviewDetails>({
        targetRole: "",
        interviewType: "Technical",
        interviewTone: "Professional",
        difficulty: "beginner"
    });

    const {
        data: resumes,
        loading: resumesLoading,
        limitReached,
    } = usePaginationFetch<PastReview, any>(
        {
            limit: 5,
            skip: 0,
            sort: "desc",
            divRef: loaderRef,
        },
        getAllResumes,
        "reviews",
        (skip, limit) => [skip, limit]
    );

    const getScoreColor = (score?: number) => {
        if (score === undefined) {
            return "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400";
        }

        if (score >= 80) {
            return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400";
        }

        if (score >= 60) {
            return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400";
        }

        return "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400";
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setCandidate((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStartInterview = async () => {
        if (!selectedResume) return;

        const interviewData: InterviewData = {
            resumeId: selectedResume,

            candidate: {
                targetRole: candidate.targetRole,
                interviewType: candidate.interviewType,
                interviewTone: candidate.interviewTone,
                difficulty: candidate.difficulty
            },
        };

        setIntLoading(true);
        try {
            const createdInterview = await createInterview(interviewData);

            navigate(`/interview-window/${createdInterview.interviewId}/setup`);
        } catch (err) {

            if (axios.isAxiosError(err) && err.response?.status === 403) {
                navigate("/billing");
            }
            console.error(err);
        } finally {
            setIntLoading(false);
        }
    };

    const isFormValid =
        selectedResume &&
        candidate.targetRole.trim() &&
        candidate.interviewTone.trim() &&
        candidate.interviewType.trim()

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 md:p-10">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-zinc-200 pb-6 dark:border-zinc-800"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                                Interview Workspace
                            </span>

                            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
                                AI Mock Interview
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                                Select your resume and provide some information about
                                yourself. This information will be combined with your
                                resume and used to personalize your interview.
                            </p>
                        </div>

                        <Link to="/dashboard/interviews" className="h-10 rounded-sm bg-white dark:bg-black text-black dark:text-white p-2 text-sm border border-slate-300 dark:border-slate-600 text-center">Your interview space</Link>
                    </div>
                </motion.div>

                {/* =====================================================
                    MAIN GRID
                ====================================================== */}

                <div className="grid min-w-0 gap-6 lg:grid-cols-5">

                    {/* =================================================
                        LEFT: CANDIDATE INFORMATION
                    ================================================== */}

                    {/* =================================================
    INTERVIEW DETAILS
================================================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="min-w-0 lg:col-span-3"
                    >
                        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800/80 dark:bg-zinc-950">

                            {/* Title */}

                            <div className="mb-7 flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.7}
                                            d="M12 14a7 7 0 100-14 7 7 0 000 14zm0 0c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        Interview Details
                                    </h2>

                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Configure your personalized AI interview
                                    </p>
                                </div>

                            </div>


                            {/* Form */}

                            <div className="space-y-6">

                                {/* Difficulty */}
                                <div className="relative h-20">

                                    <label className="mb-2 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Set Difficulty
                                    </label>


                                    <div className="relative w-full">

                                        {/* Difficulty line */}

                                        <div
                                            className="
                                            w-full
                                                flex
                                                items-center
                                                justify-evenly
                                                h-1
                                                rounded-full
                                             bg-blue-100
                                            "
                                        >

                                            {difficulties.map((item) => (

                                                <button
                                                    key={item.name}

                                                    type="button"

                                                    onClick={() =>
                                                        setCandidate((prev: InterviewDetails) => ({
                                                            ...prev,
                                                            difficulty: item.name as Difficulty
                                                        }))
                                                    }

                                                    className={`
                                                            w-3
                                                            h-3
                                                            cursor-pointer
                                                            rounded-full
                                                            ${item.color}

                                                            transition
                                                            hover:scale-125

                                                            ${candidate?.difficulty === item.name
                                                            ? "scale-150 ring-4 ring-blue-200"
                                                            : ""
                                                        }
                                                        `}
                                                />

                                            ))}

                                        </div>
                                    </div>


                                    {/* Selected difficulty */}

                                    <p
                                        className="
                                                     mt-8
                                                     text-center
                                                     text-sm
                                                     font-semibold
                                                     capitalize
                                                 "
                                    >
                                        {candidate?.difficulty}
                                    </p>

                                </div>

                                {/* Target Role */}

                                <div>

                                    <label className="mb-2 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Target Role
                                    </label>

                                    <input
                                        type="text"
                                        name="targetRole"
                                        value={candidate.targetRole}
                                        onChange={handleChange}
                                        placeholder="e.g. Frontend Developer"
                                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                                    />

                                    <p className="mt-1.5 text-[11px] text-zinc-400">
                                        Enter the position you want to practice for.
                                    </p>

                                </div>


                                {/* Interview Type */}

                                <div>

                                    <label className="mb-3 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Interview Type
                                    </label>

                                    <div className="grid gap-3 sm:grid-cols-2">

                                        {[
                                            "Technical",
                                            "HR",
                                            "Behavioral",
                                            "Technical+Behavioral"
                                        ].map((type) => (

                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() =>
                                                    setCandidate((prev) => ({
                                                        ...prev,
                                                        interviewType:
                                                            type as InterviewDetails["interviewType"]
                                                    }))
                                                }
                                                className={`rounded-xl border p-4 text-left transition ${candidate.interviewType === type
                                                    ? "border-indigo-500 bg-indigo-500/5"
                                                    : "border-zinc-200 bg-zinc-50 hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900"
                                                    }`}
                                            >

                                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {type === "Technical+Behavorial"
                                                        ? "Technical + Behavioral"
                                                        : type}
                                                </p>

                                            </button>

                                        ))}

                                    </div>

                                </div>


                                {/* Interview Tone */}

                                <div>

                                    <label className="mb-3 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Interview Tone
                                    </label>

                                    <div className="grid gap-3 sm:grid-cols-3">

                                        {[
                                            {
                                                value: "Friendly",
                                                description: "Supportive and relaxed"
                                            },
                                            {
                                                value: "Professional",
                                                description: "Realistic interview"
                                            },
                                            {
                                                value: "Assertive",
                                                description: "Challenging questions"
                                            }
                                        ].map((tone) => (

                                            <button
                                                key={tone.value}
                                                type="button"
                                                onClick={() =>
                                                    setCandidate((prev) => ({
                                                        ...prev,
                                                        interviewTone:
                                                            tone.value as InterviewDetails["interviewTone"]
                                                    }))
                                                }
                                                className={`rounded-xl border p-4 text-left transition ${candidate.interviewTone === tone.value
                                                    ? "border-indigo-500 bg-indigo-500/5"
                                                    : "border-zinc-200 bg-zinc-50 hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900"
                                                    }`}
                                            >

                                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {tone.value}
                                                </p>

                                                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    {tone.description}
                                                </p>

                                            </button>

                                        ))}

                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                START INTERVIEW
                            ================================================== */}

                            <div className="border-t border-zinc-200/70 p-5 dark:border-zinc-800/70">

                                {!selectedResume && (
                                    <p className="mb-3 text-center text-[11px] text-zinc-400">
                                        Select a resume to continue
                                    </p>
                                )}

                                {selectedResume &&
                                    !isFormValid && (
                                        <p className="mb-3 text-center text-[11px] text-amber-500">
                                            Complete your information before
                                            starting the interview
                                        </p>
                                    )}

                                <button
                                    disabled={!isFormValid}
                                    onClick={handleStartInterview}
                                    className={`w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed ${intLoading && "opacity-40 cursor-not-allowed"} disabled:opacity-40`}
                                >
                                    {intLoading ? "Starting..." : "Start Interview"}
                                    <span className="ml-2">→</span>
                                </button>

                            </div>

                        </div>
                    </motion.div>

                    {/* =================================================
                        RIGHT: RESUME SELECTION
                    ================================================== */}

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="min-w-0 lg:col-span-2"
                    >
                        <div className="flex min-h-[620px] flex-col rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950">

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-zinc-200/70 px-6 py-5 dark:border-zinc-800/70">

                                <div>
                                    <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                                        <span>📄</span>
                                        Choose Resume
                                    </h2>

                                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                        This resume will be used during the
                                        interview
                                    </p>
                                </div>

                                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    {resumes.length}
                                </span>

                            </div>

                            {/* Resume List */}

                            <div className="flex-1 overflow-y-auto p-4">

                                {resumes.length > 0 ? (
                                    <div className="space-y-3">

                                        {resumes.map((resume, index) => {

                                            const isSelected =
                                                selectedResume ===
                                                resume.id;

                                            return (
                                                <motion.button
                                                    key={
                                                        resume.id ?? index
                                                    }
                                                    whileHover={{
                                                        y: -2,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.99,
                                                    }}
                                                    onClick={() =>
                                                        setSelectedResume(
                                                            resume.id
                                                        )
                                                    }
                                                    className={`w-full rounded-2xl border p-4 text-left transition-all ${isSelected
                                                        ? "border-indigo-500 bg-indigo-500/5 shadow-sm"
                                                        : "border-zinc-200 bg-zinc-50/40 hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-indigo-700"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isSelected
                                                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                                                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                                                                }`}
                                                        >
                                                            📄
                                                        </div>

                                                        <div className="min-w-0 flex-1">

                                                            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                                {resume.resume_name}
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                                {resume.created_at
                                                                    ? new Date(
                                                                        resume.created_at
                                                                    ).toLocaleDateString()
                                                                    : "Previously analyzed"}
                                                            </p>

                                                        </div>

                                                        {resume.ats_score !==
                                                            undefined && (
                                                                <span
                                                                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${getScoreColor(
                                                                        resume.ats_score
                                                                    )}`}
                                                                >
                                                                    ATS{" "}
                                                                    {
                                                                        resume.ats_score
                                                                    }
                                                                </span>
                                                            )}

                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">

                                                        <span className="text-[11px] text-zinc-400">
                                                            {isSelected
                                                                ? "Selected"
                                                                : "Click to select"}
                                                        </span>

                                                        <div
                                                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${isSelected
                                                                ? "border-indigo-500 bg-indigo-500"
                                                                : "border-zinc-300 dark:border-zinc-700"
                                                                }`}
                                                        >
                                                            {isSelected && (
                                                                <span className="text-[9px] text-white">
                                                                    ✓
                                                                </span>
                                                            )}
                                                        </div>

                                                    </div>

                                                </motion.button>
                                            );
                                        })}

                                        {!limitReached && (
                                            <div
                                                ref={loaderRef}
                                                className="py-3"
                                            >
                                                {resumesLoading && (
                                                    <CommonLoader />
                                                )}
                                            </div>
                                        )}

                                    </div>
                                ) : resumesLoading ? (
                                    <div className="flex h-[400px] items-center justify-center">
                                        <CommonLoader />
                                    </div>
                                ) : (
                                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-800">

                                        <div className="mb-4 text-3xl">
                                            📄
                                        </div>

                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            No Resumes Available
                                        </h3>

                                        <p className="mt-1 max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                            Analyze a resume first before
                                            starting an interview.
                                        </p>

                                    </div>
                                )}

                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default InterviewHome;