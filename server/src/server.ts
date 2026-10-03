import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import cors from "cors";
import authApi from "./routes/auth.route.js";
import chatApi from "./routes/chat.route.js";
import resumeApi from "./routes/resume.route.js";
import interviewApi from "./routes/interview.route.js";
import paymentApi from "./routes/payment.route.js";
import dashboardApi from "./routes/dashboard.route.js";
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from "./middlewares/authenticate.middleware.js";


const app = express();
const server = http.createServer(app);


const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.use("/dashboard", authenticate, dashboardApi);

app.use("/auth", authApi);

app.use("/chat", chatApi);

app.use("/payment", authenticate, paymentApi);

app.use("/resume", authenticate, resumeApi);

app.use("/interview", authenticate, interviewApi);


server.listen(PORT, () => {
    console.log(`Server running at port 5000: http://localhost:${5000}/`);
})