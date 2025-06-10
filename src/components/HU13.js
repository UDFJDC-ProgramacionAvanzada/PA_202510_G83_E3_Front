import React from 'react';
// Importa los estilos específicos de este componente
import './HU13.css';
import { FormattedMessage } from 'react-intl';


function HU13() {
    return (
        <div className="hu13-container">
            <div className="content-wrapper">

                {/* Sección izquierda: texto e input de búsqueda */}
                <div className="left-content">
                    {/* Título promocional del sitio */}
                    <h2 className="titulo_de_aviso">
                        <FormattedMessage id='Compra, vende e impulsa a tu universidad' /> 
                    </h2>

                    {/* Campo de búsqueda para que el usuario introduzca lo que desea buscar */}
                    <input 
                        type="text" 
                        placeholder= "¿Qué estás buscando?" 
                        className="search-input" 
                    />
                </div>

                {/* Sección derecha: imagen decorativa */}
                <div className="right-content">
                    {/* Imagen representando estudiantes o comunidad universitaria */}
                    <img 
                        src="/imagenamigos.png" 
                        alt="Imagen de amigos" 
                        className="imagen_amigos" 
                    />
                </div>

            </div>
        </div>
    );
}

// Exporta el componente para ser utilizado en otras partes de la aplicación
export default HU13;
