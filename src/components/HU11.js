// src/components/HU11.js - AGREGAR NUEVO PRODUCTO
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import productosService from '../services/productosService';
import authService from '../services/authService';
import './HU11.css';

const HU11 = ({ standId, onProductCreated }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagenUrl: ''
    });
    
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
            // Crear preview
            const preview = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, imagenUrl: preview }));
        }
    };

    const uploadImage = async (file) => {
        try {
            // Intentar primero con el servicio de productos
            const response = await productosService.uploadProductImage(file);
            if (response.success) {
                return response.url;
            }
            throw new Error('Error subiendo imagen');
        } catch (error) {
            console.error('Error uploading image with productosService:', error);
            
            // Si falla, intentar con authService como fallback
            try {
                const fallbackResponse = await authService.uploadImage(file);
                if (fallbackResponse.success) {
                    return fallbackResponse.url;
                }
                throw new Error('Error en fallback upload');
            } catch (fallbackError) {
                console.error('Error en fallback upload:', fallbackError);
                // Si ambos fallan, continuar sin imagen
                return null;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.precio) {
            setError('Nombre y precio son requeridos');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Subir imagen si existe
            let imageUrl = null;
            if (imagen) {
                imageUrl = await uploadImage(imagen);
            }

            // Crear producto
            const productData = {
                nombre: formData.nombre,
                descripcion: formData.descripcion || '',
                precio: formData.precio,
                imagenUrl: imageUrl
            };

            const response = await productosService.createProduct(productData);
            
            if (response.success) {
                setSuccess(true);
                // Limpiar formulario
                setFormData({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    imagenUrl: ''
                });
                setImagen(null);
                
                // Notificar al componente padre para que recargue los datos
                if (onProductCreated) {
                    onProductCreated();
                }

                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(() => setSuccess(false), 3000);
            }

        } catch (error) {
            console.error('Error creando producto:', error);
            setError(error.message || 'Error creando el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hu11-container">
            <h2>
                <FormattedMessage 
                    id="hu11.title" 
                    defaultMessage="Agregar nuevo producto" 
                />
            </h2>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="success-message">
                    <p>
                        <FormattedMessage 
                            id="hu11.success" 
                            defaultMessage="¡Producto creado exitosamente!" 
                        />
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="hu11-form">
                <div className="form-group">
                    <FormattedMessage id="hu11.nombre" defaultMessage="Nombre del producto">
                        {msg => (
                            <input
                                type="text"
                                name="nombre"
                                placeholder={msg}
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu11.descripcion" defaultMessage="Descripción del producto">
                        {msg => (
                            <textarea
                                name="descripcion"
                                placeholder={msg}
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4"
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu11.precio" defaultMessage="Precio (ej: 15.000 COP)">
                        {msg => (
                            <input
                                type="text"
                                name="precio"
                                placeholder={msg}
                                value={formData.precio}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <label>
                        <FormattedMessage 
                            id="hu11.imagen" 
                            defaultMessage="Imagen del producto (opcional)" 
                        />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        disabled={loading}
                    />
                </div>

                {formData.imagenUrl && (
                    <div className="image-preview">
                        <img 
                            src={formData.imagenUrl} 
                            alt="Vista previa" 
                            className="preview-image"
                        />
                    </div>
                )}

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? (
                        <FormattedMessage 
                            id="hu11.creating" 
                            defaultMessage="Creando producto..." 
                        />
                    ) : (
                        <FormattedMessage 
                            id="hu11.submit" 
                            defaultMessage="Crear producto" 
                        />
                    )}
                </button>
            </form>
        </div>
    );
};

export default HU11;