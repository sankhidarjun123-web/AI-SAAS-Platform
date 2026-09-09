import { motion } from "framer-motion";

interface ScoreCircleProps {
    score: number;
    totalScore?: number;
    color?: string;
    size?: number;
}

export const ScoreCircle = ({
    score,
    totalScore = 100,
    color = "#3b82f6",
    size = 180,
}: ScoreCircleProps) => {

    const percentage = Math.min(Math.max((score / totalScore) * 100, 0), 100);

    const strokeWidth = 12;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    const progress = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center gap-3">

            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 180 180"
                    className="-rotate-90"
                >

                    {/* Background Circle */}
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-slate-200 dark:text-slate-800"
                    />

                    {/* Animated Progress Circle */}
                    <motion.circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: progress }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                </svg>


                {/* Center Score */}
                <div className="absolute flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold text-black dark:text-white">
                        {score}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        out of {totalScore}
                    </span>

                </div>

            </div>


            {/* Percentage */}
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {percentage.toFixed(0)}%
            </p>

        </div>
    );


};
