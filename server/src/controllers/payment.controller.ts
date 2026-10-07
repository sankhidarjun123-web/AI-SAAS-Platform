import { razorpay } from "../config/razorpay.js";
import type { Request, Response } from "express";
import pool from "../connection.js";
import crypto from "crypto";

export const createOrder = async (req: Request, res: Response) => {


    const userId = req.userId;


    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {

        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid Amount",
                sucess: false
            });
        }

        const options = {
            amount: amount * 100, // INR → paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId
            }
        };

        const order = await razorpay.orders.create(options);

        await pool.query(
            `
            INSERT INTO payments (user_id, razorpay_order_id, amount, currency, status)
            VALUES ($1, $2, $3, $4, $5)
            `, [
            userId, order.id, order.amount, order.currency, order.status
        ]
        );

        return res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



export const confirmPayment = async (req: Request, res: Response) => {


    try {

        const userId = req.userId;

        if (!userId) {
            console.error("Unauthorized");
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const { plan, razorpayPaymentId, razorpayOrderId, amount, status, razorpaySignature } = req.body;

        if (!plan || !razorpayPaymentId || !razorpayOrderId || !amount || !status) {
            console.error("Empty fields");
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            console.error("Signature didn't matched");
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        if (status !== "paid") {
            console.error("Payment not successful");
            await pool.query(
                `
            UPDATE payments SET status = $1 WHERE razorpay_order_id = $2
            `, [
                status, razorpayOrderId
            ]
            );
            return res.status(400).json({
                message: "Payment not successful",
                success: false
            });
        }


        await pool.query(
            `
            UPDATE payments
            SET razorpay_payment_id = $1, status = $2
            WHERE razorpay_order_id = $3
            `, [
            razorpayPaymentId, status, razorpayOrderId
        ]
        );

        await pool.query(
            `UPDATE accounts
     SET plan = $1,
         subscription_start = NOW(),
         subscription_end = NOW() + INTERVAL '30 days'
     WHERE id = $2`,
            [plan, userId]
        );


        res.status(200).json({
            message: "Payment confirmed and subscription updated",
            success: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}