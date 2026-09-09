import React from "react";

export interface ChatErrorProps {
    message?: string;
    onRetry?: () => void;
}

export const ChatError: React.FC<ChatErrorProps> = ({
    message = "Something went wrong while generating the response.",
    onRetry,
}) => {
    return (
        <div className="flex w-full justify-start py-3">
            <div className="flex max-w-[700px] items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/60 px-4 py-3 dark:border-rose-900/40 dark:bg-rose-950/20">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                    !
                </div>

                <div className="flex-1">

                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Unable to generate response
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {message}
                    </p>

                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-2 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Try again
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};