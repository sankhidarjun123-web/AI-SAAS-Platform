
import { CheckCircle2 } from "lucide-react";
import { useEffect, type SetStateAction } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const EndScreen = () => {
    const navigate = useNavigate();
    const { setToFullScreen }: { setToFullScreen: React.Dispatch<SetStateAction<boolean>> } = useOutletContext();

    useEffect(() => {
        setToFullScreen(false);
    },[]);
    return (

        <div className="min-h-screen w-full flex items-center justify-center bg-slate-200 dark:bg-slate-950 px-4">

            <div className="w-full max-w-lg rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 p-8 text-center shadow-2xl">

                {/* Success Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full dark:bg-green-500/10">
                    <CheckCircle2
                        size={48}
                        className="text-green-500"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold dark:text-white">
                    Interview Completed
                </h1>

                {/* Message */}
                <p className="mt-4 dark:text-slate-400 leading-relaxed">
                    Your interview has successfully ended.
                    Thank you for completing the interview.
                </p>

                <p className="mt-2 text-sm dark:text-slate-500">
                    Your interview has been submitted successfully.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/")}
                    className="
                        mt-8
                        cursor-pointer
                        w-full
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-medium
                        dark:text-white
                        transition
                        hover:bg-blue-700
                        active:scale-[0.98]
                    "
                >
                    Return to Dashboard
                </button>

            </div>

        </div>
    );
};

export default EndScreen;
