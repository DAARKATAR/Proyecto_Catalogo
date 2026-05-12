import React from 'react';
import Navbar from '../../../shared/components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Footer from '../../../shared/components/Footer';

const PortalSection = () => (
  <section id="portal" className="portal section-padding bg-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div className="container text-center">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Explora Nuestras Franquicias</h2>
      <p className="text-dim" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        El ecosistema no se detiene aquí. Si tu pasión son los motores de alta cilindrada o el automovilismo de lujo, visita nuestras divisiones especializadas.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <a href="/moto" className="portal-card" style={{ textDecoration: 'none' }}>
          <div className="portal-content" style={{ borderColor: '#0088ff' }}>
            <h3 style={{ color: '#0088ff', fontSize: '2rem', marginBottom: '0.5rem' }}>MotoLook</h3>
            <p style={{ color: '#a0a0a0' }}>Especialistas en 2 ruedas</p>
          </div>
        </a>
        <a href="/auto" className="portal-card" style={{ textDecoration: 'none' }}>
          <div className="portal-content" style={{ borderColor: '#ff3300' }}>
            <h3 style={{ color: '#ff3300', fontSize: '2rem', marginBottom: '0.5rem' }}>AutoLook</h3>
            <p style={{ color: '#a0a0a0' }}>Tuning y automovilismo</p>
          </div>
        </a>
      </div>
    </div>
    
    <style jsx>{`
      .portal-card {
        display: block;
        background: rgba(25, 27, 31, 0.7);
        border-radius: 16px;
        padding: 3rem 2rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .portal-card:hover { transform: translateY(-10px); }
      .portal-content {
        border-bottom: 2px solid transparent;
        padding-bottom: 1rem;
        transition: 0.3s;
      }
      .portal-card:hover .portal-content { border-color: inherit; }
    `}</style>
  </section>
);

const Landing = () => {
  return (
    <div className="theme-look" style={{ backgroundColor: '#0a0b0d', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <PortalSection />
      <Footer />
    </div>
  );
};

export default Landing;
