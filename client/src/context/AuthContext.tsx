import { useState, useEffect, useContext, createContext, type ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { syncClient } from "../api/auth.api";


interface AuthProviderProps {
    children: ReactNode;
}

type EmptyObject = Record<string, never>;

interface AccountDataKeys {
    name?: string | null,
    id: string, 
    clerkid: string,
    email: string,
    profile: string,
    created_at: string,
    updated_at: string
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean,
    accountData: AccountDataKeys | EmptyObject
}

export const AuthContext = createContext<AuthContextType | null>(null);   // context through the app for account management

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const { isLoaded, isSignedIn, getToken } = useAuth();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [accountData, setAccountData] = useState<AccountDataKeys | EmptyObject>({});

    useEffect(() => {

        if(!isLoaded) return;

        // function to fire the request on every render of the page to check 
        // if the user is authenicated
        const makeAuthCheckReq = async () => {
            if(!isSignedIn) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
            try {

                const token: string | null = await getToken();

                if (!token) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }
                const data = await syncClient(token);
                setIsAuthenticated(true);
                setAccountData(data?.account);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }

        makeAuthCheckReq();
        
    }, [isSignedIn, getToken, isLoaded]);


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                accountData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// hook for account management
export const useAccount = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

