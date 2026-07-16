import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AsideDashboard from "../components/Dashboard/AsideDashboard";

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <AsideDashboard
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <motion.main
        animate={{
          left: expanded ? "20%" : "5%",
          width: expanded ? "80%" : "95%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute top-20 h-full bg-[#EEE9DF] dark:bg-slate-950"
        style={{ width: expanded ? "80%" : "95%" }}
      >
        <div className="w-full h-full bg-[#F5F2EA] dark:bg-slate-900">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;