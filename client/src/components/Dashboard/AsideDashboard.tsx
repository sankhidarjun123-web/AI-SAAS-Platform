import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  FilePenLine,
  Mic,
  Bot,
  Target,
  History
} from "lucide-react";

interface AsideDashboardProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavOption = {
  name: string,
  navPath: string,
  icon: React.ElementType;
}

const AsideDashboard = ({
  expanded,
  setExpanded,
}: AsideDashboardProps) => {

  const mode = useSelector((state: RootState) => state.theme.mode);

  const navOptions: NavOption[] = [
    {
      name: "Overview",
      navPath: "overview",
      icon: LayoutDashboard,
    },
    {
      name: "Resume Analyzer",
      navPath: "resume-analyzer",
      icon: FileSearch,
    },
    {
      name: "Resume Builder",
      navPath: "resume-builder",
      icon: FilePenLine,
    },
    {
      name: "Mock Interview",
      navPath: "mock-interview",
      icon: Mic,
    },
    {
      name: "Career Mentor",
      navPath: "/career-mentor",
      icon: Bot,
    },
    {
      name: "Job Match",
      navPath: "job-match",
      icon: Target,
    },
    {
      name: "History",
      navPath: "history",
      icon: History,
    },
  ];

  return (
    <motion.aside
      animate={{
        width: expanded ? "20%" : "5%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="fixed left-0 gap-5 top-20 h-full bg-[#EEE9DF] dark:bg-slate-950 p-5 flex flex-col overflow-hidden"
    >
      {createPortal(<motion.button
        animate={{ left: expanded ? "19%" : "4%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`fixed w-12 bg-[#F5F2EA] shadow-lg dark:bg-slate-900 flex items-center justify-center h-12 top-50 cursor-pointer rounded-full border-3 border-solid border-black dark:border-white`} onClick={() => setExpanded((prev) => !prev)}>
        <Menu size={16} color={mode === "light" ? "black" : "white"} />
      </motion.button>, document.body)}

      {navOptions.map((opt) => {
        const Icon = opt.icon;

        return (
          <NavLink
            key={opt.navPath}
            to={opt.navPath}
            className={({ isActive }) =>
              `group flex items-center rounded-xl transition-all duration-200
          ${expanded
                ? "gap-3 px-4 py-3"
                : "justify-center w-12 h-12 mx-auto"
              }
          ${isActive
                ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
              }`
            }
          >
            <Icon size={20} />

            {expanded && (
              <span className="font-medium whitespace-nowrap">
                {opt.name}
              </span>
            )}
          </NavLink>
        );
      })}
    </motion.aside>
  );
};

export default AsideDashboard;