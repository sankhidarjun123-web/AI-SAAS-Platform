import { Router } from "express";
import { upload } from "../middlewares/file.middleware.js";
import { addResume, getAllResumes, getResume, deleteResume, fixResumeDetails } from "../controllers/resume.controller.js";
import { planLimit } from "../middlewares/planLimit.middleware.js";

const router = Router();

router.post(
    "/",
    planLimit("Resume", [10, 3], "resumes"),
    upload.single("resume"),
    addResume
);

router.get(
    "/resume-review/:resumeId",
    getResume
);

router.get(
    "/resume-list",
    getAllResumes
);

router.post(
    "/fix-resume/:resumeId",
    fixResumeDetails
);

router.delete(
    "/resume-review/:resumeId",
    deleteResume
);

export default router;