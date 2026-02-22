import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import StoreDetails from "../pages/public/StoreDetails";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
// import UserManagement from "../pages/admin/UserManagement";
// import StoreApprovals from "../pages/admin/StoreApprovals";

// Owner Pages
import OwnerDashboard from "../pages/owner/OwnerDashboard";
// import ManageProducts from "../pages/owner/ManageProducts";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes wrapped in PublicLayout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/:storeId" element={<StoreDetails />} />
                </Route>

                {/* Admin Dashboard Routes - Protected */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<div>User Management Placeholder</div>} />
                        <Route path="/admin/stores" element={<div>Store Management Placeholder</div>} />
                    </Route>
                </Route>

                {/* Owner Dashboard Routes - Protected */}
                <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                        <Route path="/owner/products" element={<div>Manage Products Placeholder</div>} />
                    </Route>
                </Route>

                {/* Fallback for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
