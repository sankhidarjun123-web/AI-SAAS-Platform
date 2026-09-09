import { api } from "./baseURL";


export const createChat = async (aiPrompt: string) => {

    const response = await api.post("/chat/new-chat", { msg: aiPrompt });

    return response.data;
}

export const sendPrompt = async (chatId: string | null, message: string) => {
    
    let response;
    if (!chatId) {
        response = await api.post("/chat/c", {
            msg: message
    });

    } else {
        response = await api.post(`/chat/c/${chatId}`, {
            msg: message
        });
    }

    return response.data;
}


export const getConversation = async (chatId: string, getToken: () => Promise<string | null>, skip: number, limit: number = 5) => {


    const response = await api.get(`/chat/c/${chatId}?limit=${limit}&skip=${skip}`)

    return response.data;
}


export const getConversations = async (getToken: () => Promise<string | null>, skip: number, limit: number = 10) => {

    const response = await api.get(`/chat/history?limit=${limit}&skip=${skip}`);

    return response.data;
}
