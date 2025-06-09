import React from 'react';
import './Inicio.css';
import HU13 from '../components/HU13.js';
import Mapa from '../components/Mapa.js';
import Navbar from '../components/Navbardef.js';

function Inicio() {
  return (
    <div className="page-container">
      <React.Fragment>
        <body>
          {/* Contenedor del Navbar */}
          <div>
            <Navbar />
          </div>

          {/* Contenedor del componente HU13 */}
          <div className="hu13-container">
            <HU13 />
          </div>

          {/* Contenedor del componente Mapa */}
          <div className="mapa-container">
            <Mapa />
          </div>
        </body>
      </React.Fragment>
    </div>
  );
}

export default Inicio;
