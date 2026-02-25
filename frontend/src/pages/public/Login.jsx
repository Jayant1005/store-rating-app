import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [tempAuthData, setTempAuthData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            const { token, user } = res.data;

            if (user.role === 'super-admin') {
                setTempAuthData({ token, user });
                setShowRoleModal(true);
            } else {
                // Call the global login function
                login(token, user);

                // Redirect based on role
                if (user.role === "owner") {
                    navigate("/owner/dashboard");
                } else if (user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleImpersonate = (selectedRole) => {
        if (!tempAuthData) return;

        // Clone the user object and override the role
        const impersonatedUser = {
            ...tempAuthData.user,
            role: selectedRole,
            // Tagging the name so we remember it's impersonated in the UI
            name: `${tempAuthData.user.name} (as ${selectedRole})`
        };

        // Complete the login flow with the spoofed user
        login(tempAuthData.token, impersonatedUser);
        setShowRoleModal(false);

        // Redirect based on the newly selected role
        if (selectedRole === "owner") {
            navigate("/owner/dashboard");
        } else if (selectedRole === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3, bgcolor: "background.paper" }}>
                <Typography variant="h4" color="primary" align="center" gutterBottom fontWeight="bold">
                    Welcome Back
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, height: 48 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    </Button>

                    <Button fullWidth variant="text" onClick={() => navigate("/register")}>
                        Don't have an account? Sign up
                    </Button>
                </Box>
            </Paper>

            {/* Impersonation Modal */}
            <Dialog open={showRoleModal} onClose={() => setShowRoleModal(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333' } }}>
                <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #333', pb: 2 }}>Super Admin Access</DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Typography gutterBottom color="text.primary">Which dashboard would you like to impersonate today?</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                        <Button variant="outlined" color="primary" onClick={() => handleImpersonate('normal')} sx={{ py: 1.5 }}>
                            Normal User
                        </Button>
                        <Button variant="outlined" color="warning" onClick={() => handleImpersonate('owner')} sx={{ py: 1.5 }}>
                            Store Owner
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleImpersonate('admin')} sx={{ py: 1.5 }}>
                            System Admin
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #333' }}>
                    <Button onClick={() => setShowRoleModal(false)} sx={{ color: 'text.secondary' }}>Cancel Login</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Login;
