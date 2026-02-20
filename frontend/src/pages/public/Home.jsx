import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Home = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h2" color="primary" gutterBottom>
                    Welcome to RateMyStore
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Browse top-rated stores and share your experiences.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
