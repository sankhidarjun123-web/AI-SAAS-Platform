import { api } from "./baseURL";

export const sendPrompt = async (chatId: string | null, message: string, getToken: () => Promise<string | null>) => {

    const token = await getToken();
    const response = await api.post("/chat/new-chat", {
        msg: message,
        chatId: chatId
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


export const getConversation = async (chatId: string, getToken: () => Promise<string | null>, skip: number, limit: number = 5) => {

    const token = await getToken();

    const response = await api.get(`/chat/c/${chatId}?limit=${limit}&skip=${skip}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return response.data;
}


export const getConversations = async (getToken: () => Promise<string | null>, skip: number, limit: number = 10) => {

    const token = await getToken();

    const response = await api.get(`/chat/history?limit=${limit}&skip=${skip}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
