import React, { useState, useRef, useEffect } from 'react';
import './stands.css';
import { ChevronDown } from 'lucide-react';
// Importaciones para el mapa de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
// Fix para iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configuración del icono por defecto para los markers
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function StandsFunc() {
    // Estado para controlar la visibilidad del dropdown
    const [isOpen1, setIsOpen1] = useState(false);
    // Estado para la opción seleccionada en el dropdown
    const [selectedOption, setSelectedOption] = useState('Stands Disponibles');
    // Ref para detectar clicks fuera del dropdown y cerrarlo
    const dropdown1Ref = useRef(null);

    // Estado con los stands que se muestran en el mapa
    const [stands, setStands] = useState([
        {
            id: 1,
            lat: 4.6097,
            lng: -74.0817,
            nombre: "Stand Universidad de los Andes - Principal",
            descripcion: "Stand principal del campus",
            disponible: true
        },
        {
            id: 2,
            lat: 4.6085,
            lng: -74.0825,
            nombre: "Stand Biblioteca Mario Laserna",
            descripcion: "Cerca de la biblioteca principal",
            disponible: false
        },
        {
            id: 3,
            lat: 4.6105,
            lng: -74.0810,
            nombre: "Stand Cafetería Central",
            descripcion: "Al lado de la cafetería principal",
            disponible: true
        }
    ]);

    // Hook para detectar clicks fuera del dropdown y cerrarlo automáticamente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
                setIsOpen1(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Opciones de stands o universidades para el dropdown
    const universities = [
        "Stand Que rica yuca",
        "Stand Sexshop la javeriana",
        "Stand happy brownies la 40",
        "Stand tangas la macarena",
        "Stand 6",
        "Stand 6",
        "Stand 7",
        "Stand 8",
        "Stand 9",
        "Stand 10",
        "Stand 11",
        "Stand 12",
    ];

    // Función para reservar un stand, actualizando su estado a no disponible
    const reservarStand = (standId) => {
        setStands(stands.map(stand => 
            stand.id === standId 
                ? { ...stand, disponible: false }
                : stand
        ));
        alert('¡Stand reservado exitosamente!');
    };

    return (
        <body className="stands-container">
            {/* Barra superior con título */}
            <header className="navbar" >
                <h1 className="title">Stands</h1>
            </header>
            
            <main className="main-content">
                {/* Sección izquierda con filtros y recomendaciones */}
                <section className="left-section">
                    {/* Dropdown para seleccionar stand/universidad */}
                    <div className="subtitle-container" ref={dropdown1Ref}>
                        <button onClick={() => setIsOpen1(!isOpen1)} className="subtitle">
                            <span className={selectedOption === 'Stands Disponibles' ? 'text-gray-500' : 'text-gray-800'}>
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

                    {/* Input para ingresar la universidad donde está el usuario */}
                    <div className="input-group">
                        <label className="input-text">En qué universidad te encuentras:</label>
                        <input 
                            list="universidades" 
                            id="universidades" 
                            type="text" 
                            autoComplete="off" 
                            className="input" 
                            placeholder="Ej: Universidad de los Andes"
                        />
                    </div>

                    {/* Sección de recomendaciones personalizadas */}
                    <div className="recomendaciones" id="recomendaciones">
                        <h3 className="recomendaciones-title">Recomendaciones para ti</h3>
                        <p className="recomendaciones-description">Según reservaciones anteriores</p>
                    </div>
                    
                    {/* Botón para acceder al perfil del usuario */}
                    <div className="recomendaciones-perfil">
                        <button className="ver-perfil">Ver mi perfil</button>
                    </div>
                </section>

                {/* Sección derecha con el mapa interactivo */}
                <section className="right-section">
                    <h2>Stands disponibles en <em>Universidad de los Andes</em></h2>

                    <div id="mapa-stands" style={{ height: '500px', width: '100%' }}>
                        <MapContainer
                            center={[4.6097, -74.0817]} // Coordenadas centradas en la universidad
                            zoom={17} // Nivel de zoom para ver el campus
                            scrollWheelZoom={true}
                            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/contributors">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            {/* Marcadores para cada stand */}
                            {stands.map((stand) => (
                                <Marker key={stand.id} position={[stand.lat, stand.lng]}>
                                    <Popup>
                                        <div style={{ textAlign: 'center', minWidth: '200px' }}>
                                            <h3 style={{ margin: '0 0 10px 0', color: '#3A5BA0' }}>
                                                {stand.nombre}
                                            </h3>
                                            <p style={{ margin: '5px 0' }}>
                                                {stand.descripcion}
                                            </p>
                                            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
                                                Estado: {stand.disponible ? 
                                                    <span style={{color: '#28a745'}}>✅ Disponible</span> : 
                                                    <span style={{color: '#dc3545'}}>❌ Ocupado</span>
                                                }
                                            </p>
                                            {/* Botón para reservar si está disponible */}
                                            {stand.disponible && (
                                                <button 
                                                    onClick={() => reservarStand(stand.id)}
                                                    style={{
                                                        backgroundColor: '#FF6B35',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px 16px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        marginTop: '5px'
                                                    }}
                                                    onMouseOver={(e) => e.target.style.backgroundColor = '#e55a00'}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B35'}
                                                >
                                                    Reservar Stand
                                                </button>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </section>
            </main>
            
            {/* Footer con botón para regresar a la página de vender */}
            <footer className='footer-stands'>
                <Link to="/Vender" className="btn-regresar">&#8592;</Link>
            </footer>
        </body>
    )
}

export default StandsFunc;
