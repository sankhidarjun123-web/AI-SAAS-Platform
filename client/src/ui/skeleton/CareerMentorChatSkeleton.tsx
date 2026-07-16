import React from 'react';

const CareerMentorChatSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdfaf2] dark:bg-zinc-900 animate-pulse flex flex-col select-none font-sans transition-colors duration-200">
      
      {/* 1. TOP NAVBAR */}
      <header className="w-full h-16 px-6 flex items-center justify-between border-b border-stone-200/60 dark:border-zinc-800 bg-[#fdfaf2] dark:bg-[#0b0f19] shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-7 w-32 bg-stone-300 dark:bg-zinc-700 rounded-md" />
          <div className="h-8 w-6 bg-amber-400/40 dark:bg-amber-500/30 rounded-sm" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-9 w-24 bg-stone-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-9 w-36 bg-stone-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </header>

      {/* 2. MAIN SPLIT CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-[#121620] border-r border-stone-200/80 dark:border-zinc-800 hidden md:flex flex-col p-4 gap-6 shrink-0">
          {/* Header Title */}
          <div className="h-6 w-32 bg-stone-300 dark:bg-zinc-700 rounded-md mt-2" />
          
          {/* "+ New Chat" Button */}
          <div className="h-10 w-full bg-stone-900/20 dark:bg-zinc-800 rounded-lg" />
          
          {/* Sidebar Section & Items */}
          <div className="space-y-4 mt-2">
            <div className="h-3 w-12 bg-stone-300/60 dark:bg-zinc-700/40 rounded-sm" />
            <div className="h-5 w-40 bg-stone-200 dark:bg-zinc-800 rounded-md" />
          </div>
        </aside>

        {/* RIGHT CHAT CONTAINER */}
        <main className="flex-1 flex flex-col bg-[#fcf9f1] dark:bg-zinc-900 p-6 relative overflow-y-auto justify-between">
          
          {/* Chat Content Sub-Header */}
          <div className="flex justify-between items-center w-full mb-8">
            <div className="h-6 w-32 bg-stone-300/80 dark:bg-zinc-700/80 rounded-md" />
            <div className="flex gap-4">
              <div className="h-4 w-16 bg-stone-300/60 dark:bg-zinc-700/40 rounded-md" />
              <div className="h-4 w-12 bg-stone-300/60 dark:bg-zinc-700/40 rounded-md" />
            </div>
          </div>

          {/* CENTRAL LANDING PROMPT */}
          <div className="flex-1 flex flex-col justify-center items-center max-w-4xl w-full mx-auto mb-20">
            {/* Heading Prompt */}
            <div className="h-9 w-80 sm:w-[420px] bg-stone-300 dark:bg-zinc-700 rounded-lg mb-8" />

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl px-4">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="p-5 bg-white dark:bg-[#181e2a] border border-stone-200/60 dark:border-zinc-800/80 rounded-xl flex flex-col gap-2 shadow-sm"
                >
                  {/* Card Title */}
                  <div className="h-5 w-32 bg-stone-300 dark:bg-zinc-700 rounded-md" />
                  {/* Card Subtext */}
                  <div className="h-3.5 w-48 bg-stone-200 dark:bg-zinc-800 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. BOTTOM FLOATING CHAT INPUT */}
          <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#181e2a] border border-stone-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-col gap-4">
            {/* Top Row: Input Placeholder Line */}
            <div className="h-5 w-48 bg-stone-200 dark:bg-zinc-800 rounded-md mt-1" />
            
            {/* Bottom Row: Utilities + Action Button */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-3">
                <div className="h-4 w-14 bg-stone-200 dark:bg-zinc-800 rounded-md" />
                <div className="h-4 w-8 bg-stone-200 dark:bg-zinc-800 rounded-md" />
              </div>
              {/* Send Button */}
              <div className="h-9 w-16 bg-stone-900/20 dark:bg-zinc-700/60 rounded-md" />
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};

export default CareerMentorChatSkeleton;