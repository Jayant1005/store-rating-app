import React from "react";
import {
    Typography,
    Container,
    Box,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Rating
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    // Placeholder data for stores
    const featuredStores = [
        {
            id: 1,
            name: "Lumina Cafe",
            address: "123 Starlight Avenue, Downtown",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Urban Threads",
            address: "45 Fashion Blvd, Westside",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Tech Haven",
            address: "789 Silicon Way, Tech District",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1531297172864-79daaf9e450b?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <Box sx={{ pb: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    width: '100%',
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 6, md: 10 },
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 3,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight="800"
                        gutterBottom
                        sx={{
                            backgroundcolor: "primary",
                            backgroundImage: "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                            backgroundSize: "100%",
                            backgroundRepeat: "repeat",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                            fontSize: { xs: '3rem', md: '4.5rem' }
                        }}
                    >
                        Find the Best Stores Around You
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
                        Discover top-rated local businesses, read authentic reviews, and share your own experiences with the community.
                    </Typography>

                    <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
                        <TextField
                            fullWidth
                            placeholder="Search for restaurants, cafes, tech stores..."
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    bgcolor: 'background.paper',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    transition: 'box-shadow 0.3s ease',
                                    '&.Mui-focused': {
                                        boxShadow: '0 8px 30px rgba(25, 118, 210, 0.2)',
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Featured Stores Section */}
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h2" fontWeight="700" gutterBottom sx={{ mb: 4 }}>
                    Trending Stores
                </Typography>

                <Grid container spacing={4}>
                    {featuredStores.map((store) => (
                        <Grid item xs={12} sm={6} md={4} key={store.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 6,
                                    },
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={store.image}
                                    alt={store.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h3" fontWeight="600">
                                        {store.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {store.address}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Rating value={store.rating} precision={0.5} readOnly size="small" />
                                        <Typography variant="body2" fontWeight="600">
                                            {store.rating}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
