import { api } from "./baseURL";



export const createOrder = async (amount: number) => {

    const response = await api.post("/payment/order/create", { amount });

    return response.data;
}