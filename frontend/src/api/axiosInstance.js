import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", // Base path so we don't have to keep appending it
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to attach token automatically to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Interceptor to handle global 401s (e.g. log out user if token is expired)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem("token");
            // window.location.href = "/login"; // Force redirect if completely unauthorized
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
