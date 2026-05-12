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
    // Make sure we always start at top when navigating here
    window.scrollTo(0, 0);
    fetchCatalog();

    // Escuchar cambios en otras pestañas (Real-Time Sync estático)
    const handleStorageChange = (e) => {
      if (e.key === 'catalog_products') {
        fetchCatalog();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const data = await catalogApi.getProducts();
      const motoData = data.filter(p => !p.storeType || p.storeType === 'motolook');
      setProducts(motoData);
      setFilteredProducts(motoData);
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

  const categories = ['Todos', 'Repuestos', 'Lujos', 'Seguridad', 'Accesorios'];

  return (
    <div className="catalog-page">
      <Navbar />

      <main className="catalog-content section-padding">
        <div className="container">
          <div className="catalog-header text-center mb-5">
            <h4 className="neon-text">Nuestra Tienda</h4>
            <h2>Catálogo de Productos</h2>
            <p className="text-dim mt-2">Encuentra los mejores accesorios y repuestos para llevar tu moto al siguiente nivel.</p>
          </div>

          {/* Filters */}
          <div className="filters-container glass mb-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando inventario...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state glass text-center py-5">
              <h3>No hay productos en esta categoría</h3>
              <p className="text-dim">Revisa más tarde o intenta con otra búsqueda.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card glass">
                  <div className="product-img-wrapper">
                    <img src={product.imageUrl} alt={product.name} className="product-img" loading="lazy" />
                    <span className="category-badge">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <span className="price">${product.price.toLocaleString()}</span>
                      <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                      </span>
                    </div>
                    <button 
                      className="btn btn-outline w-full mt-3" 
                      disabled={product.stock === 0}
                      onClick={() => alert('Simulación: Producto añadido al carrito.')}
                    >
                      {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .catalog-page { background-color: var(--bg-dark); min-height: 100vh; }
        .catalog-content { padding-top: 120px; /* Offset for fixed navbar */ }
        .text-center { text-align: center; }
        .mb-5 { margin-bottom: 3rem; }
        .mb-4 { margin-bottom: 2rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 1rem; }
        .py-5 { padding: 4rem 2rem; }
        .text-dim { color: var(--text-dim); }
        .w-full { width: 100%; }

        .filters-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition);
          font-family: inherit;
          font-weight: 500;
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }
        .product-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .product-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid var(--glass-border);
        }
        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-info h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          flex: 1;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
        }
        .stock-status {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .in-stock { color: #00ff66; }
        .out-stock { color: #ff3c3c; }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          gap: 1rem;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 136, 255, 0.2);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Catalog;
