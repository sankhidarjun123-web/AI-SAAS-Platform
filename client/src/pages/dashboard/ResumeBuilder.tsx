import { motion } from "framer-motion";
import { FilePlus2, Wrench, ArrowRight } from "lucide-react";

const ResumeBuilder = () => {
    return (<div className="relative">
        <div className="absolute w-full h-full z-50 flex justify-center items-center bg-white/40 cursor-not allowed">
            <p className="w-full text-center font-bold">We are currently working on new updates!</p>
        </div>
        <section className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* HEADER */}
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
                        Resume Builder
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                        Create a new professional resume or improve your existing
                        resume with AI-powered tools.
                    </p>
                </motion.div>

                {/* OPTIONS */}
                <div className="grid gap-6 md:grid-cols-2">

                    {/* BUILD RESUME */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="
                            group relative overflow-hidden
                            rounded-3xl border border-zinc-200/80
                            bg-white text-left shadow-sm
                            transition-shadow duration-300
                            hover:shadow-lg
                            dark:border-zinc-800/80
                            dark:bg-zinc-950
                        "
                    >
                        {/* Top accent */}
                        <div className="absolute left-0 right-0 top-0 h-1 bg-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="flex min-h-[320px] flex-col p-7 md:p-8">

                            <div className="flex items-start justify-between">
                                <div className="
                                    flex h-12 w-12 items-center justify-center
                                    rounded-xl bg-indigo-500/10
                                    text-indigo-600
                                    dark:text-indigo-400
                                ">
                                    <FilePlus2 className="h-6 w-6" strokeWidth={1.8} />
                                </div>

                                <div className="
                                    rounded-full border border-zinc-200
                                    bg-zinc-50 px-3 py-1.5
                                    text-[11px] font-medium text-zinc-500
                                    dark:border-zinc-800
                                    dark:bg-zinc-900
                                    dark:text-zinc-400
                                ">
                                    Create
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h2 className="
                                    text-xl font-bold text-zinc-900
                                    dark:text-zinc-100
                                ">
                                    Build Resume
                                </h2>

                                <p className="
                                    mt-2 max-w-md text-sm leading-relaxed
                                    text-zinc-500 dark:text-zinc-400
                                ">
                                    Build a professional, ATS-friendly resume
                                    from scratch with a guided resume builder.
                                </p>

                                <div className="
                                    mt-6 flex items-center gap-2
                                    text-sm font-semibold text-indigo-600
                                    dark:text-indigo-400
                                ">
                                    Start building

                                    <ArrowRight
                                        className="
                                            h-4 w-4
                                            transition-transform duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.button>


                    {/* FIX RESUME */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="
                            group relative overflow-hidden
                            rounded-3xl border border-zinc-200/80
                            bg-white text-left shadow-sm
                            transition-shadow duration-300
                            hover:shadow-lg
                            dark:border-zinc-800/80
                            dark:bg-zinc-950
                        "
                    >
                        {/* Top accent */}
                        <div className="absolute left-0 right-0 top-0 h-1 bg-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="flex min-h-[320px] flex-col p-7 md:p-8">

                            <div className="flex items-start justify-between">
                                <div className="
                                    flex h-12 w-12 items-center justify-center
                                    rounded-xl bg-indigo-500/10
                                    text-indigo-600
                                    dark:text-indigo-400
                                ">
                                    <Wrench className="h-6 w-6" strokeWidth={1.8} />
                                </div>

                                <div className="
                                    rounded-full border border-zinc-200
                                    bg-zinc-50 px-3 py-1.5
                                    text-[11px] font-medium text-zinc-500
                                    dark:border-zinc-800
                                    dark:bg-zinc-900
                                    dark:text-zinc-400
                                ">
                                    AI Powered
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h2 className="
                                    text-xl font-bold text-zinc-900
                                    dark:text-zinc-100
                                ">
                                    Fix Resume
                                </h2>

                                <p className="
                                    mt-2 max-w-md text-sm leading-relaxed
                                    text-zinc-500 dark:text-zinc-400
                                ">
                                    Upload your existing resume and let AI
                                    identify formatting, content, and ATS issues.
                                </p>

                                <div className="
                                    mt-6 flex items-center gap-2
                                    text-sm font-semibold text-indigo-600
                                    dark:text-indigo-400
                                ">
                                    Improve your resume

                                    <ArrowRight
                                        className="
                                            h-4 w-4
                                            transition-transform duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.button>

                </div>

                {/* BOTTOM INFO */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="
                        rounded-3xl border border-zinc-200/70
                        bg-zinc-50/50 p-6
                        dark:border-zinc-800/70
                        dark:bg-zinc-900/30
                    "
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="
                                text-sm font-bold text-zinc-900
                                dark:text-zinc-100
                            ">
                                Your resume, your way.
                            </p>

                            <p className="
                                mt-1 text-xs leading-relaxed
                                text-zinc-500 dark:text-zinc-400
                            ">
                                Build from scratch or upload an existing resume
                                to get started.
                            </p>
                        </div>

                        <div className="
                            hidden sm:block
                            rounded-full border border-zinc-200
                            bg-white px-3 py-1.5
                            text-[11px] font-medium text-zinc-500
                            dark:border-zinc-800
                            dark:bg-zinc-950
                            dark:text-zinc-400
                        ">
                            AI Resume Tools
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
        </div>
    );
};

export default ResumeBuilder;