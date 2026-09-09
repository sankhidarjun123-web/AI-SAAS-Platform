import {
    Clock,
    FileText,
    ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
    mockTestSeries,
    type MockTestSeries,
} from "../../data/mocktest";


const MockTestList = () => {

    return (
        <section className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            {/*Headers*/}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b border-zinc-200 pb-6 dark:border-zinc-800"
            >
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                    Mock Test
                </span>

                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
                    AI Mock Tests Category
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                    Select the subject you want to take test of and
                    AI would generate the questions for them.
                </p>
            </motion.div>
            <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
                {mockTestSeries.map(
                    (mt: MockTestSeries, i: number) => {

                        const Icon = mt.icon;

                        return (

                            <div
                                key={i}

                                className="
                            group
                            relative
                            overflow-hidden

                            min-h-[250px]

                            rounded-2xl

                            border
                            border-white/10
                            bg-white

                            dark:bg-gradient-to-br
                            from-zinc-900
                            via-zinc-900
                            to-zinc-950

                            p-5

                            transition-all
                            duration-300

                            hover:-translate-y-2
                            hover:border-purple-500/50
                            hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]

                            cursor-pointer
                            "
                            >

                                {/* Background Glow */}

                                <div
                                    className="
                                absolute
                                -top-20
                                -right-20

                                w-40
                                h-40

                                rounded-full

                                bg-purple-500/20
                                blur-3xl

                                group-hover:bg-purple-500/30

                                transition-all
                                duration-500
                                "
                                />


                                {/* Top */}

                                <div className="relative flex items-start justify-between">


                                    {/* Icon */}

                                    <div
                                        className="
                                    flex
                                    items-center
                                    justify-center

                                    w-14
                                    h-14

                                    rounded-xl

                                    bg-purple-500/10

                                    border
                                    border-purple-500/20

                                    text-purple-400

                                    transition-all
                                    duration-300

                                    group-hover:
                                    scale-110

                                    group-hover:
                                    shadow-[0_0_25px_rgba(168,85,247,0.5)]
                                    "
                                    >

                                        <Icon size={28} />

                                    </div>


                                    {/* Arrow */}

                                    <ArrowUpRight
                                        size={20}

                                        className="
                                    text-zinc-500

                                    group-hover:text-purple-400

                                    group-hover:translate-x-1
                                    group-hover:-translate-y-1

                                    transition-all
                                    "
                                    />

                                </div>


                                {/* Content */}

                                <div className="relative mt-5">


                                    {/* Category */}

                                    <span
                                        className="
                                    text-xs
                                    font-medium

                                    text-purple-400

                                    uppercase
                                    tracking-wider
                                    "
                                    >
                                        {mt.category}
                                    </span>


                                    {/* Name */}

                                    <h2
                                        className="
                                    mt-2

                                    text-xl
                                    font-semibold

                                    text-black
                                    dark:text-white

                                    group-hover:text-purple-300

                                    transition-colors
                                    "
                                    >
                                        {mt.name}
                                    </h2>


                                    {/* Description */}

                                    <p
                                        className="
                                    mt-2

                                    text-sm

                                    leading-relaxed

                                    text-zinc-400
                                    "
                                    >
                                        {mt.description}
                                    </p>

                                </div>


                                {/* Bottom */}

                                <div
                                    className="
                                relative

                                mt-6

                                flex
                                items-center
                                justify-between

                                border-t
                                border-white/10

                                pt-4
                                "
                                >


                                    {/* Tests */}

                                    <div
                                        className="
                                    flex
                                    items-center
                                    gap-2

                                    text-sm
                                    text-zinc-400
                                    "
                                    >

                                        <FileText size={16} />

                                        <span>
                                            {mt.totalTests} Tests
                                        </span>

                                    </div>


                                    {/* Duration */}

                                    <div
                                        className="
                                    flex
                                    items-center
                                    gap-2

                                    text-sm
                                    text-zinc-400
                                    "
                                    >

                                        <Clock size={16} />

                                        <span>
                                            {mt.duration}
                                        </span>

                                    </div>

                                </div>


                                {/* Difficulty */}

                                <div className="relative mt-4">

                                    <span
                                        className="
                                    inline-flex

                                    rounded-full

                                    bg-purple-500/10

                                    border
                                    border-purple-500/20

                                    px-3
                                    py-1

                                    text-xs
                                    font-medium

                                    text-purple-300
                                    "
                                    >

                                        {mt.difficulty}

                                    </span>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>
        </section>
    );
};


export default MockTestList;