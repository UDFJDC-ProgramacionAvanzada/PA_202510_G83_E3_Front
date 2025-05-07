import React from 'react';
import './Inicio.css';
import HU13 from './components/HU13.js';
import Mapa from './components/Mapa.js' 

function App() {

  return (
    <body>
      <div className="navbar">
        <a className="Nombre">MercaU</a>
        <a className="Inicio" href="#Inicio" onClick={() => console.log("Enlace clickeado")}>Inicio</a>
        <a className="Vender" href="#Vender">Vender</a>
        <a className="Comprar"href="#Comprar">Comprar</a>

        <button className="login-btn" onClick={() => window.location.href='https://youtube.com/a/chat/s/62cfa149-33d0-4bcc-879c-d689d0ff6910'}>
        Iniciar Sesión
        </button>
        <a className="profile-link" href="#MiPerfil">Mi Perfil</a>
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
