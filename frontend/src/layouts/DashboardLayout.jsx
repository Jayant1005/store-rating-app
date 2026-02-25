import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopNavbar from '../components/TopNavbar';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    // We assume useAuth returns the user object which contains the role
    const { user } = useAuth();

    // Fallback role if somehow user is not loaded but layout renders
    const role = user?.role || 'owner';

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <DashboardSidebar role={role} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { sm: `calc(100% - 260px)` } }}>
                <TopNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#0a0a0a' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
