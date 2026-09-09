import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { reviews, type Reviews } from "../../data/reviews";


const HeadProof = () => {
    return (
        <div className="w-full bg-cyan-200 dark:bg-cyan-800 py-16 px-4">
            <motion.div
                className="max-w-3xl mx-auto flex flex-col items-center text-center"
                initial={{
                    opacity: 0,
                    y: 16
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{
                    once: true,
                    amount: 0.2
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                <span
                    className="
                        mb-3
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-cyan-700
                        dark:text-cyan-300
                        bg-cyan-100
                        dark:bg-cyan-900/30
                    "
                >
                    Customer Reviews
                </span>

                <h2
                    className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                    "
                >
                    Trusted by Thousands of Users
                </h2>

                <p
                    className="
                        mt-4
                        max-w-2xl
                        text-base
                        sm:text-lg
                        leading-7
                        text-slate-600
                        dark:text-zinc-300
                    "
                >
                    See why thousands of users love our platform for its
                    simplicity, reliability, and powerful features.
                </p>

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-slate-200
                        dark:border-zinc-700
                        bg-white/70
                        dark:bg-zinc-900/70
                        backdrop-blur-md
                        px-5
                        py-2.5
                        shadow-sm
                    "
                >
                    <Rating
                        value={4.5}
                        precision={0.5}
                        readOnly
                        sx={{
                            fontSize: "1.7rem",
                            "& .MuiRating-iconFilled": {
                                color: "#f59e0b"
                            }
                        }}
                    />

                    <span
                        className="
                            text-sm
                            sm:text-base
                            font-semibold
                            text-slate-700
                            dark:text-zinc-200
                        "
                    >
                        4.5 / 5
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

const ReviewSection = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
                sm:gap-6
            ">
                {reviews.map((review: Reviews) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: true,
                            amount: 0.15
                        }}
                        transition={{
                            duration: 0.45,
                            ease: "easeOut"
                        }}
                        whileHover={{
                            y: -6
                        }}
                        className="
                            group
                            relative
                            flex
                            flex-col
                            min-h-[260px]
                            rounded-2xl
                            border
                            border-slate-200/80
                            dark:border-zinc-700/70
                            bg-white/80
                            dark:bg-zinc-900/80
                            backdrop-blur-xl
                            p-5
                            shadow-sm
                            hover:shadow-xl
                            hover:border-cyan-300/70
                            dark:hover:border-cyan-500/40
                            transition-all
                            duration-300
                        "
                    >
                        {/* Subtle glow */}
                        <div
                            className="
                                absolute
                                inset-0
                                rounded-2xl
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                duration-300
                                pointer-events-none
                                bg-gradient-to-br
                                from-cyan-400/5
                                via-transparent
                                to-blue-500/5
                            "
                        />

                        {/* User information */}
                        <div className="relative flex items-center gap-3">
                            {/* Avatar */}
                            <div
                                className="
                                    shrink-0
                                    rounded-full
                                    p-[2px]
                                    bg-gradient-to-br
                                    from-cyan-400
                                    via-blue-400
                                    to-purple-400
                                "
                            >
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="
                                        w-12
                                        h-12
                                        rounded-full
                                        object-cover
                                        border-2
                                        border-white
                                        dark:border-zinc-900
                                    "
                                />
                            </div>

                            {/* Name + Rating */}
                            <div className="min-w-0 flex flex-col">
                                <h3
                                    className="
                                        font-semibold
                                        text-[15px]
                                        text-slate-900
                                        dark:text-white
                                        truncate
                                    "
                                >
                                    {review.name}
                                </h3>

                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <Rating
                                        value={review.rating}
                                        precision={0.5}
                                        readOnly
                                        size="small"
                                        sx={{
                                            fontSize: "1rem",
                                            "& .MuiRating-iconFilled": {
                                                color: "#f59e0b"
                                            },
                                            "& .MuiRating-iconEmpty": {
                                                color: "#d1d5db"
                                            }
                                        }}
                                    />

                                    <span
                                        className="
                                            text-xs
                                            font-medium
                                            text-slate-500
                                            dark:text-zinc-400
                                        "
                                    >
                                        {review.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            className="
                                relative
                                w-full
                                h-px
                                bg-slate-200
                                dark:bg-zinc-700
                                my-4
                            "
                        />

                        {/* Review */}
                        <p
                            className="
                                relative
                                text-sm
                                leading-6
                                text-slate-600
                                dark:text-zinc-300
                            "
                        >
                            "{review.review}"
                        </p>

                        {/* Bottom accent */}
                        <div
                            className="
                                relative
                                mt-auto
                                pt-5
                                flex
                                items-center
                            "
                        >
                            <span
                                className="
                                    text-[11px]
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    text-cyan-600
                                    dark:text-cyan-400
                                "
                            >
                                Verified User
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const SocialProof = () => {


    return (
        <section className="w-full flex flex-col justify-center items-center min-h-[800px]">
            <HeadProof />

            <ReviewSection />
        </section>
    )
}


export default SocialProof;
