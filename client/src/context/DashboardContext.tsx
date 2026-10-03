import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";


export const DashboardContext = createContext<any>(null);
export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {

    const { getToken } = useAuth();
    const [details, setDetails] = useState(null);
    const [dashLoading, setDashLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setDashLoading(true);
                const token = await getToken();

                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dashboard/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDetails(response?.data?.details);
                console.log(response?.data?.details);
            } catch (err) {

                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        console.log("Please authorize");
                    }
                }

                console.error(err);
            } finally {
                setDashLoading(false);
            }
        }

        fetchDetails();
    }, []);


    return <DashboardContext.Provider value={{ dashLoading, details }}>{children}</DashboardContext.Provider>
}



export const useDash = () => {
    return useContext(DashboardContext);
}