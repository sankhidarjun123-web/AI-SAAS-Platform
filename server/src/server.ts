import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import cors from "cors";
import authApi from "./routes/auth.route.js";
import chatApi from "./routes/chat.route.js";
import { clerkMiddleware } from '@clerk/express'

const app = express();
const server = http.createServer(app);


const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use("/auth", authApi);

app.use("/chat", chatApi);


server.listen(PORT, () => {
    console.log(`Server running at port 5000: http://localhost:${5000}/`);
})