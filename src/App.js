// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';
import StandsFunc from './pages/stands';
import Perfil from './pages/Perfil';
import AnuncioStand from './pages/AnuncioStand';
import LayoutWithFooter from './components/LayoutWithFooter';
import { IntlProvider } from 'react-intl';
import detectLanguage from './localizacion/detectarlenguaje';

function App() {
    // Detectar idioma del navegador y obtener mensajes traducidos
    const { locale, messages } = detectLanguage();

    return (
        // Proveedor de contexto de internacionalización
        <IntlProvider locale={locale} messages={messages}>
            <Routes>
                {/* Rutas que comparten el layout con footer */}
                <Route element={<LayoutWithFooter />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/vender" element={<Vender />} />
                </Route>

                {/* Rutas que no deben incluir el footer */}
                <Route path="/stands" element={<StandsFunc />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/anuncio-stand" element={<AnuncioStand />} />
            </Routes>
        </IntlProvider>
    );
}

export default App;
