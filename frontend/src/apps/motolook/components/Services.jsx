import React from 'react';

const services = [
  {
    title: 'Repuestos Originales',
    desc: 'Contamos con el catálogo más amplio de piezas certificadas para todas las marcas.',
    icon: '🔧'
  },
  {
    title: 'Lujos y Estética',
    desc: 'Kits de luces LED, sliders, timones de lujo y personalización completa de carenajes.',
    icon: '✨'
  },
  {
    title: 'Seguridad GPS',
    desc: 'Sistemas de rastreo satelital en tiempo real con monitoreo desde tu móvil.',
    icon: '🛰️'
  },
  {
    title: 'Instalación Técnica',
    desc: 'Mano de obra especializada para garantizar que cada accesorio funcione perfecto.',
    icon: '👨‍🔧'
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="section-header">
          <h4 className="neon-text">Lo que ofrecemos</h4>
          <h2>Servicios Especializados</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card glass">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-header h2 {
          font-size: 2.5rem;
          margin-top: 0.5rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .service-card {
          padding: 3rem 2rem;
          text-align: center;
          transition: var(--transition);
        }
        .service-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--primary);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .service-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .service-card h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .service-card p {
          color: var(--text-dim);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default Services;
