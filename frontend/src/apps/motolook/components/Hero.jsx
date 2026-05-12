import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h4 className="animate-fade-in neon-text">Expertos en personalización</h4>
        <h1 className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Lleva tu pasión al <br />
          <span className="gradient-text">Máximo Nivel</span>
        </h1>
        <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Desde repuestos de alto rendimiento hasta sistemas de seguridad GPS de última generación. 
          Tu moto merece lo mejor, nosotros lo instalamos.
        </p>
        <div className="hero-btns animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a href="#services" className="btn btn-primary">Ver Servicios</a>
          <a href="#gallery" className="btn btn-outline">Nuestro Trabajo</a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background-image: url('/hero-moto.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(10, 11, 13, 0.95) 0%, rgba(10, 11, 13, 0.6) 50%, rgba(0, 0, 0, 0) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
        }
        h1 {
          font-size: 4.5rem;
          margin: 1rem 0;
          line-height: 1.1;
        }
        p {
          font-size: 1.2rem;
          color: var(--text-dim);
          margin-bottom: 2.5rem;
          max-width: 600px;
        }
        .hero-btns {
          display: flex;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          h1 { font-size: 3rem; }
          .hero-btns { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
