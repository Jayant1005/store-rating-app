import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    LayoutDashboard,
    Users,
    Store,
    Package,
    LogOut,
    Menu as MenuIcon,
} from "lucide-react";

const drawerWidth = 260;

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate("/");
    };

    // Define navigation links based on role
    const adminLinks = [
        { text: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
        { text: "Users", icon: <Users />, path: "/admin/users" },
        { text: "Stores", icon: <Store />, path: "/admin/stores" },
    ];

    const ownerLinks = [
        { text: "Dashboard", icon: <LayoutDashboard />, path: "/owner/dashboard" },
        { text: "My Products", icon: <Package />, path: "/owner/products" },
    ];

    const links = user?.role === "System Administrator" ? adminLinks : ownerLinks;

    const drawerContent = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
            <Toolbar>
                <Typography variant="h6" color="primary" fontWeight="bold">
                    {user?.role === "System Administrator" ? "Admin Panel" : "Owner Panel"}
                </Typography>
            </Toolbar>
            <List sx={{ flexGrow: 1, px: 2 }}>
                {links.map((link) => {
                    const isActive = location.pathname.startsWith(link.path);
                    return (
                        <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(link.path);
                                    setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? "rgba(208, 68, 227, 0.1)" : "transparent",
                                    "&:hover": { bgcolor: "rgba(208, 68, 227, 0.2)" },
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? "primary.main" : "text.secondary", minWidth: 40 }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={link.text}
                                    primaryTypographyProps={{
                                        color: isActive ? "primary.main" : "text.primary",
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box sx={{ p: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "error.main", "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" } }}>
                        <ListItemIcon sx={{ color: "error.main", minWidth: 40 }}><LogOut /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: "background.default", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundImage: "none" }} elevation={0}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => { handleMenuClose(); navigate("/"); }}>Go to Website</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }}>
                    {drawerContent}
                </Drawer>
                <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, borderRight: "1px solid rgba(255,255,255,0.05)" } }} open>
                    {drawerContent}
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
