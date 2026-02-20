import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axiosInstance.post(endpoints.auth.login, formData);
            login(res.data.user, res.data.token);

            // Route based on role
            if (res.data.user.role === "System Administrator") navigate("/admin/dashboard");
            else if (res.data.user.role === "Store Owner") navigate("/owner/dashboard");
            else navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3, bgcolor: "background.paper" }}>
                <Typography variant="h4" color="primary" align="center" gutterBottom fontWeight="bold">
                    Welcome Back
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                    {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}

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
        </Container>
    );
};

export default Login;
