import React from 'react';
// Importa los estilos específicos del pie de página
import './footer.css';
// Importa Link para navegación
import { Link } from 'react-router-dom';
// Importa íconos (no utilizados en este componente)
import { ArrowLeft, ChevronLeft } from 'lucide-react';
// Hook de React Router para navegar programáticamente
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function Footer() {
  // Inicializa el hook para navegación
  const navigate = useNavigate();

  // Función para manejar el botón "volver" (aunque no se usa en este componente)
  const handleGoBack = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del enlace
    navigate(-1); // Navega a la página anterior en el historial
  };

  // Función para navegar a términos y condiciones
  const handleTermsClick = () => {
    navigate('/terms');
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Sección izquierda - Redes sociales */}
        <div className="social-section">

          {/* Ítem de red social - Instagram */}
          <div className="social-item">
            <div className="social-icon">
              {/* Símbolo representando Instagram */}
              <span className="icon-instagram">@</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>

          {/* Ítem de red social - Facebook */}
          <div className="social-item">
            <div className="social-icon">
              {/* Símbolo representando Facebook */}
              <span className="icon-facebook">f</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>

          {/* Ítem de red social - TikTok */}
          <div className="social-item">
            <div className="social-icon">
              {/* Símbolo representando TikTok */}
              <span className="icon-tiktok">♪</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>
        </div>

        {/* Sección derecha - Enlaces adicionales */}
        <div className="links-section">
          <span className="footer-link"><FormattedMessage id='MÁS SOBRE NOSOTROS'/></span>
          <span className="footer-link"><FormattedMessage id='AYUDA'/></span>
          <span className="language-text"><FormattedMessage id='Idioma: Español'/></span>
          <span className="terms-text" onClick={handleTermsClick}>
            <FormattedMessage id='Terminos y condiciones'/>
          </span>
        </div>

      </div>
    </footer>
  );
}

// Exporta el componente para ser usado en otras partes de la app
export default Footer;