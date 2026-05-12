import React from 'react';

const projects = [
  { id: 1, title: 'Yamaha R6 Custom', category: 'Personalización', img: '/g1.jpg' },
  { id: 2, title: 'Instalación GPS Pro', category: 'Seguridad', img: '/g2.jpg' },
  { id: 3, title: 'Full System Akrapovic', category: 'Rendimiento', img: '/g3.jpg' },
  { id: 4, title: 'Kawasaki Z900 LED Kit', category: 'Lujos', img: '/g4.jpg' },
  { id: 5, title: 'Ducati Panigale Slider', category: 'Protección', img: '/g5.jpg' },
  { id: 6, title: 'BMW GS 1250 Tourer', category: 'Accesorios', img: '/g6.jpg' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section-padding bg-black">
      <div className="container">
        <div className="section-header">
          <h4 className="neon-text">Nuestros trabajos</h4>
          <h2>Galería de Proyectos</h2>
        </div>
        <div className="gallery-grid">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="gallery-item glass">
              <div className="gallery-img-container">
                <img src={project.img.replace('.jpg', '.png')} alt={project.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-black {
          background-color: #050505;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .gallery-img-container {
          height: 300px;
          position: relative;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.1);
        }
        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
          opacity: 0;
          transition: var(--transition);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-overlay span {
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .gallery-overlay h3 {
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
