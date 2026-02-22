import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Tabs,
    Tab,
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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Mock Data
import { users, stores } from '../../mocks/mockData';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AdminDashboard = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'error';
            case 'owner': return 'warning';
            default: return 'primary';
        }
    };

    const getStatusColor = (status) => {
        return status === 'approved' ? 'success' : 'warning';
    };

    return (
        <Box sx={{ pb: 8, pt: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Superadmin Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage platform users and store approvals
                    </Typography>
                </Box>

                {/* Global Stat Blocks */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 3 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mr: 3 }}>
                                <PeopleAltIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                    Total Platform Users
                                </Typography>
                                <Typography variant="h3" fontWeight="bold">
                                    {users.length}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 3 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mr: 3 }}>
                                <StoreIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" textTransform="uppercase">
                                    Total Platform Stores
                                </Typography>
                                <Typography variant="h3" fontWeight="bold">
                                    {stores.length}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Tabs Area */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs" textColor="primary" indicatorColor="primary">
                            <Tab label="Users Management" icon={<PeopleAltIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
                            <Tab label="Stores Governance" icon={<StoreIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
                        </Tabs>
                    </Box>

                    {/* Users Tab Panel */}
                    <CustomTabPanel value={tabValue} index={0}>
                        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: 'background.default' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>System Role</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar src={user.avatar} sx={{ mr: 2 }} />
                                                    <Typography fontWeight="500">{user.name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
                                            <TableCell>
                                                <Chip label={user.role.toUpperCase()} color={getRoleColor(user.role)} size="small" sx={{ fontWeight: 'bold' }} />
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.role !== 'admin' && (
                                                    <Button size="small" variant="outlined" color="error" startIcon={<ErrorOutlineIcon />}>
                                                        Suspend
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>

                    {/* Stores Tab Panel */}
                    <CustomTabPanel value={tabValue} index={1}>
                        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: 'background.default' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Store Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Owner ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stores.map((store) => (
                                        <TableRow key={store.id} hover>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{store.name}</TableCell>
                                            <TableCell sx={{ color: 'text.secondary' }}>{store.ownerId}</TableCell>
                                            <TableCell>
                                                {store.rating} ({store.totalReviews} reviews)
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={store.status.toUpperCase()} color={getStatusColor(store.status)} size="small" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                            </TableCell>
                                            <TableCell align="right">
                                                {store.status === 'pending' ? (
                                                    <Box>
                                                        <Button size="small" variant="contained" color="success" sx={{ mr: 1 }}>Approve</Button>
                                                        <Button size="small" variant="outlined" color="error">Reject</Button>
                                                    </Box>
                                                ) : (
                                                    <Button size="small" variant="outlined" color="error">Revoke</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
