import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';
import StandsFunc from './pages/stands';
import Perfil from './pages/Perfil';
import AnuncioStand from './pages/AnuncioStand';
import LayoutWithFooter from './components/LayoutWithFooter';
import { IntlProvider } from 'react-intl';
import detectLanguage from './localizacion/detectarlenguaje';
import Loginpage from './pages/login';
import Comprar from './pages/Comprar';
import Terms from './pages/Terms';
import ProtectedRoute from './components/ProtectedRoute1'; // Importar el componente específico

function App() {
    const { locale, messages } = detectLanguage();

    return (
        <AuthProvider>
            <Router>
                <IntlProvider locale={locale} messages={messages}>
                    <Routes>
                        {/* Ruta de login - NO protegida */}
                        <Route path="/login" element={<Loginpage />} />
                        
                        {/* Rutas que comparten el layout con footer - TODAS SIN PROTECCIÓN */}
                        <Route element={<LayoutWithFooter />}>
                            <Route path="/" element={<Inicio />} />
                            <Route path="/vender" element={<Vender />} />
                            <Route path="/anuncio-stand" element={<AnuncioStand />} />
                            <Route path="/comprar" element={<Comprar />} />
                            <Route path="/terms" element={<Terms />} />
                        </Route>

                        {/* Rutas que no incluyen el footer */}
                        <Route path="/stands" element={<StandsFunc />} />
                        
                        {/* SOLO PERFIL está protegido */}
                        <Route path="/perfil" element={
                            <ProtectedRoute>
                                <Perfil />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </IntlProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;