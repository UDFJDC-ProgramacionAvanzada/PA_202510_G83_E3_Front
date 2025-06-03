import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';
import { IntlProvider } from 'react-intl';
import detectLanguage from './localizacion/detectarlenguaje';
import StandsFunc from './pages/stands';
import Perfil from './pages/Perfil';
import AnuncioStand from './pages/AnuncioStand';


function App() {
    const { locale, messages } = detectLanguage();

    return (
    <IntlProvider locale={locale} messages={messages}>
        <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/vender" element={<Vender />} />
        <Route path="/stands" element={<StandsFunc />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/anuncio-stand" element={<AnuncioStand />} />
        </Routes>
    </IntlProvider>
    );  
}

export default App;

