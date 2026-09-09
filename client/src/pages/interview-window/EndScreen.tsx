
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EndScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">

                {/* Success Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2
                        size={48}
                        className="text-green-500"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-white">
                    Interview Completed
                </h1>

                {/* Message */}
                <p className="mt-4 text-slate-400 leading-relaxed">
                    Your interview has successfully ended.
                    Thank you for completing the interview.
                </p>

                <p className="mt-2 text-sm text-slate-500">
                    Your interview has been submitted successfully.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/")}
                    className="
                        mt-8
                        w-full
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-medium
                        text-white
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
