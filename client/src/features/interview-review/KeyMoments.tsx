import React from "react";
import { useInterviewReview } from "../../hooks/useInterviewReview";

interface KeyMoment {
  type: "improvement" | "strength" | "positive" | string;
  reason: string;
  endTime: number;
  category: string;
  severity: "low" | "medium" | "high" | "critical" | string;
  startTime: number;
  timestamp: number;
  recommendation: string;
}

const KeyMoments: React.FC = () => {
  const { interviewReview } = useInterviewReview();

  if (!interviewReview) return null;

  let moments: KeyMoment[] = [];

  const rawMoments = interviewReview.important_moments;

  if (Array.isArray(rawMoments)) {
    moments = rawMoments;
  } else if (typeof rawMoments === "string") {
    try {
      moments = JSON.parse(rawMoments);
    } catch {
      moments = [];
    }
  }

  const criticalCount = moments.filter(
    (moment) => moment.severity === "critical"
  ).length;

  const highCount = moments.filter(
    (moment) => moment.severity === "high"
  ).length;

  const mediumCount = moments.filter(
    (moment) => moment.severity === "medium"
  ).length;

  return (
    <section className="space-y-6">

      {/* ============================================== */}
      {/* Header                                         */}
      {/* ============================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-lg text-white">
                ⏱
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Key Moments
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Important moments identified throughout your interview,
                  including areas that affected your performance.
                </p>
              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="flex flex-wrap gap-2">

            {criticalCount > 0 && (
              <SeveritySummary
                label="Critical"
                count={criticalCount}
                variant="critical"
              />
            )}

            {highCount > 0 && (
              <SeveritySummary
                label="High"
                count={highCount}
                variant="high"
              />
            )}

            {mediumCount > 0 && (
              <SeveritySummary
                label="Medium"
                count={mediumCount}
                variant="medium"
              />
            )}

          </div>

        </div>

      </div>


      {/* ============================================== */}
      {/* Timeline                                       */}
      {/* ============================================== */}

      {moments.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-7">

            <h3 className="text-lg font-bold text-gray-900">
              Interview Timeline
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review the moments that had the biggest impact on your
              interview performance.
            </p>

          </div>


          <div className="relative">

            {/* Main timeline line */}

            <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gray-200" />


            <div className="space-y-8">

              {moments.map((moment, index) => (

                <MomentCard
                  key={`${moment.timestamp}-${index}`}
                  moment={moment}
                  index={index}
                />

              ))}

            </div>

          </div>

        </div>

      )}

    </section>
  );
};


/* ================================================= */
/* Moment Card                                      */
/* ================================================= */

