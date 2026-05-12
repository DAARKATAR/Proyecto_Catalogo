import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <img src="/hero-look.png" alt="Look VIP Lifestyle" className="hero-img" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          <span className="text-stroke">TECNOLOGÍA &</span>
          <br />
          ESTILO DE <span className="gradient-text">VIDA VIP</span>
        </h1>
        <p className="hero-subtitle">Elevando tus estándares. Colección curada de relojería mecánica suiza, drones cinematográficos y accesorios exclusivos.</p>
        
        <div className="hero-cta">
          <a href="/catalogo" className="btn btn-primary" style={{backgroundColor: 'var(--primary)', borderColor: 'var(--primary)'}}>Catálogo Exclusivo</a>
          <a href="#portal" className="btn btn-outline" style={{borderColor: 'var(--secondary)'}}>Explorar Franquicias</a>
        </div>
      </div>

      <style jsx>{`
        .hero { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .hero-img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(10,11,13,0.95) 0%, rgba(10,11,13,0.7) 50%, rgba(10,11,13,0.3) 100%); }
        .hero-content { position: relative; z-index: 10; max-width: 800px; padding: 0 2rem; }
        .hero-title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; text-transform: uppercase; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 215, 0, 0.3); color: transparent; }
        .gradient-text { background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.2rem; color: var(--text-dim); margin-bottom: 2.5rem; max-width: 600px; line-height: 1.6; }
        .hero-cta { display: flex; gap: 1.5rem; }
      `}</style>
    </section>
  );
};

export default Hero;
