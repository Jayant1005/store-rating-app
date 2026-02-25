import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, Divider, Rating } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { mockReviews, mockStores } from '../../mocks/mockData';

const Profile = () => {
    const { user } = useAuth();

    // Fallback if not logged in (though typically protected route)
    if (!user) {
        return (
            <Container sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">Please log in to view your profile.</Typography>
            </Container>
        );
    }

    const myReviews = mockReviews.filter(r => r.user_id === user.id);

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mb: 6, gap: 4 }}>
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{ width: 120, height: 120, border: '4px solid', borderColor: 'primary.main', boxShadow: '0 0 20px rgba(156, 39, 176, 0.3)' }}
                />
                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography variant="h3" fontWeight="bold" color="text.primary" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {user.email}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            bgcolor: 'rgba(156, 39, 176, 0.15)',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}
                    >
                        {user.role} Account
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 6, borderColor: '#333' }} />

            {/* Past Reviews */}
            <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary" sx={{ mb: 4 }}>
                My Reviews
            </Typography>

            <Grid container spacing={3}>
                {myReviews.length > 0 ? (
                    myReviews.map(review => {
                        const store = mockStores.find(s => s.id === review.store_id);
                        return (
                            <Grid item xs={12} key={review.id}>
                                <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                                {store ? store.name : "Unknown Store"}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                        <Rating value={review.rating} readOnly size="small" sx={{ color: 'primary.main', mb: 2 }} />
                                        <Typography variant="body1" color="text.primary">
                                            "{review.text}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                ) : (
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', py: 6, bgcolor: '#1e1e1e', borderRadius: 3, border: '1px dashed #444' }}>
                            <Typography variant="body1" color="text.secondary">You haven't written any reviews yet.</Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Profile;
