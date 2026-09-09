import React, {
    useEffect,
    useState,
    useRef,
    type SetStateAction,
} from "react";

import { PromptBox } from "../chat/PromptBox";

import { Prompt } from "../../../components/Career-Mentor/Prompt";
import { Reply } from "../../../components/Career-Mentor/Reply";

import { useAuth } from "@clerk/clerk-react";
import { getConversation } from "../../../api/chat.api";
import { usePaginationFetch } from "../../../hooks/usePaginationFetch";
import CommonLoader from "../../../ui/loader/CommonLoader";
import { motion, AnimatePresence } from "framer-motion";
import { ChatError } from "../../../components/Career-Mentor/ChatError";

interface WorkspaceProps {
    currentChat: string | undefined;
    newMessage: string;
    newReply: string;
    setNewMessage: React.Dispatch<SetStateAction<string>>;
    setNewReply: React.Dispatch<SetStateAction<string>>;
    hasMessages: boolean;
    setHasMessages: React.Dispatch<SetStateAction<boolean>>;
}

interface ConversationMessage {
    role: "model" | "user";
    content: string;
    attachment_type: string | null;
    attachment_url: string | null;
    created_at: string;
    id: string;
    newMessage: boolean;
}


export const Workspace: React.FC<WorkspaceProps> = ({
    currentChat, newMessage, newReply, setNewMessage, setNewReply, hasMessages, setHasMessages
}) => {

    const { getToken } = useAuth();

    const [chatError, setChatError] =
        useState<string | null>(null);


    const loaderRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const hasInitiallyScrolled = useRef(false);


    const {
        data: conversation,
        setData: setConversation,
        resetData: resetConversation,
        loading: conLoading,
        limitReached
    } = usePaginationFetch<ConversationMessage, any>(
        {
            limit: 5,
            skip: 0,
            sort: "asc",
            divRef: loaderRef
        },
        getConversation,
        "conversationMessages",
        (skip, limit) => [
            currentChat,
            getToken,
            skip,
            limit,
        ]
    );

    const title = "What can I help you with?";

    const [typedTitle, setTypedTitle] = useState("");
    const [showGlow, setShowGlow] = useState(true);

    useEffect(() => {
        if (hasMessages) {
            setTypedTitle("");
            setShowGlow(false);
            return;
        }

        let index = 0;
        let timeout: ReturnType<typeof setTimeout>;

        // Small initial AI latency
        timeout = setTimeout(() => {

            const typeNextCharacter = () => {

                if (index >= title.length) {
                    setShowGlow(false);
                    return;
                }

                setTypedTitle(
                    title.slice(0, index + 1)
                );

                index++;

                // Slightly variable typing speed
                const delay =
                    35 + Math.random() * 35;

                timeout = setTimeout(
                    typeNextCharacter,
                    delay
                );
            };

            typeNextCharacter();

        }, 350);

        return () => {
            clearTimeout(timeout);
        };

    }, [hasMessages]);


    /*
     * IMPORTANT:
     *
     * Keep your original chat-change behavior.
     *
     * When currentChat changes:
     * - clear the old pending messages
     * - reset pagination
     * - let usePaginationFetch fetch the new conversation
     */
    useEffect(() => {
        if (!currentChat) {
            setHasMessages(false);
            setConversation([]);
            setNewMessage('');
            setNewReply('');
            return;
        }

        setHasMessages(true);

        setConversation([]);
        setNewMessage('');
        setNewReply('');

        resetConversation();

    }, [currentChat]);


    /*
     * When a new message is received from PromptBox,
     * add it to the UI without mutating conversation.
     */
    useEffect(() => {
        if (!newMessage && !newMessage?.trim()) return;

        const message: ConversationMessage = {
            role: "user",
            content: newMessage,
            attachment_type: null,
            attachment_url: null,
            created_at: new Date().toISOString(),
            id: `pending-user-${Date.now()}`,
            newMessage: false,
        };

        setConversation((prev) => {
            return [message, ...prev];
        });
        setNewMessage('');
        setHasMessages(true);
    }, [newMessage]);


    useEffect(() => {
        if (!newReply && !newReply?.trim()) return;

        const reply: ConversationMessage = {
            role: "model",
            content: newReply,
            attachment_type: null,
            attachment_url: null,
            created_at: new Date().toISOString(),
            id: `pending-reply-${Date.now()}`,
            newMessage: true,
        };

        setConversation((prev) => {

            return [reply, ...prev];
        });
        setNewReply('');
        setHasMessages(true);
    }, [newReply]);


    /*
     * If the backend conversation now contains a message
     * that was previously pending, remove it from the
     * pending list so it isn't displayed twice.
     */
    // useEffect(() => {

    //     if (pendingMessages.length === 0) {
    //         return;
    //     }

    //     setPendingMessages((pending) =>
    //         pending.filter((pendingMessage) => {

    //             const alreadyInConversation =
    //                 conversation.some(
    //                     (serverMessage) =>
    //                         serverMessage.role ===
    //                         pendingMessage.role &&
    //                         serverMessage.content ===
    //                         pendingMessage.content
    //                 );

    //             return !alreadyInConversation;
    //         })
    //     );

    // }, [conversation]);

    useEffect(() => {
        hasInitiallyScrolled.current = false;

        if (!currentChat) {
            setHasMessages(false);
            setConversation([]);
            setNewMessage('');
            setNewReply('');
            return;
        }

        setHasMessages(true);

        setConversation([]);
        setNewMessage('');
        setNewReply('');

        resetConversation();

    }, [currentChat]);

    useEffect(() => {
        if (
            !hasMessages ||
            !scrollContainerRef.current ||
            hasInitiallyScrolled.current ||
            conversation.length === 0
        ) return;

        requestAnimationFrame(() => {
            const container = scrollContainerRef.current;

            if (!container) return;

            container.scrollTop = container.scrollHeight;

            hasInitiallyScrolled.current = true;
        });
    }, [conversation.length, hasMessages]);


    return (
        <main className="flex-1 flex flex-col relative h-full">


            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto"
            >
                {(!hasMessages) ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="relative">

                            <AnimatePresence>
                                {showGlow && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: [0, 0.8, 0.45],
                                            scale: [0.8, 1.05, 1],
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 1.15,
                                        }}
                                        transition={{
                                            duration: 1.4,
                                            ease: "easeOut",
                                        }}
                                        className="
                                absolute
                                inset-[-35px]
                                rounded-full
                                blur-3xl
                                bg-blue-400/20
                                dark:bg-violet-500/20
                                pointer-events-none
                            "
                                    />
                                )}
                            </AnimatePresence>

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 8,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: "easeOut",
                                }}
                                className="
                        relative
                        text-3xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                        dark:text-gray-100
                    "
                            >
                                {typedTitle}

                                {!hasMessages && (
                                    <motion.span
                                        animate={{
                                            opacity: [1, 0, 1],
                                        }}
                                        transition={{
                                            duration: 0.9,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="
                                inline-block
                                ml-1
                                w-[2px]
                                h-7
                                align-[-3px]
                                bg-gray-800
                                dark:bg-gray-200
                            "
                                    />
                                )}
                            </motion.h1>

                        </div>
                    </div>
                ) : (
                    <div className="max-w-[850px] mx-auto w-full py-8 px-4 flex flex-col-reverse">
                        {chatError && chatError?.length > 0 && <ChatError message={chatError} />}
                        {conversation.map((msg) =>
                            msg.role === "user" ? (
                                <Prompt
                                    key={msg.id}
                                    message={msg.content}
                                />
                            ) : (
                                <Reply
                                    key={msg.id}
                                    message={msg.content}
                                    newMessage={msg.newMessage}
                                />
                            )
                        )}

                        {(!limitReached && currentChat && currentChat.length > 0) && (
                            <div
                                ref={loaderRef}
                                className="flex justify-center py-4 min-h-12"
                            >
                                {conLoading && (
                                    <CommonLoader size={8} />
                                )}
                            </div>
                        )}

                    </div>
                )}
            </div>

            <div
                className={`
            ${hasMessages ? "mb-0" : "mb-50"}
            flex
            justify-center
            px-4
        `}
            >
                <div className="w-full">
                    <PromptBox
                        setNewReply={setNewReply}
                        setChatError={setChatError}
                        setNewMessage={setNewMessage}
                        chatId={currentChat || ""}
                        hasMessages={hasMessages}
                        setHasMessages={setHasMessages}
                    />
                </div>
            </div>

        </main>
    );
};