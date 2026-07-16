import React, { type Dispatch, type SetStateAction } from "react";
import { MoreHorizontal } from "lucide-react";

interface HistoryItemProps {
    name: string;
    chatId: string;
    currentChat: string;
    setCurrentChat: Dispatch<SetStateAction<string>>;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
    name,
    chatId,
    currentChat,
    setCurrentChat,
}) => {
    const isActive = currentChat === chatId;

    return (
        <div onClick={() => setCurrentChat(chatId)} className="group relative w-full">
            <div
                className={`cursor-pointer w-full flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-200
                    ${
                        isActive
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-slate-400/30 dark:text-slate-100 dark:shadow-lg dark:shadow-slate-100/20"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
            >
                <span className="truncate text-sm font-medium">
                    {name}
                </span>

                <div
                    className={`ml-2 flex-shrink-0 transition-opacity duration-200
                        ${
                            isActive
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        }`}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Open menu
                        }}
                        className={`cursor-pointer rounded-md p-1 transition
                            ${
                                isActive
                                    ? "hover:bg-white/20"
                                    : "hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;