import React from 'react';
import './Vender.css';

function Vender() {
    return (
        <div className="vender-container">
            <h1 className='texto-vender'>VENDER</h1>
            <div className='register'>
                <span className='register-text'>Eres nuevo?</span>
                <button className='register-button'>Registrate</button>
            </div>  
        </div>
    )
}

export default Vender;