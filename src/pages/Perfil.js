import React from 'react';
import './Perfil.css';
import HU04 from '../components/HU04';

const Perfil = () => {
  return (
    <div className="perfil-container">
      {/* Header azul */}
      <div className="perfil-header">
        <h1>Mi perfil</h1>
      </div>

      <div className="perfil-content">
        {/* Sección izquierda - Información del usuario */}
        <div className="user-info-section">
          <div className="user-avatar">
            <div className="avatar-circle">
              <div className="avatar-icon"></div>
            </div>
          </div>

          <div className="user-details">
            <div className="detail-item">
              <label>Nombre</label>
              <div className="detail-value">
                Juan David Ruiz
                <span className="edit-icon">✏️</span>
              </div>
            </div>

            <div className="detail-item">
              <label>Número de teléfono</label>
              <div className="detail-value">
                (+57) 3228995695
                <span className="edit-icon">✏️</span>
              </div>
            </div>

            <div className="detail-item">
              <label>Correo</label>
              <div className="detail-value">
                juandar@gmail.com
                <span className="edit-icon">✏️</span>
              </div>
            </div>

            <div className="detail-item">
              <label>Nombre emprendimiento</label>
              <div className="detail-value">
                Empanadas jd
                <span className="edit-icon">✏️</span>
              </div>
            </div>
          </div>

          <div className="back-button">
            <button className="btn-back">←</button>
          </div>
        </div>

        {/* Sección derecha - Stands */}
        <div className="stands-section">
          <div className="stands-card">
            <h2>Tus Stands</h2>
            <select className="stands-dropdown">
              <option>Para comprar</option>
            </select>

            {/* Componente HU04 que contiene favoritos y otros visitados */}
            <HU04 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;