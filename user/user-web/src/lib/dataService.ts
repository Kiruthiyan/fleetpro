import axios from 'axios';
import { authService } from '@/lib/authService';

const API_URL = 'http://localhost:8081/api';

const getAuthHeader = () => {
    const token = authService.getCurrentUser();
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const dashboardService = {
    getStats: async () => {
        const response = await axios.get(`${API_URL}/dashboard/stats`, getAuthHeader());
        return response.data;
    }
};

export const tripService = {
    getMyTrips: async () => {
        const response = await axios.get(`${API_URL}/trips/my-trips`, getAuthHeader());
        return response.data;
    },

    updateStatus: async (id: number, status: string) => {
        const response = await axios.put(`${API_URL}/trips/${id}/status`, null, {
            ...getAuthHeader(),
            params: { status }
        });
        return response.data;
    }
};
