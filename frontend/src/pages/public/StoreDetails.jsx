import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Rating,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { mockStores, mockProducts, mockReviews, mockUsers } from '../../mocks/mockData';

const StoreDetails = () => {
    const { storeId } = useParams();
    // In React Router v6 usually accessed as `:id` based on AppRouter, but earlier I used `:storeId`. Let's assume useParams returns 'id' if AppRouter uses 'id'.
    // Let's use the standard `id` or fallback to `storeId` so it's robust.
    const urlId = storeId || useParams().id;

    const store = mockStores.find(s => s.id === parseInt(urlId));

    const [openDialog, setOpenDialog] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');

    if (!store) {
        return (
            <Container sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h4" color="error">Store Not Found</Typography>
            </Container>
        );
    }

    const storeProducts = mockProducts.filter(p => p.store_id === store.id);
    const storeReviews = mockReviews
        .filter(r => r.store_id === store.id)
        .map(review => ({
            ...review,
            user: mockUsers.find(u => u.id === review.user_id)
        }));

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewRating(0);
        setNewComment('');
    };

    const handleSubmitReview = () => {
        console.log("Submitting review:", { rating: newRating, comment: newComment });
        handleCloseDialog();
    };

    return (
        <Box sx={{ pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '450px' },
                    width: '100%',
                    backgroundImage: `linear-gradient(to top, rgba(18,18,18,1), rgba(0,0,0,0.4)), url(${store.banner_image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    px: 2,
                    pb: 6
                }}
            >
                <Box>
                    <Typography variant="h2" component="h1" fontWeight="800" sx={{ mb: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {store.name}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2, opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        {store.address} - {store.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Rating value={store.rating} precision={0.1} readOnly size="large" sx={{ color: 'primary.main', filter: 'drop-shadow(0 0 4px rgba(156, 39, 176, 0.5))' }} />
                        <Typography variant="h6" fontWeight="bold">({store.rating} / 5.0)</Typography>
                    </Box>
                </Box>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 2 }}>
                <Grid container spacing={6}>
                    {/* Left Column: Products */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
                            Featured Products
                        </Typography>
                        <Grid container spacing={4}>
                            {storeProducts.length > 0 ? (
                                storeProducts.map(product => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: '#1e1e1e', // elevated dark
                                            borderRadius: 3,
                                            border: '1px solid #333',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' }
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={product.image_url}
                                                alt={product.name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                <Typography gutterBottom variant="h6" component="h3" fontWeight="bold" color="text.primary">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                                    {product.description}
                                                </Typography>
                                                <Typography variant="h5" color="primary" fontWeight="bold">
                                                    ₹{product.price.toLocaleString('en-IN')}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="text.secondary">No products available for this store.</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    {/* Right Column: Reviews */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
                            Customer Reviews
                        </Typography>
                        <Card sx={{ bgcolor: '#1e1e1e', borderRadius: 3, p: 2, border: '1px solid #333' }}>
                            {storeReviews.length > 0 ? (
                                <List disablePadding>
                                    {storeReviews.map((review, index) => (
                                        <React.Fragment key={review.id}>
                                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 3 }}>
                                                <ListItemAvatar>
                                                    <Avatar alt={review.user?.name} src={review.user?.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                                {review.user?.name || "Anonymous User"}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {new Date(review.created_at).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box>
                                                            <Rating value={review.rating} size="small" readOnly sx={{ mb: 1.5, color: 'primary.main' }} />
                                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                                {review.text}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < storeReviews.length - 1 && <Divider component="li" sx={{ borderColor: '#333' }} />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                                    No reviews yet. Be the first to review!
                                </Typography>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add review"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    boxShadow: '0 0 20px rgba(156, 39, 176, 0.6)'
                }}
                onClick={handleOpenDialog}
            >
                <EditIcon />
            </Fab>

            {/* Write Review Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333' } }}>
                <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #333', pb: 2 }}>Write a Review</DialogTitle>
                <DialogContent sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2 }}>
                        <Box textAlign="center">
                            <Typography component="legend" variant="h6" color="text.primary" gutterBottom>Rate your experience</Typography>
                            <Rating
                                name="new-rating"
                                value={newRating}
                                onChange={(event, newValue) => {
                                    setNewRating(newValue);
                                }}
                                size="large"
                                sx={{ color: 'primary.main', fontSize: '3rem' }}
                            />
                        </Box>
                        <TextField
                            label="Your Review"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your experience with this store..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#444' },
                                    '&:hover fieldset': { borderColor: 'primary.main' }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 3, borderTop: '1px solid #333' }}>
                    <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
                    <Button onClick={handleSubmitReview} variant="contained" color="primary" disabled={newRating === 0 || !newComment.trim()}>
                        Post Review
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StoreDetails;
