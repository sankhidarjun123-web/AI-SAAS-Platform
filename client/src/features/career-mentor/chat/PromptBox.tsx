import React, { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from "react-router-dom";
import { createChat, sendPrompt as apiSendPRrompt } from '../../../api/chat.api';
import { Mic, Plus, ArrowUp } from "lucide-react";
import axios from 'axios';


interface PromptBoxProps {
  setNewReply: Dispatch<SetStateAction<string>>;
  setChatError: Dispatch<SetStateAction<string | null>>;
  setNewMessage: Dispatch<SetStateAction<string>>;
  chatId: string;
  hasMessages: boolean;
  setHasMessages: Dispatch<SetStateAction<boolean>>;
}
export const PromptBox: React.FC<PromptBoxProps> = ({ setNewReply, setChatError, setNewMessage, chatId, hasMessages, setHasMessages }) => {

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>("");

  const sendPrompt = async () => {
    if (prompt.length === 0) return;
    try {
      let conv = null;
      const aiPrompt = prompt;
      setPrompt("");
      setNewMessage(aiPrompt);
      // setHasMessages(true);
      if (chatId.length === 0) {
        let chatDetails = null;
        try {
          chatDetails = await createChat(aiPrompt);
        } catch (err: unknown) {
          if (axios.isAxiosError(err) && err.response?.status === 429) {
            setChatError("Sorry we are experiencing trouble responding, please try again later");
          }
          console.error(err);
          return;
        }
        if (chatDetails.persisted) {
          conv = chatDetails.chatId;
          navigate(`/career-mentor/${chatDetails.chatId}`, {
            state: {
              pendingMessage: aiPrompt
            }
          });
          const chatData = await apiSendPRrompt(conv ?? chatId, aiPrompt);
          setNewReply(chatData?.aiResponse || null);
          return;
        }
        // setNewMessage(aiPrompt);
        // setHasMessages(true);
      }
      const chatData = await apiSendPRrompt(conv ?? chatId, aiPrompt);
      setNewReply(chatData?.aiResponse || null);
    } catch (err: any) {

      console.error(err);

      if (err?.response?.status === 429) {

        setChatError(
          "The AI request limit has been reached. Please try again later."
        );

      } else if (err?.response?.status === 403) {

        setNewReply(err?.response?.data?.aiResponse || "");
      } else {

        setChatError(
          "Something went wrong while generating the response. Please try again."
        );
      }
    }

  }

  return (
    <div className="p-4 bg-[#F5F2EA] dark:bg-[#0F172A]">
      <div className="max-w-[850px] mx-auto border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 p-2 shadow-sm">
        <textarea
          value={prompt}
          autoFocus
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendPrompt();
            }
          }}
          className="w-full bg-transparent p-2 outline-none text-black dark:text-white placeholder-gray-400 resize-none"
          placeholder="Ask Career Mentor anything..."
          rows={1}
        />
        <div className="flex justify-between items-center px-2 pt-2 border-t border-gray-100 dark:border-slate-700">
          <div className="flex gap-2 text-gray-400">
            {/* Placeholder for Upload/Voice icons */}
            <span className="text-xs"><Plus /></span>
            <span className="text-xs"><Mic /></span>
          </div>
          <button
            onClick={sendPrompt}
            className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-lg text-sm font-medium">
            <ArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};