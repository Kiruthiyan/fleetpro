import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

export const authService = {
    login: async (username, password) => {
        const response = await axios.post(`${API_URL}/authenticate`, {
            username,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    },

    register: async (username, email, password, role) => {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password,
            role, // Ensuring role is passed (e.g., 'DRIVER')
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },

    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    getRole: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('role');
        }
        return null;
    }
};
