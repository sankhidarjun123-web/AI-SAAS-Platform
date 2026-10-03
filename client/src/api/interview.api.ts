import { api } from "./baseURL";
import type { InterviewData } from "../pages/dashboard/InterviewHome";


export const createInterview = async (interviewData: InterviewData) => {


    const response = await api.post("/interview/create-interview", {
        ...interviewData
    });

    return response.data;
}


export const startInterview = async (interviewId: string) => {

    const response = await api.post(`/interview/start-interview/${interviewId}`, {});

    return response.data;
}


export const endInterview = async (interviewId: string | undefined, formData: FormData) => {

    const response = await api.post(`/interview/end-interview/${interviewId}`, formData);

    return response.data;
}


export const getPendingInterviews = async (skip: number, limit: number = 10) => {

    const response = await api.get(`/interview/pending-interviews?limit=${limit}&skip=${skip}`);

    return response.data;
}


export const getCompletedInterviewDetails = async(interviewId: string) => {
    
    const response = await api.get(`/interview/interview-review/${interviewId}`);

    return response.data;
}