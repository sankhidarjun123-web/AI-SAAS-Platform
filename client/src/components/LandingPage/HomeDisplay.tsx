import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stats } from "../../data/reviews";

const HomeDisplay: React.FC = () => {

    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentState((prev) => (prev + 1) % stats.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden">

            {/* Animated gradient background */}
            <motion.div
                className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[700px]
                h-[500px]
                rounded-full
                bg-gradient-to-r
                from-indigo-500/20
                via-purple-500/20
                to-cyan-400/20
                blur-3xl
            "
                initial={{
                    opacity: 0,
                    scale: 0.7,
                }}
                animate={{
                    opacity: [0, 0.7, 0.45, 0.7, 0],
                    scale: [0.7, 1, 1.1, 1, 0.8],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">

                <div className="flex flex-col items-center text-center">

                    {/* Rotating Top Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="
                        p-2
                        text-sm
                        rounded-full
                        border-2
                        border-yellow-400/30
                        bg-yellow-400/10
                        backdrop-blur-sm
                    "
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentState}
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -30, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                className="inline-block"
                            >
                                {stats[currentState]}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="
                        mt-6
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        font-extrabold
                        tracking-tight
                        text-zinc-900
                        dark:text-zinc-100
                    "
                    >
                        Build Your Career

                        <span className="block text-indigo-600 dark:text-indigo-400">
                            With AI
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="
                        mt-6
                        max-w-2xl
                        text-sm
                        md:text-lg
                        leading-relaxed
                        text-zinc-600
                        dark:text-zinc-400
                    "
                    >
                        Prepare for your next opportunity with AI-powered resume
                        analysis, personalized career guidance, and realistic
                        mock interviews.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex gap-4 mt-10 flex-wrap justify-center"
                    >
                        <button
                            className="
                            px-8 py-3
                            rounded-xl
                            common-btn
                            cursor-pointer
                            font-semibold
                            transition-all
                        "
                        >
                            Start Learning
                        </button>

                        <button
                            className="
                            px-8 py-3
                            rounded-xl
                            cursor-pointer
                            border
                            border-zinc-300
                            dark:border-zinc-700
                            text-zinc-700
                            dark:text-zinc-300
                            hover:bg-zinc-100
                            dark:hover:bg-zinc-900
                            transition-all
                        "
                        >
                            Explore Features
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HomeDisplay;