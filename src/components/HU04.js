import React from 'react';
import './HU04.css';

const HU04 = () => {
  // Array de stands del archivo stands.js
  const universities = [
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
  ];

  // Seleccionar los primeros 4 como favoritos
  const vendedoresFavoritos = universities.slice(0, 4).map((nombre, index) => ({
    id: index + 1,
    nombre: nombre
  }));

  // Seleccionar algunos como otros visitados 
  const otrosVisitados = universities.slice(4, 7).map((nombre, index) => ({
    id: index + 6,
    nombre: nombre
  }));

  return (
    <div className="hu04-favoritos-container">
      <div className="favoritos-section">
        <h3>Favoritos</h3>
        {vendedoresFavoritos.map((stand) => (
          <div key={stand.id} className="favorito-item">
            <span>{stand.nombre}</span>
            <span className="heart">🖤</span>
          </div>
        ))}
      </div>

      <div className="otros-visitados-section">
        <h3>Otros visitados</h3>
        {otrosVisitados.map((stand) => (
          <div key={stand.id} className="visitado-item">{stand.nombre}</div>
        ))}
      </div>
    </div>
  );
};

export default HU04;