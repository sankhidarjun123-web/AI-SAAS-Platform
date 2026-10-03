import { useOutletContext } from "react-router-dom";
import type { InterviewReviewContext } from "../pages/interview-window/InterviewReview";

export const useInterviewReview = () => {
  return useOutletContext<InterviewReviewContext>();
};