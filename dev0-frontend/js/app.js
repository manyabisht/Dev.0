import API from './services/api'; // Assuming a centralized API service
import { useState, useEffect } from 'react';

// Example function to fetch data from the /hospitals/nearby endpoint
export const fetchNearbyHospitals = async (lat, lng, radius) => {
    try {
        const response = await API.post('/hospitals/nearby', { lat, lng, radius });
        return response.data; // Return the list of hospitals
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error);
        throw error;
    }
};

// Example function to handle authentication (e.g., login)
export const loginUser = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response.data; // Return user data (or token)
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Example function to test backend connectivity
export const testBackendConnection = async () => {
    try {
        const response = await API.get('/test');
        return response.data.message; // Should return a success message
    } catch (error) {
        console.error('Error testing backend connection:', error);
        throw error;
    }
};
