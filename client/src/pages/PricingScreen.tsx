import { PricingTable } from "@clerk/clerk-react";

export default function PricingScreen() {
    return (
        <main
            className="
                relative
                min-h-screen
                overflow-hidden

                bg-slate-50
                dark:bg-slate-950

                text-slate-900
                dark:text-slate-100

                transition-colors
                duration-300
            "
        >

            {/* =====================================================
                BACKGROUND AMBIENT GRADIENT
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10
                    overflow-hidden
                "
            >

                {/* Center glow */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2

                        h-[600px]
                        w-[600px]

                        -translate-x-1/2
                        -translate-y-1/2

                        rounded-full

                        bg-gradient-to-br
                        from-amber-300/15
                        via-orange-300/10
                        to-yellow-300/10

                        dark:from-amber-500/10
                        dark:via-orange-500/5
                        dark:to-yellow-500/5

                        blur-[140px]
                    "
                />

                {/* Top-left glow */}
                <div
                    className="
                        absolute
                        -left-40
                        -top-40

                        h-96
                        w-96

                        rounded-full

                        bg-amber-300/10
                        dark:bg-amber-500/5

                        blur-[100px]
                    "
                />

                {/* Bottom-right glow */}
                <div
                    className="
                        absolute
                        -bottom-40
                        -right-40

                        h-96
                        w-96

                        rounded-full

                        bg-orange-300/10
                        dark:bg-orange-500/5

                        blur-[100px]
                    "
                />

            </div>


            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <section
                className="
                    mx-auto

                    flex
                    min-h-screen
                    max-w-5xl

                    flex-col
                    items-center
                    justify-center

                    px-4
                    py-20
                    sm:px-6
                    lg:px-8
                "
            >

                {/* Badge */}

                <span
                    className="
                        rounded-full

                        border
                        border-amber-300
                        dark:border-amber-500/30

                        bg-amber-50
                        dark:bg-amber-500/10

                        px-4
                        py-1.5

                        text-xs
                        font-bold
                        uppercase
                        tracking-wider

                        text-amber-700
                        dark:text-amber-300

                        backdrop-blur-md
                    "
                >
                    Simple Plans
                </span>


                {/* Heading */}

                <h1
                    className="
                        mt-5

                        text-center

                        text-4xl
                        sm:text-5xl

                        font-extrabold
                        tracking-tight

                        text-slate-900
                        dark:text-white
                    "
                >
                    Invest in Your Career
                </h1>


                {/* Description */}

                <p
                    className="
                        mt-4

                        max-w-lg

                        text-center

                        text-sm
                        sm:text-base

                        leading-7

                        text-slate-600
                        dark:text-slate-400
                    "
                >
                    Choose the plan that fits your goals and unlock
                    powerful AI tools to accelerate your career.
                </p>


                {/* Pricing */}

                <div className="mt-12 w-full">
                    <PricingTable />
                </div>

            </section>

        </main>
    );
}