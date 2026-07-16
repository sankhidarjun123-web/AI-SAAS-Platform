import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { useEffect, useState } from "react";
import Popup from "./components/commons/Popup";
import { SignIn } from "@clerk/clerk-react";
import PricingScreen from "./pages/PricingScreen";
import Dashboard from "./layouts/Dashboard";
import Home from "./layouts/Home";
import CareerMentor from "./layouts/CareerMentor";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";

function App() {

  const mode = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [mode]);

  return (<>
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<Home />}>
        <Route index element={<LandingPage />} />
        <Route path="billing" element={<PricingScreen />} />
          <Route path="dashboard" element={<Dashboard />}>
            {/* <Route index element={<ProtectedRoute></ ProtectedRoute>} /> */}
            <Route path="resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          </Route>
        <Route path="/career-mentor">
          <Route index element={<ProtectedRoute><CareerMentor /></ProtectedRoute>} />
          <Route path=":chatId" element={<ProtectedRoute><CareerMentor /></ProtectedRoute>} />
        </Route>
      </Route>

      {!state?.backgroundLocation && (
        <Route
          path="/login/*"
          element={<div className="w-full h-screen overflow-hidden flex items-center justify-center"><SignIn appearance={{
            elements: {
              card: "bg-slate-900 rounded-3xl border border-slate-700",
              headerTitle: "text-4xl font-bold text-white",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 rounded-xl py-3",
              footerActionLink:
                "text-blue-500 hover:text-blue-400"
            }
          }} routing="path" path="/login" /></div>}
        />
      )}
    </Routes>

    {state?.backgroundLocation && (
      <Routes>
        <Route
          path="/login/*"
          element={
            <Popup onClose={() => navigate(-1)}>
              <SignIn appearance={{
                elements: {
                  card: "bg-slate-200 rounded-3xl border border-slate-700",
                  headerTitle: "text-4xl font-bold text-white",
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 rounded-xl py-3",
                  footerActionLink:
                    "text-blue-500 hover:text-blue-400"
                }
              }} routing="path" path="/login" />
            </Popup>
          }
        />
      </Routes>
    )}
  </>);
}

export default App;