import React from 'react';

const Gallery = () => {
  const images = [
    { src: "/look-g1.png", alt: "Relojería Precisión" },
    { src: "/look-g2.png", alt: "Drones High-End" },
    { src: "/look-g3.png", alt: "Lifestyle Gadgets VIP" }
  ];

  return (
    <section id="gallery" className="gallery section-padding bg-dark">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="neon-text" style={{color: 'var(--primary)'}}>Nuestra Colección</h2>
          <h3 className="section-title">Ingeniería y Arte</h3>
        </div>

        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div className={`gallery-item ${idx === 0 ? 'featured' : ''}`} key={idx}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span>{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header { text-align: center; margin-bottom: 3rem; }
        .neon-text { text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 0.5rem; }
        .section-title { font-size: 2.5rem; color: white; }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          auto-rows: 250px;
        }
        .gallery-item { position: relative; border-radius: 12px; overflow: hidden; cursor: pointer; }
        .gallery-item.featured { grid-row: span 2; grid-column: span 2; }
        @media (max-width: 768px) { .gallery-item.featured { grid-column: span 1; } }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; filter: sepia(0.2) hue-rotate(-20deg); }
        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex; align-items: flex-end; padding: 1.5rem;
          opacity: 0; transition: var(--transition);
        }
        .gallery-item:hover img { transform: scale(1.05); filter: none; }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay span { color: var(--secondary); font-weight: 600; font-size: 1.1rem; transform: translateY(10px); transition: transform 0.3s ease; }
        .gallery-item:hover .gallery-overlay span { transform: translateY(0); }
      `}</style>
    </section>
  );
};

export default Gallery;
