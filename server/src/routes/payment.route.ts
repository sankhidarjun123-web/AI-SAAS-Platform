import { createOrder, confirmPayment } from "../controllers/payment.controller.js";
import { Router } from "express";


const router = Router();


router.post("/order/create", createOrder);

router.post("/order/verify", confirmPayment);

export default router;