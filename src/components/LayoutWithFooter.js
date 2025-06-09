import React from 'react';
// Importa el componente Footer que se mostrará al final de la página
import Footer from './footer';
// Importa Outlet de react-router-dom para renderizar rutas hijas
import { Outlet } from 'react-router-dom';

const LayoutWithFooter = () => {
    return (
        // Contenedor principal de la aplicación con layout flexible
        <div className="app-wrapper">
            {/* Área principal donde se renderizan los componentes hijos según la ruta */}
            <main style={{ flex: 1 }}>
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>

            {/* Pie de página común a todas las páginas */}
            <Footer />
        </div>
    );
};

// Exporta el layout para usarlo como envoltorio de rutas
export default LayoutWithFooter;
