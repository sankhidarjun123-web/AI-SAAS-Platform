import type { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/express";

const checkSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const clerkId = req.clerkId;
        const userId = req.userId;
        if (!userId || !clerkId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const subscription =
            await clerkClient.billing.getUserBillingSubscription(clerkId);

        const isSubscribed =
            subscription.status === "active" &&
            subscription.subscriptionItems.some(
                item =>
                    item.status === "active" &&
                    item.plan?.slug === "mentor_pro"
            );

        req.isSubscribed = isSubscribed;

        next();

    } catch (error) {
        console.error("Subscription check error:", error);

        return res.status(500).json({
            message: "Failed to check subscription"
        });
    }
};

export default checkSubscription;