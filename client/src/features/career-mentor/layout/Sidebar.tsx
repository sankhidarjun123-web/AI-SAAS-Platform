import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { getConversations } from "../../../api/chat.api";
import { usePaginationFetch } from "../../../hooks/usePaginationFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import HistoryItem from '../../../components/Career-Mentor/HistoryItem';
import CommonLoader from '../../../ui/loader/CommonLoader';

interface SidebarProps {
  currentChat: string,
  setCurrentChat: Dispatch<SetStateAction<string>>;
}

type Conversation = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ currentChat, setCurrentChat }) => {

  const { getToken } = useAuth();


  const navigate = useNavigate();

  const loaderRef = useRef(null);

  const { data: conversations, setData: setConversations, loading: conLoading, limitReached } = usePaginationFetch<Conversation, any>({ limit: 10, skip: 0, sort: "asc", divRef: loaderRef }, getConversations, "conversations", (skip, limit) => [getToken, skip, limit]);

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-slate-700 flex flex-col p-4 bg-white dark:bg-[#0F172A]">
      <div className="mb-6">
        <h2 className="font-semibold text-lg text-black dark:text-white">Career Mentor</h2>
      </div>

      <button
        onClick={() => navigate("/career-mentor")}
        className="cursor-pointer w-full py-2 px-4 mb-6 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* History sections would map through data here */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Chats</h3>

          {
            conversations.map((conv, _) => (
              <div key={conv?.id}>
                <HistoryItem chatId={conv?.id} name={conv?.name || "New Chat"} setCurrentChat={setCurrentChat} currentChat={currentChat} />
              </div>
            ))
          }

          <div ref={loaderRef} className="flex items-center justify-center py-4">
            {conLoading ? (
              <CommonLoader size={8} />
            ) : limitReached ? (
              <p className="text-xs text-gray-400">No more conversations</p>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
};