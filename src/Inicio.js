import React from 'react';
import './Inicio.css';
import HU13 from './components/HU13.js';
import Mapa from './components/Mapa.js' 
import Navbar from './components/Navbardef.js';

function App() {
  return (
    <body>
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="hu13-container">
        <HU13 />
      </div>    
      <div className="mapa-container">
        <Mapa/>
      </div>
    </body>
  );
}

export default App;
