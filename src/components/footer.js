import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate(); // Corregido: era "const useNavigate"

  const handleGoBack = (e) => {
    e.preventDefault(); // Previene la navegación del Link
    navigate(-1);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección izquierda - Redes sociales */}
        <div className="social-section">
          {/* Instagram */}
          <div className="social-item">
            <div className="social-icon">
              <span className="icon-instagram">@</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>

          {/* Facebook */}
          <div className="social-item">
            <div className="social-icon">
              <span className="icon-facebook">f</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>

          {/* TikTok */}
          <div className="social-item">
            <div className="social-icon">
              <span className="icon-tiktok">♪</span>
            </div>
            <span className="social-handle">@mercau_u</span>
          </div>
        </div>

        {/* Sección derecha - Enlaces */}
        <div className="links-section">
          <span className="footer-link">MÁS SOBRE NOSOTROS</span>
          <span className="footer-link">AYUDA</span>
          <span className="language-text">Idioma: Español</span>
          <span className="terms-text">Terms & Conditions</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;