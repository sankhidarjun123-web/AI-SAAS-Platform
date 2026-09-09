import React from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileText,
  Flame,
  GraduationCap,
  MessageSquare,
  Mic2,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import { useAccount } from "../../context/AuthContext";

interface DashboardHomeProps {
  userName?: string;
}

const progressItems = [
  { label: "Resume", value: 85 },
  { label: "Technical Skills", value: 68 },
  { label: "DSA", value: 61 },
  { label: "Projects", value: 78 },
  { label: "Interview", value: 74 },
];

const focusItems = [
  {
    title: "Solve 2 DSA problems",
    subtitle: "Keep your problem-solving streak alive",
    done: true,
  },
  {
    title: "Improve your resume",
    subtitle: "Add measurable impact to your projects",
    done: false,
  },
  {
    title: "Practice an interview",
    subtitle: "Prepare for backend developer roles",
    done: false,
  },
];

const recentActivity = [
  {
    icon: FileText,
    title: "Resume analyzed",
    description: "ATS score: 84%",
    time: "20 min ago",
  },
  {
    icon: MessageSquare,
    title: "Interview preparation",
    description: "Java Backend Interview",
    time: "Yesterday",
  },
  {
    icon: GraduationCap,
    title: "Learning roadmap updated",
    description: "Backend Development",
    time: "2 days ago",
  },
];

const tools = [
  {
    icon: FileText,
    title: "Resume Analyzer",
    description: "Improve your resume and ATS score.",
  },
  {
    icon: Target,
    title: "Skill Gap",
    description: "Discover what skills you need next.",
  },
  {
    icon: Mic2,
    title: "Mock Interview",
    description: "Practice realistic AI interviews.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Matcher",
    description: "Find roles that match your profile.",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmap",
    description: "Build a path toward your target role.",
  },
  {
    icon: BarChart3,
    title: "Career Progress",
    description: "Track your growth over time.",
  },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  userName = "there",
}) => {


  const { accountData } = useAccount();
  return (
    <main className="min-h-full text-slate-900 dark:text-white">
      <div className="mx-auto w-full max-w-[1250px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <header className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              Your career command center
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome Back, {accountData?.name || accountData?.email.split('@')[0]}{" "}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Let&apos;s make some progress toward your career goals.
            </p>
          </div>

          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 sm:flex dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
            aria-label="Profile"
          >
            {accountData.profile ? <img className="w-full h-full rounded-full" src={accountData?.profile} alt="user-img" /> : <UserRound size={19} />}
          </button>
        </header>

        {/* Small footer stat */}
        <div className="flex items-center justify-center gap-2 pb-4 text-xs text-slate-400">
          <Trophy size={13} />
          Keep showing up. Your future self will thank you.
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;