import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import './Perfil.css';
import HU04 from '../components/HU04';
import HU10 from '../components/HU10';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import { Camera, Save, Edit, X, Plus, Trash2 } from 'lucide-react';

const FavoritosVender = ({ favoritos, onUpdateFavoritos }) => {
  const [newFavorito, setNewFavorito] = useState('');

  const handleAddFavorito = () => {
    if (newFavorito.trim()) {
      onUpdateFavoritos([...favoritos, newFavorito.trim()]);
      setNewFavorito('');
    }
  };

  const handleRemoveFavorito = (index) => {
    const newFavoritos = favoritos.filter((_, i) => i !== index);
    onUpdateFavoritos(newFavoritos);
  };

  return (
    <div className="favoritos-section-vender">
      <h3><FormattedMessage id="perfil.favoritos" /></h3>
      
      {favoritos && favoritos.map((nombre, index) => (
        <div key={index} className="favorito-item">
          <span>{nombre}</span>
          <button 
            onClick={() => handleRemoveFavorito(index)}
            className="remove-favorito-btn"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <div className="add-favorito">
        <input
          type="text"
          value={newFavorito}
          onChange={(e) => setNewFavorito(e.target.value)}
          placeholder="Agregar nuevo favorito"
          className="favorito-input"
        />
        <button onClick={handleAddFavorito} className="add-favorito-btn">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

const UserForm = ({ formData, onChange, isEditing }) => (
  <div className="user-details">
    <div className="detail-item">
      <label><FormattedMessage id="perfil.nombre" /></label>
      <FormattedMessage id="perfil.placeholder.nombre">
        {msg => (
          <input 
            type="text" 
            className="detail-input"
            value={formData.nombre || ''}
            onChange={(e) => onChange('nombre', e.target.value)}
            placeholder={msg}
            disabled={!isEditing}
          />
        )}
      </FormattedMessage>
    </div>
    
    <div className="detail-item">
      <label><FormattedMessage id="perfil.telefono" /></label>
      <FormattedMessage id="perfil.placeholder.telefono">
        {msg => (
          <input 
            type="tel" 
            className="detail-input"
            value={formData.phoneNumber || ''}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder={msg}
            disabled={!isEditing}
          />
        )}
      </FormattedMessage>
    </div>
    
    <div className="detail-item">
      <label><FormattedMessage id="perfil.correo" /></label>
      <FormattedMessage id="perfil.placeholder.correo">
        {msg => (
          <input 
            type="email" 
            className="detail-input"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder={msg}
            disabled={!isEditing}
          />
        )}
      </FormattedMessage>
    </div>
    
    <div className="detail-item">
      <label><FormattedMessage id="perfil.emprendimiento" /></label>
      <FormattedMessage id="perfil.placeholder.emprendimiento">
        {msg => (
          <input 
            type="text" 
            className="detail-input"
            value={formData.emprendimiento || ''}
            onChange={(e) => onChange('emprendimiento', e.target.value)}
            placeholder={msg}
            disabled={!isEditing}
          />
        )}
      </FormattedMessage>
    </div>
  </div>
);

const StandsContent = ({ mode, favoritos, onUpdateFavoritos }) => {
  const renderMode = {
    comprar: () => <HU04 />,
    vender: () => (
      <>
        <FavoritosVender 
          favoritos={favoritos || []} 
          onUpdateFavoritos={onUpdateFavoritos}
        />
        <HU10 />
      </>
    )
  };

  return renderMode[mode] ? renderMode[mode]() : null;
};

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    emprendimiento: user?.emprendimiento || '',
    foto: user?.foto || '',
    favoritos: user?.favoritos || []
  });

  const [standsMode, setStandsMode] = useState('comprar');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setMessage({ type: 'error', text: 'Solo se permiten archivos JPG y PNG' });
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'La imagen no puede ser mayor a 5MB' });
      return;
    }

    try {
      setUploadingImage(true);
      setMessage({ type: '', text: '' });

      const response = await authService.uploadImage(file);
      
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          foto: response.url
        }));
        setMessage({ type: 'success', text: 'Imagen subida correctamente' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al subir la imagen' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdateFavoritos = (newFavoritos) => {
    setFormData(prev => ({
      ...prev,
      favoritos: newFavoritos
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      // Llamar al servicio para actualizar el perfil
      const response = await authService.updateProfile(formData);
      
      if (response.success) {
        // Actualizar el contexto con los nuevos datos
        updateUser({
          ...user,
          ...formData
        });
        
        setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
        setIsEditing(false);
        
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: user?.nombre || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
      emprendimiento: user?.emprendimiento || '',
      foto: user?.foto || '',
      favoritos: user?.favoritos || []
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleModeChange = (e) => {
    setStandsMode(e.target.value);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1><FormattedMessage id="perfil.titulo" /></h1>
        
        {/* Botones de acción */}
        <div className="header-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              <Edit size={16} />
              <FormattedMessage id="perfil.editar" defaultMessage="Editar" />
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSave} className="btn btn-success" disabled={loading}>
                <Save size={16} />
                {loading ? 'Guardando...' : <FormattedMessage id="perfil.guardar" defaultMessage="Guardar" />}
              </button>
              <button onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
                <X size={16} />
                <FormattedMessage id="perfil.cancelar" defaultMessage="Cancelar" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mensajes */}
      {message.text && (
        <div className={`message ${message.type === 'error' ? 'error-message' : 'success-message'}`}>
          {message.text}
        </div>
      )}

      <div className="perfil-content">
        <div className="user-info-section">
          {/* Avatar con foto */}
          <div className="user-avatar">
            <div className="avatar-circle" onClick={() => isEditing && fileInputRef.current?.click()}>
              {formData.foto ? (
                <img src={formData.foto} alt="Avatar" className="avatar-image" />
              ) : (
                <div className="avatar-icon"></div>
              )}
              
              {isEditing && (
                <div className="avatar-overlay">
                  <Camera size={24} />
                  {uploadingImage && <span>Subiendo...</span>}
                </div>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: 'none' }}
            />
          </div>

          <UserForm 
            formData={formData} 
            onChange={handleInputChange}
            isEditing={isEditing}
          />
        </div>

        <div className="stands-section">
          <div className="stands-card">
            <h2><FormattedMessage id="perfil.stands.titulo" /></h2>
            <select className="stands-dropdown" value={standsMode} onChange={handleModeChange}>
              <option value="comprar">
                <FormattedMessage id="perfil.stands.comprar" />
              </option>
              <option value="vender">
                <FormattedMessage id="perfil.stands.vender" />
              </option>
            </select>

            <StandsContent 
              mode={standsMode} 
              favoritos={formData.favoritos}
              onUpdateFavoritos={handleUpdateFavoritos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;