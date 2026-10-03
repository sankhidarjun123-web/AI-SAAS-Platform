import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getCompletedInterviewDetails } from "../../api/interview.api";
import { TopRevSec } from "../../components/Interview/TopRevSec";
import { MessageSquare } from "lucide-react";

export interface InterviewReviewData {
  id: string;
  resume_id: string;
  target_role: string;
  user_id: string;
  experience: string;
  interview_type: string;
  status: string;
  started_at: string;
  completed_at: string;
  created_at: string;
  interview_tone: string;
  difficulty: string;

  overall_score: number;
  answer_quality_score: number;
  technical_score: number;
  communication_score: number;
  presentation_score: number;

  strengths: string[];
  weaknesses: string[];

  question_analysis: any;
  video_analysis: any;
  final_feedback: string;
  important_moments: any[];
}

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface InterviewReviewContext {
  interviewReview: InterviewReviewData | null;
  interviewQA: InterviewQA[];
}

const InterviewReview: React.FC = () => {
  const { interviewId } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [interviewReview, setInterviewReview] =
    useState<InterviewReviewData | null>(null);

  const [interviewQA, setInterviewQA] = useState<InterviewQA[]>([]);

  useEffect(() => {
    if (!interviewId) return;

    const getInterviewDetails = async () => {
      setLoading(true);

      try {
        const review = await getCompletedInterviewDetails(interviewId);

        setInterviewReview(review?.interviewReview ?? null);
        setInterviewQA(review?.interviewQA ?? []);

        console.log(interviewReview);
      } catch (err) {
        console.error("Failed to fetch interview review:", err);
      } finally {
        setLoading(false);
      }
    };

    getInterviewDetails();
  }, []);

  const tabs = [
    {
      label: "Question Analysis",
      path: "question-analysis",
    },
    {
      label: "Video & Audio",
      path: "video-audio-analysis",
    },
    {
      label: "Key Moments",
      path: "key-moments",
    },
  ];

  if (!interviewId) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-red-600">
          Invalid interview ID.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full space-y-6 pb-10">
      {loading ? "loading" : <><TopRevSec reviewSoftBreak={interviewReview} />

        <div className="p-5 md:p-6">
          {/* Navigation */}
          <nav className="sticky top-0 z-10 overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
            <div className="flex min-w-max items-center gap-2">
              {tabs.map((tab) => {
                const active = location.pathname.endsWith(tab.path);

                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Nested Route */}
          <div className="w-full">
            <Outlet
              context={{
                interviewReview,
                interviewQA,
              }}
            />
          </div>

          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 mt-5 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <MessageSquare className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Final Feedback
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Overall assessment of your interview performance
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/50">
              <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                {interviewReview?.final_feedback ||
                  "No final feedback is available for this interview."}
              </p>
            </div>
          </div>

        </div>
      </>}
    </section>
  );
};

export default InterviewReview;