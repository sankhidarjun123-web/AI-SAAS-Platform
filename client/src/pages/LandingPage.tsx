import { useEffect, useState } from "react";
import HomeDisplay from "../components/LandingPage/HomeDisplay";
import SocialProof from "../components/LandingPage/Social";
import Footer from "../components/LandingPage/Footer";
import Features from "../components/LandingPage/Features";
import { Clickable } from "../components/commons/Clickable";
import { Companies } from "../components/LandingPage/Companies";
import { ArrowUp, MessageCircle } from "lucide-react";

const LandingPage = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section
            className="relative w-full min-h-screen
            dark:bg-slate-900
            dark:text-slate-50
            grid"
        >
            <header className="w-full h-full">
                <HomeDisplay />
            </header>

            <main className="w-full h-full">
                <Features />
                <Companies />
                <SocialProof />
            </main>

            <footer>
                <Footer />
            </footer>

            {/* Existing career mentor button */}
            <Clickable
                path="/career-mentor"
                classAdd="bg-white dark:bg-black"
                size={50}
                posLeft={10}
                posBottom={10}
            >
                <MessageCircle size={24} />
            </Clickable>

            {/* Scroll-to-top button: visible only after scrolling */}
            {showScrollTop && (
                <Clickable
                    onClick={scrollToTop}
                    classAdd="bg-white dark:bg-black cursor-pointer"
                    size={50}
                    posRight={10}
                    posBottom={10}
                >
                    <ArrowUp
                        size={24}
                        className="text-slate-800 dark:text-white"
                    />
                </Clickable>
            )}
        </section>
    );
};

export default LandingPage;