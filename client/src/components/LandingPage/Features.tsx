import { featureOne, featureTwo, featureThree } from '../../assets/images';

const Features = () => {
    const features = [
        {
            number: "01",
            title: "Everything You Need, In One Place",
            description:
                "Bring your workflow, ideas, and productivity together in one beautifully designed experience. No more jumping between different tools.",
            image: featureOne,
            tag: "Powerful Workspace",
            reverse: false,
        },
        {
            number: "02",
            title: "Built To Keep You In Flow",
            description:
                "A clean and intelligent interface designed around the way you actually work. Stay focused, move faster, and get more done.",
            image: featureTwo,
            tag: "Smart Experience",
            reverse: true,
        },
        {
            number: "03",
            title: "Simple On The Surface. Powerful Within.",
            description:
                "Everything feels simple when you use it, while powerful features work quietly behind the scenes to give you complete control.",
            image: featureThree,
            tag: "Advanced Technology",
            reverse: false,
        },
    ];

    return (
        <section
            id="features"
            className="
                relative overflow-hidden
                w-full
                bg-white dark:bg-slate-900
                py-24 sm:py-28 lg:py-36
                text-slate-900 dark:text-white
            "
        >
            {/* Background decorations */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-24 lg:mb-32">

                    <div
                        className="
                            inline-flex items-center gap-2
                            px-4 py-2 mb-6
                            rounded-full
                            border border-slate-200 dark:border-slate-700
                            bg-slate-50 dark:bg-slate-800/70
                            text-sm font-medium
                            text-slate-600 dark:text-slate-300
                        "
                    >
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                        Powerful Features
                    </div>

                    <h2
                        className="
                            text-4xl sm:text-5xl lg:text-6xl
                            font-bold tracking-tight
                            leading-[1.05]
                        "
                    >
                        Everything you need.
                        <span
                            className="
                                block
                                bg-gradient-to-r
                                from-violet-600 via-blue-600 to-cyan-500
                                bg-clip-text text-transparent
                            "
                        >
                            Nothing you don't.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-7
                            text-lg sm:text-xl
                            leading-relaxed
                            text-slate-500 dark:text-slate-400
                        "
                    >
                        Designed to make complicated things feel simple.
                        Explore the features that make our platform different.
                    </p>
                </div>


                {/* Features */}
                <div className="space-y-28 lg:space-y-40">

                    {features.map((feature) => (
                        <div
                            key={feature.number}
                            className={`
                                group
                                flex flex-col
                                ${
                                    feature.reverse
                                        ? "lg:flex-row-reverse"
                                        : "lg:flex-row"
                                }
                                items-center
                                gap-12 lg:gap-20
                            `}
                        >

                            {/* Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative">

                                    {/* Glow */}
                                    <div
                                        className="
                                            absolute
                                            inset-10
                                            rounded-[2rem]
                                            bg-gradient-to-r
                                            from-violet-500/20
                                            to-blue-500/20
                                            blur-3xl
                                            opacity-70
                                            group-hover:opacity-100
                                            transition-opacity duration-700
                                        "
                                    />

                                    {/* Image container */}
                                    <div
                                        className="
                                            relative
                                            overflow-hidden
                                            rounded-3xl
                                            border
                                            border-slate-200/80
                                            dark:border-slate-700
                                            bg-slate-100
                                            dark:bg-slate-800
                                            shadow-2xl
                                            shadow-slate-900/10
                                            dark:shadow-black/30
                                            transition-all duration-500
                                            group-hover:-translate-y-2
                                            group-hover:shadow-3xl
                                        "
                                    >
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="
                                                w-full
                                                h-auto
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-[1.03]
                                            "
                                        />

                                        {/* Image overlay */}
                                        <div
                                            className="
                                                absolute inset-0
                                                bg-gradient-to-t
                                                from-black/20
                                                via-transparent
                                                to-transparent
                                                pointer-events-none
                                            "
                                        />
                                    </div>

                                    {/* Floating number */}
                                    <div
                                        className="
                                            absolute
                                            -top-5
                                            -left-5
                                            lg:-left-7
                                            flex items-center justify-center
                                            w-14 h-14
                                            rounded-2xl
                                            bg-white dark:bg-slate-800
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            shadow-xl
                                            text-sm
                                            font-bold
                                            text-violet-600
                                            dark:text-violet-400
                                        "
                                    >
                                        {feature.number}
                                    </div>
                                </div>
                            </div>


                            {/* Content */}
                            <div className="w-full lg:w-1/2">

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        px-3 py-1.5
                                        rounded-full
                                        bg-violet-50
                                        dark:bg-violet-500/10
                                        text-violet-600
                                        dark:text-violet-400
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {feature.tag}
                                </span>

                                <h3
                                    className="
                                        mt-5
                                        text-3xl sm:text-4xl
                                        lg:text-5xl
                                        font-bold
                                        tracking-tight
                                        leading-tight
                                    "
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    className="
                                        mt-6
                                        text-lg
                                        leading-8
                                        text-slate-500
                                        dark:text-slate-400
                                        max-w-xl
                                    "
                                >
                                    {feature.description}
                                </p>

                                <div
                                    className="
                                        mt-8
                                        flex items-center gap-3
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                        group/link
                                        cursor-pointer
                                        w-fit
                                    "
                                >
                                    <span>Explore feature</span>

                                    <span
                                        className="
                                            flex items-center justify-center
                                            w-8 h-8
                                            rounded-full
                                            bg-slate-100
                                            dark:bg-slate-800
                                            transition-transform
                                            duration-300
                                            group-hover/link:translate-x-1
                                        "
                                    >
                                        →
                                    </span>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>


                {/* Bottom CTA */}
                <div className="mt-32 lg:mt-40">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            px-8 py-14
                            sm:px-12 sm:py-16
                            lg:px-20 lg:py-20
                            text-center
                            bg-slate-950
                            dark:bg-slate-800
                        "
                    >

                        {/* CTA decorations */}
                        <div
                            className="
                                absolute
                                -top-32
                                left-1/2
                                -translate-x-1/2
                                w-96 h-96
                                rounded-full
                                bg-violet-600/30
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-40
                                -right-20
                                w-80 h-80
                                rounded-full
                                bg-blue-500/20
                                blur-3xl
                            "
                        />

                        <div className="relative z-10">

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-violet-400
                                "
                            >
                                Built for the future
                            </p>

                            <h3
                                className="
                                    mt-4
                                    text-3xl sm:text-4xl lg:text-5xl
                                    font-bold
                                    text-white
                                "
                            >
                                Ready to experience it?
                            </h3>

                            <p
                                className="
                                    mt-5
                                    max-w-2xl
                                    mx-auto
                                    text-slate-400
                                    text-base sm:text-lg
                                "
                            >
                                Everything is designed to help you work
                                smarter, faster, and with less friction.
                            </p>

                            <button
                                className="
                                    mt-8
                                    px-7 py-3.5
                                    rounded-xl
                                    bg-white
                                    text-slate-950
                                    font-semibold
                                    shadow-lg
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    hover:shadow-2xl
                                    active:scale-95
                                "
                            >
                                Get Started →
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Features;