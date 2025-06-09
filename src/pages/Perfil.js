import React from 'react';
import './Perfil.css';
import HU04 from '../components/HU04';

const Perfil = () => {
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

          {/* Detalles del usuario con posibilidad de editar */}
          <div className="user-details">
            <div className="detail-item">
              <label>Nombre</label>
              <div className="detail-value">
                Juan David Ruiz
                <span className="edit-icon">✏️</span> {/* Icono para editar */}
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

          {/* Botón para regresar */}
          <div className="back-button">
            <button className="btn-back">←</button>
          </div>
        </div>

        {/* Sección derecha: Stands del usuario */}
        <div className="stands-section">
          <div className="stands-card">
            <h2>Tus Stands</h2>
            {/* Dropdown para seleccionar opción (ejemplo: "Para comprar") */}
            <select className="stands-dropdown">
              <option>Para comprar</option>
            </select>

            {/* Componente HU04 que muestra favoritos y otros stands visitados */}
            <HU04 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
