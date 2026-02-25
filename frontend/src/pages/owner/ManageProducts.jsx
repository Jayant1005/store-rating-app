import React, { useState } from 'react';
import {
    Box,
    Typography,
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
import { mockStores, mockProducts } from '../../mocks/mockData';
import { useAuth } from '../../context/AuthContext';

const ManageProducts = () => {
    const { user } = useAuth();
    const ownerId = user?.id || 2;

    // Find the owner's primary store 
    const primaryStore = mockStores.find(s => s.owner_id === ownerId);

    // We'll keep products in local state so the Add functionality appears to work
    const [myProducts, setMyProducts] = useState(mockProducts.filter(p => p.store_id === primaryStore?.id));

    const [openDialog, setOpenDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image_url: '' });

    if (!primaryStore) {
        return (
            <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">You don't have any assigned stores.</Typography>
            </Box>
        );
    }

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewProduct({ name: '', description: '', price: '', image_url: '' });
    };

    const handleAddProduct = () => {
        // Mocking adding a product
        const id = Math.floor(Math.random() * 10000);
        const addedProduct = {
            id,
            store_id: primaryStore.id,
            name: newProduct.name,
            description: newProduct.description,
            price: Number(newProduct.price),
            image_url: newProduct.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' // default fallback
        };

        setMyProducts([...myProducts, addedProduct]);
        handleCloseDialog();
    };

    return (
        <Box sx={{ pb: 8, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    Manage Products
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    sx={{ borderRadius: 2, px: 3, boxShadow: '0 0 15px rgba(156, 39, 176, 0.5)' }}
                >
                    Add Product
                </Button>
            </Box>

            {/* Products Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #333', bgcolor: '#1e1e1e', backgroundImage: 'none' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Description</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Price</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProducts.length > 0 ? (
                            myProducts.map((product) => (
                                <TableRow key={product.id} hover sx={{ '& td': { borderBottom: '1px solid #333' } }}>
                                    <TableCell>
                                        <Avatar src={product.image_url} alt={product.name} variant="rounded" sx={{ width: 60, height: 60, border: '1px solid #444' }} />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>{product.name}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.description}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" variant="outlined" sx={{ mr: 1, borderColor: '#555', color: 'text.secondary' }}>Edit</Button>
                                        <Button size="small" variant="outlined" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 6, borderBottom: 'none' }}>
                                    <Typography color="text.secondary">No products found. Add your first product!</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Product Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#1e1e1e', borderRadius: 3, border: '1px solid #333' } }}>
                <DialogTitle fontWeight="bold" sx={{ borderBottom: '1px solid #333', pb: 2 }}>Add New Product</DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                        <TextField
                            label="Product Name"
                            fullWidth
                            variant="outlined"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-root fieldset': { borderColor: 'primary.main' } }}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-root fieldset': { borderColor: 'primary.main' } }}
                        />
                        <TextField
                            label="Price (₹)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-root fieldset': { borderColor: 'primary.main' } }}
                        />
                        <TextField
                            label="Image URL"
                            fullWidth
                            variant="outlined"
                            placeholder="https://example.com/image.jpg"
                            value={newProduct.image_url}
                            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-root fieldset': { borderColor: 'primary.main' } }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #333' }}>
                    <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
                    <Button onClick={handleAddProduct} variant="contained" color="primary">
                        Save Product
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageProducts;
