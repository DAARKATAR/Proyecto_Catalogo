import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isAuto = location.pathname.startsWith('/auto');
  const isLook = location.pathname === '/' || location.pathname === '/catalogo';

  let brandName = 'MOTOLOOK';
  let passionText = 'Pasión por las dos ruedas, compromiso con tu seguridad y estilo.';
  
  if (isAuto) {
    brandName = 'AUTOLOOK';
    passionText = 'Pasión por los motores, compromiso con tu seguridad y el lujo.';
  } else if (isLook) {
    brandName = 'LOOK';
    passionText = 'Innovación VIP y tecnología de élite. Relojería, drones y gadgets.'
  }

  return (
    <footer className="footer section-padding">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="gradient-text">{brandName}</h2>
            <p>{passionText}</p>
            <div className="social-links">
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">WA</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#gallery">Galería</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Horarios</h4>
            <ul>
              <li>Lunes - Viernes: 8am - 6pm</li>
              <li>Sábado: 9am - 4pm</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--glass-border);
          background-color: #050505;
          padding-bottom: 3rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
        }
        .footer-brand h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .footer-brand p {
          color: var(--text-dim);
          max-width: 300px;
          margin-bottom: 2rem;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-icon {
          width: 40px;
          height: 40px;
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          transition: var(--transition);
        }
        .social-icon:hover {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }
        .footer-links h4 {
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        .footer-links ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .footer-links a {
          text-decoration: none;
          color: var(--text-dim);
          transition: var(--transition);
        }
        .footer-links a:hover {
          color: var(--primary);
          padding-left: 5px;
        }
        .footer-bottom {
          margin-top: 5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          color: #555;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
