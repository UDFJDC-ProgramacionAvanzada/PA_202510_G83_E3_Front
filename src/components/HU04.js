import React from 'react';
// Importa los estilos específicos para este componente
import './HU04.css';

// Datos centralizados en el componente (mejor que hardcoded disperso)
const STANDS_DATA = {
  universities: [
    "Stand Que rica yuca",
    "Stand Sexshop la javeriana", 
    "Stand happy brownies la 40",
    "Stand tangas la macarena",
    "Stand 6",
    "Stand 7",
    "Stand 8",
    "Stand 9",
    "Stand 10",
    "Stand 11",
    "Stand 12",
  ]
};

const HU04 = () => {
  // Funciones puras para lógica de negocio (SRP)
  const getFavoritos = () => STANDS_DATA.universities.slice(0, 4).map((nombre, index) => ({
    id: index + 1,
    nombre: nombre
  }));

  const getOtrosVisitados = () => STANDS_DATA.universities.slice(4, 7).map((nombre, index) => ({
    id: index + 6,
    nombre: nombre
  }));

  const vendedoresFavoritos = getFavoritos();
  const otrosVisitados = getOtrosVisitados();

  return (
    <div className="hu04-favoritos-container">
      {/* Sección de favoritos */}
      <div className="favoritos-section">
        <h3>Favoritos</h3>
        {vendedoresFavoritos.map((stand) => (
          <div key={stand.id} className="favorito-item">
            <span>{stand.nombre}</span>
            {/* Icono de corazón para representar favorito */}
            <span className="heart">🖤</span>
          </div>
        ))}
      </div>

      {/* Sección de otros stands visitados */}
      <div className="otros-visitados-section">
        <h3>Otros visitados</h3>
        {otrosVisitados.map((stand) => (
          <div key={stand.id} className="visitado-item">{stand.nombre}</div>
        ))}
      </div>
    </div>
  );
};

// Exporta el componente para que pueda usarse en otras partes de la aplicación
export default HU04;
