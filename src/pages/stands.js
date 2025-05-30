import React, { useState, useRef, useEffect } from 'react';
import './stands.css';
import { ChevronDown, Settings, User, LogOut, Bell, Mail } from 'lucide-react';

function StandsFunc() {

    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Universidades Disponibles');
    const dropdown1Ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
                setIsOpen1(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const universities = [
    "Universidad de los Andes",
    "Universidad Nacional",
    "Universidad Javeriana",
    "Universidad de Antioquia",
    "Universidad del Rosario",
    "Universidad EAFIT",
    "Universidad Externado de Colombia",
    "Universidad del Norte"
];

    return(
            <body className="stands-container">
                <header className="navbar" >
                <h1 className="title">Stands</h1>
                </header>
                
                <main className="main-content">
                    <section className="left-section">
                        <div className="subtitle-container" ref={dropdown1Ref}>
                            <button  onClick={() => setIsOpen1(!isOpen1)} className="subtitle">
                                <span className={selectedOption === 'Universidades Disponibles' ? 'text-gray-500' : 'text-gray-800'}>
                                {selectedOption}
                                </span>
                                <ChevronDown 
                                size={20} 
                                className={`transform transition-transform ${isOpen1 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {isOpen1 && (
                            <div className="dropdown-menu">
                            {universities.map((option, index) => (
                            <button
                                key={index}
                                className="dropdown-option"
                                onClick={() => {
                                setSelectedOption(option);
                                setIsOpen1(false);
                                }}
                            >
                                {option}
                            </button>
                                ))}
                            </div>
                            )}
                        </div>

                        <div className="input-group">
                        <label className="input-text">En qué universidad te encuentras:</label>
                        <input list="universidades" id="universidades "type="text" autocomplete="off" className="input" placeholder="Ej: Universidad de los Andes"/>
                        </div>

                        <div className="box" id="recomendaciones">
                        <h3>Recomendaciones para ti</h3>
                        <p>Según reservaciones anteriores</p>
                        </div>

                        <div className="box" id="estadisticas">
                        <h3>Estadísticas de stands anteriores</h3>
                        <p>Según reservaciones anteriores</p>
                        </div>

                        <button id="ver-perfil">Ver mi perfil</button>    
                    </section>

                    <section className="right-section">
                            <h2>Stands disponibles en <em>Universidad de los Andes</em></h2>

                            <div id="mapa-stands">
                            <img src="ruta/a/tu/imagen-del-mapa.png" alt="Mapa de la universidad con stands disponibles"/>
                            </div>
                    </section>
                </main>
            <footer>
            <button id="btn-regresar">&#8592;</button>
            </footer>
            </body>
    )
}

export default StandsFunc;