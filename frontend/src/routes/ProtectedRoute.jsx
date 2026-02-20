import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    // If the user isn't authenticated at all, kick them to login and save where they were going
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If specific roles are required, check the user's role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // If they have the wrong role, kick them back to a safe space
        return <Navigate to="/" replace />;
    }

    // They pass the bouncer, let them render the route
    return <Outlet />;
};

export default ProtectedRoute;
