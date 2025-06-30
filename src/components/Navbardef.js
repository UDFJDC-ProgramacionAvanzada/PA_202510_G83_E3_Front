import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '../contexts/AuthContext'; // Importar el contexto

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth(); // Usar el contexto
    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false); // Cerrar el menú
        navigate('/'); // Redirigir al inicio
    };

    return (
        <div className="navbar1">
            {/* Logo o nombre del sitio, con enlace a la página principal */}
            <a className="Nombre" href="http://localhost:3000">MercaU</a>

            {/* Icono de menú hamburguesa, visible solo en móviles */}
            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>
            
            {/* Contenedor de los enlaces del menú */}
            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>

                {/* Mostrar información del usuario si está autenticado */}
                {isAuthenticated && (
                    <span className="nav-item welcome-message">
                        <FormattedMessage 
                            id="welcome.user" 
                            defaultMessage="Bienvenido, {name}"
                            values={{ name: user?.nombre }}
                        />
                    </span>
                )}

                {/* Enlace a perfil */}
                <Link to="/perfil" className="nav-item profile-link">
                    <FormattedMessage id='Mi Perfil'/>
                </Link>

                {/* Enlace a Inicio */}
                <Link to="/" className="nav-item">
                    <FormattedMessage id='Inicio'/>
                </Link>

                {/* Enlace a Vender */}
                <Link to="/vender" className="nav-item">
                    <FormattedMessage id='Vender'/>
                </Link>

                {/* Enlace a Comprar */}
                <Link to="/comprar" className="nav-item">
                    <FormattedMessage id='Comprar'/>
                </Link>

                {/* Mostrar botón de Login o Logout según el estado de autenticación */}
                {isAuthenticated ? (
                    <button 
                        onClick={handleLogout} 
                        className="nav-log nav-item logout-btn"
                    >
                        <FormattedMessage id='Cerrar Sesion' defaultMessage='Cerrar Sesión'/>
                    </button>
                ) : (
                    <Link to="/login" className="nav-log nav-item login-btn">
                        <FormattedMessage id='Iniciar Sesion'/>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;