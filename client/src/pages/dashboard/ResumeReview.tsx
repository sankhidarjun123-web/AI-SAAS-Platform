import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResume } from "../../api/resume.api";
import { motion } from "framer-motion";

interface ResumeReviewData {
  id: string;
  user_id: string;
  resume_key: string;
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  projects_feedback: string;
  summary: string;
  improvements: string[];
}

const ResumeReview = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState<ResumeReviewData | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        if (!resumeId) {
          throw new Error("Resume id cannot be null or undefined");
        }
        const reviewData = await getResume(resumeId);
        setReview(reviewData.resumeData);
      } catch {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Analyzing resume details...</p>
      </div>
    );
  }

  if (!review) return null;

  // Helper to color-code ATS score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 stroke-emerald-500";
    if (score >= 60) return "text-amber-500 stroke-amber-500";
    return "text-rose-500 stroke-rose-500";
  };

  const scoreColor = getScoreColor(review.ats_score);

  // SVG parameters for radial gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (review.ats_score / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-full mx-auto p-6 md:p-10 space-y-8"
    >
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 dark:text-indigo-400">
            AI Resume Analysis
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-zinc-100">
            Optimization Insights
          </h1>
        </div>

        {/* Circular ATS Gauge */}
        <div className="flex items-center gap-4 bg-zinc-100/80 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200/80 dark:border-zinc-800/80 p-4 rounded-2xl w-fit">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress ring */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                className={scoreColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className={`absolute text-xl font-bold ${scoreColor}`}>
              {review.ats_score}%
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">ATS Match</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[130px]">
              Overall compatibility score for target roles.
            </p>
          </div>
        </div>
      </header>

      {/* Overview Summary */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {review.summary}
        </p>
      </section>

      {/* PRIORITY SECTION: Critical Issues & Gaps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Areas Requiring Immediate Attention
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Weaknesses / Mistakes */}
          <section className="p-6 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-900/40">
            <h3 className="text-md font-semibold text-rose-700 dark:text-rose-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Key Weaknesses & Errors
            </h3>
            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {review.weaknesses.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Missing Skills */}
          <section className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-900/40">
            <h3 className="text-md font-semibold text-amber-700 dark:text-amber-300 mb-4 flex items-center gap-2">
              <span>🎯</span> Missing Target Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {review.missing_skills.map((skill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800/60 rounded-lg px-3 py-1.5 text-xs font-medium"
                >
                  + {skill}
                </motion.span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* POSITIVE & IMPROVEMENT SECTION */}
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        {/* Strengths */}
        <section className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/40">
          <h3 className="text-md font-semibold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
            <span>✅</span> Highlighted Strengths
          </h3>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {review.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested Action Items */}
        <section className="p-6 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-900/40">
          <h3 className="text-md font-semibold text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-2">
            <span>🚀</span> Recommended Actions
          </h3>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {review.improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-indigo-500 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Project Specific Feedback */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <h2 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
          <span>📁</span> Projects Feedback
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {review.projects_feedback}
        </p>
      </section>
    </motion.div>
  );
};

export default ResumeReview;