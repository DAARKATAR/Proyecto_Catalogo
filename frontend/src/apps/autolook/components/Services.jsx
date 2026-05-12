import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "🏎️",
      title: "Rines y Llantas",
      desc: "Instalación de rines deportivos y cubiertas de alto rendimiento para asfalto."
    },
    {
      icon: "✨",
      title: "Detailing y PPF",
      desc: "Protección de pintura, recubrimientos cerámicos y películas de protección anti-impactos."
    },
    {
      icon: "🔈",
      title: "Audio & Electrónica",
      desc: "Sistemas de sonido de altísima fidelidad, pantallas táctiles y sensores avanzados."
    },
    {
      icon: "🛠️",
      title: "Performance",
      desc: "Sistemas de escape, suspensiones deportivas y reprogramación (Chiptuning)."
    }
  ];

  return (
    <section id="services" className="services section-padding">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="neon-text" style={{color: 'var(--primary-auto)'}}>Especialidades</h2>
          <h3 className="section-title">Automovilismo Premium</h3>
        </div>
        
        <div className="services-grid">
          {services.map((srv, idx) => (
            <div className="service-card glass" key={idx}>
              <div className="service-icon">{srv.icon}</div>
              <h4>{srv.title}</h4>
              <p className="text-dim">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header { text-align: center; margin-bottom: 3rem; }
        .neon-text { text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 0.5rem; }
        .section-title { font-size: 2.5rem; color: white; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .service-card {
          padding: 2.5rem 2rem;
          text-align: center;
          border-radius: 16px;
          transition: var(--transition);
        }
        .service-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .service-icon { font-size: 3rem; margin-bottom: 1.5rem; filter: drop-shadow(0 0 10px var(--primary-glow)); }
        .service-card h4 { font-size: 1.25rem; margin-bottom: 1rem; color: white; }
        .text-dim { color: var(--text-dim); line-height: 1.6; }
      `}</style>
    </section>
  );
};

export default Services;
