import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Avatar
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InventoryIcon from '@mui/icons-material/Inventory';
import CommentaryIcon from '@mui/icons-material/CommentBank'; // Using CommentBank as a placeholder for Reviews
import { mockStores, mockProducts, mockReviews } from '../../mocks/mockData';
import { useAuth } from '../../context/AuthContext';

const OwnerDashboard = () => {
    const { user } = useAuth();

    // Fallback ID for testing if auth isn't populated
    const ownerId = user?.id || 2;

    // Find the owner's primary store (assuming 1 for this dashboard)
    const primaryStore = mockStores.find(s => s.owner_id === ownerId);

    // If no store found
    if (!primaryStore) {
        return (
            <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">You don't have any approved stores yet.</Typography>
            </Box>
        );
    }

    const myProducts = mockProducts.filter(p => p.store_id === primaryStore.id);
    const myReviews = mockReviews.filter(r => r.store_id === primaryStore.id);

    return (
        <Box sx={{ pb: 8, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    Welcome back, {user?.name || 'Owner'}
                </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Overview for {primaryStore.name}
            </Typography>

            {/* Stat Blocks */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <Avatar sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)', color: 'primary.main', width: 64, height: 64, mr: 3 }}>
                            <InventoryIcon fontSize="large" />
                        </Avatar>
                        <Box>
                            <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                Total Products
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color="text.primary">
                                {myProducts.length}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.2)', color: 'warning.main', width: 64, height: 64, mr: 3 }}>
                            <StarIcon fontSize="large" />
                        </Avatar>
                        <Box>
                            <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                Average Rating
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color="text.primary">
                                {primaryStore.rating} <Typography component="span" color="text.secondary" variant="h6">/ 5.0</Typography>
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', color: 'success.main', width: 64, height: 64, mr: 3 }}>
                            <CommentaryIcon fontSize="large" />
                        </Avatar>
                        <Box>
                            <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                Total Reviews
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color="text.primary">
                                {myReviews.length}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OwnerDashboard;
