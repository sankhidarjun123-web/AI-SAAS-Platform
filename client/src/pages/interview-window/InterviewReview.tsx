import React, { useState, useEffect } from 'react';
import { useParams , Link, Outlet } from 'react-router-dom';
import { TopRevSec } from '../../components/Interview/TopRevSec';
import { getCompletedInterviewDetails } from '../../api/interview.api';

const InterviewReview: React.FC = () => {

    const { interviewId } = useParams();
    const [loading, setLoading] = useState(false);
    const [interviewReview, setInterviewReview] = useState(null);
    const [interviewQA, setInterviewQA] = useState(null);
    if (!interviewId) {
        return <div>Error</div>
    }

    useEffect(() => {

        const getInterviewDetails = async () => {
            if (!interviewId || interviewId.length === 0) return;
            setLoading(true);
            try {
                const review = await getCompletedInterviewDetails(interviewId);
                setInterviewReview(review?.interviewReview);
                setInterviewQA(review?.interviewQA);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getInterviewDetails();
        console.log(interviewReview, interviewQA);
    }, []);

    return <section className='w-full min-h-full'>
        <TopRevSec reviewSoftBreak={{}} />

        <nav className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
            <div className="flex min-w-max items-center gap-2">

                <Link
                    to="question-analysis"
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                    Question Analysis
                </Link>

                <Link
                    to="video-audio-analysis"
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                    Video & Audio Analysis
                </Link>

                <Link
                    to="key-moments"
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                    Key Moments
                </Link>

            </div>
        </nav>

        <div className="w-full h-auto overflow-y-scroll">
            <Outlet />
        </div>

        {/* <div className="h-[200px]">
            <LineGraph
                title="Interview Performance"
                labels={[
                    "Interview 1",
                    "Interview 2",
                    "Interview 3",
                    "Interview 4"
                ]}
                lines={[
                    {
                        name: "Technical",
                        data: [65, 70, 80, 90]
                    },
                    {
                        name: "Communication",
                        data: [50, 60, 75, 85]
                    },
                    {
                        name: "Confidence",
                        data: [55, 70, 65, 88]
                    }
                ]}
            />
        </div> */}
    </section>
}


export default InterviewReview;