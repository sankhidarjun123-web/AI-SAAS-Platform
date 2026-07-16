import { useAccount } from "../context/AuthContext";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {

    children: ReactNode
}


const ProtectedRoute = ({children}: ProtectedRouteProps ) => {


    const { isAuthenticated } = useAccount();

    if(!isAuthenticated) return <Navigate to="/login" />

    return <>
    {children}
    </>
}

export default ProtectedRoute;