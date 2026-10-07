import cron from "node-cron";
import { expireSubscriptions } from "../services/subscription.service.js";

export const startSubscriptionJob = () => {
    cron.schedule(
        "0 0 * * *",
        async () => {
            console.log("[Subscription Job] Running daily subscription check...");

            try {
                await expireSubscriptions();
            } catch (error) {
                console.error(
                    "[Subscription Job] Error:",
                    error
                );
            }
        },
        {
            timezone: "Asia/Kolkata"
        }
    );

    console.log(
        "[Subscription Job] Scheduled to run every day at midnight IST"
    );
};