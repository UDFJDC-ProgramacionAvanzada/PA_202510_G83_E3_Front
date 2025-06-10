import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import './login.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');

        if (isLogin) {
            // Lógica de login con usuario de prueba
            if (formData.email === 'admin' && formData.password === '123456') {
                setLoginSuccess('¡Bienvenido! Login exitoso');
                console.log('Login exitoso para usuario admin');
                // Aquí podrías redirigir al dashboard o página principal
            } else {
                setLoginError('Usuario o contraseña incorrectos.');
            }
        } else {
            // Lógica de registro
            if (formData.name && formData.email && formData.password) {
                setLoginSuccess('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión');
                console.log('Registro exitoso:', formData);
                // Cambiar a modo login después del registro
                setTimeout(() => {
                    setIsLogin(true);
                    setLoginSuccess('');
                }, 2000);
            } else {
                setLoginError('Por favor completa todos los campos');
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
                {/* Header */}
                <div className="login-header">
                    <div className="logo-circle">
                        <User className="logo-icon" />
                    </div>
                    <h2 className="login-title">
                        {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
                    </h2>
                    <p className="login-subtitle">
                        {isLogin ? 'Ingresa a tu cuenta' : 'Regístrate para comenzar'}
                    </p>

                </div>

                {/* Formulario */}
                <div className="form-container">
                    {/* Mensajes de error y éxito */}
                    {loginError && (
                        <div className="message error-message">
                            {loginError}
                        </div>
                    )}
                    {loginSuccess && (
                        <div className="message success-message">
                            {loginSuccess}
                        </div>
                    )}

                    {/* Campo de nombre (solo en registro) */}
                    {!isLogin && (
                        <div className="input-group">
                            <div className="input-icon">
                                <User className="icon" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    {/* Campo de correo */}
                    <div className="input-group">
                        <div className="input-icon">
                            <Mail className="icon" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder={isLogin ? "Usuario o correo electrónico" : "Correo electrónico"}
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    {/* Campo de contraseña */}
                    <div className="input-group">
                        <div className="input-icon">
                            <Lock className="icon" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-input password-input"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
                        >
                            {showPassword ? (
                                <EyeOff className="toggle-icon" />
                            ) : (
                                <Eye className="toggle-icon" />
                            )}
                        </button>
                    </div>

                    {/* ¿Olvidaste tu contraseña? (solo en login) */}
                    {isLogin && (
                        <div className="forgot-password">
                            <button type="button" className="forgot-link">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    )}

                    <button onClick={handleSubmit} className="submit-button">
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </button>
                </div>

                {/* Cambiar entre login y registro */}
                <div className="toggle-section">
                    <p className="toggle-text">
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-link"
                        >
                            {isLogin ? 'Regístrate' : 'Inicia sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;