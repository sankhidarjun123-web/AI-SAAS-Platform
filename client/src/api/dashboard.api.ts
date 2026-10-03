import { api } from "./baseURL";




export const interviewProgress = async (skip: number, limit: number = 10): Promise<any> => {

    const response = await api.get(`/dashboard/interview/list?limit=${limit}&skip=${skip}`);

    return response.data;
}


export const interviewTotal = async () => {
        const response = await api.get(`/dashboard/interview/total`);
        
        return response.data;
}