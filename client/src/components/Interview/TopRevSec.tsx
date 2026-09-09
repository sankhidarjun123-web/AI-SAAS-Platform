import { Link, Outlet } from "react-router-dom";
import { ScoreCircle } from "../../ui/data-representations/ScoreCircle";
import { BarGraph } from "../../ui/data-representations/BarGraph";
import { Anna } from "../../assets/images";
import LineGraph from "../../ui/data-representations/LineGraph";

export const TopRevSec = ({ reviewSoftBreak }: { reviewSoftBreak: any }) => {

    const performanceData = [
        { name: "Technical Skills", value: 50, color: "#3b82f6" },
        { name: "Communication", value: 72, color: "#22c55e" },
        { name: "Problem Solving", value: 92, color: "#a855f7" },
        { name: "Confidence", value: 68, color: "#f97316" },
        { name: "System Design", value: 78, color: "#ef4444" },
        { name: "JavaScript", value: 85, color: "#eab308" },
        { name: "React", value: 88, color: "#06b6d4" },
        { name: "Node.js", value: 74, color: "#16a34a" },
        { name: "Database", value: 81, color: "#8b5cf6" },
        { name: "Algorithms", value: 95, color: "#ec4899" },
        { name: "Data Structures", value: 89, color: "#14b8a6" },
        { name: "Operating Systems", value: 67, color: "#f59e0b" },
        { name: "Computer Networks", value: 76, color: "#6366f1" },
        { name: "DBMS", value: 91, color: "#10b981" },
        { name: "OOP", value: 83, color: "#f43f5e" },
        { name: "Git & GitHub", value: 79, color: "#0ea5e9" },
        { name: "Docker", value: 64, color: "#7c3aed" },
        { name: "Cloud Computing", value: 71, color: "#d946ef" },
        { name: "API Development", value: 87, color: "#f97316" },
        { name: "Debugging", value: 90, color: "#22c55e" },
        { name: "Security", value: 69, color: "#dc2626" },
        { name: "Testing", value: 77, color: "#0891b2" },
        { name: "DevOps", value: 62, color: "#9333ea" },
        { name: "System Architecture", value: 84, color: "#ea580c" },
        { name: "Performance Optimization", value: 93, color: "#059669" }
    ];


    const strengths = [
        "It was a good interview",
        "All the this was well said",
        "Pronouncation was accurate"
    ];

    const weaknesses = [
        "Poor Interview",
        "Very bad pronouncation",
        "Stopping in mid"
    ]

    return (<div className="w-full h-full p-5 md:p-6 flex flex-col gap-6">
        {/* Top Section */}
        <div className="w-full flex items-center justify-between gap-5">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">
                    Interview Review
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Here is your detailed AI analysis. Keep learning and improving.
                </p>
            </div>

            <Link
                to="/"
                className="cursor-pointer px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-sm font-medium text-black dark:text-white transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:shadow-sm active:scale-[0.98] whitespace-nowrap"
            >
                Go to dashboard
            </Link>
        </div>

        {/* Interview Details */}
        <div className="w-full min-h-28 flex items-center gap-6 p-5 md:p-6 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-black text-black dark:text-white transition-all duration-200">

            {/* Interviewer Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                    src={reviewSoftBreak?.interviewer_image || Anna}
                    alt="Interviewer"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Interview Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
                <h2 className="font-semibold text-base md:text-lg truncate">
                    {reviewSoftBreak?.interviewRole || "Full Stack Developer Interview"}
                </h2>

                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <li className="text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-black dark:text-white">Interview ID:</span>{" "}
                        {reviewSoftBreak?.id || "123"}
                    </li>

                    <li className="text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-black dark:text-white">Date:</span>{" "}
                        {reviewSoftBreak?.date || "23/June/2026"}
                    </li>

                    <li className="text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-black dark:text-white">Interviewer:</span>{" "}
                        {reviewSoftBreak?.interviewerName || "Anna"}
                    </li>

                    <li className="text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-black dark:text-white">Duration:</span>{" "}
                        {reviewSoftBreak?.interviewDuration || "18m 26s"}
                    </li>

                    <li className="text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-black dark:text-white">Difficulty:</span>{" "}
                        <span className="capitalize">{reviewSoftBreak?.difficulty || "Medium"}</span>
                    </li>
                </ul>
            </div>

            {/* Status */}
            <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-sm font-medium text-green-600 dark:text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Completed
                </div>
            </div>

        </div>

        {/*Analysis*/}
        <div className="w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_2fr] gap-5">
            <div className="w-full flex flex-col gap-4 justify-center items-start rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-4">
                <h2 className="text-2xl font-bold">Overall Score:</h2>
                <div className="w-full flex items-center justify-center">
                    <ScoreCircle score={85} />
                </div>
            </div>

            <div className="min-w-full flex justify-center items-center" style={{ scrollbarWidth: "none" }}>
                <BarGraph data={performanceData} height={200} />
            </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Strengths */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">
                        💪
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-green-700">Strengths</h3>
                        <p className="text-sm text-green-600">
                            Key areas where you perform well
                        </p>
                    </div>
                </div>

                <ul className="mt-6 space-y-3">
                    {strengths.map((s: string, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm text-gray-700 shadow-sm"
                        >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                                ✓
                            </span>

                            <span>{s}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-xl">
                        ⚠️
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-red-700">Weaknesses</h3>
                        <p className="text-sm text-red-600">
                            Areas that need improvement
                        </p>
                    </div>
                </div>

                <ul className="mt-6 space-y-3">
                    {weaknesses.map((w: string, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm text-gray-700 shadow-sm"
                        >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                                !
                            </span>

                            <span>{w}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    </div>
    );


};
