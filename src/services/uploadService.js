//clase para manejar la subida de imágenes a Cloudinary
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const uploadService = {
    // Subir imagen a Cloudinary
    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('foto', file);

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error subiendo imagen:', error);
            throw error.response?.data || error;
        }
    },

    // Actualizar perfil de usuario
    updateProfile: async (userData) => {
        try {
            const response = await axios.put(`${API_URL}/auth/profile`, userData);
            return response.data;
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            throw error.response?.data || error;
        }
    }
};

export default uploadService;