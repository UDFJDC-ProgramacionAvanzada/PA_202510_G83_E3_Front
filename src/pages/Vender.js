import './Vender.css';
import { FormattedMessage } from 'react-intl';
import "../localizacion/EN.json";
import { Link } from 'react-router-dom';
import Footer from '../components/footer.js';
import { useState } from 'react';
import HU11 from '../components/HU11'; // Asegúrate que la ruta sea correcta

function Vender() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });
    const [showHU11, setShowHU11] = useState(false); // Estado para mostrar HU11

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (showError) setShowError(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formData.usuario || !formData.password) {
            setShowError(true);
            return;
        }

        if (formData.usuario === 'admin' && formData.password === '123456') {
            setIsLoggedIn(true);
            setShowError(false);
        } else {
            setShowError(true);
            setIsLoggedIn(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setFormData({ usuario: '', password: '' });
        setShowError(false);
        setShowHU11(false);
    };

    return (
        <>
            <header>
                <div className="vender-container">
                    <h1 className='texto-vender'><FormattedMessage id='VENDER' /></h1>
                </div>
            </header>

            <div className='profile-container'>
                {!isLoggedIn ? (
                    <div className='login-container'>
                        <h2 className='login-title'> Inicia sesión </h2>
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
                        {showError && (
                            <div className='error-message'>
                                <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                    Error: Credenciales incorrectas o campos vacíos
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='welcome-message'>
                            <p>¡Bienvenido, {formData.usuario}!</p>
                            <button onClick={handleLogout} className='btn-logout'>
                                Cerrar Sesión
                            </button>
                        </div>

                        <div className='secciones'>
                            <Link to="/stands" className='stands'>
                                <FormattedMessage id='Stand' />
                            </Link>
                            <button className='productos'>
                                <FormattedMessage id='Productos_que_ya_se_estan_vendiendo' />
                            </button>
                            <button
                                className='publicar'
                                onClick={() => setShowHU11(true)}
                            >
                                <FormattedMessage id='Publicar_nuevo_emprendimiento' />
                            </button>
                            <button className='universidades'>
                                <FormattedMessage id='Universidad' />
                            </button>
                        </div>

                        {showHU11 && (
                            <div style={{ marginTop: '40px', width: '100%' }}>
                                <HU11 />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Vender;
