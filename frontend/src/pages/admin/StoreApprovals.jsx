import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Chip
} from '@mui/material';
import { mockStores } from '../../mocks/mockData';

const StoreApprovals = () => {
    const [stores, setStores] = useState(mockStores);

    const handleToggleStatus = (id) => {
        setStores(stores.map(store => {
            if (store.id === id) {
                return { ...store, status: store.status === 'approved' ? 'pending' : 'approved' };
            }
            return store;
        }));
    };

    return (
        <Box sx={{ pb: 8, pt: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    Store Approvals
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #333', bgcolor: '#1e1e1e', backgroundImage: 'none' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Store Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Owner ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Approve Toggle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map((store) => (
                            <TableRow key={store.id} hover sx={{ '& td': { borderBottom: '1px solid #333' } }}>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>{store.name}</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{store.owner_id}</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>
                                    {store.rating}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={store.status.toUpperCase()}
                                        color={store.status === 'approved' ? 'success' : 'warning'}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 'bold' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Switch
                                        checked={store.status === 'approved'}
                                        onChange={() => handleToggleStatus(store.id)}
                                        color="success"
                                        inputProps={{ 'aria-label': 'approve store toggle' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StoreApprovals;
