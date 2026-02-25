import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Grid, Card, CardContent, CardMedia, Rating, Button } from '@mui/material';
import { mockStores } from '../../mocks/mockData';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const results = mockStores.filter(store =>
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
                    Search Results
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {results.length} results found for "{query}"
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {results.length > 0 ? (
                    results.map((store) => (
                        <Grid item xs={12} sm={6} md={4} key={store.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: '#1e1e1e',
                                    borderRadius: 3,
                                    border: '1px solid #333',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        borderColor: 'primary.main',
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={() => navigate(`/store/${store.id}`)}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={store.banner_image_url}
                                    alt={store.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography gutterBottom variant="h5" component="h2" fontWeight="bold" color="text.primary">
                                        {store.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Rating value={store.rating} precision={0.1} readOnly size="small" sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                            {store.rating}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                        {store.description}
                                    </Typography>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 'auto' }}>
                                        View Store
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#1e1e1e', borderRadius: 3, border: '1px dashed #444' }}>
                            <Typography variant="h5" color="text.secondary">No stores matched your search.</Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default SearchResults;
