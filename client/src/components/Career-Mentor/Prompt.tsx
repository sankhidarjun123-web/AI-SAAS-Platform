import React from "react";
import type { MessageProps } from "../../interface/chatInterfaces";

export const Prompt: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="w-full flex justify-end mb-4">
            <div
                className="
                    max-w-[80%]
                    rounded-2xl
                    px-5
                    py-3
                    bg-white
                    dark:bg-black
                    text-black
                    dark:text-white
                    shadow-md
                    dark:shadow-white/10
                    whitespace-pre-wrap
                    break-words
                "
            >
                {message}
            </div>
        </div>
    );
};