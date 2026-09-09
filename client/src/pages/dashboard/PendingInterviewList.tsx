import { getPendingInterviews } from "../../api/interview.api";
import PendingInterview from "../../components/Dashboard/PendingInterview";
import { usePaginationFetch } from "../../hooks/usePaginationFetch";
import { useRef } from "react";
import CommonLoader from "../../ui/loader/CommonLoader";

const PendingInterviewList = () => {

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const {
        data: interviews = [],
        loading: intLoading,
        limitReached,
    } = usePaginationFetch<any, any>(
        {
            limit: 10,
            skip: 0,
            sort: "asc",
            divRef: loaderRef,
        },
        getPendingInterviews,
        "interviews",
        (skip, limit) => [skip, limit]
    );

    const isInitialLoading = intLoading && interviews.length === 0;
    const hasInterviews = interviews.length > 0;

    return (
        <section
            className="
                relative
                w-full
                min-h-full
                overflow-hidden
            "
        >

            {/* subtle background */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.35]
                    dark:opacity-[0.12]
                    bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.12),_transparent_35%)]
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    py-6
                    sm:px-6
                    lg:px-8
                "
            >

                {/* HEADER */}
                <div className="mb-7">

                    <div className="flex items-center gap-2 mb-2">

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-emerald-600
                                dark:text-emerald-400
                            "
                        >
                            Interview Center
                        </span>

                    </div>

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >

                        <div>

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    sm:text-3xl
                                "
                            >
                                Pending Interviews
                            </h1>

                            <p
                                className="
                                    mt-1.5
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Interviews you've been invited to.
                                Review the details and start whenever you're ready.
                            </p>

                        </div>

                        {hasInterviews && (
                            <div
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3.5
                                    py-2
                                    shadow-sm
                                    dark:border-white/10
                                    dark:bg-white/[0.04]
                                "
                            >

                                <span
                                    className="
                                        text-lg
                                        font-bold
                                        leading-none
                                    "
                                >
                                    {interviews.length}
                                </span>

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    loaded
                                </span>

                            </div>
                        )}

                    </div>

                </div>


                {/* INITIAL LOADING */}
                {isInitialLoading && (
                    <div
                        className="
                            flex
                            min-h-[360px]
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            dark:border-white/10
                            dark:bg-white/[0.025]
                        "
                    >

                        <CommonLoader />

                        <p
                            className="
                                mt-4
                                text-sm
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Loading interviews...
                        </p>

                    </div>
                )}


                {/* EMPTY STATE */}
                {!isInitialLoading && !hasInterviews && (
                    <div
                        className="
                            flex
                            min-h-[360px]
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            px-6
                            text-center
                            dark:border-white/10
                            dark:bg-white/[0.025]
                        "
                    >

                        <div
                            className="
                                mb-5
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-slate-100
                                dark:bg-white/[0.06]
                            "
                        >

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="
                                    h-7
                                    w-7
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                <path
                                    d="M8 7h8M8 11h5M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>

                        <h2
                            className="
                                text-base
                                font-semibold
                            "
                        >
                            No pending interviews
                        </h2>

                        <p
                            className="
                                mt-1.5
                                max-w-sm
                                text-sm
                                leading-6
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            You're all caught up. Any new interview
                            invitations will appear here.
                        </p>

                    </div>
                )}


                {/* INTERVIEWS */}
                {hasInterviews && (
                    <div className="space-y-3">

                        {interviews.map((interview: any) => (
                            <PendingInterview
                                key={interview.id}
                                interview={interview}
                            />
                        ))}

                    </div>
                )}


                {/* INFINITE SCROLL TARGET */}
                {!limitReached && hasInterviews && (
                    <div
                        ref={loaderRef}
                        className="
                            flex
                            h-20
                            items-center
                            justify-center
                        "
                    >

                        {intLoading && (
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                <CommonLoader />

                                <span>
                                    Loading more...
                                </span>
                            </div>
                        )}

                    </div>
                )}


                {/* END */}
                {limitReached && hasInterviews && (
                    <div className="flex items-center justify-center gap-3 py-8">

                        <div
                            className="
                                h-px
                                w-16
                                bg-slate-200
                                dark:bg-white/10
                            "
                        />

                        <span
                            className="
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-wider
                                text-slate-400
                                dark:text-slate-600
                            "
                        >
                            All interviews loaded
                        </span>

                        <div
                            className="
                                h-px
                                w-16
                                bg-slate-200
                                dark:bg-white/10
                            "
                        />

                    </div>
                )}

            </div>

        </section>
    );
};

export default PendingInterviewList;