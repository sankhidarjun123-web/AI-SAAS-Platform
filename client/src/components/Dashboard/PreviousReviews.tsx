import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DropDown from "../commons/DropDown";
import type { Options } from "../commons/DropDown";
import { useAuth } from "@clerk/clerk-react";
import { deleteResume } from "../../api/resume.api";
import {
    Calendar,
    FileText,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    MoreVertical,
    Trash2,
    ExternalLink,
} from "lucide-react";

interface ReviewData {
    reviewData?: any;
    reviewIndex: number;
    setDeletedReview: Dispatch<SetStateAction<boolean[]>>;
}

export const PreviousReviews: React.FC<ReviewData> = ({
    setDeletedReview,
    reviewIndex,
    reviewData,
}) => {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const deleteReview = async () => {
        try {
            await deleteResume(getToken, reviewData.id);

            setDeletedReview((prev) => {
                const updated = [...prev];
                updated[reviewIndex] = true;
                return updated;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const options: Options[] = [
        {
            optionName: "delete",
            onClick: deleteReview,
            optionIcon: Trash2,
            disabled: false,
            danger: true,
        },
    ];

    const getScoreBadgeColor = (score: number) => {
        if (score >= 80) {
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
        }

        if (score >= 60) {
            return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
        }

        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    };

    const getStatus = (score: number) => {
        if (score >= 80) {
            return {
                text: "Excellent Resume",
                icon: <CheckCircle2 size={15} />,
            };
        }

        if (score >= 60) {
            return {
                text: "Good Resume",
                icon: <Sparkles size={15} />,
            };
        }

        return {
            text: "Needs Improvement",
            icon: <AlertCircle size={15} />,
        };
    };

    const status = getStatus(reviewData.ats_score);

    const date = new Date(reviewData.created_at).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    return (
        <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() =>
                navigate(`/resume-review/${reviewData.id}`)
            }
            className="
                group
                rounded-2xl
                border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                p-5
                cursor-pointer
                transition-all duration-200
                hover:border-indigo-500/50
                hover:shadow-lg
                hover:shadow-indigo-500/5
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                {/* Resume information */}
                <div className="flex min-w-0 items-center gap-3">

                    <div
                        className="
                            shrink-0
                            w-11 h-11
                            rounded-xl
                            bg-indigo-500/10
                            border border-indigo-500/10
                            flex items-center justify-center
                        "
                    >
                        <FileText
                            className="text-indigo-500"
                            size={20}
                        />
                    </div>

                    <div className="min-w-0">

                        <h3
                            className="
                                font-semibold
                                text-zinc-900 dark:text-white
                                truncate
                            "
                        >
                            {reviewData.resume_name}
                        </h3>

                        <div
                            className="
                                flex items-center gap-1.5
                                mt-1
                                text-xs
                                text-zinc-500 dark:text-zinc-400
                            "
                        >
                            <Calendar size={13} />
                            <span>{date}</span>
                        </div>

                    </div>
                </div>

                {/* ATS Score */}
                <span
                    className={`
                        shrink-0
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-bold
                        border
                        ${getScoreBadgeColor(reviewData.ats_score)}
                    `}
                >
                    {reviewData.ats_score}%
                </span>

            </div>

            {/* Resume summary */}
            <p
                className="
                    mt-4
                    text-sm
                    text-zinc-500 dark:text-zinc-400
                    line-clamp-1
                "
            >
                {reviewData.missing_skills?.length > 0
                    ? `Missing: ${reviewData.missing_skills[0]}`
                    : reviewData.strengths?.[0] ||
                      "Resume reviewed successfully"}
            </p>

            {/* Footer */}
            <div
                className="
                    mt-5 pt-4
                    border-t
                    border-zinc-100 dark:border-zinc-800
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                {/* Status */}
                <div
                    className="
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-zinc-600
                        dark:text-zinc-400
                        min-w-0
                    "
                >
                    {status.icon}

                    <span className="truncate">
                        {status.text}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* View Resume */}
                    {reviewData.resume_url && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                window.open(
                                    reviewData.resume_url,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-1.5
                                rounded-lg
                                text-xs
                                font-medium
                                text-indigo-600
                                dark:text-indigo-400
                                bg-indigo-500/10
                                hover:bg-indigo-500/15
                                border
                                border-indigo-500/10
                                transition-colors
                            "
                        >
                            <FileText size={14} />

                            <span>
                                View Resume
                            </span>

                            <ExternalLink size={13} />
                        </button>
                    )}

                    {/* More Dropdown */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropDown options={options}>
                            <button
                                type="button"
                                className="
                                    w-8 h-8
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-zinc-500
                                    hover:text-zinc-800
                                    dark:hover:text-zinc-200
                                    hover:bg-zinc-100
                                    dark:hover:bg-zinc-800
                                    transition-colors
                                "
                            >
                                <MoreVertical size={18} />
                            </button>
                        </DropDown>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};