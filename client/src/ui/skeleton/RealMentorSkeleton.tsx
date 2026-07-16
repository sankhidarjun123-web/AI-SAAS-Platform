import React from 'react';

const RealMentorSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdfaf2] dark:bg-zinc-900 animate-pulse flex flex-col justify-between select-none transition-colors duration-200">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="w-full h-16 px-6 md:px-12 flex items-center justify-between border-b border-stone-200/60 dark:border-zinc-800 bg-[#fdfaf2] dark:bg-[#0b0f19]">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-32 bg-stone-300 dark:bg-zinc-700 rounded-md" />
          <div className="h-8 w-6 bg-amber-400/40 dark:bg-amber-500/30 rounded-sm" />
        </div>
        
        {/* Right Nav Actions */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-24 bg-stone-200 dark:bg-zinc-800 rounded-md hidden sm:block" />
          <div className="h-9 w-36 bg-stone-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </header>

      {/* 2. HERO CONTENT SECTION */}
      <main className="flex-1 relative w-full max-w-[1440px] mx-auto flex flex-col justify-center items-center px-4 text-center z-10">
        
        {/* Top Badge Placeholder */}
        <div className="h-6 w-72 bg-stone-300/50 dark:bg-zinc-700/40 rounded-full mb-6" />

        {/* Main Heading Placeholder */}
        <div className="h-14 w-3/4 max-w-xl bg-stone-300 dark:bg-zinc-700 rounded-xl mb-4" />
        
        {/* Subtext Description Placeholders */}
        <div className="w-11/12 max-w-2xl space-y-3 mb-10 flex flex-col items-center">
          <div className="h-4 w-full bg-stone-300/70 dark:bg-zinc-700/60 rounded-md" />
          <div className="h-4 w-5/6 bg-stone-300/70 dark:bg-zinc-700/60 rounded-md" />
        </div>

        {/* CTA Buttons Placeholders */}
        <div className="flex items-center gap-4 mb-12">
          {/* Primary Button */}
          <div className="h-12 w-36 bg-amber-400/30 dark:bg-amber-500/20 rounded-lg" />
          {/* Secondary Button */}
          <div className="h-12 w-36 bg-stone-300/40 dark:bg-zinc-800/50 border border-stone-300/60 dark:border-zinc-700/40 rounded-lg" />
        </div>

        {/* Image Slider Dots Carousel Indicator */}
        <div className="flex gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-2 rounded-full ${i === 2 ? 'bg-stone-400 dark:bg-zinc-500' : 'bg-stone-300/60 dark:bg-zinc-700/40'}`} 
            />
          ))}
        </div>

      </main>

      {/* 3. BASE BACKGROUND MASK */}
      <div className="w-full h-1/3 bg-stone-200/20 dark:bg-black/10 absolute bottom-0 left-0 z-0 pointer-events-none" />
      
    </div>
  );
};

export default RealMentorSkeleton;