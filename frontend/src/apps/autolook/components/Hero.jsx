import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <img src="/hero-auto.png" alt="AutoLook Custom" className="hero-img" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          <span className="text-stroke">LLEVA TU AUTO</span>
          <br />
          AL SIGUIENTE <span className="gradient-text">NIVEL</span>
        </h1>
        <p className="hero-subtitle">Especialistas en tuning, detailing premium y accesorios exclusivos de alta gama para vehículos.</p>
        
        <div className="hero-cta">
          <a href="/auto/catalogo" className="btn btn-primary">Ver Accesorios</a>
          <a href="#services" className="btn btn-outline">Nuestros Servicios</a>
        </div>
      </div>

      <style jsx>{`
        .hero { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .hero-img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(10,11,13,0.95) 0%, rgba(10,11,13,0.7) 50%, rgba(10,11,13,0.3) 100%); }
        .hero-content { position: relative; z-index: 10; max-width: 800px; padding: 0 2rem; }
        .hero-title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; text-transform: uppercase; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5); color: transparent; }
        .gradient-text { background: linear-gradient(135deg, var(--primary) 0%, #ff6a00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.2rem; color: var(--text-dim); margin-bottom: 2.5rem; max-width: 600px; line-height: 1.6; }
        .hero-cta { display: flex; gap: 1.5rem; }
      `}</style>
    </section>
  );
};

export default Hero;
