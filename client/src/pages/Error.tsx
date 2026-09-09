import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Home,
    RefreshCw,
    TriangleAlert,
} from "lucide-react";

export const Error = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { status, error } = location.state || {};

    const errorStatus = status ?? 500;
    const errorMessage =
        error ?? "Something unexpected happened.";

    const isNotFound = errorStatus === 404;

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#EEE9DF] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">

            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

                <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/10" />

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900/5 dark:border-white/5" />

                <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900/5 dark:border-white/5" />

            </div>

            {/* Content */}
            <div className="relative flex min-h-screen items-center justify-center px-5 py-12">

                <div className="w-full max-w-2xl text-center">

                    {/* Icon */}
                    <div className="mb-8 flex justify-center">

                        <div className="relative">

                            <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/20 blur-2xl" />

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-200 bg-white/70 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70">

                                <TriangleAlert
                                    size={34}
                                    strokeWidth={1.7}
                                    className="text-indigo-500 dark:text-indigo-400"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Status */}
                    <div className="mb-3">

                        <span className="text-[7rem] font-black leading-none tracking-[-0.08em] text-zinc-900/10 dark:text-white/10 sm:text-[9rem]">
                            {errorStatus}
                        </span>

                    </div>

                    {/* Heading */}
                    <h1 className="relative -mt-12 text-3xl font-black tracking-tight sm:text-4xl">

                        {isNotFound
                            ? "We couldn't find that."
                            : "Something went off script."}

                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">

                        {errorMessage}

                    </p>

                    {/* Error code */}
                    <div className="mx-auto mt-7 inline-flex items-center rounded-full border border-zinc-200 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60">

                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500" />

                        <span className="text-[11px] font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">

                            ERROR {errorStatus}

                        </span>

                    </div>

                    {/* Actions */}
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/70 px-5 text-xs font-bold text-zinc-700 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:w-auto"
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </button>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 dark:bg-indigo-500 dark:hover:bg-indigo-400 sm:w-auto"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold text-zinc-500 transition hover:bg-white/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 sm:w-auto"
                        >
                            <Home size={16} />
                            Home
                        </button>

                    </div>

                    {/* Bottom message */}
                    <div className="mt-14">

                        <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
                            Interview platform
                        </p>

                        <div className="mx-auto mt-3 h-px w-12 bg-zinc-300 dark:bg-zinc-800" />

                        <p className="mt-3 text-[10px] text-zinc-400 dark:text-zinc-600">
                            Don't worry. Your interview session is safe.
                        </p>

                    </div>

                </div>

            </div>
        </main>
    );
};