import React from 'react';
import './Inicio.css';
import HU13 from '../components/HU13.js';
import Mapa from '../components/Mapa.js';
import Navbar from '../components/Navbardef.js';
import Sugerencias from '../components/Sugerencias';

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
          
          <div className="contenido-horizontal">
            <div className="sugerencias-container">
              <Sugerencias />
            </div>
            <div className="mapa-container">
              <Mapa />
            </div>
          </div>
        </body>
      </React.Fragment>
    </div>
  );
}

export default Inicio;
