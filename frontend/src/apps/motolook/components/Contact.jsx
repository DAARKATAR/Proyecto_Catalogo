import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container contact-wrapper">
        <div className="contact-info glass">
          <h4 className="neon-text">Hablemos</h4>
          <h2>Contáctanos</h2>
          <p>Estamos listos para darle a tu moto el cuidado y estilo que necesita.</p>
          
          <div className="info-items">
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h4>Ubicación</h4>
                <p>Calle Falsa 123, Sector Moteros - Bogotá, Colombia</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <h4>Teléfono</h4>
                <p>+57 300 123 4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>info@motolook.com</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form glass" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input type="text" placeholder="Nombre completo" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Correo electrónico" required />
          </div>
          <div className="form-group">
            <select required>
              <option value="">¿En qué servicio estás interesado?</option>
              <option value="repuestos">Repuestos</option>
              <option value="lujos">Lujos y personalización</option>
              <option value="gps">Instalación GPS</option>
              <option value="mantenimiento">Cita técnica</option>
            </select>
          </div>
          <div className="form-group">
            <textarea placeholder="Cuéntanos más sobre tu moto..." rows="5"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">Enviar Mensaje</button>
        </form>
      </div>

      <style jsx>{`
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: center;
        }
        .contact-info {
          padding: 4rem;
        }
        .contact-info h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .info-items {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .info-item {
          display: flex;
          gap: 1.5rem;
        }
        .info-item .icon {
          font-size: 1.5rem;
          background: rgba(0, 136, 255, 0.1);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid var(--primary-glow);
        }
        .info-item h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }
        .info-item p {
          color: var(--text-dim);
          font-size: 0.9rem;
        }
        .contact-form {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group input, 
        .form-group select, 
        .form-group textarea {
          width: 100%;
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
          transition: var(--transition);
        }
        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.07);
        }
        .w-full {
          width: 100%;
        }
        @media (max-width: 992px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
