import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const AdminDashboard = () => {
    // Fetch Stores
    const { data: stores, isLoading: storesLoading } = useQuery({
        queryKey: ["admin_stores"],
        queryFn: async () => {
            const res = await axiosInstance.get(endpoints.stores.getAll);
            return res.data; // Assuming it returns array of stores
        },
    });

    // Fetch Users
    const { data: users, isLoading: usersLoading } = useQuery({
        queryKey: ["admin_users"],
        queryFn: async () => {
            const res = await axiosInstance.get(endpoints.users.list);
            return res.data;
        },
    });

    const userColumns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", width: 150 },
    ];

    const storeColumns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Store Name", flex: 1 },
        { field: "address", headerName: "Location", flex: 1 },
        { field: "overallRating", headerName: "Avg Rating", width: 130 },
    ];

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" color="primary" gutterBottom>
                Admin Dashboard
            </Typography>

            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mt: 4 }}>
                <Box sx={{ flex: "1 1 500px", height: 500 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Manage Users
                    </Typography>
                    <DataGrid
                        rows={users || []}
                        columns={userColumns}
                        loading={usersLoading}
                        slots={{ toolbar: GridToolbar }}
                        sx={{
                            bgcolor: "background.paper",
                            border: 0,
                            "& .MuiDataGrid-cell": { borderBottom: "1px solid rgba(255,255,255,0.05)" },
                            "& .MuiDataGrid-columnHeaders": { borderBottom: "1px solid rgba(255,255,255,0.1)", bgcolor: "rgba(255,255,255,0.02)" },
                        }}
                    />
                </Box>

                <Box sx={{ flex: "1 1 500px", height: 500 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Manage Stores
                    </Typography>
                    <DataGrid
                        rows={stores || []}
                        columns={storeColumns}
                        loading={storesLoading}
                        slots={{ toolbar: GridToolbar }}
                        sx={{
                            bgcolor: "background.paper",
                            border: 0,
                            "& .MuiDataGrid-cell": { borderBottom: "1px solid rgba(255,255,255,0.05)" },
                            "& .MuiDataGrid-columnHeaders": { borderBottom: "1px solid rgba(255,255,255,0.1)", bgcolor: "rgba(255,255,255,0.02)" },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
