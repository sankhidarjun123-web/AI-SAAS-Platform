import HomeDisplay from "../components/LandingPage/HomeDisplay";
import SocialProof from "../components/LandingPage/Social";
import Footer from "../components/LandingPage/Footer";
import Features from "../components/LandingPage/Features";
import { Clickable } from "../components/commons/Clickable";
import { Companies } from "../components/LandingPage/Companies";
import { MessageCircle } from "lucide-react";

const LandingPage = () => {



    return (
        <section className="relative w-full min-h-screen
    dark:bg-slate-900
    dark:text-slate-50
     grid">
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

            <Clickable
                path="/career-mentor"
                color="bg-white"
                size={50}
                posLeft={10}
                posBottom={10}
            >
                <MessageCircle size={24} />
            </Clickable>
        </section>
    );
}


export default LandingPage;