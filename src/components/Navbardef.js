import React from 'react';
import {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
<div className="navbar1">
    
    <a className="Nombre" href="http://localhost:3000">MercaU</a>
    {/* Menú Hamburguesa (solo visible en móvil) */}
    <div className="hamburger" onClick={toggleMenu}>
        ☰
    </div>
    
{/* Contenedor de los elementos del menú */}
    <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a className="nav-item profile-link" href="#MiPerfil">Mi Perfil</a>
        <a className="nav-item" href="#Inicio" onClick={() => console.log("Enlace clickeado")}>Inicio</a>

        <Link to="/vender" className="nav-item" >Vender</Link>

        <a className="nav-item" href="#Comprar">Comprar</a>
        <button className="nav-item login-btn" onClick={() => window.location.href='https://youtube.com/a/chat/s/62cfa149-33d0-4bcc-879c-d689d0ff6910'}>
        Iniciar Sesión
        </button>
    </div>
</div>
    );
}
export default Navbar;