import React from "react";
import { Redirect } from "wouter";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    return token ? children : <Redirect to="/login" />;
};

export default ProtectedRoute;
