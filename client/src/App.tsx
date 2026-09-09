import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { setupInterceptors } from "./api/baseURL";
import { signInAppearance } from "./data/styles";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { useEffect } from "react";
import Popup from "./components/commons/Popup";
import { SignIn } from "@clerk/clerk-react";
import PricingScreen from "./pages/PricingScreen";
import Dashboard from "./layouts/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Home from "./layouts/Home";
import CareerMentor from "./layouts/CareerMentor";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import ResumeReview from "./pages/dashboard/ResumeReview";
import InterviewHome from "./pages/dashboard/InterviewHome";
import InterviewWindow from "./layouts/InterviewWindow";
import Setup from './pages/interview-window/Setup';
import InterviewScreen from "./pages/interview-window/InterviewScreen";
import { Error } from "./pages/Error";
import PendingInterviewList from "./pages/dashboard/PendingInterviewList";
import EndScreen from "./pages/interview-window/EndScreen";
import MockTestList from "./pages/dashboard/MockTestList";
import InterviewReview from "./pages/interview-window/InterviewReview";
import SettingsPage from "./pages/SettingPage";
import QuestionAnalysis from "./features/interview-review/QuestionAnalysis";
import KeyMoments from "./features/interview-review/KeyMoments";
import VideoAndAudioAnalysis from "./features/interview-review/VideoAndAudioAnalysis";
import FullScreenLayout from "./layouts/FullScreenLayout";

function App() {

  const { getToken } = useAuth();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  useEffect(() => {
    setupInterceptors(getToken);
  }, [getToken]);

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
          <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<ProtectedRoute><DashboardHome /></ ProtectedRoute>} />
          <Route path="resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="mock-interview" element={<ProtectedRoute><InterviewHome /></ProtectedRoute>} />
          <Route path="pending-interviews" element={<ProtectedRoute><PendingInterviewList /></ProtectedRoute>} />
          <Route path="mock-test" element={<ProtectedRoute><MockTestList /></ProtectedRoute>} />
        </Route>
        <Route path="/career-mentor">
          <Route index element={<CareerMentor />} />
          <Route path=":chatId" element={<CareerMentor />} />
        </Route>
      </Route>

      <Route path="/interview-window" element={<FullScreenLayout />}>
        <Route element={<InterviewWindow />}>
          <Route path=":interviewId/setup" element={<Setup />} />
          <Route path=":interviewId/screen" element={<InterviewScreen />} />
          <Route path=":interviewId/end" element={<EndScreen />} />
        </Route>
      </Route>

      <Route path='/interview-review' element={<InterviewReview />}>
        <Route index element={<QuestionAnalysis />} />
        <Route path="question-analysis" element={<QuestionAnalysis />} />
        <Route path="video-audio-analysis" element={<VideoAndAudioAnalysis />} />
        <Route path="key-moments" element={<KeyMoments />} />
      </Route>

      <Route path="/resume-review/:resumeId" element={<ProtectedRoute><ResumeReview /></ProtectedRoute>} />

      <Route path="error" element={<Error />} />

      <Route path="/settings" element={<SettingsPage />} />

      {!state?.backgroundLocation && (
        <Route
          path="/login/*"
          element={<div className="w-full h-screen overflow-hidden flex items-center justify-center">
            <SignIn
              routing="path"
              path="/login"
              appearance={signInAppearance}
            />
          </div>}
        />
      )}
    </Routes>

    {state?.backgroundLocation && (
      <Routes>
        <Route
          path="/login/*"
          element={
            <Popup onClose={() => navigate(-1)}>
              <SignIn appearance={signInAppearance} routing="path" path="/login" />
            </Popup>
          }
        />
      </Routes>
    )}
  </>);
}

export default App;