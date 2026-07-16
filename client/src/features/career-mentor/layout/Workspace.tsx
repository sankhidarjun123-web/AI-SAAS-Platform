import React, { useEffect, useState, useRef, type Dispatch, type SetStateAction } from 'react';
import { ChatHeader } from '../chat/ChatHeader';
import { PromptBox } from '../chat/PromptBox';
import { SuggestionCards } from '../chat/SuggestionCards';
import { Prompt } from '../../../components/Career-Mentor/Prompt';
import { Reply } from '../../../components/Career-Mentor/Reply';
import { useAuth } from '@clerk/clerk-react';
import { getConversation } from '../../../api/chat.api';
import { usePaginationFetch } from '../../../hooks/usePaginationFetch';
import CommonLoader from '../../../ui/loader/CommonLoader';

interface WorkspaceProps {
  currentChat: string,
}

interface ConversationMessage {
  role: string;
  content: string;
  attachment_type: string | null;
  attachment_url: string | null;
  created_at: string;
  id: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({ currentChat }) => {

  const { getToken } = useAuth();
  const [hasMessages, setHasMessages] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { data: conversation, resetData: resetConverstation, loading: conLoading, limitReached } = usePaginationFetch<any, any>({ limit: 5, skip: 0, sort: "asc", divRef: loaderRef }, getConversation, "conversationMessages", (skip, limit) => [currentChat, getToken, skip, limit]);


  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (currentChat.length > 0) {
        setHasMessages(true);
      } else {
        setHasMessages(false);
      }
      return;
    }

    if (currentChat.length > 0) {
      setHasMessages(true);
      resetConverstation();
    } else {
      setHasMessages(false);
    }
  }, [currentChat]);


  return (
    <main className="flex-1 flex flex-col relative h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-medium mb-8 text-black dark:text-white">What would you like to work on today?</h1>
            <SuggestionCards />
          </div>
        ) : (
          <div className="max-w-[850px] mx-auto w-full py-8 px-4">
            {conversation.map((msg: ConversationMessage, _) => (
              msg.role === "user" ? (
                <Prompt
                  key={msg.id}
                  message={msg.content}
                />
              ) : (
                <Reply
                  key={msg.id}
                  message={msg.content}
                />
              )
            ))}

            <div ref={loaderRef} className="flex items-center justify-center py-4">
              {conLoading ? (
                <CommonLoader size={8} />
              ) : limitReached ? (
                <p className="text-xs text-gray-400">No more conversations</p>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <PromptBox chatId={currentChat} hasMessages={hasMessages} setHasMessages={setHasMessages} />
    </main>
  );
};