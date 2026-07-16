import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { reviews, type Reviews } from "../../data/reviews";


const HeadProof = () => {
    return (
        <div className="bg-cyan-300/25 w-full py-12">
            <motion.div
                className="w-full flex flex-col items-center text-center"
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
                }}>
                <h2 className="text-4xl font-bold mb-4">
                    Trusted by Thousands of Users
                </h2>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                        value={4.5}
                        precision={0.5}
                        readOnly
                        sx={{ fontSize: '3rem' }}
                    />
                    <span className="text-2xl font-semibold">(4.5 / 5)</span>
                </Box>

                <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-200">
                    Our users consistently rate the app highly for its simplicity,
                    reliability, and powerful features. Join thousands of satisfied
                    customers who use it every day.
                </p>
            </motion.div>
        </div>
    );
};


const ReviewSection = () => {
    return <div className="p-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
            reviews.map((review: Reviews, _) => {
                const featured = review.id % 5 === 0;

                return <motion.div
                    key={review.id}
                    className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        border
        border-black/5
        dark:border-white/10
        p-6
        flex
        flex-col
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:dark:shadow-[0_0_30px_rgba(255,255,255,0.15)]
        ${featured ? "sm:col-span-2 p-8" : ""}
    `}
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
                    }}>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex flex-col">
                            <span>{review.name}</span>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Rating
                                    value={review.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{
                                        fontSize: "1em"
                                    }}
                                />
                            </Box>
                        </div>
                        <img src={review.avatar} alt={review.name} className="w-24 h-24 rounded-full object-cover" />
                    </div>

                    <div className="p-5">
                        {review.review}
                    </div>
                </motion.div>
            })
        }
    </div>
}

const SocialProof = () => {


    return (
        <section className="w-full flex flex-col min-h-[800px]">
            <HeadProof />
            <ReviewSection />
        </section>
    )
}


export default SocialProof;
