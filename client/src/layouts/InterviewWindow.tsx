import React, { useEffect, useState, type SetStateAction } from "react";
import {
    Navigate,
    Outlet,
    Link,
    useOutletContext,
    useParams,
} from "react-router-dom";

const InterviewWindow: React.FC = () => {
    const {
        limitReached,
        setToFullScreen,
    }: {
        limitReached: boolean;
        setToFullScreen: React.Dispatch<SetStateAction<boolean>>;
    } = useOutletContext();

    const { interviewId } = useParams();

    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!interviewId) {
        return <Navigate to="/dashboard/pending-interviews" />;
    }

    if (isMobile) {
        return (
            <div className="flex h-dvh w-full items-center justify-center bg-white px-6 text-center dark:bg-zinc-950">
                <div className="max-w-md">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        This device is not currently supported
                    </h1>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Sorry, mobile devices are not currently supported for this
                        website. If you want to access this interview, please use a
                        laptop or any other wide-screen device.
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Your interview is being saved in your interview space.
                    </p>

                    <Link
                        to="/dashboard/mock-interview"
                        className="mt-6 inline-flex items-center rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-dvh w-full overflow-hidden bg-white dark:bg-zinc-950">
            <Outlet context={{ limitReached, setToFullScreen }} />
        </div>
    );
};

export default InterviewWindow;