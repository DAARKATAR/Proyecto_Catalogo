import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info glass">
            <h2>Agenda tu Turno</h2>
            <p className="text-dim mb-4">Estamos listos para transformar tu vehículo. Completa el formulario y nuestros especialistas te contactarán para una asesoría VIP.</p>
            
            <div className="info-items">
              <div className="info-item">
                <span className="icon">📍</span>
                <div>
                  <h4>Taller Principal</h4>
                  <p>Av. Motor, Zona Exclusiva</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <h4>Línea VIP</h4>
                  <p>+1 234 567 890</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>vip@autolook.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form glass">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Nombre completo" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Modelo de Auto" required />
              </div>
              <div className="form-group">
                <textarea placeholder="¿En qué servicio estás interesado?" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">Solicitar Asesoría</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
        .mb-4 { margin-bottom: 2rem; }
        .w-full { width: 100%; }
        .contact-info, .contact-form { padding: 3rem; }
        .info-items { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-item { display: flex; align-items: flex-start; gap: 1rem; }
        .info-item .icon { font-size: 1.5rem; }
        .info-item h4 { color: white; margin-bottom: 0.2rem; }
        .info-item p { color: var(--text-dim); }
        .form-group { margin-bottom: 1.5rem; }
        input, textarea {
          width: 100%; padding: 1rem;
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--glass-border);
          border-radius: 8px; color: white;
          font-family: inherit; transition: var(--transition);
        }
        input:focus, textarea:focus { outline: none; border-color: var(--primary); background: rgba(0,0,0,0.8); }
      `}</style>
    </section>
  );
};

export default Contact;
