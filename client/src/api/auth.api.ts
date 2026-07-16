import { api } from "./baseURL";


export const syncClient = async (token: string | null) => {

    const response = await api.post("/auth/sync", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
} 