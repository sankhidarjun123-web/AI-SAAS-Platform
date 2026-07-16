import React from 'react';

export const ChatHeader: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-slate-700 bg-[#F5F2EA]/80 dark:bg-[#0F172A]/80 backdrop-blur-sm">
      <div className="font-semibold text-gray-800 dark:text-white">
        Career Mentor
      </div>
      
      <div className="flex items-center gap-2">
        <button className="text-sm px-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">
          Clear Chat
        </button>
        <button className="text-sm px-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">
          More
        </button>
      </div>
    </header>
  );
};