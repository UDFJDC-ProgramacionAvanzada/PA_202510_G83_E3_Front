// src/services/productosService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos';

const productosService = {
    // Obtener productos de mi stand
    getMyProducts: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.get(`${API_URL}/my-products`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error obteniendo mis productos:', error);
            throw error.response?.data || error;
        }
    },

    // Obtener productos de un stand específico
    getProductsByStand: async (standId) => {
        try {
            const response = await axios.get(`${API_URL}/stand/${standId}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo productos del stand:', error);
            throw error.response?.data || error;
        }
    },

    // Crear nuevo producto
    createProduct: async (productData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.post(`${API_URL}`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error creando producto:', error);
            throw error.response?.data || error;
        }
    },

    // Subir imagen de producto
    uploadProductImage: async (file) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const formData = new FormData();
            formData.append('imagen', file);

            const response = await axios.post('http://localhost:3000/api/upload/product', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error subiendo imagen del producto:', error);
            throw error.response?.data || error;
        }
    },

    // Actualizar producto
    updateProduct: async (productId, productData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.put(`${API_URL}/${productId}`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error actualizando producto:', error);
            throw error.response?.data || error;
        }
    },

    // Eliminar producto
    deleteProduct: async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.delete(`${API_URL}/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error eliminando producto:', error);
            throw error.response?.data || error;
        }
    }
};

export default productosService;