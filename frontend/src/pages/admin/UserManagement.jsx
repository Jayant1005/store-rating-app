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
    Button,
    Chip,
    Avatar
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { mockUsers } from '../../mocks/mockData';

const UserManagement = () => {
    const [users, setUsers] = useState(mockUsers);

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'error';
            case 'owner': return 'warning';
            default: return 'primary';
        }
    };

    const handleSuspend = (id) => {
        // In reality, this calls API
        console.log("Suspending user:", id);
        // We'll just filter them out for the mock visual
        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <Box sx={{ pb: 8, pt: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    User Management
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #333', bgcolor: '#1e1e1e', backgroundImage: 'none' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>User</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Email Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>System Role</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid #333' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover sx={{ '& td': { borderBottom: '1px solid #333' } }}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={user.avatar} sx={{ mr: 2, border: '1px solid #444' }} />
                                        <Typography fontWeight="500" color="text.primary">{user.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role.toUpperCase()}
                                        color={getRoleColor(user.role)}
                                        size="small"
                                        sx={{ fontWeight: 'bold' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {user.role !== 'admin' && (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<ErrorOutlineIcon />}
                                            onClick={() => handleSuspend(user.id)}
                                            sx={{ borderColor: 'error.dark', '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.1)' } }}
                                        >
                                            Suspend
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserManagement;
