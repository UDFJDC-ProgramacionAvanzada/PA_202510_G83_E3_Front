// Sugerencias.js
import React from 'react';
import './Sugerencias.css'; // Asegúrate de crear también los estilos

const recomendaciones = [
  {
    nombre: 'Arte & Cultura',
    descripcion: 'Productos artesanales hechos a mano.',
    imagen: '/img/arte.png',
  },
  {
    nombre: 'Tecnología',
    descripcion: 'Gadgets útiles y herramientas tecnológicas.',
    imagen: '/img/tecnologia.png',
  },
  {
    nombre: 'Ropa y Moda',
    descripcion: 'Estilo universitario y prendas únicas.',
    imagen: '/img/moda.png',
  },
];

function Sugerencias() {
  return (
    <div className="sugerencias">
      <h2>Sugerencias para ti</h2>
      <div className="tarjetas-sugerencias">
        {recomendaciones.map((item, index) => (
          <div className="tarjeta-sugerencia" key={index}>
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
            <p>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sugerencias;
