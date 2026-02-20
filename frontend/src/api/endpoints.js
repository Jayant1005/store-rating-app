const API_BASE_URL = "http://localhost:5001/api";

const endpoints = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        verify: `${API_BASE_URL}/auth/verify`,
    },
    users: {
        profile: `${API_BASE_URL}/users/profile`,
        adminDashboard: `${API_BASE_URL}/users/dashboard`, // Admin dashboard stats
        list: `${API_BASE_URL}/users`,
    },
    stores: {
        getAll: `${API_BASE_URL}/stores`,
        create: `${API_BASE_URL}/stores`,
        update: (id) => `${API_BASE_URL}/stores/${id}`,
        ownerDashboard: `${API_BASE_URL}/stores/dashboard`,
    },
    products: {
        getStoreProducts: (storeId) => `${API_BASE_URL}/products/store/${storeId}`,
        getOwnerProducts: `${API_BASE_URL}/products`,
        create: `${API_BASE_URL}/products`,
        update: (id) => `${API_BASE_URL}/products/${id}`,
        delete: (id) => `${API_BASE_URL}/products/${id}`,
    },
    reviews: {
        post: (storeId) => `${API_BASE_URL}/reviews/${storeId}`,
        upvote: (id) => `${API_BASE_URL}/reviews/${id}/upvote`,
        reply: (id) => `${API_BASE_URL}/reviews/${id}/reply`,
    },
};

export default endpoints;
