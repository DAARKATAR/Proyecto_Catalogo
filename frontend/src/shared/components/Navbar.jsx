import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Dynamic brand logic
  const isAuto = location.pathname.startsWith('/auto');
  const isLook = location.pathname === '/' || location.pathname === '/catalogo';
  
  let brandName = 'MOTOLOOK';
  let mainURL = '/moto';
  let catalogURL = '/moto/catalogo';

  if (isAuto) {
    brandName = 'AUTOLOOK';
    mainURL = '/auto';
    catalogURL = '/auto/catalogo';
  } else if (isLook) {
    brandName = 'LOOK';
    mainURL = '/';
    catalogURL = '/catalogo';
  }

  const isHome = location.pathname === mainURL;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-dark' : ''}`}>
      <div className="container nav-content">
        <Link to={mainURL} className="logo">
          <span className="gradient-text">{brandName}</span>
        </Link>
        <ul className="nav-links">
          <li><Link to={mainURL}>Inicio</Link></li>
          {isHome && (
            <>
              <li><Link to={catalogURL}>Catálogo</Link></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#contact">Contacto</a></li>
            </>
          )}
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition);
        }
        .navbar.scrolled {
          padding: 0.8rem 0;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
        }
        .logo-sub {
          font-size: 0.7rem;
          letter-spacing: 4px;
          color: var(--text-dim);
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          transition: var(--transition);
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: var(--transition);
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .btn-sm {
          padding: 0.6rem 1.5rem;
          font-size: 0.8rem;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
