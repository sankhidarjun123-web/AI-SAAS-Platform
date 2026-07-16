import { useState, useEffect, useRef } from "react";
import {
    Selected as img1,
    Meeting as img2,
    Online as img3,
    Mock as img4,
    ATS as img5,
    SelectedF as img6,
    Offer as img7
} from "../../assets/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stats } from "../../data/reviews";
import { AnimatePresence, motion } from "framer-motion";

const Display = () => {
    const [show, setShow] = useState<boolean>(false);
    const [direction, setDirection] = useState<1 | -1>(1);
    const images: string[] = [img1, img2, img3, img4, img5, img6, img7];
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [currentState, setCurrentState] = useState<number>(0);

    const intervalRef = useRef<number | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    const startAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
            setDirection(1);
            setCurrentImg(prev => (prev + 1) % images.length);
        }, 6000);
    };

    const handleImage = (dir: 1 | -1) => {
        setDirection(dir);

        setCurrentImg(prev =>
            (prev + dir + images.length) % images.length
        );

        startAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                }
            }, {
            threshold: 0.2
        }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentState(prev => (prev + 1) % stats.length);
        }, 3000); // every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return <div className="relative overflow-hidden w-full min-h-[600px] sm:min-h-[900px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentImg}
                initial={{ x: direction === 1 ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: direction === 1 ? "-100%" : "100%" }}
                transition={{ duration: 0.5 }}
                className="
      absolute
      inset-0
      bg-cover
      bg-center
      bg-no-repeat
    "
                style={{
                    backgroundImage: `url(${images[currentImg]})`,
                }}
            />
        </ AnimatePresence>
        <div
            className="w-full relative
    z-10 mt-16 flex flex-col items-center text-center">
            <motion.div
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
                    duration: 0.5
                }}
                className="p-2 text-sm rounded-full border-2 border-yellow-400/30
bg-yellow-400/10
backdrop-blur-sm">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentState}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        {stats[currentState]}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
            <motion.h1
                className="
            text-5xl
            md:text-7xl
            font-extrabold
            tracking-tight
            text-white
            drop-shadow-lg
            "
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
                    duration: 0.5
                }}
            >
                Real Mentor AI
            </motion.h1>

            <motion.p
                className="
            mt-6
            text-sm
            md:text-2xl
            text-white/90
            leading-relaxed
            max-w-3xl
            rounded-sm
            p-5
            "
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
                    delay: 0.3
                }}
            >
                Master coding interviews, build confidence, and
                accelerate your career with AI-powered mock interviews,
                personalized feedback, and structured learning paths.
            </motion.p>

            <motion.div className="flex gap-4 mt-10 flex-wrap justify-center"
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
                    delay: 0.5
                }}>
                <button
                    className="
                px-8 py-3
                rounded-lg
                common-btn
                cursor-pointer
                text-black
                font-semibold
                shadow-lg
                transition-all
                "
                >
                    Start Learning
                </button>

                <button
                    className="
                cursor-pointer
                px-8 py-3
                rounded-lg
                border-2
                border-white/50
                text-white
                hover:bg-white/10
                transition-all
                "
                >
                    Explore Features
                </button>
            </motion.div>
        </ div>
        <div className="relative z-10 mt-20 w-full flex justify-center items-center">
            <button className="cursor-pointer" onClick={() => handleImage(-1)}>
                <ChevronLeft color="white" width={16} height={16} />
            </button>
            <div className="flex px-3 gap-3">
                {Array.from({ length: images.length }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentImg ? 1 : -1);
                            setCurrentImg(i);
                        }}
                        className={`w-2 h-2 cursor-pointer rounded-full ${i === currentImg ? "bg-slate-100" : "bg-slate-100/70"
                            }`}
                    />
                ))}
            </div>
            <button className="cursor-pointer" onClick={() => handleImage(1)}>
                <ChevronRight color="white" width={16} height={16} />
            </button>
        </div>
    </div>
}

export default Display;