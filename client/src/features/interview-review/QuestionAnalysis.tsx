import React from "react";
import { useInterviewReview } from "../../hooks/useInterviewReview";

interface QuestionAnalysisItem {
  score: number;
  answer: string;
  feedback: string;
  question: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  questionNumber: number;
}

const QuestionAnalysis: React.FC = () => {
  const { interviewReview } = useInterviewReview();

  if (!interviewReview) return null;

  const analysis =
    (interviewReview.question_analysis as QuestionAnalysisItem[]) || [];

  /*
   * If your backend returns the question analysis as JSON string
   * instead of an already parsed array, you can parse it here.
   */
  let questions: QuestionAnalysisItem[] = analysis;

  if (typeof interviewReview.question_analysis === "string") {
    try {
      questions = JSON.parse(interviewReview.question_analysis);
    } catch {
      questions = [];
    }
  }

  const averageScore =
    questions.length > 0
      ? Math.round(
          questions.reduce((sum, item) => sum + item.score, 0) /
            questions.length
        )
      : 0;

  const excellentCount = questions.filter(
    (item) => item.score >= 80
  ).length;

  const needsImprovementCount = questions.filter(
    (item) => item.score < 60
  ).length;

  return (
    <section className="space-y-6">

      {/* -------------------------------- */}
      {/* Header                           */}
      {/* -------------------------------- */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-lg text-white">
                ?
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Question Analysis
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  A detailed breakdown of how you answered each interview
                  question.
                </p>
              </div>

            </div>
          </div>

          {/* Average Score */}

          <div className="flex items-center gap-4 rounded-2xl bg-gray-50 px-5 py-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-900">
              <span className="text-lg font-bold text-gray-900">
                {averageScore}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Average Answer Score
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {getScoreLabel(averageScore)}
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* -------------------------------- */}
      {/* Summary Cards                    */}
      {/* -------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-3">

        <SummaryCard
          label="Questions"
          value={questions.length}
          description="Questions analyzed"
          icon="📋"
        />

        <SummaryCard
          label="Strong Answers"
          value={excellentCount}
          description="Scored 80 or above"
          icon="✓"
        />

        <SummaryCard
          label="Needs Improvement"
          value={needsImprovementCount}
          description="Scored below 60"
          icon="!"
        />

      </div>


      {/* -------------------------------- */}
      {/* Empty State                      */}
      {/* -------------------------------- */}

      {questions.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
            📋
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No question analysis available
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Detailed question analysis hasn't been generated for this
            interview yet.
          </p>

        </div>
      ) : (

        /* -------------------------------- */
        /* Questions                        */
        /* -------------------------------- */

        <div className="space-y-5">

          {questions.map((item, index) => (

            <QuestionCard
              key={item.questionNumber ?? index}
              item={item}
            />

          ))}

        </div>

      )}

    </section>
  );
};


/* ================================================= */
/* Question Card                                    */
/* ================================================= */

