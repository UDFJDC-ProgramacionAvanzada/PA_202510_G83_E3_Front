import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './Perfil.css';
import HU04 from '../components/HU04';
import HU10 from '../components/HU10';

const FavoritosVender = () => {
  const favoritosVender = [
    'Stand 10 UD Calle 40',
    'Stand 3 P.U. Javeriana'
  ];

  return (
    <div className="favoritos-section-vender">
      <h3><FormattedMessage id="perfil.favoritos" /></h3>
      {favoritosVender.map((nombre, index) => (
        <div key={index} className="favorito-item">
          <span>{nombre}</span>
          <span className="heart">🖤</span>
        </div>
      ))}
    </div>
  );
};

const UserForm = ({ formData, onChange }) => (
  <div className="user-details">
    <div className="detail-item">
      <label><FormattedMessage id="perfil.nombre" /></label>
      <FormattedMessage id="perfil.placeholder.nombre">
        {msg => (
          <input 
            type="text" 
            className="detail-input"
            value={formData.nombre}
            onChange={(e) => onChange('nombre', e.target.value)}
            placeholder={msg}
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
            value={formData.telefono}
            onChange={(e) => onChange('telefono', e.target.value)}
            placeholder={msg}
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
            value={formData.correo}
            onChange={(e) => onChange('correo', e.target.value)}
            placeholder={msg}
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
            value={formData.emprendimiento}
            onChange={(e) => onChange('emprendimiento', e.target.value)}
            placeholder={msg}
          />
        )}
      </FormattedMessage>
    </div>
  </div>
);

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
      <div className="perfil-header">
        <h1><FormattedMessage id="perfil.titulo" /></h1>
      </div>

      <div className="perfil-content">
        <div className="user-info-section">
          <div className="user-avatar">
            <div className="avatar-circle">
              <div className="avatar-icon"></div>
            </div>
          </div>

          <UserForm formData={formData} onChange={handleInputChange} />
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

            <StandsContent mode={standsMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
