import React, { useState } from "react";
import { createOrder } from "../../api/payment.api";
import { useNavigate } from "react-router-dom";

interface PaymentInfoProps {
    name: string;
    money: number;
    current: boolean;
    details: string[];
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
    name,
    money,
    current,
    details
}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOrder = async () => {
        if (loading || current) return;

        setLoading(true);

        try {
            const data = await createOrder(money);

            navigate("/payment", {
                state: {
                    orderId: data.orderId,
                    amount: data.amount,
                    currency: data.currency
                }
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`
                relative w-full overflow-hidden rounded-3xl
                border
                transition-all duration-500 ease-out

                ${
                    current
                        ? `
                            border-yellow-400/40
                            bg-gradient-to-br
                            from-yellow-400/20
                            via-yellow-200/10
                            to-transparent
                            shadow-[0_20px_60px_rgba(250,204,21,0.12)]
                        `
                        : `
                            border-slate-200
                            bg-white/70
                            hover:border-yellow-400/40
                            hover:shadow-[0_15px_45px_rgba(250,204,21,0.08)]
                            dark:border-slate-800
                            dark:bg-slate-950/60
                        `
                }
                backdrop-blur-xl
            `}
        >
            {/* Subtle golden glow */}
            {current && (
                <>
                    <div
                        className="
                            pointer-events-none
                            absolute -right-24 -top-24
                            h-72 w-72
                            rounded-full
                            bg-yellow-400/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute -bottom-32 -left-24
                            h-64 w-64
                            rounded-full
                            bg-amber-300/10
                            blur-3xl
                        "
                    />
                </>
            )}

            {/* Top accent */}
            {current && (
                <div
                    className="
                        absolute left-0 right-0 top-0 h-[2px]
                        bg-gradient-to-r
                        from-transparent
                        via-yellow-400
                        to-transparent
                    "
                />
            )}

            <div className="relative grid gap-6 p-7">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">

                    <div>
                        {current && (
                            <div
                                className="
                                    mb-3 inline-flex items-center gap-2
                                    rounded-full
                                    border border-yellow-400/30
                                    bg-yellow-400/10
                                    px-3 py-1.5
                                    text-xs font-bold
                                    uppercase tracking-[0.18em]
                                    text-yellow-700
                                    dark:text-yellow-400
                                "
                            >
                                <span className="text-sm">✦</span>
                                Current Plan
                            </div>
                        )}

                        <h3
                            className="
                                text-3xl font-bold
                                tracking-tight
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {name}
                        </h3>

                        <div className="mt-3 flex items-baseline">
                            <span
                                className="
                                    bg-gradient-to-r
                                    from-yellow-500
                                    via-amber-500
                                    to-yellow-600
                                    bg-clip-text
                                    text-4xl font-black
                                    text-transparent
                                    dark:from-yellow-300
                                    dark:via-amber-400
                                    dark:to-yellow-500
                                "
                            >
                                ₹{money}
                            </span>

                            <span
                                className="
                                    ml-2
                                    text-sm font-medium
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                / month
                            </span>
                        </div>
                    </div>

                    {/* Current indicator */}
                    {current && (
                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-full
                                border border-yellow-400/30
                                bg-yellow-400/10
                                text-xl
                                text-yellow-500
                            "
                        >
                            ✓
                        </div>
                    )}
                </div>

                {/* Subscription status */}
                {current && (
                    <div
                        className="
                            rounded-2xl
                            border border-yellow-400/20
                            bg-white/30
                            px-5 py-4
                            backdrop-blur-md
                            dark:bg-black/10
                        "
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p
                                    className="
                                        text-sm font-semibold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Your subscription is active
                                </p>

                                <p
                                    className="
                                        mt-1 text-xs
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    Your plan will renew automatically each
                                    billing period.
                                </p>
                            </div>

                            <span
                                className="
                                    shrink-0 rounded-full
                                    bg-yellow-400/15
                                    px-3 py-1
                                    text-xs font-bold
                                    text-yellow-700
                                    dark:text-yellow-400
                                "
                            >
                                Active
                            </span>
                        </div>
                    </div>
                )}

                {/* Features */}
                <div
                    className="
                        rounded-2xl
                        border border-slate-200/70
                        bg-white/40
                        p-5
                        backdrop-blur-md
                        dark:border-slate-800/70
                        dark:bg-black/20
                    "
                >
                    <div className="mb-4 flex items-center gap-3">

                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-xl
                                bg-yellow-400/15
                                text-yellow-600
                                dark:text-yellow-400
                            "
                        >
                            ✓
                        </div>

                        <h3
                            className="
                                text-base font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            What's included
                        </h3>
                    </div>

                    <ul className="grid gap-2 sm:grid-cols-2">
                        {details.map((detail, i) => (
                            <li
                                key={i}
                                className="
                                    flex items-center gap-3
                                    rounded-xl
                                    px-3 py-2
                                    text-sm font-medium
                                    text-slate-700
                                    transition-all duration-200
                                    hover:bg-yellow-400/5
                                    dark:text-slate-300
                                "
                            >
                                <span
                                    className="
                                        flex h-6 w-6 shrink-0
                                        items-center justify-center
                                        rounded-full
                                        border border-yellow-400/50
                                        bg-yellow-400/10
                                        text-xs font-black
                                        text-yellow-600
                                        dark:text-yellow-400
                                    "
                                >
                                    ✓
                                </span>

                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action */}
                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading || current}
                        className={`
                            rounded-xl
                            border
                            px-6 py-3
                            text-sm font-bold
                            transition-all duration-300
                            ${
                                current
                                    ? `
                                        cursor-default
                                        border-yellow-400/30
                                        bg-yellow-400/10
                                        text-yellow-700
                                        dark:text-yellow-400
                                    `
                                    : `
                                        cursor-pointer
                                        border-yellow-500
                                        bg-gradient-to-r
                                        from-yellow-400
                                        to-amber-500
                                        text-black
                                        hover:-translate-y-0.5
                                        hover:shadow-lg
                                        hover:shadow-yellow-500/20
                                        active:scale-95
                                    `
                            }
                        `}
                    >
                        {loading
                            ? "Processing..."
                            : current
                              ? "Current Plan"
                              : "Choose Plan"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default PaymentInfo;