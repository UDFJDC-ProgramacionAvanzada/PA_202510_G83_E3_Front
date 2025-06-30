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

    // ACTUALIZAR PERFIL - CORREGIDO
    updateProfile: async (userData) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.put(`${API_URL}/profile`, userData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                // Actualizar datos en localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            return response.data;
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            
            // Si el token expiró, limpiar localStorage
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                delete axios.defaults.headers.common['Authorization'];
            }
            
            throw error.response?.data || error;
        }
    },

    // SUBIR IMAGEN - NUEVO
    uploadImage: async (file) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const formData = new FormData();
            formData.append('foto', file);

            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error subiendo imagen:', error);
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

// Interceptor para agregar token automáticamente a todas las peticiones
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            authService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default authService;