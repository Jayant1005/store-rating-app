import React from "react";
import { Container, Typography } from "@mui/material";

const StoreDetails = () => {
    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h2" color="primary">Store Details</Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
                Placeholder to show a single store's products and reviews.
            </Typography>
        </Container>
    );
};

export default StoreDetails;