const QuestionCard = ({
  item,
}: {
  item: QuestionAnalysisItem;
}) => {

  const score = Math.min(Math.max(item.score || 0, 0), 100);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* -------------------------------- */}
      {/* Question Header                  */}
      {/* -------------------------------- */}

      <div className="border-b border-gray-100 p-6">

        <div className="flex items-start justify-between gap-5">

          <div className="flex min-w-0 gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">
              {item.questionNumber}
            </div>

            <div className="min-w-0">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Question {item.questionNumber}
              </p>

              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {item.question}
              </h3>

            </div>

          </div>


          {/* Score */}

          <ScoreBadge score={score} />

        </div>

      </div>


      {/* -------------------------------- */}
      {/* Candidate Answer                */}
      {/* -------------------------------- */}

      <div className="p-6">

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm shadow-sm ring-1 ring-gray-200">
              💬
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Your Answer
            </p>

          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">
            {item.answer || "No answer recorded."}
          </p>

        </div>


        {/* -------------------------------- */}
        {/* AI Feedback                     */}
        {/* -------------------------------- */}

        <div className="mt-5">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs text-white">
              ✦
            </div>

            <h4 className="text-sm font-bold text-gray-900">
              AI Feedback
            </h4>

          </div>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            {item.feedback}
          </p>

        </div>


        {/* -------------------------------- */}
        {/* Insights                        */}
        {/* -------------------------------- */}

        <div className="mt-6 grid gap-4 lg:grid-cols-3">

          {/* Strengths */}

          <InsightSection
            title="Strengths"
            icon="✓"
            items={item.strengths}
            variant="strength"
            emptyText="No particular strengths identified."
          />


          {/* Weaknesses */}

          <InsightSection
            title="Weaknesses"
            icon="!"
            items={item.weaknesses}
            variant="weakness"
            emptyText="No major weaknesses identified."
          />


          {/* Improvements */}

          <InsightSection
            title="How to Improve"
            icon="↗"
            items={item.improvements}
            variant="improvement"
            emptyText="No specific improvements suggested."
          />

        </div>

      </div>

    </article>
  );
};


/* ================================================= */
/* Score Badge                                      */
/* ================================================= */

const ScoreBadge = ({ score }: { score: number }) => {

  const getScoreClasses = () => {

    if (score >= 80) {
      return "bg-green-50 text-green-700 ring-green-100";
    }

    if (score >= 60) {
      return "bg-yellow-50 text-yellow-700 ring-yellow-100";
    }

    return "bg-red-50 text-red-700 ring-red-100";
  };

  return (
    <div
      className={`shrink-0 rounded-xl px-4 py-2.5 text-center ring-1 ${getScoreClasses()}`}
    >

      <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">
        Score
      </p>

      <p className="mt-0.5 text-xl font-bold">
        {score}
      </p>

    </div>
  );
};


/* ================================================= */
/* Insight Section                                  */
/* ================================================= */

const InsightSection = ({
  title,
  icon,
  items,
  variant,
  emptyText,
}: {
  title: string;
  icon: string;
  items?: string[];
  variant: "strength" | "weakness" | "improvement";
  emptyText: string;
}) => {

  const variantClasses = {

    strength: {
      container: "bg-green-50/70 border-green-100",
      icon: "bg-green-100 text-green-700",
      title: "text-green-900",
      text: "text-green-800",
    },

    weakness: {
      container: "bg-red-50/70 border-red-100",
      icon: "bg-red-100 text-red-700",
      title: "text-red-900",
      text: "text-red-800",
    },

    improvement: {
      container: "bg-blue-50/70 border-blue-100",
      icon: "bg-blue-100 text-blue-700",
      title: "text-blue-900",
      text: "text-blue-800",
    },

  }[variant];

  const hasItems = items && items.length > 0;

  return (
    <div
      className={`rounded-xl border p-5 ${variantClasses.container}`}
    >

      <div className="flex items-center gap-2">

        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${variantClasses.icon}`}
        >
          {icon}
        </div>

        <h4
          className={`text-sm font-bold ${variantClasses.title}`}
        >
          {title}
        </h4>

      </div>


      {hasItems ? (

        <ul className="mt-4 space-y-3">

          {items.map((item, index) => (

            <li
              key={index}
              className={`flex gap-2 text-xs leading-5 ${variantClasses.text}`}
            >

              <span className="mt-1 shrink-0 text-[10px]">
                •
              </span>

              <span>
                {item}
              </span>

            </li>

          ))}

        </ul>

      ) : (

        <p
          className={`mt-4 text-xs leading-5 ${variantClasses.text} opacity-70`}
        >
          {emptyText}
        </p>

      )}

    </div>
  );
};


/* ================================================= */
/* Summary Card                                     */
/* ================================================= */

const SummaryCard = ({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: string;
}) => {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
};


/* ================================================= */
/* Helpers                                          */
/* ================================================= */

const getScoreLabel = (score: number) => {

  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Improvement";

};


export default QuestionAnalysis;