const MomentCard = ({
  moment,
  index,
}: {
  moment: KeyMoment;
  index: number;
}) => {

  const severity = getSeverityConfig(moment.severity);

  const category = formatCategory(moment.category);

  return (
    <div className="relative flex gap-5">

      {/* Timeline Node */}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow-sm ${severity.dot}`}
      >
        {index + 1}
      </div>


      {/* Content */}

      <div className="min-w-0 flex-1">

        {/* Top metadata */}

        <div className="flex flex-wrap items-center gap-2">

          {/* Timestamp */}

          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-bold text-white">
            ▶ {formatTime(moment.timestamp)}
          </span>


          {/* Duration */}

          <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-500">
            {formatTime(moment.startTime)} –{" "}
            {formatTime(moment.endTime)}
          </span>


          {/* Category */}

          <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600">
            {category}
          </span>


          {/* Severity */}

          <span
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${severity.badge}`}
          >
            {capitalize(moment.severity)}
          </span>

        </div>


        {/* Main card */}

        <div
          className={`mt-3 overflow-hidden rounded-xl border ${severity.border} bg-white`}
        >

          {/* Moment title */}

          <div className="border-b border-gray-100 px-5 py-4">

            <div className="flex items-center gap-2">

              <span className={`text-sm ${severity.text}`}>
                {getCategoryIcon(moment.category)}
              </span>

              <h4 className="text-sm font-bold text-gray-900">
                {getMomentTitle(moment)}
              </h4>

            </div>

          </div>


          <div className="space-y-5 p-5">

            {/* What happened */}

            <div>

              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                What happened
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {moment.reason}
              </p>

            </div>


            {/* Recommendation */}

            <div
              className={`rounded-xl p-4 ${severity.recommendationBg}`}
            >

              <div className="flex gap-3">

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${severity.recommendationIcon}`}
                >
                  ↗
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    AI Recommendation
                  </p>

                  <p className="mt-1.5 text-sm leading-6 text-gray-700">
                    {moment.recommendation}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


/* ================================================= */
/* Severity Summary                                 */
/* ================================================= */

const SeveritySummary = ({
  label,
  count,
  variant,
}: {
  label: string;
  count: number;
  variant: "critical" | "high" | "medium";
}) => {

  const styles = {
    critical: "bg-red-50 text-red-700 ring-red-100",
    high: "bg-orange-50 text-orange-700 ring-orange-100",
    medium: "bg-yellow-50 text-yellow-700 ring-yellow-100",
  };

  return (
    <div
      className={`rounded-xl px-3 py-2 text-center ring-1 ${styles[variant]}`}
    >

      <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">
        {label}
      </p>

      <p className="mt-0.5 text-lg font-bold">
        {count}
      </p>

    </div>
  );
};


/* ================================================= */
/* Severity Configuration                           */
/* ================================================= */

const getSeverityConfig = (severity: string) => {

  switch (severity) {

    case "critical":
      return {
        dot: "bg-red-600 text-white",
        badge: "bg-red-50 text-red-700",
        border: "border-red-100",
        text: "text-red-600",
        recommendationBg: "bg-red-50/60",
        recommendationIcon: "bg-red-100 text-red-700",
      };

    case "high":
      return {
        dot: "bg-orange-500 text-white",
        badge: "bg-orange-50 text-orange-700",
        border: "border-orange-100",
        text: "text-orange-600",
        recommendationBg: "bg-orange-50/60",
        recommendationIcon: "bg-orange-100 text-orange-700",
      };

    case "medium":
      return {
        dot: "bg-yellow-500 text-white",
        badge: "bg-yellow-50 text-yellow-700",
        border: "border-yellow-100",
        text: "text-yellow-600",
        recommendationBg: "bg-yellow-50/60",
        recommendationIcon: "bg-yellow-100 text-yellow-700",
      };

    default:
      return {
        dot: "bg-gray-700 text-white",
        badge: "bg-gray-100 text-gray-700",
        border: "border-gray-200",
        text: "text-gray-700",
        recommendationBg: "bg-gray-50",
        recommendationIcon: "bg-gray-100 text-gray-700",
      };

  }
};


/* ================================================= */
/* Helpers                                          */
/* ================================================= */

const formatTime = (seconds: number) => {

  if (seconds === undefined || seconds === null) {
    return "00:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
};


const formatCategory = (category: string) => {

  if (!category) return "General";

  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};


const capitalize = (value: string) => {

  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1);

};


const getCategoryIcon = (category: string) => {

  switch (category) {

    case "engagement":
      return "👀";

    case "eye_contact":
      return "👁️";

    case "body_language":
      return "🧍";

    case "facial_expressions":
      return "🙂";

    case "communication_delivery":
      return "🗣️";

    case "answer_quality":
      return "💬";

    case "professionalism":
      return "👔";

    default:
      return "✦";

  }
};


const getMomentTitle = (moment: KeyMoment) => {

  switch (moment.category) {

    case "engagement":
      return "Engagement Issue";

    case "eye_contact":
      return "Eye Contact";

    case "body_language":
      return "Body Language";

    case "facial_expressions":
      return "Facial Expression";

    case "communication_delivery":
      return "Communication Delivery";

    case "answer_quality":
      return "Answer Quality";

    case "professionalism":
      return "Professionalism";

    default:
      return "Interview Observation";

  }

};


/* ================================================= */
/* Empty State                                      */
/* ================================================= */

const EmptyState = () => {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
        ⏱
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900">
        No key moments found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        No significant moments were identified in this interview.
        That's a good thing — there may not have been any major
        behavioral issues worth highlighting.
      </p>

    </div>
  );
};


export default KeyMoments;
