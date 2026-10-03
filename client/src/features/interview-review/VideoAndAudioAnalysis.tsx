import React from "react";
import { useInterviewReview } from "../../hooks/useInterviewReview";

const VideoAndAudioAnalysis: React.FC = () => {
  const { interviewReview } = useInterviewReview();

  if (!interviewReview) return null;

  const analysis = interviewReview.video_analysis;

  if (!analysis) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
          🎥
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Video analysis unavailable
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          We couldn't find video and audio analysis for this interview.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">

      {/* Page Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-lg">
                🎥
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Video & Audio Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  How you presented yourself during the interview
                </p>
              </div>
            </div>
          </div>

          {/* Presentation score */}
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
              {interviewReview.presentation_score}
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Presentation
              </p>

              <p className="text-sm font-semibold text-gray-900">
                {getScoreLabel(interviewReview.presentation_score)}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <QuickInsight
          icon="👁️"
          title="Eye Contact"
          value="Analyzed"
          description="Camera engagement"
        />

        <QuickInsight
          icon="🗣️"
          title="Speaking Pace"
          value="Analyzed"
          description="Delivery speed"
        />

        <QuickInsight
          icon="💬"
          title="Speech Clarity"
          value="Analyzed"
          description="Voice clarity"
        />

        <QuickInsight
          icon="✨"
          title="Filler Words"
          value={
            analysis.fillerWords?.observed
              ? "Observed"
              : "None observed"
          }
          description="Verbal habits"
        />

      </div>

      {/* Communication & Voice */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <SectionHeading
          title="Voice & Communication"
          description="Analysis of how you delivered your verbal responses."
        />

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <AnalysisBlock
            icon="⏸️"
            title="Pauses"
            text={analysis.pauses}
          />

          <AnalysisBlock
            icon="🚀"
            title="Speaking Pace"
            text={analysis.speakingPace}
          />

          <AnalysisBlock
            icon="🔊"
            title="Speech Clarity"
            text={analysis.speechClarity}
          />

          <AnalysisBlock
            icon="💭"
            title="Filler Words"
            text={analysis.fillerWords?.feedback}
          />

        </div>

        {/* Filler word examples */}
        {analysis.fillerWords?.observed &&
          analysis.fillerWords?.examples?.length > 0 && (
            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Examples detected
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {analysis.fillerWords.examples.map(
                  (word: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200"
                    >
                      "{word}"
                    </span>
                  )
                )}
              </div>

            </div>
          )}

      </div>

      {/* Visual Behavior */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <SectionHeading
          title="Visual & Body Language"
          description="AI observations from your video during the interview."
        />

        <div className="mt-6 space-y-4">

          <DetailedInsight
            icon="👁️"
            title="Eye Contact"
            text={analysis.eyeContact}
          />

          <DetailedInsight
            icon="🧍"
            title="Body Language"
            text={analysis.bodyLanguage}
          />

          <DetailedInsight
            icon="🙂"
            title="Facial Expressions"
            text={analysis.facialExpressions}
          />

        </div>

      </div>

      {/* Professionalism */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <SectionHeading
          title="Professionalism"
          description="Assessment of your overall professional presence."
        />

        <div className="mt-5 rounded-xl bg-gray-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-gray-200">
              👔
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Professional Presence
              </h4>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {analysis.professionalism}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Overall AI Feedback */}
      <div className="overflow-hidden rounded-2xl bg-gray-900 p-6 text-white shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
            ✨
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              AI Assessment
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Overall Presentation Feedback
            </h3>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              {analysis.feedback}
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};


/* -------------------------------- */
/* Reusable Components              */
/* -------------------------------- */

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};


const AnalysisBlock = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text?: string;
}) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-base shadow-sm ring-1 ring-gray-200">
          {icon}
        </div>

        <h4 className="text-sm font-semibold text-gray-900">
          {title}
        </h4>

      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        {text || "No analysis available."}
      </p>

    </div>
  );
};


const DetailedInsight = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text?: string;
}) => {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 p-5 transition-colors hover:bg-gray-50">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
        {icon}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-bold text-gray-900">
          {title}
        </h4>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {text || "No analysis available."}
        </p>
      </div>

    </div>
  );
};


const QuickInsight = ({
  icon,
  title,
  value,
  description,
}: {
  icon: string;
  title: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-sm font-semibold text-gray-900">
        {title}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-700">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
};


const getScoreLabel = (score: number) => {
  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Improvement";
};


export default VideoAndAudioAnalysis;
