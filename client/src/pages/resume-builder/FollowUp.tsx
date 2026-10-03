import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

type Experience =
    | "No Experience"
    | "1-3 Years"
    | "4-5 Years"
    | "6-9 Years"
    | "10 Years+"
    | null;

const FollowUp = () => {

    const [q, setQ] = useState<number>(1);
    const [experience, setExperience] = useState<Experience>(null);

    const options: Exclude<Experience, null>[] = [
        "No Experience",
        "1-3 Years",
        "4-5 Years",
        "6-9 Years",
        "10 Years+",
    ];

    return (
        <section className="w-full min-h-full flex flex-col px-5 py-6 sm:px-8 md:px-10 lg:px-12">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b border-zinc-200 pb-6 dark:border-zinc-800"
            >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                    Resume Builder
                </span>

                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
                    Tell me about yourself
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                    Answer a few questions to help us personalize your resume.
                </p>
            </motion.div>


            {/* Progress */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mx-auto mt-8 w-full max-w-5xl"
            >
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Question {q} of 3
                    </span>

                    <span className="text-xs font-semibold text-indigo-500">
                        {Math.round((q / 3) * 100)}%
                    </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <motion.div
                        className="h-full rounded-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(q / 3) * 100}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </motion.div>


            {/* Question */}
            <div className="flex flex-1 items-center justify-center py-10">

                {q === 1 && <motion.div
                    key={1}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-5xl"
                >

                    <div className="mb-7 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Select Your Experience
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Choose the option that best describes your professional experience.
                        </p>
                    </div>


                    {/* Experience Options */}
                    <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                        {options.map((option, index) => {

                            const selected = experience === option;

                            return (
                                <motion.li
                                    key={option}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.06
                                    }}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setExperience(option)}
                                    className={`
                                        group relative flex h-32
                                        cursor-pointer flex-col
                                        items-center justify-center
                                        overflow-hidden rounded-2xl
                                        border text-center
                                        transition-all duration-200

                                        ${
                                            selected
                                                ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-400"
                                                : "border-zinc-200 bg-white text-zinc-800 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-indigo-500/50"
                                        }
                                    `}
                                >

                                    {/* Selected indicator */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: selected ? 1 : 0,
                                            opacity: selected ? 1 : 0
                                        }}
                                        className="
                                            absolute right-3 top-3
                                            flex h-6 w-6 items-center
                                            justify-center rounded-full
                                            bg-indigo-500 text-white
                                        "
                                    >
                                        <Check className="h-3.5 w-3.5" />
                                    </motion.div>


                                    <span className="text-base font-bold">
                                        {option}
                                    </span>

                                    <span className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                                        {option === "No Experience"
                                            ? "Starting my career"
                                            : "Professional experience"}
                                    </span>

                                </motion.li>
                            );
                        })}

                    </ul>

                </motion.div>}

                {q === 2 && <motion.div
                    key={2}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-5xl"
                >
                    <div className="mb-7 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            What education are you persuing ?
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Choose the option that best describes your professional experience.
                        </p>
                    </div>
                </motion.div>}
            </div>


            {/* Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="
                    flex w-full items-center justify-between
                    border-t border-zinc-200 pt-5
                    dark:border-zinc-800
                "
            >

                <button
                    className="
                        flex items-center gap-2
                        rounded-xl border
                        border-zinc-200 bg-white
                        px-5 py-2.5
                        text-sm font-semibold text-zinc-700
                        transition-all duration-200
                        hover:border-zinc-300 hover:bg-zinc-50
                        dark:border-zinc-800
                        dark:bg-zinc-950
                        dark:text-zinc-300
                        dark:hover:bg-zinc-900
                        cursor-pointer
                    "
                    onClick={() => setQ(prev => prev === 1 ? 1 : prev - 1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>


                <button
                    className="
                        flex items-center gap-2
                        rounded-xl bg-indigo-500
                        px-5 py-2.5
                        text-sm font-semibold text-white
                        shadow-sm
                        transition-all duration-200
                        hover:bg-indigo-600
                        hover:shadow-md
                        cursor-pointer
                    "
                    onClick={() => setQ(prev => prev === 3 ? 3 : prev + 1)}
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </button>

            </motion.div>

        </section>
    );
};

export default FollowUp;