import React, { useState, useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import { catalogApi } from '../../../shared/services/api';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCatalog();

    const handleStorageChange = (e) => {
      if (e.key === 'catalog_products') {
        fetchCatalog();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const data = await catalogApi.getProducts();
      const lookData = data.filter(p => p.storeType === 'look');
      setProducts(lookData);
      setFilteredProducts(lookData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  // Categorías exclusivas de Look General
  const categories = ['Todos', 'Relojería', 'Drones', 'Gadgets', 'Accesorios VIP'];

  return (
    <div className="theme-look" style={{ backgroundColor: '#0a0b0d', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      <main className="catalog-content section-padding">
        <div className="container">
          <div className="catalog-header text-center mb-5" style={{ paddingTop: '100px' }}>
            <h4 className="neon-text" style={{ color: 'var(--primary)', margin: '0' }}>Catálogo Misceláneo</h4>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Colección LOOK</h2>
            <p className="text-dim">La intersección perfecta entre estilo de vida, relojería y tecnología avanzada.</p>
          </div>

          <div className="filters-container glass mb-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', padding: '1rem' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleFilter(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--glass-border)'}`,
                  color: activeCategory === cat ? 'white' : 'var(--text-dim)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando inventario VIP...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass text-center py-5" style={{ padding: '3rem' }}>
              <h3>No hay productos disponibles en esta colección</h3>
              <p className="text-dim mt-2">Visita nuestra sucursal de motores si buscas repuestos.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} className="glass product-card" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price.toLocaleString()}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{product.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <style jsx>{`
        .product-card:hover { border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); }
      `}</style>
    </div>
  );
};

export default Catalog;
