import React from "react";
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const OwnerDashboard = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["owner_dashboard"],
        queryFn: async () => {
            const res = await axiosInstance.get(endpoints.stores.ownerDashboard);
            return res.data;
        },
    });

    if (isLoading) return <Container sx={{ mt: 5, textAlign: "center" }}><CircularProgress /></Container>;
    if (error || !data) return <Container sx={{ mt: 5 }}><Typography color="error">You do not own a store yet, or an error occurred.</Typography></Container>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" color="primary" gutterBottom>
                Welcome to {data.storeName}
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Average Rating</Typography>
                            <Typography variant="h2" color="secondary">{data.averageRating}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Total Reveiws</Typography>
                            <Typography variant="h2" color="secondary">{data.raters?.length || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OwnerDashboard;
