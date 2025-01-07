import API from '../services/api';

// User Login
export const loginUser = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

// User Registration
export const registerUser = async (email, password, firstName, lastName) => {
    try {
        const response = await API.post('/auth/register', {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
        });
        return response;
    } catch (error) {
        throw new Error(error);
    }
};
