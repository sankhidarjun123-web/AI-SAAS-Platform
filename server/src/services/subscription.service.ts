import pool from "../connection.js";

export const expireSubscriptions = async () => {
    try {
        const result = await pool.query(`
            UPDATE accounts
            SET plan = 'observer'
            WHERE plan = 'committed'
              AND subscription_end <= NOW()
            RETURNING id
        `);

        console.log(
            `[Subscription] Expired ${result.rowCount ?? 0} subscriptions`
        );

        return result.rowCount ?? 0;
    } catch (error) {
        console.error(
            "[Subscription] Failed to expire subscriptions:",
            error
        );

        throw error;
    }
};