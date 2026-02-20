import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ fullScreen = true }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: fullScreen ? "100vh" : "100%",
                width: "100%",
            }}
        >
            <CircularProgress color="primary" />
        </Box>
    );
};

export default LoadingSpinner;
