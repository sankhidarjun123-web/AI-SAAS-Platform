import axios from "axios";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`
});


export const setupInterceptors = (
  getToken: () => Promise<string | null>
) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};