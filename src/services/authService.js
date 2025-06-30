// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const authService = {
  // Login
    login: async (email, password) => {
        try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        
        if (response.data.success) {
            // Guardar token en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Configurar axios para futuras peticiones
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        return response.data;
        } catch (error) {
        console.error('Error en login:', error);
        throw error.response?.data || error;
        }
    },

    // Registro
    register: async (nombre, email, password, phoneNumber) => {
        try {
        const response = await axios.post(`${API_URL}/register`, {
            nombre,
            email,
            password,
            phoneNumber
        });
        
        return response.data;
        } catch (error) {
        console.error('Error en registro:', error);
        throw error.response?.data || error;
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    },

    // Obtener usuario actual
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Verificar si está autenticado
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Verificar token
    verifyToken: async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
        const response = await axios.get(`${API_URL}/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.success;
        } catch (error) {
        return false;
        }
    }
    };

    // Configurar interceptor para agregar token automáticamente
    const token = localStorage.getItem('token');
    if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default authService;