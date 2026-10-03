import React from "react";
import { motion } from "framer-motion";
import { Menu, LayoutDashboard, FileSearch, Mic, Bot, FilePenLine } from "lucide-react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { NavLink } from "react-router-dom";

interface AsideDashboardProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export type NavOption = {
  name: string;
  navPath: string;
  icon: React.ElementType;
};

export const navOptions: NavOption[] = [
  {
    name: "Overview",
    navPath: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Resume Analyzer",
    navPath: "/dashboard/resume-analyzer",
    icon: FileSearch,
  },
  {
    name: "Mock Interview",
    navPath: "/dashboard/mock-interview",
    icon: Mic,
  },
  {
    name: "Career Mentor",
    navPath: "/career-mentor",
    icon: Bot,
  },
  {
    name: "Resume Builder",
    navPath: "/dashboard/resume-builder",
    icon: FilePenLine,
  }
];

const AsideDashboard = ({
  expanded,
  setExpanded,
}: AsideDashboardProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <motion.aside
      animate={{
        width: expanded ? "20%" : "5%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="fixed left-0 top-16 h-full bg-[#EEE9DF] dark:bg-slate-950 p-4 flex flex-col overflow-hidden"
    >
      {/* Sidebar Toggle */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={`
          flex items-center rounded-xl
          h-12 mb-4
          transition-all duration-200
          hover:bg-black/5 dark:hover:bg-white/10
          cursor-pointer
          ${expanded
            ? "gap-3 px-4"
            : "justify-center w-12 mx-auto"
          }
        `}
      >
        <Menu
          size={22}
          color={mode === "light" ? "black" : "white"}
        />

        {expanded && (
          <span className="font-medium whitespace-nowrap text-gray-800 dark:text-gray-200">
            Menu
          </span>
        )}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navOptions.map((opt) => {
          const Icon = opt.icon;

          return (
            <NavLink
              key={opt.navPath}
              to={opt.navPath}
              className={({ isActive }) =>
                `
                group flex items-center rounded-xl
                transition-all duration-200

                ${expanded
                  ? "gap-3 px-4 py-3"
                  : "justify-center w-12 h-12 mx-auto"
                }

                ${isActive
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                }
                `
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
      </nav>
    </motion.aside>
  );
};

export default AsideDashboard;