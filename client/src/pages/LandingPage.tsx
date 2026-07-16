import NavBar from "../components/LandingPage/NavBar";
import Display from "../components/LandingPage/Display";
import SocialProof from "../components/LandingPage/Social";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {



    return (
        <section className="w-full min-h-screen
    dark:bg-slate-900
    dark:text-slate-50
     grid">
            <header className="w-full h-full">
                <Display />
            </header>

            <main className="w-full h-full">
                <SocialProof />
            </main>

            <footer>
                <Footer />
            </footer>
        </section>
    );
}


export default LandingPage;