import React from 'react';
import './HU13.css';
import { FormattedMessage } from 'react-intl';

function HU13() {
    return (
        <div className="hu13-container">
            <div className="content-wrapper">

                <div className="left-content">

                    <h2 className="titulo_de_aviso">
                        <FormattedMessage id="hu13.titulo" />
                    </h2>

                    <FormattedMessage id="hu13.placeholder">
                        {msg => (
                            <input 
                                type="text" 
                                placeholder={msg} 
                                className="search-input" 
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className="right-content">
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

export default HU13;
