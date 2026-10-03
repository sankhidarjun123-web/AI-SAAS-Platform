import React, { type SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import { Outlet, useParams, Navigate } from "react-router-dom";

const InterviewWindow: React.FC = () => {

    const { limitReached, setToFullScreen }: { limitReached: boolean, setToFullScreen: React.Dispatch<SetStateAction<boolean>> } = useOutletContext();
    const { interviewId } = useParams();

    // const interviewData: InterviewData = location.state as InterviewData;

    return (
        <div className="w-full h-full flex items-center justify-center bg-white dark:bg-zinc-950">

            {!interviewId ? (

                <Navigate to="/dashboard/pending-interviews" /> ): 
            (

                <div className="w-full h-full">
                    <Outlet context={{ limitReached, setToFullScreen }}/>
                </div>

            )}

        </div>
    );
};

export default InterviewWindow;