// src/components/ProductosVendidos.js
import React from 'react';
import './ProductosVendidos.css';

const productosEjemplo = [
  {
    nombre: "Café artesanal",
    vendidos: 120,
    stock: 30,
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Pulseras tejidas",
    vendidos: 75,
    stock: 10,
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Camisas personalizadas",
    vendidos: 90,
    stock: 15,
    imagen: "https://via.placeholder.com/100",
  },
];

const ProductosVendidos = () => {
  return (
    <div className="productos-vendidos-container">
      <h2>Productos en venta</h2>
      <div className="productos-grid">
        {productosEjemplo.map((producto, index) => (
          <div key={index} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p><strong>Vendidos:</strong> {producto.vendidos}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosVendidos;
