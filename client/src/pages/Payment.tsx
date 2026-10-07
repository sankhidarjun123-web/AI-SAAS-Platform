import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { loadRazorpay } from "../utils/loadRazorpay";
import { AppIcon } from "../assets/images";
import axios from "axios";

interface PaymentProps {
    orderId: string;
    amount: number;
    currency: string;
    plan: "committed" | "observer";
}

const Payment = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { orderId, amount, currency, plan }: PaymentProps = location.state;

    useEffect(() => {
        const openRazorpay = async () => {
            const loaded = await loadRazorpay();

            if (!loaded) {
                alert("Razorpay failed to load");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount,
                currency,

                order_id: orderId,
                image: AppIcon,

                name: "Real Mentor AI (Committed)",
                description: `By doing a payment of ${amount} INR, you are officially becoming committed to features
                full toolkit of real mentor ai.`,

                handler: async (response: any) => {
                    try {

                        const token = await getToken();
                        if (!token) {
                            console.error("Clerk token is empty");
                            return;
                        }
                        const result = await axios.post(
                            `${import.meta.env.VITE_SERVER_URL}/payment/order/verify`,
                            {
                                status: "paid",
                                amount,
                                plan: plan || "committed",
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        if (result.data.success) {
                            console.log("Payment verified successfully!");

                            navigate("/billing", { replace: true });
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                    }
                },

                modal: {
                    ondismiss: () => {
                        console.log("Payment cancelled");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();
        };

        openRazorpay();
    }, [orderId, amount, currency]);

    return null;
};

export default Payment;