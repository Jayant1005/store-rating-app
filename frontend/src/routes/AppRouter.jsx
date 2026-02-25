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
import SearchResults from "../pages/public/SearchResults";
import Profile from "../pages/public/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import StoreApprovals from "../pages/admin/StoreApprovals";

// Owner Pages
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import ManageProducts from "../pages/owner/ManageProducts";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes wrapped in PublicLayout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/:id" element={<StoreDetails />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/profile" element={
                        <ProtectedRoute allowedRoles={["normal", "owner", "admin"]}>
                            <Profile />
                        </ProtectedRoute>
                    } />
                </Route>

                {/* Admin Dashboard Routes - Protected */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<UserManagement />} />
                        <Route path="/admin/stores" element={<StoreApprovals />} />
                    </Route>
                </Route>

                {/* Owner Dashboard Routes - Protected */}
                <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                        <Route path="/owner/products" element={<ManageProducts />} />
                    </Route>
                </Route>

                {/* Fallback for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
