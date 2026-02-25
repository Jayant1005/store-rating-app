import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Avatar
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import { mockUsers, mockStores } from '../../mocks/mockData';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ pb: 8, pt: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    Superadmin Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Welcome back, {user?.name || 'Administrator'}
                </Typography>
            </Box>

            {/* Global Stat Blocks */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <Avatar sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)', color: 'primary.main', width: 72, height: 72, mr: 3 }}>
                            <PeopleAltIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Box>
                            <Typography color="text.secondary" variant="subtitle1" fontWeight="bold" textTransform="uppercase">
                                Total Platform Users
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" color="text.primary">
                                {mockUsers.length}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.2)', color: 'warning.main', width: 72, height: 72, mr: 3 }}>
                            <StoreIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Box>
                            <Typography color="text.secondary" variant="subtitle1" fontWeight="bold" textTransform="uppercase">
                                Total Platform Stores
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" color="text.primary">
                                {mockStores.length}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
