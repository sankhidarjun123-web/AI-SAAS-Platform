/* 
This file contains all the routes for the 
user authentication and authorization
*/
import express from "express";
import { syncClient } from "../controllers/account.controller.js";
import { requireAuth } from "@clerk/express";


const router = express.Router();


router.post("/sync", requireAuth(), syncClient);


export default router;