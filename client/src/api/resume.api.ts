import { api } from "./baseURL";

// upload a resume to review and store
export const uploadResume = async (
    formData: FormData
): Promise<any> => {
    const response = await api.post(
        "/resume",
        formData
    );

    return response.data;
};

// get a resume review of the client
export const getResume = async (
    resumeId: string,
    getToken: () => Promise<string | null>
) => {

    const response = await api.get(
        `/resume/resume-review/${resumeId}`
    );

    return response.data;
}

// get user's past resume reviews
export const getAllResumes = async (
    getToken: () => Promise<string | null>,
    skip: number,
    limit: number = 5
) => {


    const response = await api.get(
        `/resume/resume-list?limit=${limit}&skip=${skip}`
    );

    return response.data;
}

// delete a resume review of the client
export const deleteResume = async (
    getToken: () => Promise<string | null>,
    resume_id: string
) => {

    const response = await api.delete(
        `/resume/resume-review/${resume_id}`
    );

    return response.data;
}