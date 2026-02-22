import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import InventoryIcon from '@mui/icons-material/Inventory';

// Using mock data for demonstration
import { stores, products } from '../../mocks/mockData';

const OwnerDashboard = () => {
    // Assuming logged in user is ownerId = 2 (John StoreOwner) for mock purposes
    const ownerId = 2;
    const myStores = stores.filter(s => s.ownerId === ownerId);

    // For simplicity, let's just show stats for their first store
    const primaryStore = myStores[0];
    const myProducts = products.filter(p => p.storeId === primaryStore?.id);

    const [openDialog, setOpenDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image_url: '' });

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewProduct({ name: '', description: '', price: '', image_url: '' });
    };

    const handleAddProduct = () => {
        // In a real app, this posts to API
        console.log("Adding new product:", newProduct);
        handleCloseDialog();
    };

    if (!primaryStore) {
        return (
            <Container sx={{ mt: 10 }}>
                <Typography variant="h5" color="text.secondary">You don't have any stores assigned yet.</Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ pb: 8, pt: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Dashboard: {primaryStore.name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* Stat Blocks */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
                                <InventoryIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                    Total Products
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {myProducts.length}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mr: 2 }}>
                                <StarIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                    Average Rating
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {primaryStore.rating} <Typography component="span" color="text.secondary" variant="h6">/ 5.0</Typography>
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mr: 2 }}>
                                <StorefrontIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                    Total Reviews
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {primaryStore.totalReviews}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Products Table */}
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Manage Products
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price (₹)</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myProducts.length > 0 ? (
                                myProducts.map((product) => (
                                    <TableRow key={product.id} hover>
                                        <TableCell>
                                            <Avatar src={product.image_url} alt={product.name} variant="rounded" sx={{ width: 60, height: 60 }} />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {product.description}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            ₹{product.price}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button size="small" variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                                            <Button size="small" variant="outlined" color="error">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        <Typography color="text.secondary">No products found. Add your first product!</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Add Product Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle fontWeight="bold">Add New Product</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Product Name"
                            fullWidth
                            variant="outlined"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <TextField
                            label="Price (₹)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <TextField
                            label="Image URL"
                            fullWidth
                            variant="outlined"
                            placeholder="https://example.com/image.jpg"
                            value={newProduct.image_url}
                            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
                    <Button onClick={handleAddProduct} variant="contained" color="primary">
                        Save Product
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OwnerDashboard;
