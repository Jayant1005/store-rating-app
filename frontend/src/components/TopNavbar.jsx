import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: '#1a1a1a', borderBottom: '1px solid #333' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Left Side: Logo */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <StorefrontIcon sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ background: 'linear-gradient(45deg, #9c27b0, #3f51b5)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        VibeAestim
                    </Typography>
                </Box>

                {/* Center: Search Bar */}
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, maxWidth: 500, mx: 4, display: { xs: 'none', md: 'block' } }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search stores..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: '#2a2a2a',
                                borderRadius: 5,
                                '& fieldset': { borderColor: '#444' },
                                '&:hover fieldset': { borderColor: 'primary.main' },
                                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                {/* Right Side: Auth / Profile */}
                <Box>
                    {isAuthenticated ? (
                        <>
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                <Avatar alt={user?.name} src={user?.avatar} sx={{ width: 40, height: 40, border: '2px solid', borderColor: 'primary.main' }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: { bgcolor: '#222', mt: 1.5, minWidth: 200 }
                                }}
                            >
                                <MenuItem disabled>
                                    <Typography variant="body2" color="text.secondary">Signed in as <br /> <b>{user?.name}</b></Typography>
                                </MenuItem>
                                {user?.role === 'admin' && <MenuItem onClick={() => { handleMenuClose(); navigate('/admin/dashboard'); }}>Admin Panel</MenuItem>}
                                {user?.role === 'owner' && <MenuItem onClick={() => { handleMenuClose(); navigate('/owner/dashboard'); }}>Owner Panel</MenuItem>}
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>My Profile</MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavbar;
