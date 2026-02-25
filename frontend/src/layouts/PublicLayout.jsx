import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import TopNavbar from '../components/TopNavbar';

const PublicLayout = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopNavbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {/* 
                  We don't enforce a global Container here because some public pages 
                  like StoreDetails need full-width hero sections.
                  The Container will be handled by individual pages where needed.
                */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default PublicLayout;
