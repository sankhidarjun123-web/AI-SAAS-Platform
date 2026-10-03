import { Link } from "react-router-dom";
import { Anna } from "../../assets/images";
import { ScoreCircle } from "../../ui/data-representations/ScoreCircle";
import {
    BarGraph
} from "../../ui/data-representations/BarGraph";


export const TopRevSec = ({ reviewSoftBreak }: { reviewSoftBreak: any }) => {

    const createdAt = reviewSoftBreak?.created_at;
    const startedAt = reviewSoftBreak?.started_at;
    const completedAt = reviewSoftBreak?.completed_at;

    const interviewDate = createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "N/A";

    const interviewDuration =
        startedAt && completedAt
            ? (() => {
                const durationMs =
                    new Date(completedAt).getTime() -
                    new Date(startedAt).getTime();

                const totalSeconds = Math.floor(durationMs / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                return `${minutes}m ${seconds}s`;
            })()
            : "N/A";

    const performanceData = [
        {
            name: "Technical",
            value: reviewSoftBreak?.technical_score ?? 0,
            color: "#3b82f6",
        },
        {
            name: "Communication",
            value: reviewSoftBreak?.communication_score ?? 0,
            color: "#22c55e",
        },
        {
            name: "Presentation",
            value: reviewSoftBreak?.presentation_score ?? 0,
            color: "#a855f7",
        },
        {
            name: "Answer Quality",
            value: reviewSoftBreak?.answer_quality_score ?? 0,
            color: "#f97316",
        },
    ];

    const strengths = reviewSoftBreak?.strengths ?? [];
    const weaknesses = reviewSoftBreak?.weaknesses ?? [];

    return (
        <div className="w-full h-full p-5 md:p-6 flex flex-col gap-6">

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
            <div className="w-full min-h-28 flex items-center gap-6 p-5 md:p-6 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-black text-black dark:text-white">

                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                        src={reviewSoftBreak?.interviewer_image || Anna}
                        alt="Interviewer"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <h2 className="font-semibold text-base md:text-lg truncate">
                        {reviewSoftBreak?.interviewRole}
                    </h2>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <li className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-black dark:text-white">
                                Interview ID:
                            </span>{" "}
                            {reviewSoftBreak?.id}
                        </li>

                        <li className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-black dark:text-white">
                                Date:
                            </span>{" "}
                            {interviewDate}
                        </li>

                        <li className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-black dark:text-white">
                                Conducted by:
                            </span>{" "}
                            Anna
                        </li>

                        <li className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-black dark:text-white">
                                Duration:
                            </span>{" "}
                            {interviewDuration}
                        </li>

                        <li className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-black dark:text-white">
                                Difficulty:
                            </span>{" "}
                            <span className="capitalize">
                                {reviewSoftBreak?.difficulty}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="shrink-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-sm font-medium text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Completed
                    </div>
                </div>
            </div>

            {/* Analysis */}
            <div className="w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_2fr] gap-5">

                <div className="w-full flex flex-col gap-4 justify-center items-start rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-4">
                    <h2 className="text-2xl font-bold">
                        Overall Score:
                    </h2>

                    <div className="w-full flex items-center justify-center">
                        <ScoreCircle
                            score={reviewSoftBreak?.overall_score ?? 0}
                        />
                    </div>
                </div>

                <div
                    className="min-w-full flex justify-center items-center"
                    style={{ scrollbarWidth: "none" }}
                >
                    <BarGraph
                        data={performanceData}
                        height={200}
                    />
                </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Strengths */}
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">
                            💪
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-green-700">
                                Strengths
                            </h3>

                            <p className="text-sm text-green-600">
                                Key areas where you perform well
                            </p>
                        </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                        {strengths.map((s: string, i: number) => (
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
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-xl">
                            ⚠️
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-red-700">
                                Weaknesses
                            </h3>

                            <p className="text-sm text-red-600">
                                Areas that need improvement
                            </p>
                        </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                        {weaknesses.map((w: string, i: number) => (
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