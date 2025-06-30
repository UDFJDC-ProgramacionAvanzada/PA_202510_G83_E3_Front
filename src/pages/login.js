import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import './login.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom'; // Agregar useLocation
import authService from '../services/authService'; // Solo para registro
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: ''
    });

    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation(); // Agregar para obtener la página anterior
    const { login } = useAuth(); // Usar el contexto para login

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN - usar el contexto en lugar de authService
                const response = await login(formData.email, formData.password);
                
                if (response.success) {
                    setLoginSuccess('login.success');
                    console.log('Login exitoso:', response.user);
                    
                    // Redirigir a la página anterior o a home
                    const from = location.state?.from?.pathname || '/';
                    setTimeout(() => {
                        navigate(from, { replace: true });
                    }, 1000);
                }
            } else {
                // REGISTRO - mantener usando authService directamente
                const response = await authService.register(
                    formData.name, 
                    formData.email, 
                    formData.password,
                    formData.phoneNumber
                );
                
                if (response.success) {
                    setLoginSuccess('register.success');
                    console.log('Registro exitoso');
                    
                    // Cambiar a modo login después de 2 segundos
                    setTimeout(() => {
                        setIsLogin(true);
                        setLoginSuccess('');
                        setFormData({
                            email: formData.email, // Mantener el email
                            password: '',
                            name: '',
                            phoneNumber: ''
                        });
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Manejar diferentes tipos de errores
            if (error.message) {
                // Si el backend envió un mensaje específico
                if (error.message.includes('Credenciales')) {
                    setLoginError('login.error');
                } else if (error.message.includes('ya está registrado')) {
                    setLoginError('register.email.exists');
                } else {
                    setLoginError(isLogin ? 'login.error' : 'register.error');
                }
            } else {
                // Error de conexión
                setLoginError('connection.error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Limpiar errores cuando el usuario escribe
        setLoginError('');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Encabezado */}
                <div className="login-header">
                    <div className="logo-circle">
                        <User className="logo-icon" />
                    </div>
                    <h2 className="login-title">
                        <FormattedMessage id={isLogin ? 'login.welcome' : 'register.title'} />
                    </h2>
                    <p className="login-subtitle">
                        <FormattedMessage id={isLogin ? 'login.subtitle' : 'register.subtitle'} />
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    {/* Mensajes */}
                    {loginError && (
                        <div className="message error-message">
                            <FormattedMessage 
                                id={loginError} 
                                defaultMessage={loginError === 'connection.error' ? 
                                    'Error de conexión con el servidor' : 
                                    'Ha ocurrido un error'
                                } 
                            />
                        </div>
                    )}
                    {loginSuccess && (
                        <div className="message success-message">
                            <FormattedMessage id={loginSuccess} />
                        </div>
                    )}

                    {/* Campo nombre (solo en registro) */}
                    {!isLogin && (
                        <div className="input-group">
                            <div className="input-icon">
                                <User className="icon" />
                            </div>
                            <FormattedMessage id="register.name.placeholder">
                                {msg => (
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={msg}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required={!isLogin}
                                        disabled={loading}
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                    )}

                    {/* Campo correo */}
                    <div className="input-group">
                        <div className="input-icon">
                            <Mail className="icon" />
                        </div>
                        <FormattedMessage id={isLogin ? 'login.email.placeholder' : 'register.email.placeholder'}>
                            {msg => (
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={msg}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                    disabled={loading}
                                />
                            )}
                        </FormattedMessage>
                    </div>

                    {/* Campo contraseña */}
                    <div className="input-group">
                        <div className="input-icon">
                            <Lock className="icon" />
                        </div>
                        <FormattedMessage id="password.placeholder">
                            {msg => (
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder={msg}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-input password-input"
                                    required
                                    disabled={loading}
                                />
                            )}
                        </FormattedMessage>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
                            disabled={loading}
                        >
                            {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                        </button>
                    </div>
                    
                    {/* Campo teléfono (solo en registro) */}
                    {!isLogin && (
                        <div className="input-group">
                            <div className="input-icon">
                                <Phone className="icon" />
                            </div>
                            <FormattedMessage id="phone.placeholder">
                                {msg => (
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder={msg}
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required={!isLogin}
                                        disabled={loading}
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                    )}

                    {isLogin && (
                        <div className="forgot-password">
                            <button type="button" className="forgot-link" disabled={loading}>
                                <FormattedMessage id="login.forgot" />
                            </button>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Procesando...</span>
                        ) : (
                            <FormattedMessage id={isLogin ? 'login.button' : 'register.button'} />
                        )}
                    </button>
                </form>

                <div className="toggle-section">
                    <p className="toggle-text">
                        <FormattedMessage id={isLogin ? 'register.prompt' : 'login.prompt'} />{' '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setLoginError('');
                                setLoginSuccess('');
                            }}
                            className="toggle-link"
                            disabled={loading}
                        >
                            <FormattedMessage id={isLogin ? 'register.link' : 'login.link'} />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;