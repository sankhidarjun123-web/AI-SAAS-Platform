import { CalendarDays, Clock3, Video, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
interface InterviewProps {
    interview: any;
}

const Interview = ({ interview }: InterviewProps) => {

    const {
        target_role,
        status,
        interview_type,
        duration,
        scheduled_at,
        created_at,
    } = interview;

    const interviewTitle =
        target_role ||
        "Interview";

    const formattedDate = scheduled_at
        ? new Date(scheduled_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : created_at
            ? new Date(created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
            : "Date not set";

    const formattedTime = scheduled_at
        ? new Date(scheduled_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })
        : null;

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:border-indigo-200
                hover:shadow-lg
                hover:shadow-slate-200/50

                dark:border-white/[0.08]
                dark:bg-[#0d0d0f]
                dark:hover:border-indigo-500/30
                dark:hover:shadow-black/30
            "
        >

            {/* Top accent */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-indigo-500
                    via-violet-500
                    to-indigo-400
                    opacity-70
                    transition-opacity
                    group-hover:opacity-100
                "
            />

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    p-5
                    sm:p-6
                    lg:flex-row
                    lg:items-center
                    lg:gap-8
                "
            >

                {/* LEFT — Company + Role */}
                <div
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        gap-4
                    "
                >

                    {/* Company icon */}
                    <div
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            transition-transform
                            duration-300
                            group-hover:scale-105

                            dark:border-white/10
                            dark:bg-white/[0.05]
                        "
                    >
                        <Building2
                            className="
                                h-6
                                w-6
                                text-slate-500
                                dark:text-slate-400
                            "
                            strokeWidth={1.7}
                        />
                    </div>


                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    rounded-full
                                    bg-amber-50
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-amber-600

                                    dark:bg-amber-500/10
                                    dark:text-amber-400
                                "
                            >
                                {status}
                            </span>

                        </div>

                        <h2
                            className="
                                mt-2
                                truncate
                                text-base
                                font-semibold
                                text-slate-900
                                dark:text-white
                                sm:text-lg
                            "
                        >
                            {interviewTitle}
                        </h2>

                    </div>

                </div>


                {/* MIDDLE — Metadata */}
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:flex
                        sm:items-center
                        sm:gap-6
                        lg:shrink-0
                    "
                >

                    {/* Date */}
                    <div className="flex items-center gap-2.5">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-slate-100
                                dark:bg-white/[0.06]
                            "
                        >
                            <CalendarDays
                                className="
                                    h-4
                                    w-4
                                    text-slate-500
                                    dark:text-slate-400
                                "
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                Date
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    whitespace-nowrap
                                    text-xs
                                    font-semibold
                                    text-slate-700
                                    dark:text-slate-200
                                "
                            >
                                {formattedDate}
                            </p>

                        </div>

                    </div>


                    {/* Time / Duration */}
                    <div className="flex items-center gap-2.5">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-slate-100
                                dark:bg-white/[0.06]
                            "
                        >
                            <Clock3
                                className="
                                    h-4
                                    w-4
                                    text-slate-500
                                    dark:text-slate-400
                                "
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                {formattedTime ? "Time" : "Duration"}
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    whitespace-nowrap
                                    text-xs
                                    font-semibold
                                    text-slate-700
                                    dark:text-slate-200
                                "
                            >
                                {formattedTime || duration || "Not specified"}
                            </p>

                        </div>

                    </div>


                    {/* Type */}
                    <div
                        className="
                            col-span-2
                            flex
                            items-center
                            gap-2.5
                            sm:col-span-1
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-indigo-50
                                dark:bg-indigo-500/10
                            "
                        >
                            <Video
                                className="
                                    h-4
                                    w-4
                                    text-indigo-500
                                    dark:text-indigo-400
                                "
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                Type
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    whitespace-nowrap
                                    text-xs
                                    font-semibold
                                    capitalize
                                    text-slate-700
                                    dark:text-slate-200
                                "
                            >
                                {interview_type || "Video Interview"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* RIGHT — CTA */}
                <div
                    className="
                        flex
                        w-full
                        shrink-0
                        lg:w-auto
                    "
                >

                    <Link

                        to={interview.status === "pending" ? `/interview-window/${interview.id}/setup` : `/interview-review/${interview.id}`}
                        className={`
                            group/button
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-slate-900
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:bg-indigo-600
                            active:scale-[0.98]

                            dark:bg-white
                            dark:text-slate-900
                            dark:hover:bg-indigo-500
                            dark:hover:text-white

                            lg:w-auto
                        `}
                    >
                        {interview.status === "pending" ? <>Start Interview

                        (<ArrowRight
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-200
                                group-hover/button:translate-x-1
                            "
                        />)</>
                        : "Review"}

                    </Link>

                </div>

            </div>

        </article>
    );
};

export default Interview;