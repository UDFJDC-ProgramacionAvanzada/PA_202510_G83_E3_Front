import React from 'react';
// Importa el hook useState para manejar el estado del menú
import { useState } from 'react';
// Importa los estilos específicos para la barra de navegación
import './Navbar.css';
// Importa Link para navegación interna sin recargar la página
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function Navbar() {
    // Estado que controla si el menú hamburguesa está abierto o cerrado
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Función para alternar el estado del menú hamburguesa
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar1">

            {/* Logo o nombre del sitio, con enlace a la página principal */}
            <a className="Nombre" href="http://localhost:3000">MercaU</a>

            {/* Icono de menú hamburguesa, visible solo en móviles */}
            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>
            
            {/* Contenedor de los enlaces del menú. La clase 'active' se añade si menuOpen es true */}
            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>

                {/* Enlace a perfil, usando Link para navegación SPA */}
                <Link to="/perfil" className="nav-item profile-link"><FormattedMessage id='Mi Perfil'/></Link>

                {/* Enlace ancla a sección Inicio, con manejador para registro en consola */}
                <Link to="/" className="nav-item"><FormattedMessage id='Inicio'/></Link>

                {/* Enlace a página para vender productos */}
                <Link to="/vender" className="nav-item"><FormattedMessage id='Vender'/></Link>

                {/* Enlace ancla a sección Comprar */}
                <Link to="/comprar" className="nav-item"><FormattedMessage id='Comprar'/></Link>

                {/* Botón para iniciar sesión que redirige a una URL externa */}
                
                    <Link to="/login" className="nav-log nav-item login-btn"><FormattedMessage id='Iniciar Sesion'/></Link>
                
            </div>
        </div>
    );
}

// Exporta el componente para usarlo en la aplicación
export default Navbar;
