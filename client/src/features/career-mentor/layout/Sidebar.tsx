import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { PanelLeft, Search, SquarePen, MessageCircle, Circle } from "lucide-react";
import { getConversations } from "../../../api/chat.api";
import { usePaginationFetch } from "../../../hooks/usePaginationFetch";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import HistoryItem from '../../../components/Career-Mentor/HistoryItem';
import CommonLoader from '../../../ui/loader/CommonLoader';
import { motion } from "framer-motion";

interface SidebarProps {
  currentChat: string | undefined,
}

type Conversation = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ currentChat }) => {

  const { getToken } = useAuth();

  const [expanded, setExpanded] = useState<boolean>(() => {
    const saved = localStorage.getItem("careerMentorSidebar");

    return saved !== null ? JSON.parse(saved) : true;
  });
  const navigate = useNavigate();

  const loaderRef = useRef(null);

  const { data: conversations, setData: setConversations, loading: conLoading, limitReached } = usePaginationFetch<Conversation, any>({ limit: 10, skip: 0, sort: "asc", divRef: loaderRef }, getConversations, "conversations", (skip, limit) => [getToken, skip, limit]);

  useEffect(() => {
    localStorage.setItem(
      "careerMentorSidebar",
      JSON.stringify(expanded)
    );
  }, [expanded]);

  return (
    <motion.aside
      onClick={() => {
        if (expanded) return;
        setExpanded(true);
      }}
      initial={false}
      animate={{
        width: expanded ? 256 : 40,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`${expanded ? "w-64" : "w-10"} border-r border-gray-200 dark:border-slate-700 flex flex-col p-4 bg-white dark:bg-[#0F172A]`}>
      <div className={`mb-6 flex items-center ${!expanded && "flex-col-reverse gap-6"} justify-between`}>
        <h2 className={`${!expanded && "hidden"} font-semibold text-lg text-black dark:text-white`}>Career Mentor</h2>

        <button onClick={(e) => e.stopPropagation()} type="button" className={`${expanded && "hidden"} cursor-pointer`}>
          <MessageCircle />
        </button>

        <Link onClick={(e) => e.stopPropagation()} to="/career-mentor" type="button" className={`${expanded && "hidden"} cursor-pointer`}>
          <SquarePen />
        </Link>

        <button onClick={(e) => e.stopPropagation()} type="button" className="cursor-pointer">
          <Search />
        </button>

        <button onClick={(e) => { e.stopPropagation(); setExpanded(prev => !prev) }} type="button" className="cursor-ew-resize">
          <PanelLeft />
        </button>
      </div>

      <Link
        to="/career-mentor"
        className={`${expanded ? "flex gap-2 items-center" : "hidden"} cursor-pointer w-full py-2 px-4 mb-6 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition-opacity`}>
        <SquarePen />
        New Chat
      </Link>

      <div className={`${!expanded && "hidden"} flex-1 overflow-y-auto space-y-6`}>
        {/* History sections would map through data here */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Chats</h3>

          {
            conversations.map((conv, _) => (
              <Link to={`/career-mentor/${conv?.id}`} key={conv?.id}>
                <HistoryItem chatId={conv?.id} name={conv?.name || "New Chat"} currentChat={currentChat || ''} />
              </Link>
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
    </motion.aside>
  );
};