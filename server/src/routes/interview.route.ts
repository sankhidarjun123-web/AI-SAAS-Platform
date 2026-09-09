import { Router } from "express";
import { createInterview, endInterview, getInterviews, startInterview, getConductedInterviewDetails } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const router = Router();


router.post("/create-interview", createInterview);

router.post("/start-interview/:interviewId", startInterview);

router.post("/end-interview/:interviewId", upload.single("interview"), endInterview);

router.get("/pending-interviews", getInterviews);

router.get("/interview-review/:interviewId", getConductedInterviewDetails);




export default router;