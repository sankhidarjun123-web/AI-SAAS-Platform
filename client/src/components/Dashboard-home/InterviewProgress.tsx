import LineGraph from "../../ui/data-representations/LineGraph";
import { useState, useEffect } from "react";
import { interviewProgress } from "../../api/dashboard.api";

interface InterviewData {
    overall_score: number;
    created_at: string;
    interview_type: string;
    id: string;
}
const InterviewProgress = () => {

    const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(false);

    const fetchInterviewData = async () => {

        if (limitReached || loading) return;
        setLoading(true);
        try {

            const data = await interviewProgress(skip, 10);
            setInterviewData(prev => [...prev, ...(data?.interviewData ?? [])]);
            setSkip(data?.nextSkip);
            setLimitReached(data?.limitReached);
            console.log(data?.interviewData);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInterviewData();
    }, []);

    const handleFetch = async () => {
        await fetchInterviewData();
    }

    const labels = interviewData.map(
        item => `Interview-${item.id}`
    );

    const lines = {
        name: "Interviews",
        data: interviewData.map(
            item => Number(item.overall_score)
        )
    };

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Interview Progress
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Track your interview performance over time
                    </p>
                </div>

                {/* Optional small indicator */}
                <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-slate-600">
                        Recent Interviews
                    </span>
                </div>

            </div>


            {/* Graph Area */}
            <div className="px-6 pt-6">

                {loading ? (
                    <div className="flex min-h-[320px] items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700"></div>
                            <span className="text-sm text-slate-500">
                                Loading interview data...
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[320px] w-full">
                        <LineGraph
                            labels={labels}
                            lines={[lines]}
                        />
                    </div>
                )}

            </div>


            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">

                <p className="text-xs text-slate-500">
                    Showing your latest interview results
                </p>

                <button
                    onClick={handleFetch}
                    type="button"
                    className="
                        inline-flex items-center gap-2
                        rounded-lg
                        bg-slate-900
                        px-4 py-2
                        text-sm font-medium text-white
                        shadow-sm
                        transition-all duration-200
                        hover:bg-slate-800
                        hover:shadow-md
                        active:scale-[0.98]
                    "
                >
                    Load More

                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

            </div>

        </div>
    );
}

export default InterviewProgress;