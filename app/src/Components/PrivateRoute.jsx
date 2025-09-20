import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const token = localStorage.getItem("token") // token saved after login
    return token ? children : <Navigate to="/login"/>
}