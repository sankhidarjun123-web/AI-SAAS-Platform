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
    const location = useLocation();

    const page = location.pathname.split("/")[1] || "home";
    const Skeleton = locateSkeleton[page] || RealMentorSkeleton;
    return (<section className="w-full min-h-screen overflow-hidden">
        {isLoading ? <Skeleton /> : <>
        <NavBar />
        <div className="h-20 w-full"></div>
        <Outlet />
        </>}
    </ section>)
}


export default Home;