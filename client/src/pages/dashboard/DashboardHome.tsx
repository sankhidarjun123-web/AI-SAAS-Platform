import React, { useEffect, useState } from "react";
import {
  FileText,
  Users,
  GraduationCap,
  BarChart3,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useAccount } from "../../context/AuthContext";
import { levelA } from "../../assets/images";
import { useDash } from "../../context/DashboardContext";
import InterviewProgress from "../../components/Dashboard-home/InterviewProgress";
import InterviewPie from "../../components/Dashboard-home/InterviewPie";
import CommonLoader from "../../ui/loader/CommonLoader";

interface DashboardHomeProps {
  userName?: string;
}

/* =========================
   Animated Number
========================= */

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1200,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

/* =========================
   Dashboard
========================= */

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  userName = "there",
}) => {
  const { accountData } = useAccount();
  const { details: dashboardDetails, dashLoading } = useDash();

  const displayName =
    accountData?.name ||
    accountData?.email?.split("@")[0] ||
    userName;

  return (

    <main className="min-h-full text-slate-900 dark:text-white">
      {dashLoading ? <div className="w-full h-full flex justify-center items-center"><CommonLoader /></div> :
      <div className="mx-auto w-full max-w-[1250px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            HERO
        ====================================================== */}

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            relative
            mb-8
            min-h-[280px]
            overflow-hidden
            rounded-[28px]
          "
        >
          {/* Background image */}

          <motion.img
            src={levelA}
            alt=""
            initial={{
              scale: 1.08,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Gradient over image */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r

              from-[#EEE9DF] 
              via-[#EEE9DF]
              to-transparent

              dark:from-slate-950
              dark:via-slate-950/75
              dark:to-transparent
            "
          />

          {/* Subtle bottom blend */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-28
            
            "
          />

          {/* Hero content */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              relative
              z-10
              flex
              min-h-[280px]
              max-w-[650px]
              flex-col
              justify-center
              px-6
              py-10
              sm:px-10
              lg:px-12
            "
          >
            {/* Small heading */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="
                mb-3
                flex
                items-center
                gap-2
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-600
                dark:text-slate-300
              "
            >
              <Sparkles
                size={14}
                className="text-amber-500"
              />

              Your Career Command Center
            </motion.div>

            {/* Main heading */}

            <motion.h1
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.65,
                ease: "easeOut",
              }}
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-950
                sm:text-4xl
                lg:text-[42px]
                dark:text-white
              "
            >
              Welcome back, {displayName} 👋
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                x: -35,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-slate-600
                sm:text-base
                dark:text-slate-300
              "
            >
              Let&apos;s make some progress toward your
              career goals.
            </motion.p>

            {/* Quote */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="
                mt-5
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              <span className="text-lg">
                ✨
              </span>

              <span>
                Small steps today, big opportunities tomorrow.
              </span>
            </motion.div>
          </motion.div>
        </motion.header>

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {/* =================================================
              RESUMES
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-emerald-100
              bg-gradient-to-br
              from-emerald-50
              to-white
              p-5
              shadow-sm
              transition-shadow
              duration-300
              hover:shadow-lg
              dark:border-emerald-400/10
              dark:from-emerald-400/[0.08]
              dark:to-slate-900
            "
          >
            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-emerald-300/20
                blur-2xl
              "
            />

            <div className="relative">

              <div className="mb-6 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                    dark:bg-emerald-400/10
                    dark:text-emerald-400
                  "
                >
                  <FileText size={22} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-slate-300
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    dark:text-slate-600
                  "
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Resumes Analyzed
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
              >
                <AnimatedNumber value={dashboardDetails?.resumeAnalyzed} />
              </h3>

              <p
                className="
                  mt-3
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Resume analyses completed
              </p>
            </div>
          </motion.div>

          {/* =================================================
              INTERVIEWS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-violet-100
              bg-gradient-to-br
              from-violet-50
              to-white
              p-5
              shadow-sm
              transition-shadow
              duration-300
              hover:shadow-lg
              dark:border-violet-400/10
              dark:from-violet-400/[0.08]
              dark:to-slate-900
            "
          >
            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-violet-300/20
                blur-2xl
              "
            />

            <div className="relative">

              <div className="mb-6 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-100
                    text-violet-600
                    dark:bg-violet-400/10
                    dark:text-violet-400
                  "
                >
                  <Users size={22} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-slate-300
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    dark:text-slate-600
                  "
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Mock Interviews
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
              >
                <AnimatedNumber value={dashboardDetails?.interviewTaken} />
              </h3>

              <p
                className="
                  mt-3
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Interview sessions completed
              </p>
            </div>
          </motion.div>

          {/* =================================================
              BATCHES
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-amber-100
              bg-gradient-to-br
              from-amber-50
              to-white
              p-5
              shadow-sm
              transition-shadow
              duration-300
              hover:shadow-lg
              dark:border-amber-400/10
              dark:from-amber-400/[0.08]
              dark:to-slate-900
            "
          >
            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-amber-300/20
                blur-2xl
              "
            />

            <div className="relative">

              <div className="mb-6 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-100
                    text-amber-600
                    dark:bg-amber-400/10
                    dark:text-amber-400
                  "
                >
                  <GraduationCap size={22} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-slate-300
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    dark:text-slate-600
                  "
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Batches Collected
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
              >
                <AnimatedNumber value={dashboardDetails?.batches.length} />

                <span
                  className="
                    text-lg
                    font-medium
                    text-slate-400
                  "
                >
                  /6
                </span>
              </h3>

              <div className="mt-4">

                {/* <div className="mb-2 flex items-center justify-between">

                  <span
                    className="
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Batch progress
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-amber-600
                      dark:text-amber-400
                    "
                  >
                  </span>

                </div> */}
              </div>
            </div>
          </motion.div>

          {/* =================================================
              OVERALL PROGRESS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-blue-100
              bg-gradient-to-br
              from-blue-50
              to-white
              p-5
              shadow-sm
              transition-shadow
              duration-300
              hover:shadow-lg
              dark:border-blue-400/10
              dark:from-blue-400/[0.08]
              dark:to-slate-900
            "
          >
            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-blue-300/20
                blur-2xl
              "
            />

            <div className="relative">

              <div className="mb-6 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-400/10
                    dark:text-blue-400
                  "
                >
                  <BarChart3 size={22} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-slate-300
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    dark:text-slate-600
                  "
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Overall Progress
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
              >
                <AnimatedNumber value={dashboardDetails.progress/100*50} />

                <span
                  className="
                    text-lg
                    font-medium
                    text-slate-400
                  "
                >
                  /50
                </span>
              </h3>

              <div className="mt-4">

                <div className="mb-2 flex items-center justify-between">

                  <span
                    className="
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Career journey
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    {dashboardDetails.progress} %
                  </span>

                </div>

                <div
                  className="
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-blue-100
                    dark:bg-white/10
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${dashboardDetails?.progress}%`,
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-indigo-500
                    "
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/*Progress*/}
        <div className="w-full mt-10 grid gap-10 grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[3fr_1fr]">
          <InterviewProgress />
          <InterviewPie />
        </div>
        {/* =====================================================
    EXPLORE FEATURES
====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mt-10"
        >
          {/* Section Header */}

          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                Everything you need
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Explore Features
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Tools designed to help you prepare, improve, and grow.
              </p>
            </div>
          </div>

          {/* Feature Cards */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* AI Resume Analysis */}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="
        group relative overflow-hidden
        rounded-2xl
        border border-emerald-100
        bg-white
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-lg
        dark:border-emerald-400/10
        dark:bg-slate-900
      "
            >
              <div
                className="
          mb-5 flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-emerald-100
          text-emerald-600
          dark:bg-emerald-400/10
          dark:text-emerald-400
        "
              >
                <FileText size={23} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                AI Resume Analysis
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                Analyze your resume and discover ways to improve your skills,
                structure, and overall presentation.
              </p>

              <div
                className="
          mt-5 flex items-center gap-1
          text-sm font-semibold
          text-emerald-600
          dark:text-emerald-400
        "
              >
                Analyze Resume
                <ArrowUpRight
                  size={16}
                  className="
            transition-transform
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
                />
              </div>
            </motion.div>

            {/* Mock Interview */}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="
        group relative overflow-hidden
        rounded-2xl
        border border-violet-100
        bg-white
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-lg
        dark:border-violet-400/10
        dark:bg-slate-900
      "
            >
              <div
                className="
          mb-5 flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-violet-100
          text-violet-600
          dark:bg-violet-400/10
          dark:text-violet-400
        "
              >
                <Users size={23} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                AI Mock Interviews
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                Practice realistic interviews and receive feedback to improve
                your answers and interview confidence.
              </p>

              <div
                className="
          mt-5 flex items-center gap-1
          text-sm font-semibold
          text-violet-600
          dark:text-violet-400
        "
              >
                Start Interview
                <ArrowUpRight
                  size={16}
                  className="
            transition-transform
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
                />
              </div>
            </motion.div>

            {/* AI Mentor */}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="
        group relative overflow-hidden
        rounded-2xl
        border border-amber-100
        bg-white
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-lg
        dark:border-amber-400/10
        dark:bg-slate-900
      "
            >
              <div
                className="
          mb-5 flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-amber-100
          text-amber-600
          dark:bg-amber-400/10
          dark:text-amber-400
        "
              >
                <GraduationCap size={23} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                AI Career Mentor
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                Get personalized guidance, career advice, and answers to your
                questions from your AI mentor.
              </p>

              <div
                className="
          mt-5 flex items-center gap-1
          text-sm font-semibold
          text-amber-600
          dark:text-amber-400
        "
              >
                Talk to Mentor
                <ArrowUpRight
                  size={16}
                  className="
            transition-transform
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
                />
              </div>
            </motion.div>

            {/* Career Progress */}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="
        group relative overflow-hidden
        rounded-2xl
        border border-blue-100
        bg-white
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-lg
        dark:border-blue-400/10
        dark:bg-slate-900
      "
            >
              <div
                className="
          mb-5 flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
          dark:bg-blue-400/10
          dark:text-blue-400
        "
              >
                <BarChart3 size={23} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Career Progress
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                Track your interview performance and see how your preparation
                improves over time.
              </p>

              <div
                className="
          mt-5 flex items-center gap-1
          text-sm font-semibold
          text-blue-600
          dark:text-blue-400
        "
              >
                View Progress
                <ArrowUpRight
                  size={16}
                  className="
            transition-transform
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
                />
              </div>
            </motion.div>

          </div>
        </motion.section>
      </div>}
    </main>
  );
};

export default DashboardHome;