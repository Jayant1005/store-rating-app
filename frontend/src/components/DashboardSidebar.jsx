import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Toolbar,
    Divider,
    Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const DashboardSidebar = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Define links based on role
    const links = [];
    if (role === 'admin') {
        links.push({ text: 'Admin Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' });
        links.push({ text: 'Manage Users', icon: <PeopleIcon />, path: '/admin/users' });
        links.push({ text: 'Store Approvals', icon: <StoreIcon />, path: '/admin/stores' });
    } else if (role === 'owner') {
        links.push({ text: 'Store Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' });
        links.push({ text: 'Manage Products', icon: <InventoryIcon />, path: '/owner/products' });
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#1a1a1a', // Dark theme standard
                    borderRight: '1px solid #333'
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold">
                    {role === 'admin' ? 'SYSTEM ADMIN' : 'STORE OWNER'} PANEL
                </Typography>
            </Toolbar>
            <Divider sx={{ borderColor: '#333' }} />
            <Box sx={{ overflow: 'auto', mt: 2 }}>
                <List>
                    {links.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        mx: 2,
                                        borderRadius: 2,
                                        bgcolor: active ? 'rgba(156, 39, 176, 0.15)' : 'transparent',
                                        color: active ? 'primary.main' : 'text.primary',
                                        '&:hover': {
                                            bgcolor: 'rgba(156, 39, 176, 0.25)',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: active ? 'bold' : 'normal' }} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Drawer>
    );
};

export default DashboardSidebar;
