import './AnuncioStand.css';
import React, { useState } from 'react';
import Navbar from '../components/Navbardef';
import Footer from '../components/footer';

const AnuncioStand = () => {
  // Estado para controlar qué pestaña está activa: productos, comentarios, galería o mapa
  const [activeTab, setActiveTab] = useState('productos');

  // Datos de ejemplo de productos (se podrían cargar dinámicamente en un futuro)
  const productos = [
    { id: 1, nombre: 'negrita', precio: '20.000 cop', imagen: null },
    { id: 2, nombre: 'pielita', precio: '20.000 cop', imagen: null },
    { id: 3, nombre: 'joyfol', precio: '20.000 cop', imagen: null },
    { id: 4, nombre: 'joyful', precio: '20.000 cop', imagen: null },
    { id: 5, nombre: 'secreto en la montaña', precio: '35.000 cop', imagen: null }
  ];

  // Función que devuelve el contenido según la pestaña seleccionada
  const renderContent = () => {
    switch(activeTab) {
      case 'productos':
        return (
          <div className="productos-grid">
            {productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="producto-imagen">
                  {/* Placeholder para imagen del producto */}
                  <div className="imagen-placeholder">
                    <span>Imagen</span>
                  </div>
                </div>
                <div className="producto-info">
                  <p className="producto-nombre">{producto.nombre}</p>
                  <p className="producto-precio">{producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'comentarios':
        return (
          <div className="comentarios-section">
            <h3>Comentarios</h3>
            <div className="comentario-box">
              <p>No hay comentarios disponibles.</p>
            </div>
          </div>
        );

      case 'galeria':
        return (
          <div className="galeria-section">
            <h3>Galería</h3>
            <div className="galeria-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="galeria-item">
                  {/* Placeholder para imágenes de galería */}
                  <div className="imagen-placeholder">
                    <span>Imagen {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mapa':
        return (
          <div className="mapa-section">
            <h3>Ubicación</h3>
            <div className="mapa-container">
              {/* iframe con mapa embebido de Google Maps */}
              <iframe
                title="Mapa de ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8100280741786!2d-74.11061668573392!3d4.624502643551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a45d5d9d9f7%3A0x3f0a0a0a0a0a0a0a!2sBogot%C3%A1!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="anuncio-stand-container">
      {/* Navbar con menú principal */}
      <Navbar />

      {/* Breadcrumb o ruta de navegación para orientación */}
      <div className="breadcrumb">
        <span>inicio</span> / <span>comprar</span> / <span>Tangas la Macarena</span>
      </div>

      {/* Encabezado con título, categorías, universidad y rating */}
      <div className="stand-header">
        <h1>Tangas la Macarena</h1>
        <div className="stand-meta">
          <span className="categoria">categorías / categorías / categorías / categorías / categorías</span>
          <span className="universidad">universidad y dresscode</span>
        </div>
        <div className="stand-rating">
          <span className="rating">4.3 ★</span>
          <span className="estado">cerrado - abre 11:00 am</span>
        </div>
      </div>

      {/* Sección de imágenes principales y secundarias del stand */}
      <div className="stand-imagenes">
        <div className="imagen-principal">
          <div className="imagen-placeholder-large">
            <span>Imagen Principal</span>
          </div>
        </div>
        <div className="imagenes-secundarias">
          <div className="imagen-secundaria">
            <div className="imagen-placeholder-medium">
              <span>Imagen 2</span>
            </div>
          </div>
          <div className="imagen-secundaria">
            <div className="imagen-placeholder-medium">
              <span>Imagen 3</span>
            </div>
          </div>
          <div className="ver-galeria">
            <span>Ver Galería</span>
          </div>
        </div>
      </div>

      {/* Pestañas para cambiar entre secciones: productos, comentarios, galería y mapa */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveTab('productos')}
          >
            Productos
          </button>
          <button 
            className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('comentarios')}
          >
            Comentarios
          </button>
          <button 
            className={`tab ${activeTab === 'galeria' ? 'active' : ''}`}
            onClick={() => setActiveTab('galeria')}
          >
            Galería
          </button>
          <button 
            className={`tab ${activeTab === 'mapa' ? 'active' : ''}`}
            onClick={() => setActiveTab('mapa')}
          >
            Mapa
          </button>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div className="tab-content">
        {renderContent()}
      </div>

      {/* Mensaje indicando que podrían seguir más productos o contenido */}
      <div className="mensaje-productos">
        <p>aca debe seguir si hay mas productos</p>
      </div>

      {/* Footer con información y enlaces de pie de página */}
      <Footer />
    </div>
  );
};

export default AnuncioStand;
