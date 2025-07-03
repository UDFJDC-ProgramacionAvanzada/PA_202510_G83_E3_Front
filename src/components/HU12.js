// src/components/HU12.js - PUBLICAR/MODIFICAR EMPRENDIMIENTO CON GALERÍA
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import authService from '../services/authService';
import standsService from '../services/StandsService';
import './HU12.css';

const HU12 = ({ stand, user, onEmprendimientoCreated }) => {
    const [mode, setMode] = useState('create'); // 'create' o 'edit'
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        universidad: '',
        correo: '',
        schedule: '',
        address: ''
    });
    
    const [imagenes, setImagenes] = useState({
        mainImage: null,
        galleryImages: []
    });
    
    const [previews, setPreviews] = useState({
        mainImage: null,
        galleryImages: []
    });
    
    const [existingImages, setExistingImages] = useState({
        mainImageUrl: null,
        galleryImagesUrls: []
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Determinar modo y cargar datos existentes
    useEffect(() => {
        if (user && user.emprendimiento) {
            setMode('edit');
            // Pre-llenar datos del emprendimiento existente
            setFormData(prev => ({
                ...prev,
                nombre: user.emprendimiento,
                universidad: stand?.universidad || '',
                correo: user.email || '',
                descripcion: stand?.descripcion || '',
                schedule: stand?.schedule || '',
                address: stand?.address || ''
            }));
            
            // Cargar imágenes existentes del stand
            setExistingImages({
                mainImageUrl: stand?.mainImageUrl || null,
                galleryImagesUrls: stand?.galleryImagesUrls || []
            });
        } else {
            setMode('create');
            // Pre-llenar datos básicos para nuevo emprendimiento
            setFormData(prev => ({
                ...prev,
                universidad: stand?.universidad || '',
                correo: user?.email || ''
            }));
        }
    }, [user, stand]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenes(prev => ({ ...prev, mainImage: file }));
            setPreviews(prev => ({ 
                ...prev, 
                mainImage: URL.createObjectURL(file) 
            }));
        }
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const currentTotal = imagenes.galleryImages.length + existingImages.galleryImagesUrls.length;
        const maxAllowed = 5;
        const availableSlots = maxAllowed - currentTotal;
        
        if (files.length > availableSlots) {
            setError(`Solo puedes agregar ${availableSlots} imágenes más. Máximo ${maxAllowed} imágenes en total.`);
            return;
        }
        
        if (files.length > 0) {
            setImagenes(prev => ({ 
                ...prev, 
                galleryImages: [...prev.galleryImages, ...files] 
            }));
            
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => ({ 
                ...prev, 
                galleryImages: [...prev.galleryImages, ...newPreviews] 
            }));
        }
    };

    const removeNewGalleryImage = (index) => {
        setImagenes(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }));
        setPreviews(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }));
    };

    const removeExistingGalleryImage = (index) => {
        setExistingImages(prev => ({
            ...prev,
            galleryImagesUrls: prev.galleryImagesUrls.filter((_, i) => i !== index)
        }));
    };

    const removeMainImage = () => {
        setImagenes(prev => ({ ...prev, mainImage: null }));
        setPreviews(prev => ({ ...prev, mainImage: null }));
    };

    const removeExistingMainImage = () => {
        setExistingImages(prev => ({ ...prev, mainImageUrl: null }));
    };

    const uploadImages = async () => {
        const uploadedUrls = {
            mainImageUrl: existingImages.mainImageUrl,
            galleryImagesUrls: [...existingImages.galleryImagesUrls]
        };

        try {
            // Subir nueva imagen principal si existe
            if (imagenes.mainImage) {
                const mainImageResponse = await authService.uploadImage(imagenes.mainImage);
                if (mainImageResponse.success) {
                    uploadedUrls.mainImageUrl = mainImageResponse.url;
                }
            }

            // Subir nuevas imágenes de galería
            if (imagenes.galleryImages.length > 0) {
                for (const image of imagenes.galleryImages) {
                    try {
                        const galleryResponse = await authService.uploadImage(image);
                        if (galleryResponse.success) {
                            uploadedUrls.galleryImagesUrls.push(galleryResponse.url);
                        }
                    } catch (error) {
                        console.error('Error subiendo imagen de galería:', error);
                        // Continuar con las demás imágenes
                    }
                }
            }

            return uploadedUrls;
        } catch (error) {
            console.error('Error subiendo imágenes:', error);
            return uploadedUrls; // Retornar lo que se haya podido subir
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.descripcion) {
            setError('Nombre y descripción son requeridos');
            return;
        }

        // En modo crear, validar si ya tiene emprendimiento
        if (mode === 'create' && user && user.emprendimiento) {
            setError('Ya tienes un emprendimiento registrado. Cambia a modo edición.');
            setMode('edit');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Subir imágenes
            const uploadedUrls = await uploadImages();

            if (mode === 'create') {
                // Crear nuevo emprendimiento
                const updatedUserData = {
                    nombre: user.nombre,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    emprendimiento: formData.nombre,
                    foto: user.foto,
                    favoritos: user.favoritos || []
                };

                const userResponse = await authService.updateProfile(updatedUserData);
                
                if (!userResponse.success) {
                    throw new Error('Error actualizando el perfil de usuario');
                }
            }

            // Actualizar stand (tanto para crear como para editar)
            const standUpdateData = {
                descripcion: formData.descripcion,
                schedule: formData.schedule || null,
                address: formData.address || null,
                mainImageUrl: uploadedUrls.mainImageUrl,
                galleryImagesUrls: uploadedUrls.galleryImagesUrls
            };

            const standResponse = await standsService.updateMyStand(standUpdateData);
            
            if (standResponse.success) {
                setSuccess(true);
                
                // Limpiar nuevas imágenes (mantener las existentes)
                setImagenes({
                    mainImage: null,
                    galleryImages: []
                });
                setPreviews({
                    mainImage: null,
                    galleryImages: []
                });
                
                // Actualizar imágenes existentes con las nuevas
                setExistingImages(uploadedUrls);
                
                // Notificar al componente padre
                if (onEmprendimientoCreated) {
                    onEmprendimientoCreated();
                }

                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(() => setSuccess(false), 5000);
            }

        } catch (error) {
            console.error('Error procesando emprendimiento:', error);
            setError(error.message || 'Error procesando el emprendimiento');
        } finally {
            setLoading(false);
        }
    };

    const totalImages = existingImages.galleryImagesUrls.length + imagenes.galleryImages.length;

    return (
        <div className="hu12-container">
            <h2>
                <FormattedMessage 
                    id={mode === 'create' ? "hu12.title.create" : "hu12.title.edit"} 
                    defaultMessage={mode === 'create' ? "Registro de nuevo emprendimiento" : "Modificar emprendimiento"} 
                />
            </h2>

            {mode === 'edit' && (
                <div className="mode-indicator">
                    <p>
                        <FormattedMessage 
                            id="hu12.editing_mode" 
                            defaultMessage="Editando emprendimiento: {nombre}" 
                            values={{ nombre: user.emprendimiento }}
                        />
                    </p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="success-message">
                    <p>
                        <FormattedMessage 
                            id={mode === 'create' ? "hu12.success.create" : "hu12.success.edit"} 
                            defaultMessage={mode === 'create' ? "¡Emprendimiento creado exitosamente!" : "¡Emprendimiento actualizado exitosamente!"} 
                        />
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="hu12-form">
                <div className="form-group">
                    <FormattedMessage id="hu12.nombre" defaultMessage="Nombre del emprendimiento">
                        {msg => (
                            <input
                                type="text"
                                name="nombre"
                                placeholder={msg}
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                disabled={loading || mode === 'edit'}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu12.descripcion" defaultMessage="Descripción del emprendimiento">
                        {msg => (
                            <textarea
                                name="descripcion"
                                placeholder={msg}
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4"
                                required
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu12.universidad" defaultMessage="Universidad">
                        {msg => (
                            <input
                                type="text"
                                name="universidad"
                                placeholder={msg}
                                value={formData.universidad}
                                onChange={handleChange}
                                disabled={true} // Solo lectura
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu12.correo" defaultMessage="Correo de contacto">
                        {msg => (
                            <input
                                type="email"
                                name="correo"
                                placeholder={msg}
                                value={formData.correo}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu12.schedule" defaultMessage="Horario de atención (opcional)">
                        {msg => (
                            <input
                                type="text"
                                name="schedule"
                                placeholder={msg}
                                value={formData.schedule}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="form-group">
                    <FormattedMessage id="hu12.address" defaultMessage="Dirección o ubicación específica (opcional)">
                        {msg => (
                            <input
                                type="text"
                                name="address"
                                placeholder={msg}
                                value={formData.address}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        )}
                    </FormattedMessage>
                </div>

                {/* Imagen principal */}
                <div className="form-group">
                    <label>
                        <FormattedMessage 
                            id="hu12.main_image" 
                            defaultMessage="Imagen principal del emprendimiento" 
                        />
                    </label>
                    
                    {/* Imagen principal existente */}
                    {existingImages.mainImageUrl && (
                        <div className="existing-image-preview">
                            <h4>Imagen actual:</h4>
                            <div className="image-container">
                                <img 
                                    src={existingImages.mainImageUrl} 
                                    alt="Imagen principal actual" 
                                    className="preview-image-main"
                                />
                                <button 
                                    type="button"
                                    className="remove-image"
                                    onClick={removeExistingMainImage}
                                    disabled={loading}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Nueva imagen principal */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        disabled={loading}
                    />
                    {previews.mainImage && (
                        <div className="new-image-preview">
                            <h4>Nueva imagen:</h4>
                            <div className="image-container">
                                <img 
                                    src={previews.mainImage} 
                                    alt="Nueva imagen principal" 
                                    className="preview-image-main"
                                />
                                <button 
                                    type="button"
                                    className="remove-image"
                                    onClick={removeMainImage}
                                    disabled={loading}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Galería de imágenes */}
                <div className="form-group">
                    <label>
                        <FormattedMessage 
                            id="hu12.gallery_images" 
                            defaultMessage="Galería de imágenes ({current}/{max})" 
                            values={{ current: totalImages, max: 5 }}
                        />
                    </label>
                    
                    {/* Imágenes existentes de la galería */}
                    {existingImages.galleryImagesUrls.length > 0 && (
                        <div className="existing-gallery">
                            <h4>Imágenes actuales:</h4>
                            <div className="gallery-preview">
                                {existingImages.galleryImagesUrls.map((url, index) => (
                                    <div key={`existing-${index}`} className="gallery-item">
                                        <img 
                                            src={url} 
                                            alt={`Imagen actual ${index + 1}`} 
                                            className="preview-image-gallery"
                                        />
                                        <button 
                                            type="button"
                                            className="remove-image"
                                            onClick={() => removeExistingGalleryImage(index)}
                                            disabled={loading}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Input para nuevas imágenes */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryImagesChange}
                        disabled={loading || totalImages >= 5}
                    />
                    
                    {/* Nuevas imágenes de galería */}
                    {previews.galleryImages.length > 0 && (
                        <div className="new-gallery">
                            <h4>Nuevas imágenes:</h4>
                            <div className="gallery-preview">
                                {previews.galleryImages.map((preview, index) => (
                                    <div key={`new-${index}`} className="gallery-item">
                                        <img 
                                            src={preview} 
                                            alt={`Nueva imagen ${index + 1}`} 
                                            className="preview-image-gallery"
                                        />
                                        <button 
                                            type="button"
                                            className="remove-image"
                                            onClick={() => removeNewGalleryImage(index)}
                                            disabled={loading}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? (
                        <FormattedMessage 
                            id={mode === 'create' ? "hu12.creating" : "hu12.updating"} 
                            defaultMessage={mode === 'create' ? "Creando emprendimiento..." : "Actualizando emprendimiento..."} 
                        />
                    ) : (
                        <FormattedMessage 
                            id={mode === 'create' ? "hu12.submit.create" : "hu12.submit.update"} 
                            defaultMessage={mode === 'create' ? "Crear emprendimiento" : "Actualizar emprendimiento"} 
                        />
                    )}
                </button>
            </form>
        </div>
    );
};

export default HU12;