import React from 'react';
import './HU13.css';


function HU13() {
    return (
        <div className="hu13-container">
            <div className="left-content">
                <h2 className="titulo_de_aviso">Compra, vende e impulsa a tu universidad</h2>
                <input type="text" placeholder="¿Qué estás buscando hoy?" className="search-input" />
            </div>
            <img src="/imagenamigos.png" alt="Imagen de amigos" className="imagen_amigos" />
        </div>
    );
}

export default HU13;