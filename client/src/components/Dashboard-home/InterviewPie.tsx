import { useEffect, useState } from "react";
import PieChart from "../../ui/data-representations/PieChart";
import { interviewTotal } from "../../api/dashboard.api";

interface InterviewResult {
    scores: "exc" | "good" | "average" | "need improvement";
    interview_counts: string;
}

interface PieChartData {
    label: string;
    progress: number;
}

const InterviewPie = () => {

    const [interviewData, setInterviewData] = useState<PieChartData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchInterviewTotal = async () => {

        setLoading(true);

        try {
            const data = await interviewTotal();

            const interviews: InterviewResult[] = data?.interviews ?? [];

            const total = interviews.reduce(
                (sum, item) => sum + Number(item.interview_counts),
                0
            );

            if (total === 0) {
                setInterviewData([]);
                return;
            }

            const pieData = interviews.map((item) => ({
                label: item.scores,
                progress:
                    (Number(item.interview_counts) / total) * 100
            }));

            setInterviewData(pieData);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviewTotal();
    }, []);

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Interview Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Distribution of your interview results
                </p>
            </div>

            <div className="flex min-h-[300px] items-center justify-center">

                {loading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />

                        <span className="text-sm text-slate-500">
                            Loading interview data...
                        </span>
                    </div>
                ) : interviewData.length > 0 ? (
                    <PieChart data={interviewData} />
                ) : (
                    <p className="text-sm text-slate-500">
                        No interview data available
                    </p>
                )}

            </div>

        </div>
    );
};

export default InterviewPie;