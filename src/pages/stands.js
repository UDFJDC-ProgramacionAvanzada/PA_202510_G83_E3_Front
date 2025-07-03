import React, { useState, useRef, useEffect } from 'react';
import './stands.css';
import { ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Fix para iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configuración del icono por defecto para los markers
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [20, 31],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function StandsFunc() {
    const { user, isAuthenticated } = useAuth();
    
    // Estados para dropdowns
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpenUniversidad, setIsOpenUniversidad] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Stands Disponibles');
    const [selectedUniversidad, setSelectedUniversidad] = useState('Selecciona una universidad');
    
    // Refs para detectar clicks fuera
    const dropdown1Ref = useRef(null);
    const dropdownUniversidadRef = useRef(null);

    // Estados para datos
    const [stands, setStands] = useState([]);
    const [filteredStands, setFilteredStands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reserving, setReserving] = useState(false);

    // Opciones de filtro
    const filterOptions = [
        "Stands Disponibles",
        "Todos los Stands",
        "Mis Stands"
    ];

    // Universidades disponibles
    const universidades = [
        "Universidad Distrital",
        "Universidad Nacional"
    ];

    // Cargar stands al montar el componente
    useEffect(() => {
        loadStands();
    }, []);

    // Filtrar stands cuando cambie la opción seleccionada o universidad
    useEffect(() => {
        filterStands();
    }, [selectedOption, selectedUniversidad, stands]);

    // Hook para detectar clicks fuera de los dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
                setIsOpen1(false);
            }
            if (dropdownUniversidadRef.current && !dropdownUniversidadRef.current.contains(event.target)) {
                setIsOpenUniversidad(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadStands = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/stands');
            
            if (response.data.success) {
                setStands(response.data.stands);
            }
        } catch (error) {
            console.error('Error cargando stands:', error);
            setError('Error al cargar los stands');
        } finally {
            setLoading(false);
        }
    };

    const filterStands = () => {
        let filtered = [...stands];

        // Filtrar por tipo
        switch (selectedOption) {
            case 'Stands Disponibles':
                filtered = filtered.filter(stand => stand.disponible);
                break;
            case 'Mis Stands':
                if (isAuthenticated && user) {
                    filtered = filtered.filter(stand => 
                        stand.usuario && stand.usuario.id === user.id
                    );
                } else {
                    filtered = [];
                }
                break;
            default: // Todos los Stands
                break;
        }

        // Filtrar por universidad
        if (selectedUniversidad !== 'Selecciona una universidad') {
            filtered = filtered.filter(stand => 
                stand.universidad === selectedUniversidad
            );
        }

        setFilteredStands(filtered);
    };

    const reservarStand = async (standId) => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para reservar un stand');
            return;
        }

        try {
            setReserving(true);
            const token = localStorage.getItem('token');
            
            const response = await axios.post(
                `http://localhost:3000/api/stands/${standId}/reserve`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                alert('¡Stand reservado exitosamente!');
                loadStands(); // Recargar la lista de stands
            }
        } catch (error) {
            console.error('Error reservando stand:', error);
            const message = error.response?.data?.message || 'Error al reservar el stand';
            alert(message);
        } finally {
            setReserving(false);
        }
    };

    const liberarStand = async () => {
    try {
        setReserving(true);
        const token = localStorage.getItem('token');
        
        // CAMBIA ESTA LÍNEA - USA /my-stand en lugar de /release
        const response = await axios.delete(
            'http://localhost:3000/api/stands/my-stand',  // ← RUTA CORREGIDA
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.data.success) {
            alert('Stand liberado exitosamente');
            loadStands(); // Recargar la lista de stands
        }
    } catch (error) {
        console.error('Error liberando stand:', error);
        const message = error.response?.data?.message || 'Error al liberar el stand';
        alert(message);
    } finally {
        setReserving(false);
    }
};

    if (loading) {
        return (
            <div className="stands-container">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <p>Cargando stands...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="stands-container">
            {/* Barra superior con título */}
            <header className="navbar">
                <h1 className="title">Stands</h1>
                {isAuthenticated && (
                    <div className="user-info">
                        <span>Bienvenido, {user?.nombre}</span>
                    </div>
                )}
            </header>
            
            <main className="main-content">
                {/* Sección izquierda con filtros */}
                <section className="left-section">
                    {/* Dropdown para filtrar stands */}
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
                                {filterOptions.map((option, index) => (
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

                    {/* Dropdown para seleccionar universidad */}
                    <div className="input-group">
                        <label className="input-text">En qué universidad te encuentras:</label>
                        <div className="subtitle-container" ref={dropdownUniversidadRef}>
                            <button 
                                onClick={() => setIsOpenUniversidad(!isOpenUniversidad)} 
                                className="subtitle universidad-selector"
                            >
                                <span className={selectedUniversidad === 'Selecciona una universidad' ? 'text-gray-500' : 'text-gray-800'}>
                                    {selectedUniversidad}
                                </span>
                                <ChevronDown 
                                    size={20} 
                                    className={`transform transition-transform ${isOpenUniversidad ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {isOpenUniversidad && (
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-option"
                                        onClick={() => {
                                            setSelectedUniversidad('Selecciona una universidad');
                                            setIsOpenUniversidad(false);
                                        }}
                                    >
                                        Todas las universidades
                                    </button>
                                    {universidades.map((universidad, index) => (
                                        <button
                                            key={index}
                                            className="dropdown-option"
                                            onClick={() => {
                                                setSelectedUniversidad(universidad);
                                                setIsOpenUniversidad(false);
                                            }}
                                        >
                                            {universidad}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Botón para acceder al perfil */}
                    <div className="recomendaciones-perfil">
                        <Link to="/perfil" className="ver-perfil">Ver mi perfil</Link>
                        {isAuthenticated && (
                            <button 
                                onClick={liberarStand}
                                className="liberar-stand-btn"
                                disabled={reserving}
                            >
                                {reserving ? 'Procesando...' : 'Liberar mi stand'}
                            </button>
                        )}
                    </div>

                    {/* Mostrar error si existe */}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </section>

                {/* Sección derecha con el mapa */}
                <section className="right-section">
                    <h2>
                        {selectedUniversidad === 'Selecciona una universidad' 
                            ? 'Stands en Bogotá' 
                            : `Stands en ${selectedUniversidad}`
                        }
                    </h2>
                    <p>Mostrando {filteredStands.length} stands</p>

                    <div id="mapa-stands" style={{ height: '500px', width: '100%' }}>
                        <MapContainer
                            center={[4.6097, -74.0817]}
                            zoom={15}
                            scrollWheelZoom={true}
                            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/contributors">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            {/* Marcadores para cada stand filtrado */}
                            {filteredStands.map((stand) => (
                                <Marker key={stand.id} position={[stand.latitude, stand.longitude]}>
                                    <Popup>
                                        <div style={{ textAlign: 'center', minWidth: '200px' }}>
                                            <h3 style={{ margin: '0 0 10px 0', color: '#3A5BA0' }}>
                                                {stand.name}
                                            </h3>
                                            <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                                                {stand.universidad}
                                            </p>
                                            <p style={{ margin: '5px 0' }}>
                                                {stand.descripcion}
                                            </p>
                                            
                                            {/* Información del usuario si está ocupado */}
                                            {stand.usuario && (
                                                <div style={{ margin: '10px 0', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                                                    <p style={{ margin: '2px 0', fontWeight: 'bold' }}>
                                                        Ocupado por: {stand.usuario.nombre}
                                                    </p>
                                                    {stand.usuario.emprendimiento && (
                                                        <p style={{ margin: '2px 0', fontSize: '12px' }}>
                                                            {stand.usuario.emprendimiento}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
                                                Estado: {stand.disponible ? 
                                                    <span style={{color: '#28a745'}}>✅ Disponible</span> : 
                                                    <span style={{color: '#dc3545'}}>❌ Ocupado</span>
                                                }
                                            </p>
                                            
                                            {/* Botón para reservar si está disponible y el usuario está autenticado */}
                                            {stand.disponible && isAuthenticated && (
                                                <button 
                                                    onClick={() => reservarStand(stand.id)}
                                                    disabled={reserving}
                                                    style={{
                                                        backgroundColor: '#FF6B35',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px 16px',
                                                        borderRadius: '4px',
                                                        cursor: reserving ? 'not-allowed' : 'pointer',
                                                        fontSize: '14px',
                                                        marginTop: '5px',
                                                        opacity: reserving ? 0.6 : 1
                                                    }}
                                                >
                                                    {reserving ? 'Reservando...' : 'Reservar Stand'}
                                                </button>
                                            )}
                                            
                                            {/* Mensaje si no está autenticado */}
                                            {stand.disponible && !isAuthenticated && (
                                                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                                    Inicia sesión para reservar
                                                </p>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </section>
            </main>
            
            {/* Footer */}
            <footer className='footer-stands'>
                <Link to="/vender" className="btn-regresar">&#8592;</Link>
            </footer>
        </div>
    );
}

export default StandsFunc;