import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import './login.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom'; // Importar el hook

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const navigate = useNavigate(); // Hook de navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');

        if (isLogin) {
            if (formData.email === 'admin' && formData.password === '123456') {
                setLoginSuccess('login.success');
                console.log('Login exitoso para usuario admin');
                // Redirigir al inicio tras éxito
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setLoginError('login.error');
            }
        } else {
            if (formData.name && formData.email && formData.password) {
                setLoginSuccess('register.success');
                console.log('Registro exitoso:', formData);
                setTimeout(() => {
                    setIsLogin(true);
                    setLoginSuccess('');
                }, 2000);
            } else {
                setLoginError('register.error');
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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

                <div className="form-container">
                    {/* Mensajes */}
                    {loginError && (
                        <div className="message error-message">
                            <FormattedMessage id={loginError} />
                        </div>
                    )}
                    {loginSuccess && (
                        <div className="message success-message">
                            <FormattedMessage id={loginSuccess} />
                        </div>
                    )}

                    {/* Campo nombre */}
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
                                />
                            )}
                        </FormattedMessage>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
                        >.
                            {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                        </button>
                    </div>

                    {isLogin && (
                        <div className="forgot-password">
                            <button type="button" className="forgot-link">
                                <FormattedMessage id="login.forgot" />
                            </button>
                        </div>
                    )}

                    <button onClick={handleSubmit} className="submit-button">
                        <FormattedMessage id={isLogin ? 'login.button' : 'register.button'} />
                    </button>
                </div>

                <div className="toggle-section">
                    <p className="toggle-text">
                        <FormattedMessage id={isLogin ? 'register.prompt' : 'login.prompt'} />{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-link"
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
