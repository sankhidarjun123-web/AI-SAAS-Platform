import React, { useEffect, useState } from "react";
import type { MessageProps, ReplyType } from "../../interface/chatInterfaces";

export const Reply: React.FC<MessageProps & ReplyType> = ({
    message,
    newMessage
}) => {

    const [displayedMessage, setDisplayedMessage] = useState(
        newMessage ? "" : message
    );

    useEffect(() => {

        // Existing/static message
        if (!newMessage) {
            setDisplayedMessage(message);
            return;
        }

        // New AI message
        setDisplayedMessage("");

        let index = 0;

        const interval = setInterval(() => {

            setDisplayedMessage(
                message.slice(0, index + 1)
            );

            index++;

            if (index >= message.length) {
                clearInterval(interval);
            }

        }, 15);

        return () => clearInterval(interval);

    }, [message, newMessage]);


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
                {displayedMessage}
            </div>

        </div>
    );
};