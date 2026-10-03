import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import AsideDashboard from "../components/Dashboard/AsideDashboard";
import Footer from "../components/LandingPage/Footer";
import MobileNav from "../components/Dashboard/MobileNav";
import { navOptions } from "../components/Dashboard/AsideDashboard";
const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useOutletContext<{
    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  return (
    <div className="w-screen h-screen relative overflow-y-scroll">
      <div className="sm:block hidden">
        <AsideDashboard
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>

      <motion.main
        animate={{
          left: expanded ? "20%" : "5%",
          width: expanded ? "80%" : "95%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute top-5 h-full bg-[#EEE9DF] dark:bg-slate-950"
        style={{ width: expanded ? "80%" : "95%" }}
      >
        <div className="w-full h-full bg-[#F5F2EA] dark:bg-slate-900" style={{ scrollbarWidth: "-moz-initial" }}>
          {mobileMenuOpen ? (
            <MobileNav navItems={navOptions} setMobileMenuOpen={setMobileMenuOpen} />
          ) : <>
          <Outlet />
          <Footer />
          </>}
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;