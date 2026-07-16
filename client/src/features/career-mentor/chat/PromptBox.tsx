import React,{ useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { sendPrompt as apiSendPRrompt } from '../../../api/chat.api';
import { useAuth } from '@clerk/clerk-react';

interface PromptBoxProps {
  chatId: string;
  hasMessages: boolean;
  setHasMessages: Dispatch<SetStateAction<boolean>>;
}
export const PromptBox: React.FC<PromptBoxProps> = ({ chatId, hasMessages, setHasMessages }) => {


  const [prompt, setPrompt] = useState<string>("");
  const { getToken } = useAuth();
  
  const sendPrompt = async () => {
    if(prompt.length === 0) return;

    let conv = null;
    if(chatId.length > 0) conv = chatId;
    try {
      const aiPrompt = prompt;
      setPrompt("");
      setHasMessages(true);
      const chatData = await apiSendPRrompt(conv, aiPrompt, getToken);
      console.log(chatData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    console.log(hasMessages, setHasMessages);
  }, []);

  return (
    <div className="p-4 bg-[#F5F2EA] dark:bg-[#0F172A]">
      <div className="max-w-[850px] mx-auto border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 p-2 shadow-sm">
        <textarea
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-transparent p-2 outline-none text-black dark:text-white placeholder-gray-400 resize-none"
          placeholder="Ask Career Mentor anything..."
          rows={1}
        />
        <div className="flex justify-between items-center px-2 pt-2 border-t border-gray-100 dark:border-slate-700">
          <div className="flex gap-2 text-gray-400">
            {/* Placeholder for Upload/Voice icons */}
            <span className="text-xs">Paperclip</span>
            <span className="text-xs">Mic</span>
          </div>
          <button 
          onClick={sendPrompt}
          className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-lg text-sm font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};