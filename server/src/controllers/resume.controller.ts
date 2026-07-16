import type { Request, Response } from "express";



const addResume = (
    req: Request,
    res: Response
) => {

    try {

        const userId = req.userId;

        if(!userId) return res.status(401).json({ message: "Unauthorized" });
        

    } catch (err) {

    }
}