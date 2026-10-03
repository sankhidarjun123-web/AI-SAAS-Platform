import { useState, useEffect } from "react";
import { type ComponentType } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAccount } from "../context/AuthContext";
import NavBar from "../components/LandingPage/NavBar"
import RealMentorSkeleton from "../ui/skeleton/RealMentorSkeleton";
import CareerMentorChatSkeleton from "../ui/skeleton/CareerMentorChatSkeleton";


const locateSkeleton: Record<string, ComponentType> = {
    "career-mentor": CareerMentorChatSkeleton,
    "home": RealMentorSkeleton 
}

const Home = () => {

    const { isLoading } = useAccount();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [openHistory, setOpenHistory] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const page = location.pathname.split("/")[1] || "home";
    const Skeleton = locateSkeleton[page] || RealMentorSkeleton;
    return (<section className="w-full min-h-screen overflow-hidden">
        {isLoading ? <Skeleton /> : <>
        <NavBar isMobile={isMobile} setMobileMenuOpen={setMobileMenuOpen} setOpenHistory={setOpenHistory} />
        <div className="h-16 w-full"></div>
        <Outlet context={{ mobileMenuOpen, setMobileMenuOpen, openHistory, mobileWidth: isMobile }} />
        </>}
    </ section>)
}


export default Home;