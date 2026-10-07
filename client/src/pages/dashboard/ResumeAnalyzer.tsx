import React, { useState, useEffect, useRef } from "react";
import DropResume from "../../components/Dashboard/DropResume";
import { motion } from "framer-motion";
import { PreviousReviews } from "../../components/Dashboard/PreviousReviews";
import { usePaginationFetch } from "../../hooks/usePaginationFetch";
import { getAllResumes } from "../../api/resume.api";
import CommonLoader from "../../ui/loader/CommonLoader";
import { useAuth } from "@clerk/clerk-react";

interface PastReview {
    reviews: any[];
    nextSkip: number;
    limitReached: boolean;
}

const ResumeAnalyzer: React.FC = () => {
    const [deletedReview, setDeletedReview] = useState<boolean[]>([]);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const { getToken } = useAuth();

    const {
        data: reviews,
        loading: revLoading,
        limitReached,
    } = usePaginationFetch<PastReview, any>(
        {
            limit: 5,
            skip: 0,
            sort: "asc",
            divRef: loaderRef,
        },
        getAllResumes,
        "reviews",
        (skip, limit) => [getToken, skip, limit]
    );

    useEffect(() => {
        const deleted: number = deletedReview.length;
        const all: number = reviews.length;

        if(deleted >= all) return;

        const added: number = all - deleted;

        setDeletedReview([
            ...deletedReview,
            ...new Array(added).fill(false)
        ]);
    },[reviews])

    return (
        <div className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* =====================================================
                    HEADER
                ====================================================== */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-zinc-200 pb-6 dark:border-zinc-800"
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                        Workspace
                    </span>

                    <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
                        Resume Analyzer
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                        Upload your resume to receive an AI-powered ATS score,
                        identify potential weaknesses, and get personalized
                        recommendations to improve your chances of landing an
                        interview.
                    </p>
                </motion.div>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <div className="grid min-w-0 gap-6 lg:grid-cols-5">

                    {/* =================================================
                        UPLOAD PANEL
                    ================================================== */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="min-w-0 lg:col-span-3"
                    >
                        <div className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950">

                            {/* Panel Header */}
                            <div className="flex items-center justify-between border-b border-zinc-200/70 px-6 py-5 dark:border-zinc-800/70 md:px-7">
                                <div className="flex items-center gap-3">

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
                                                strokeWidth={1.8}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                            Upload Resume
                                        </h2>

                                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                            PDF files up to 10MB
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-medium text-zinc-500 sm:block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                                    AI Analysis
                                </div>
                            </div>

                            {/* Drop Zone */}
                            <div className="flex flex-1 items-center justify-center p-5 sm:p-7 md:p-8">
                                <div className="w-full max-w-2xl">
                                    <DropResume />
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="border-t border-zinc-200/70 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800/70 dark:bg-zinc-900/30">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">🎯</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            ATS Score
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">🔍</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Skill Analysis
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">💡</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            AI Recommendations
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* =================================================
                        PREVIOUS REVIEWS
                    ================================================== */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="min-w-0 lg:col-span-2"
                    >
                        <div className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950">

                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between border-b border-zinc-200/70 px-6 py-5 dark:border-zinc-800/70">

                                <div>
                                    <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                                        <span>📜</span>
                                        Previous Reviews
                                    </h2>

                                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                        Your recent resume analyses
                                    </p>
                                </div>

                                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    {reviews.length}
                                </span>
                            </div>

                            {/* Review List */}
                            <div className="flex-1 p-4 sm:p-5">

                                {reviews.length > 0 ? (
                                    <div className="flex-1 min-w-0 p-4 sm:p-5">

                                        {reviews.map((rev, index) => (
                                            <motion.div
                                                key={rev.id ?? index}
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                    delay: index * 0.04,
                                                }}
                                            >
                                                {!deletedReview[index] && <PreviousReviews
                                                    reviewData={rev}
                                                    reviewIndex={index}
                                                    setDeletedReview={setDeletedReview}
                                                />}
                                            </motion.div>
                                        ))}

                                        {!limitReached && (
                                            <div
                                                ref={loaderRef}
                                                className="flex justify-center py-4"
                                            >
                                                {revLoading && <CommonLoader />}
                                            </div>
                                        )}

                                    </div>
                                ) : revLoading ? (
                                    <div className="flex h-full min-h-[400px] items-center justify-center">
                                        <CommonLoader />
                                    </div>
                                ) : (
                                    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 text-center dark:border-zinc-800 dark:bg-zinc-900/20">

                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-7 w-7 text-zinc-400 dark:text-zinc-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12h6m-6 4h6M9 8h6M7 3h8l4 4v14H7V3z"
                                                />
                                            </svg>
                                        </div>

                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            No Reviews Yet
                                        </h3>

                                        <p className="mt-1 max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                            Upload your first resume and your
                                            AI analysis will appear here.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* =====================================================
                    BOTTOM INFO
                ====================================================== */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="grid gap-4 sm:grid-cols-3"
                >

                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/70 dark:bg-zinc-950">
                        <div className="mb-3 text-xl">📊</div>

                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            ATS Analysis
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                            Understand how well your resume performs against
                            automated screening systems.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/70 dark:bg-zinc-950">
                        <div className="mb-3 text-xl">🔎</div>

                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            Identify Gaps
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                            Discover missing skills, keywords, and areas that
                            could strengthen your resume.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/70 dark:bg-zinc-950">
                        <div className="mb-3 text-xl">✨</div>

                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            Improve Your Resume
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                            Get actionable AI recommendations tailored to your
                            resume and career goals.
                        </p>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default ResumeAnalyzer;