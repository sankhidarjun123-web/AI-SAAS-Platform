import React from "react";
import type { MessageProps } from "../../interface/chatInterfaces";

export const Reply: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="w-full flex justify-start mb-4">
            <div
                className="
                    max-w-[80%]
                    px-1
                    py-1
                    bg-transparent
                    text-black
                    dark:text-white
                    whitespace-pre-wrap
                    break-words
                "
            >
                {message}
            </div>
        </div>
    );
};