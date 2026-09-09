import React, { useState, useEffect } from "react";
import { useLocation, Outlet, useParams, useNavigate, Navigate } from "react-router-dom";
import type { InterviewData } from "../pages/dashboard/InterviewHome";
import CommonLoader from "../ui/loader/CommonLoader";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

const InterviewWindow: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const navigate = useNavigate();
    const { interviewId } = useParams();

    const interviewData: InterviewData = location.state as InterviewData;

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-zinc-950">

            {!loading ? (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <CommonLoader />
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-4">
                        Setting up your interview...
                    </p>
                </div>
            ) :
            !interviewId ? (

                <Navigate to="/dashboard/pending-interviews" /> ): 
            (

                <div className="w-full h-full">
                    <Outlet />
                </div>

            )}

        </div>
    );
};

export default InterviewWindow;