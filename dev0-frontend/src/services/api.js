import axios from 'axios';

// Axios instance with backend URL
const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
});

// Error handler for consistent error responses
API.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data?.error || error.message);
        return Promise.reject(error.response?.data?.error || error.message);
    }
);

export default API;
