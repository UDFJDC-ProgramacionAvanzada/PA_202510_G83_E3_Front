import React from 'react';
import {useState} from 'react';
import './Inicio.css';
import HU13 from './components/HU13.js';
import Mapa from './components/Mapa.js' 

function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <body>
      <div className="navbar">
        <a className="Nombre" href="http://localhost:3000">MercaU</a>
        
        {/* Menú Hamburguesa (solo visible en móvil) */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        
        {/* Contenedor de los elementos del menú */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          
          <a className="nav-item" href="#Inicio" onClick={() => console.log("Enlace clickeado")}>Inicio</a>
          <a className="nav-item" href="#Vender">Vender</a>
          <a className="nav-item" href="#Comprar">Comprar</a>
          
          <a className="nav-item profile-link" href="#MiPerfil">Mi Perfil</a>
          
          <button className="nav-item login-btn" onClick={() => window.location.href='https://youtube.com/a/chat/s/62cfa149-33d0-4bcc-879c-d689d0ff6910'}>
            Iniciar Sesión
          </button>
        </div>
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
