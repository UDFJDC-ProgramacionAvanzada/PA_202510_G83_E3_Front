// src/services/standsService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/stands';

const standsService = {
    // Obtener el stand del usuario actual
    getMyStand: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.get(`${API_URL}/my-stand`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error obteniendo mi stand:', error);
            throw error.response?.data || error;
        }
    },
    getStandById: async (standId) => {
    try {
        const response = await axios.get(`${API_URL}/${standId}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo stand:', error);
        throw error.response?.data || error;
    }
},
    updateMyStand: async (standData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await axios.put(`${API_URL}/my-stand`, standData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error actualizando stand:', error);
        throw error.response?.data || error;
    }
},

    // Reservar un stand
    reserveStand: async (standId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.post(`${API_URL}/${standId}/reserve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error reservando stand:', error);
            throw error.response?.data || error;
        }
    },

    // Liberar mi stand
    releaseMyStand: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.delete(`${API_URL}/my-stand`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error liberando stand:', error);
            throw error.response?.data || error;
        }
    }
};

export default standsService;

