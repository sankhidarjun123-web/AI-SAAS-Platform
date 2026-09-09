import { useState } from "react";
import {
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerData } from "../../data/footer";

const Footer = () => {
    const [expandSection, setExpandSection] = useState<Record<string, boolean>>({});

    const toggleSection = (section: string) => {
        setExpandSection((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Keep only the first 4 important footer sections
    const importantSections = Object.entries(footerData).slice(0, 4);

    return (
        <footer className="mt-20 w-full">

            <div
                className="
                    relative
                    overflow-hidden
                    border-t border-slate-200
                    dark:border-slate-800
                    bg-gradient-to-br
                    from-amber-50
                    via-white
                    to-orange-50
                    dark:from-slate-950
                    dark:via-slate-900
                    dark:to-slate-950
                "
            >

                {/* Background decoration */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -top-40
                        -right-40
                        h-96
                        w-96
                        rounded-full
                        bg-amber-400/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-40
                        -left-40
                        h-96
                        w-96
                        rounded-full
                        bg-orange-400/10
                        blur-3xl
                    "
                />

                <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">

                    {/* ================= BRAND SECTION ================= */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-8
                            border-b
                            border-slate-200
                            pb-10
                            dark:border-slate-800
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-8
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            {/* Brand */}
                            <div>

                                <h2
                                    className="
                                        text-3xl
                                        font-extrabold
                                        tracking-tight
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Real Mentor
                                    <span className="text-amber-500"> AI</span>
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        max-w-md
                                        text-sm
                                        leading-6
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    Your intelligent companion for learning,
                                    growth, and building a better future.
                                </p>

                            </div>


                            {/* ================= SOCIAL ICONS ================= */}

                            <div className="flex items-center gap-3">

                                {/* Instagram */}
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-slate-200
                                        bg-white/70
                                        text-slate-600
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-pink-400
                                        hover:bg-pink-50
                                        hover:text-pink-500
                                        dark:border-slate-700
                                        dark:bg-slate-800/70
                                        dark:text-slate-400
                                        dark:hover:border-pink-500
                                        dark:hover:bg-pink-500/10
                                        dark:hover:text-pink-400
                                    "
                                >
                                    <FaInstagram size={18} />
                                </a>


                                {/* X */}
                                <a
                                    href="#"
                                    aria-label="X"
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-slate-200
                                        bg-white/70
                                        text-slate-600
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-slate-900
                                        hover:bg-slate-100
                                        hover:text-black
                                        dark:border-slate-700
                                        dark:bg-slate-800/70
                                        dark:text-slate-400
                                        dark:hover:border-white
                                        dark:hover:bg-slate-700
                                        dark:hover:text-white
                                    "
                                >
                                    <FaXTwitter size={17} />
                                </a>


                                {/* LinkedIn */}
                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-slate-200
                                        bg-white/70
                                        text-slate-600
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-500
                                        hover:bg-blue-50
                                        hover:text-blue-600
                                        dark:border-slate-700
                                        dark:bg-slate-800/70
                                        dark:text-slate-400
                                        dark:hover:border-blue-500
                                        dark:hover:bg-blue-500/10
                                        dark:hover:text-blue-400
                                    "
                                >
                                    <FaLinkedinIn size={17} />
                                </a>


                                {/* GitHub */}
                                <a
                                    href="#"
                                    aria-label="GitHub"
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-slate-200
                                        bg-white/70
                                        text-slate-600
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-slate-900
                                        hover:bg-slate-100
                                        hover:text-black
                                        dark:border-slate-700
                                        dark:bg-slate-800/70
                                        dark:text-slate-400
                                        dark:hover:border-white
                                        dark:hover:bg-slate-700
                                        dark:hover:text-white
                                    "
                                >
                                    <FaGithub size={18} />
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* ================= FOOTER LINKS ================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-10
                            py-14
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >

                        {importantSections.map(([section, links]) => {

                            const isExpanded = expandSection[section];

                            const entries = Object.entries(links);

                            const visibleLinks = isExpanded
                                ? entries
                                : entries.slice(0, 4);

                            return (
                                <div key={section}>

                                    <h3
                                        className="
                                            text-sm
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        {section}
                                    </h3>


                                    <ul className="mt-6 flex flex-col gap-3">

                                        {visibleLinks.map(([label, href]) => (

                                            <li key={label}>

                                                <a
                                                    href={href}
                                                    className="
                                                        text-sm
                                                        text-slate-500
                                                        transition-colors
                                                        duration-200
                                                        hover:text-amber-600
                                                        dark:text-slate-400
                                                        dark:hover:text-amber-400
                                                    "
                                                >
                                                    {label}
                                                </a>

                                            </li>

                                        ))}

                                    </ul>


                                    {/* More / Less */}
                                    {entries.length > 4 && (

                                        <button
                                            onClick={() => toggleSection(section)}
                                            className="
                                                mt-5
                                                cursor-pointer
                                                text-xs
                                                font-semibold
                                                text-amber-600
                                                transition-colors
                                                hover:text-amber-700
                                                dark:text-amber-400
                                                dark:hover:text-amber-300
                                            "
                                        >
                                            {isExpanded
                                                ? "Show less ↑"
                                                : "Show more ↓"
                                            }
                                        </button>

                                    )}

                                </div>
                            );
                        })}

                    </div>


                    {/* ================= BOTTOM SEPARATOR ================= */}

                    <div
                        className="
                            h-px
                            w-full
                            bg-gradient-to-r
                            from-transparent
                            via-slate-300
                            to-transparent
                            dark:via-slate-700
                        "
                    />


                    {/* ================= COPYRIGHT ================= */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            pt-7
                            text-xs
                            text-slate-400
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <p>
                            © {new Date().getFullYear()} Real Mentor AI.
                            All rights reserved.
                        </p>

                        <p>
                            Built with intelligence. Designed for humans.
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;