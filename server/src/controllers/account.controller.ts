import { clerkClient, getAuth } from "@clerk/express";
import pool from "../connection.js";
import type{ Request, Response } from "express";


// Function to check the current account existance and return it, if the account doesn't exists
// it will create a new account and return it
export const syncClient = async (req: Request, res: Response) => {
    try {

        const { userId } = getAuth(req);  

        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const clerkUser = await clerkClient.users.getUser(userId);

        const user = await pool.query(`SELECT * FROM accounts WHERE clerkId = $1`,
            [clerkUser?.id]
        );          // account exists

        // account doesn't exists
        if(user.rows.length === 0) {

            const createdUser = await pool.query(`INSERT INTO accounts (clerkId, name, email, profile)
                              VALUES ($1, $2, $3, $4)`,
                            [
                                clerkUser?.id,
                                clerkUser?.fullName,
                                clerkUser?.emailAddresses[0]?.emailAddress,
                                clerkUser?.imageUrl
                            ]);
            return res.status(201).json({
                message: "New user created",
                user: createdUser.rows[0]
            });
        }

        res.status(200).json({ message: "Success", account: user.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error"});
    }
}