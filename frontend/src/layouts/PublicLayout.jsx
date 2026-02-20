import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store } from "lucide-react";

const PublicLayout = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleDashboardRedirect = () => {
        if (user?.role === "System Administrator") navigate("/admin/dashboard");
        else if (user?.role === "Store Owner") navigate("/owner/dashboard");
        else navigate("/"); // Normal users don't have a dashboard yet
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
                        <Store color="#d044e3" size={28} style={{ marginRight: 8 }} />
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            RateMyStore
                        </Typography>
                    </Box>

                    <Box>
                        {isAuthenticated ? (
                            <>
                                {(user?.role === "System Administrator" || user?.role === "Store Owner") && (
                                    <Button color="secondary" onClick={handleDashboardRedirect} sx={{ mr: 2 }}>
                                        Dashboard
                                    </Button>
                                )}
                                <Button variant="outlined" color="primary" onClick={() => { logout(); navigate("/"); }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" onClick={() => navigate("/login")} sx={{ mr: 2 }}>
                                    Login
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            <Box component="footer" sx={{ py: 3, textAlign: "center", mt: "auto", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} RateMyStore. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default PublicLayout;
