import './Vender.css';
import { FormattedMessage } from 'react-intl';
import "../localizacion/EN.json";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HU11 from '../components/HU11';
import HU12 from '../components/HU12';
import ProductosVendidos from '../components/ProductosVendidos';

function Vender() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });

    const [mostrarHU11, setMostrarHU11] = useState(false);
    const [mostrarHU12, setMostrarHU12] = useState(false);
    const [mostrarProductosVendidos, setMostrarProductosVendidos] = useState(false);

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
        setMostrarHU11(false);
        setMostrarHU12(false);
        setMostrarProductosVendidos(false);
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
                        <h2 className='login-title'>
                            <FormattedMessage id="login.title" defaultMessage="Inicia sesión" />
                        </h2>
                        <form className='formulario_inicio' onSubmit={handleLogin}>
                            <FormattedMessage id="login.username" defaultMessage="Usuario">
                                {msg => (
                                    <input
                                        type="text"
                                        name="usuario"
                                        className='input-user'
                                        placeholder={msg}
                                        value={formData.usuario}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </FormattedMessage>
                            <FormattedMessage id="login.password" defaultMessage="Contraseña">
                                {msg => (
                                    <input
                                        type="password"
                                        name="password"
                                        className='input-password'
                                        placeholder={msg}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </FormattedMessage>
                            <button type="submit" className='btn-login'>
                                <FormattedMessage id="login.button" defaultMessage="Iniciar Sesión" />
                            </button>
                        </form>

                        {showError && (
                            <div className='error-message'>
                                <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                    <FormattedMessage id="login.error" defaultMessage="Error: Credenciales incorrectas o campos vacíos" />
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='welcome-message'>
                            <p>
                                <FormattedMessage id="login.welcomeUser" defaultMessage="¡Bienvenido, {usuario}!" values={{ usuario: formData.usuario }} />
                            </p>
                            <button onClick={handleLogout} className='btn-logout'>
                                <FormattedMessage id="logout.button" defaultMessage="Cerrar Sesión" />
                            </button>
                        </div>

                        <div className='secciones'>
                            <Link to="/stands" className='stands'>
                                <FormattedMessage id='Stand' />
                            </Link>

                            <button className='productos' onClick={() => {
                                setMostrarProductosVendidos(true);
                                setMostrarHU11(false);
                                setMostrarHU12(false);
                            }}>
                                <FormattedMessage id='Productos_que_ya_se_estan_vendiendo' />
                            </button>

                            <button className='publicar' onClick={() => {
                                setMostrarHU12(true);
                                setMostrarHU11(false);
                                setMostrarProductosVendidos(false);
                            }}>
                                <FormattedMessage id='Publicar_nuevo_emprendimiento' />
                            </button>

                            <button className='nuevo-producto' onClick={() => {
                                setMostrarHU11(true);
                                setMostrarHU12(false);
                                setMostrarProductosVendidos(false);
                            }}>
                                <FormattedMessage id="Agregar_nuevo_producto" defaultMessage="Agregar nuevo producto" />
                            </button>

                            <button className='universidades'>
                                <FormattedMessage id='Universidad' />
                            </button>
                        </div>

                        {/* Mostrar componente correspondiente según selección */}
                        {mostrarHU11 && <HU11 />}
                        {mostrarHU12 && <HU12 />}
                        {mostrarProductosVendidos && <ProductosVendidos />}
                    </>
                )}
            </div>
        </>
    );
}

export default Vender;
