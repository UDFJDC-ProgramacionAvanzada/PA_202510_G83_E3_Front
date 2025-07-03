import './AnuncioStand.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbardef';


const AnuncioStand = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [standData, setStandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { standId } = useParams();

  useEffect(() => {
    const fetchStandData = async () => {
      if (!standId) {
        setError('No se proporcionó un ID de stand.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/stands/${standId}`);
        setStandData(response.data);
      } catch (err) {
        setError('Error al cargar la información del stand. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchStandData();
  }, [standId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'productos':
        return (
          <div className="productos-grid">
            {standData?.productos && standData.productos.length > 0 ? (
              standData.productos.map(producto => (
                <div key={producto.id} className="producto-card">
                  <div className="producto-imagen">
                    {producto.imagenUrl ? (
                      <img src={producto.imagenUrl} alt={producto.nombre} />
                    ) : (
                      <div className="imagen-placeholder"><span>Imagen</span></div>
                    )}
                  </div>
                  <div className="producto-info">
                    <p className="producto-nombre">{producto.nombre}</p>
                    <p className="producto-precio">{producto.precio}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Este stand aún no tiene productos registrados.</p>
            )}
          </div>
        );

      case 'comentarios':
        return (
          <div className="comentarios-section">
            <h3>Comentarios</h3>
            <div className="comentario-box">
              {standData?.comentarios && standData.comentarios.length > 0 ? (
                standData.comentarios.map(comentario => (
                  <div key={comentario.id} className="comentario-item">
                    <p><strong>{comentario.usuario?.nombre || 'Anónimo'}:</strong> {comentario.texto}</p>
                    <span>Calificación: {comentario.rating} ★</span>
                  </div>
                ))
              ) : (
                <p>No hay comentarios disponibles.</p>
              )}
            </div>
          </div>
        );

      case 'galeria':
        return (
          <div className="galeria-section">
            <h3>Galería</h3>
            <div className="galeria-grid">
              {standData?.galleryImagesUrls && standData.galleryImagesUrls.length > 0 ? (
                standData.galleryImagesUrls.map((url, i) => (
                  <div key={i} className="galeria-item">
                    <img src={url} alt={`Imagen de galería ${i + 1}`} />
                  </div>
                ))
              ) : (
                <p>No hay imágenes en la galería.</p>
              )}
            </div>
          </div>
        );

      case 'mapa':
        return (
          <div className="mapa-section">
            <h3>Ubicación</h3>
            <div className="mapa-container">
              {standData?.address ? (
                <iframe
                  title="Mapa de ubicación"
                  src={standData.address}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              ) : (
                <p>La ubicación no está disponible.</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) return <div className="centered-message">Cargando... ⏳</div>;
  if (error) return <div className="centered-message">{error} ❌</div>;
  if (!standData) return <div className="centered-message">No se encontró el stand.</div>;

  return (
    <div className="anuncio-stand-container">
      <Navbar />

      <div className="breadcrumb">
        <span>inicio</span> / <span>comprar</span> / <span>{standData.name}</span>
      </div>

      <div className="stand-header">
        <h1>{standData.name}</h1>
        <div className="stand-meta">
          <span className="categoria">
            {standData.categorias?.map(c => c.nombre).join(' / ') || 'Sin categoría'}
          </span>
          <span className="universidad">universidad y dresscode</span>
        </div>
        <div className="stand-rating">
          <span className="rating">{standData.rating} ★</span>
          <span className="estado">{standData.schedule || 'Horario no disponible'}</span>
        </div>
      </div>

      <div className="stand-imagenes">
        <div className="imagen-principal">
          {standData.mainImageUrl ? (
            <img src={standData.mainImageUrl} alt="Imagen principal del stand" />
          ) : (
            <div className="imagen-placeholder-large"><span>Imagen Principal</span></div>
          )}
        </div>
        <div className="imagenes-secundarias">
          {standData.galleryImagesUrls?.slice(0, 2).map((url, i) => (
            <div key={i} className="imagen-secundaria">
              <img src={url} alt={`Imagen secundaria ${i + 1}`} />
            </div>
          ))}
          <div className="ver-galeria" onClick={() => setActiveTab('galeria')}>
            <span>Ver Galería</span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {['productos', 'comentarios', 'galeria', 'mapa'].map(tabName => (
            <button
              key={tabName}
              className={`tab ${activeTab === tabName ? 'active' : ''}`}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>

      <Footer />
    </div>
  );
};

export default AnuncioStand;