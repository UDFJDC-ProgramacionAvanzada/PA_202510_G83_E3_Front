import React, { useState } from 'react';
import './Perfil.css';
import HU04 from '../components/HU04';
import HU10 from '../components/HU10';

// Componente especializado para favoritos de vender (SRP)
const FavoritosVender = () => {
  const favoritosVender = [
    'Stand 10 UD Calle 40',
    'Stand 3 P.U. Javeriana'
  ];

  return (
    <div className="favoritos-section-vender">
      <h3>Favoritos</h3>
      {favoritosVender.map((nombre, index) => (
        <div key={index} className="favorito-item">
          <span>{nombre}</span>
          <span className="heart">🖤</span>
        </div>
      ))}
    </div>
  );
};

// Componente para manejar formulario de usuario (SRP)
const UserForm = ({ formData, onChange }) => (
  <div className="user-details">
    <div className="detail-item">
      <label>Nombre</label>
      <input 
        type="text" 
        className="detail-input"
        value={formData.nombre}
        onChange={(e) => onChange('nombre', e.target.value)}
        placeholder="Ingresa tu nombre"
      />
    </div>
    <div className="detail-item">
      <label>Número de teléfono</label>
      <input 
        type="tel" 
        className="detail-input"
        value={formData.telefono}
        onChange={(e) => onChange('telefono', e.target.value)}
        placeholder="Ej: (+57) 3228995695"
      />
    </div>
    <div className="detail-item">
      <label>Correo</label>
      <input 
        type="email" 
        className="detail-input"
        value={formData.correo}
        onChange={(e) => onChange('correo', e.target.value)}
        placeholder="Ej: tumail@gmail.com"
      />
    </div>
    <div className="detail-item">
      <label>Nombre emprendimiento</label>
      <input 
        type="text" 
        className="detail-input"
        value={formData.emprendimiento}
        onChange={(e) => onChange('emprendimiento', e.target.value)}
        placeholder="Ej: Mi emprendimiento"
      />
    </div>
  </div>
);

// Componente para renderizar contenido según modo (OCP mejorado)
const StandsContent = ({ mode }) => {
  const renderMode = {
    comprar: () => <HU04 />,
    vender: () => (
      <>
        <FavoritosVender />
        <HU10 />
      </>
    )
  };

  return renderMode[mode] ? renderMode[mode]() : null;
};

const Perfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    emprendimiento: ''
  });

  const [standsMode, setStandsMode] = useState('comprar');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModeChange = (e) => {
    setStandsMode(e.target.value);
  };
  return (
    <div className="perfil-container">
      {/* Header azul con título */}
      <div className="perfil-header">
        <h1>Mi perfil</h1>
      </div>

      <div className="perfil-content">
        {/* Sección izquierda: Información del usuario */}
        <div className="user-info-section">
          {/* Avatar circular */}
          <div className="user-avatar">
            <div className="avatar-circle">
              <div className="avatar-icon"></div>
            </div>
          </div>

          <UserForm formData={formData} onChange={handleInputChange} />


        </div>

        {/* Sección derecha: Stands del usuario */}
        <div className="stands-section">
          <div className="stands-card">
            <h2>Tus Stands</h2>
            <select className="stands-dropdown" value={standsMode} onChange={handleModeChange}>
              <option value="comprar">Para comprar</option>
              <option value="vender">Para vender</option>
            </select>

            <StandsContent mode={standsMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
