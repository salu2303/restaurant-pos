import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext); // ✅ Ensure token is retrieved correctly

    if (!token) {
        console.log("🚫 User is not logged in, redirecting to /login"); // Debug log
        return <Navigate to="/login" />;
    }

    console.log("✅ User is authenticated, allowing access to page"); // Debug log
    return children;
};

export default PrivateRoute;
