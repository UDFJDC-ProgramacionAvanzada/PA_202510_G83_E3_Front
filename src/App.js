import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';
import { IntlProvider } from 'react-intl';
import detectLanguage from './localizacion/detectarlenguaje';
import StandsFunc from './pages/stands';

function App() {
    const { locale, messages } = detectLanguage();

    return (
    <IntlProvider locale={locale} messages={messages}>
        <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/vender" element={<Vender />} />
        <Route path="/stands" element={<StandsFunc />} />
        </Routes>
    </IntlProvider>
    );  
}

export default App;

