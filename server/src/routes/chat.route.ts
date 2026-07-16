import express from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { sendPrompt, getConversation, getConversations } from "../controllers/chat.controller.js";


const router = express.Router();


router.post("/new-chat", authenticate, sendPrompt);

router.get("/c/:chatId", authenticate, getConversation);

router.get("/history", authenticate, getConversations);


export default router;