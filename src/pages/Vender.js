import './Vender.css';
import { FormattedMessage } from 'react-intl';
import "../localizacion/EN.json";
import { Link } from 'react-router-dom';
import Footer from '../components/footer.js';
import { useState } from 'react';

function Vender() {
    // Estado para controlar si el usuario está logueado o no
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Estado para mostrar mensaje de error en login
    const [showError, setShowError] = useState(false);
    // Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });

    // Función para actualizar los datos del formulario y limpiar error al escribir
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (showError) {
            setShowError(false);
        }
    };

    // Función que maneja el submit del formulario de login
    const handleLogin = (e) => {
        e.preventDefault();
        
        // Validación básica: verificar que campos no estén vacíos
        if (!formData.usuario || !formData.password) {
            setShowError(true);
            return;
        }

        // Simulación de autenticación: usuario y contraseña fijos
        if (formData.usuario === 'admin' && formData.password === '123456') {
            setIsLoggedIn(true);
            setShowError(false);
        } else {
            // Mostrar error si credenciales no coinciden
            setShowError(true);
            setIsLoggedIn(false);
        }
    };

    // Función para cerrar sesión, limpiar estados y formulario
    const handleLogout = () => {
        setIsLoggedIn(false);
        setFormData({
            usuario: '',
            password: ''
        });
        setShowError(false);
    };

    return(
        <>
            {/* Encabezado con título de la página */}
            <header>
                <div className="vender-container">
                    <h1 className='texto-vender'><FormattedMessage id='VENDER'/></h1>
                </div>
            </header>

            <div className='profile-container'>
                {!isLoggedIn ? (
                    // Mostrar formulario de login si no está autenticado
                    <div className='login-container'>
                        <h2 className='login-title'> Inicia sesion </h2>
                        <form className='formulario_inicio' onSubmit={handleLogin}>
                            <input 
                                type="text" 
                                name="usuario"
                                className='input-user' 
                                placeholder='Usuario' 
                                value={formData.usuario}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="password" 
                                name="password"
                                className='input-password' 
                                placeholder='Contraseña' 
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className='btn-login'>
                                Iniciar Sesión
                            </button>
                        </form>
                        
                        {/* Mensaje de error cuando las credenciales son incorrectas o campos vacíos */}
                        {showError && (
                            <div className='error-message'>
                                <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>
                                    Error: Credenciales incorrectas o campos vacíos
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Contenido visible luego de iniciar sesión exitosamente
                    <>
                        <div className='welcome-message'>
                            <p>¡Bienvenido, {formData.usuario}!</p>
                            <button onClick={handleLogout} className='btn-logout'>
                                Cerrar Sesión
                            </button>
                        </div>
                        
                        {/* Secciones accesibles después de iniciar sesión */}
                        <div className='secciones'>
                            <Link to="/stands" className='stands'>
                                <FormattedMessage id='Stand'/>
                            </Link>
                            <button className='productos'>
                                <FormattedMessage id='Productos_que_ya_se_estan_vendiendo'/>
                            </button>
                            <button className='publicar'>
                                <FormattedMessage id='Publicar_nuevo_emprendimiento'/>
                            </button>
                            <button className='universidades'>
                                <FormattedMessage id='Universidad'/>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Vender;
