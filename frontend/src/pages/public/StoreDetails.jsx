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
import { stores, products, reviews, users } from '../../mocks/mockData';

const StoreDetails = () => {
    const { storeId } = useParams();
    const store = stores.find(s => s.id === parseInt(storeId));

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

    const storeProducts = products.filter(p => p.storeId === store.id);
    const storeReviews = reviews
        .filter(r => r.storeId === store.id)
        .map(review => ({
            ...review,
            user: users.find(u => u.id === review.userId)
        }));

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewRating(0);
        setNewComment('');
    };

    const handleSubmitReview = () => {
        // In a real app, send API request here.
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
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${store.banner_image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    px: 2
                }}
            >
                <Box>
                    <Typography variant="h2" component="h1" fontWeight="800" sx={{ mb: 1 }}>
                        {store.name}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                        {store.address}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Rating value={store.rating} precision={0.5} readOnly size="large" sx={{ color: '#fff' }} />
                        <Typography variant="h6">({store.totalReviews} Reviews)</Typography>
                    </Box>
                </Box>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 6 }}>
                <Grid container spacing={6}>
                    {/* Left Column: Products */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                            Products
                        </Typography>
                        <Grid container spacing={3}>
                            {storeProducts.length > 0 ? (
                                storeProducts.map(product => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: 'background.paper',
                                            borderRadius: 2,
                                            boxShadow: 3
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={product.image_url}
                                                alt={product.name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h6" component="h3" fontWeight="bold">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {product.description}
                                                </Typography>
                                                <Typography variant="h6" color="primary" fontWeight="bold">
                                                    ₹{product.price}
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
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                            Reviews
                        </Typography>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 2, boxShadow: 3 }}>
                            {storeReviews.length > 0 ? (
                                <List disablePadding>
                                    {storeReviews.map((review, index) => (
                                        <React.Fragment key={review.id}>
                                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                                                <ListItemAvatar>
                                                    <Avatar alt={review.user?.name} src={review.user?.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="subtitle1" fontWeight="bold">
                                                                {review.user?.name || "Anonymous User"}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box sx={{ mt: 1 }}>
                                                            <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
                                                            <Typography variant="body2" color="text.primary">
                                                                {review.comment}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < storeReviews.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
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
                    boxShadow: '0 8px 24px rgba(156, 39, 176, 0.4)' // Purple accent shadow
                }}
                onClick={handleOpenDialog}
            >
                <EditIcon />
            </Fab>

            {/* Write Review Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Write a Review for {store.name}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                        <Box>
                            <Typography component="legend" variant="body2" color="text.secondary" gutterBottom>Overall Rating</Typography>
                            <Rating
                                name="new-rating"
                                value={newRating}
                                onChange={(event, newValue) => {
                                    setNewRating(newValue);
                                }}
                                size="large"
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
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
                    <Button onClick={handleSubmitReview} variant="contained" color="primary" disabled={newRating === 0 || !newComment.trim()}>
                        Post Review
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StoreDetails;
