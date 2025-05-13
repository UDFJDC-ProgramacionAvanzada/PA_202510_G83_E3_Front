import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';

function App() {
return (
    <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/vender" element={<Vender />} />
    </Routes>
);
}

export default App;
