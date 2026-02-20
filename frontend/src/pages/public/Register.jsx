import React from "react";
import { Container, Typography } from "@mui/material";

const Register = () => {
    return (
        <Container sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h2" color="primary">Create an Account</Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
                Placeholder for Registration form
            </Typography>
        </Container>
    );
};

export default Register;
