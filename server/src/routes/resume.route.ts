import { Router } from "express";
import { upload } from "../middlewares/file.middleware.js";
import { addResume, getAllResumes, getResume, deleteResume } from "../controllers/resume.controller.js";

const router = Router();

router.post(
    "/",
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

router.delete(
    "/resume-review/:resumeId",
    deleteResume
);

export default router;