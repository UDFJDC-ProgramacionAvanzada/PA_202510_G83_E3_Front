import React from 'react';
import './HU10.css';

// Datos centralizados (SRP)
const ESTADISTICAS_DATA = [
  {
    stand: 'Stand 10 UD Calle 40',
    tiempo: '4 horas',
    ventas: 45,
    ventasMin: '-'
  },
  {
    stand: 'Stand 3 P.U. Javeriana',
    tiempo: '2 horas', 
    ventas: 32,
    ventasMin: '-'
  },
  {
    stand: 'Stand 5 P.U. Javeriana',
    tiempo: '4 horas',
    ventas: 26,
    ventasMin: '-'
  },
  {
    stand: 'Stand 6 UD Calle 34',
    tiempo: '3 horas',
    ventas: 28,
    ventasMin: '-'
  }
];

// Componente puro que solo renderiza estadísticas (SRP)
const EstadisticasTable = ({ estadisticas }) => (
  <div className="estadisticas-table">
    <div className="table-header">
      <div className="header-cell">Stand</div>
      <div className="header-cell">Tiempo</div>
      <div className="header-cell">Ventas</div>
      <div className="header-cell">Ventas/min</div>
    </div>
    
    {estadisticas.map((item, index) => (
      <div key={index} className="table-row">
        <div className="table-cell">{item.stand}</div>
        <div className="table-cell">{item.tiempo}</div>
        <div className="table-cell">{item.ventas}</div>
        <div className="table-cell">{item.ventasMin}</div>
      </div>
    ))}
  </div>
);

const HU10 = () => {
  return (
    <div className="hu10-container">
      <div className="estadisticas-section">
        <h3>Tus estadísticas</h3>
        <EstadisticasTable estadisticas={ESTADISTICAS_DATA} />
      </div>
    </div>
  );
};

export default HU10;