import React from 'react';

const suggestions = [
  { title: "Resume Review", desc: "Get feedback on your CV" },
  { title: "Interview Practice", desc: "Simulate a mock interview" },
  { title: "Coding Help", desc: "Solve technical challenges" },
  { title: "Skill Gap Analysis", desc: "Identify areas to grow" },
];

export const SuggestionCards: React.FC = () => (
  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
    {suggestions.map((s) => (
      <button key={s.title} className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
        <div className="font-medium text-black dark:text-white">{s.title}</div>
        <div className="text-sm text-gray-500">{s.desc}</div>
      </button>
    ))}
  </div>
);