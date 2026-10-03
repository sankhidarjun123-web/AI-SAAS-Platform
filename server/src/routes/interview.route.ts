import { Router } from "express";
import { createInterview, endInterview, getInterviews, startInterview, getConductedInterviewDetails } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";
import { planLimit } from "../middlewares/planLimit.middleware.js";
import { requiredFeature } from "../middlewares/requiredFeature.middleware.js";

const router = Router();


router.post("/create-interview", requiredFeature("interview"), planLimit("Interview", [5, 0], "interviews"), createInterview);

router.post("/start-interview/:interviewId", requiredFeature("interview"), planLimit("Interview", [5, 0], "interviews"), startInterview);

router.post("/end-interview/:interviewId", upload.single("interview"), endInterview);

router.get("/pending-interviews", getInterviews);

router.get("/interview-review/:interviewId", getConductedInterviewDetails);




export default router;