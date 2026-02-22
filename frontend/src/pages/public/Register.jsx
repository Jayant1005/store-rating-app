import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress, Select, MenuItem, InputLabel, FormControl, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "normal" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            // Because we don't know if `endpoints` exports register route specifically, 
            // the user instructions asked to POST to `/api/auth/register` using Axios.
            // Let's use standard relative path based off our axiosInstance base URL.
            await axiosInstance.post('/auth/register', formData);

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3, bgcolor: "background.paper" }}>
                <Typography variant="h4" color="primary" align="center" gutterBottom fontWeight="bold">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <TextField
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        variant="outlined"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-select-label">Account Type</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={formData.role}
                            label="Account Type"
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <MenuItem value="normal">Normal User</MenuItem>
                            <MenuItem value="owner">Store Owner</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || success !== ""}
                        sx={{ mt: 3, mb: 2, height: 48 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>

                    <Button fullWidth variant="text" onClick={() => navigate("/login")}>
                        Already have an account? Sign in
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
