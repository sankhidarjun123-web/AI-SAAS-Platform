import express from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { checkDailyLimit } from "../middlewares/chat.middleware.js";
import checkSubscription from "../middlewares/billing.middleware.js";
import { createChat, sendPrompt, getConversation, getConversations } from "../controllers/chat.controller.js";


const router = express.Router();


router.post("/new-chat", authenticate, createChat);

router.post("/c", authenticate, checkSubscription, checkDailyLimit, sendPrompt);

router.post("/c/:chatId", authenticate, checkSubscription, checkDailyLimit, sendPrompt);

router.get("/c/:chatId", authenticate, getConversation);

router.get("/history", authenticate, getConversations);


export default router;