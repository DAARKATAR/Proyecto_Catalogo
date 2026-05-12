import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "⏱️",
      title: "Relojería Suiza",
      desc: "Auténticas maquinarias de precisión. Servicio de calibración y pulido de piezas."
    },
    {
      icon: "🚁",
      title: "Drones & Tech",
      desc: "Equipos aéreos de filmación cinematográfica y gadgets de última generación."
    },
    {
      icon: "💎",
      title: "Asesoría Premium",
      desc: "Servicio de conserjería para ayudarte a encontrar y configurar tu gadget ideal."
    },
    {
      icon: "🛡️",
      title: "Garantía Global",
      desc: "Certificados de autenticidad en todos nuestros artículos y seguros contra daños."
    }
  ];

  return (
    <section id="services" className="services section-padding">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="neon-text" style={{color: 'var(--primary)'}}>Nuestros Pilares</h2>
          <h3 className="section-title">El Estándar LOOK</h3>
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
          border-color: var(--secondary);
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
