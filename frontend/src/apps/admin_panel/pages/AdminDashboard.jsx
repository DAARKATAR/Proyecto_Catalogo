import React, { useState, useEffect } from 'react';
import { catalogApi, authApi } from '../../../shared/services/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const displayedProducts = activeTab === 'todos' 
    ? products 
    : products.filter(p => (p.storeType || 'motolook') === activeTab);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    storeType: 'motolook', // motolook, autolook, general
    category: 'Repuestos',
    brand: '', // Nueva columna: Marca
    price: '',
    stock: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();

    // TEMPORIZADOR DE INACTIVIDAD (1 minuto = 60000 ms)
    let timeoutId;
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        alert('Sesión cerrada por inactividad.');
        handleLogout();
      }, 60000);
    };

    // Escuchar eventos de interacción del usuario
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Iniciar temporizador
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await catalogApi.getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await catalogApi.updateProduct(formData.id, formData);
      } else {
        await catalogApi.addProduct(formData);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      await catalogApi.deleteProduct(id);
      fetchProducts();
    }
  };

  const editProduct = (prod) => {
    setFormData({
      id: prod.id,
      name: prod.name || '',
      storeType: prod.storeType || 'motolook',
      category: prod.category || 'Repuestos',
      brand: prod.brand || '',
      price: prod.price || '',
      stock: prod.stock || 0,
      imageUrl: prod.imageUrl || ''
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await catalogApi.uploadImage(file);
        setFormData({ ...formData, imageUrl: url });
      } catch (error) {
        alert(error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', storeType: 'motolook', category: 'Repuestos', brand: '', price: '', stock: '', imageUrl: '' });
    setIsEditing(false);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar glass-dark">
        <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img src="/icon.png" alt="AutoLook Logo" style={{ width: '70px', height: 'auto', borderRadius: '12px' }} />
          <h2 className="gradient-text" style={{ margin: 0, fontSize: '1.5rem' }}>AUTOLOOK</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><Package size={20} /> Inventario</button>

          <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <span style={{fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '1rem', marginBottom: '0.5rem'}}>
              🌐 Ver Tienda en Vivo
            </span>
            <a href="/" target="_blank" rel="noopener noreferrer" className="nav-item" style={{textDecoration: 'none', fontSize: '0.9rem'}}>
               💎 Ir a la Landing Page
            </a>
          </div>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout"><LogOut size={20} /> Cerrar Sesión</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2>Gestión de Catálogo Premium</h2>
            <p className="text-dim">Maneja tu inventario aquí. Los cambios se reflejarán instantáneamente.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#00ffcc', textTransform: 'uppercase' }}>Total Productos</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{products.length}</span>
            </div>
            <div className="glass" style={{ padding: '1rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#0088ff', textTransform: 'uppercase' }}>En Stock (Unid.)</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{products.reduce((acc, curr) => acc + (curr.stock || 0), 0)}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Form Section */}
          <div className="form-panel glass">
            <h3>{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group" style={{gridColumn: '1 / -1'}}>
                  <label>Nombre del Producto</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Sucursal / Vehículo</label>
                  <select value={formData.storeType} onChange={e => setFormData({...formData, storeType: e.target.value})}>
                    <option value="motolook">Moto (MotoLook)</option>
                    <option value="autolook">Carro (AutoLook)</option>
                    <option value="general">Universal (Para todo vehículo)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Repuestos">Repuestos</option>
                    <option value="Lujos">Lujos</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Iluminación">Iluminación</option>
                    <option value="Aerodinámica">Aerodinámica</option>
                    <option value="Performance">Performance</option>
                    <option value="Rines">Rines</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Marca del Producto</label>
                  <input type="text" placeholder="Ej: Pirelli, Brembo..." value={formData.brand || ''} onChange={e => setFormData({...formData, brand: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Precio ($)</label>
                  <input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" required min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
              </div>

              <div className="form-group file-upload-wrapper">
                <label>Imagen del Producto (PNG/JPG)</label>
                <div className="file-input-container">
                  <input type="file" id="file" accept="image/png, image/jpeg" onChange={handleImageUpload} className="file-input-hidden" />
                  <label htmlFor="file" className="btn btn-outline file-btn">
                    Subir Archivo
                  </label>
                  <span className="file-selected-text">
                    {isUploading ? 'Subiendo imagen a Supabase...' : (formData.imageUrl ? '✓ Imagen subida con éxito' : 'Ningún archivo seleccionado')}
                  </span>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isUploading}>
                  {isEditing ? 'Guardar Cambios' : 'Añadir Producto'}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="btn btn-outline" disabled={isUploading}>Cancelar</button>}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="table-panel glass">
            <div className="table-header">
              <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                <h3>Inventario Actual</h3>
                <div className="admin-tabs">
                  <button className={`tab-btn ${activeTab === 'todos' ? 'active' : ''}`} onClick={() => setActiveTab('todos')}>Todas</button>
                  <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>Universal</button>
                  <button className={`tab-btn ${activeTab === 'motolook' ? 'active' : ''}`} onClick={() => setActiveTab('motolook')}>MotoLook</button>
                  <button className={`tab-btn ${activeTab === 'autolook' ? 'active' : ''}`} onClick={() => setActiveTab('autolook')}>AutoLook</button>
                </div>
              </div>
              <button className="btn-icon" onClick={fetchProducts}>🔄</button>
            </div>
            
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Producto</th>
                    <th>Sucursal</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="7" className="text-center py-4">Cargando inventario...</td></tr>
                  ) : displayedProducts.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-4">No hay productos en esta sucursal</td></tr>
                  ) : (
                    displayedProducts.map(prod => (
                      <tr key={prod.id}>
                        <td><img src={prod.imageUrl} alt={prod.name} className="table-img" /></td>
                        <td className="font-bold">
                          <div>{prod.name}</div>
                          <small style={{color: '#888'}}>{prod.brand}</small>
                        </td>
                        <td>
                          <span className={`badge ${prod.storeType === 'autolook' ? 'badge-auto' : prod.storeType === 'motolook' ? 'badge-moto' : 'badge-general'}`}>
                            {prod.storeType === 'autolook' ? 'Carro' : prod.storeType === 'motolook' ? 'Moto' : 'Universal'}
                          </span>
                        </td>
                        <td><span className="badge">{prod.category}</span></td>
                        <td>${prod.price}</td>
                        <td>
                          <span className={`stock-badge ${prod.stock < 5 ? 'low' : ''}`}>{prod.stock}</span>
                        </td>
                        <td className="actions-cell">
                          <button onClick={() => editProduct(prod)} className="action-btn edit" title="Editar"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(prod.id)} className="action-btn delete" title="Eliminar"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-dark);
        }
        .sidebar {
          width: 250px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--glass-border);
          position: fixed;
          height: 100vh;
        }
        .sidebar-header {
          padding: 2rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .sidebar-header h2 { font-size: 1.5rem; margin-bottom: 0.2rem; }
        .sidebar-header span { font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; }
        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
        }
        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: transparent;
          border: none;
          color: var(--text-dim);
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: var(--transition);
          text-align: left;
        }
        .nav-item:hover, .nav-item.active {
          background: rgba(0, 136, 255, 0.1);
          color: var(--primary);
        }
        .sidebar-footer {
          padding: 1.5rem 1rem;
          border-top: 1px solid var(--glass-border);
        }
        .btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 60, 60, 0.1);
          color: #ff6b6b;
          border: 1px solid rgba(255, 60, 60, 0.2);
          padding: 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-logout:hover {
          background: #ff6b6b;
          color: white;
        }
        
        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 2rem 3rem;
        }
        .content-header { margin-bottom: 2rem; }
        .content-header h2 { font-size: 2rem; }
        .text-dim { color: var(--text-dim); }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .form-panel, .table-panel { padding: 2rem; }
        .form-panel h3, .table-header h3 { font-size: 1.2rem; margin: 0; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        
        .admin-tabs { display: flex; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.3rem; border-radius: 8px; border: 1px solid var(--glass-border); }
        .tab-btn { background: transparent; border: none; color: var(--text-dim); padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; transition: 0.3s; font-size: 0.85rem; font-weight: 500; }
        .tab-btn:hover { color: white; }
        .tab-btn.active { background: var(--primary); color: white; }

        .btn-icon { background:transparent; border:none; color:white; cursor:pointer;}
        
        /* Form Styles */
        .admin-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.85rem; color: #bbb; }
        .form-group input, .form-group select {
          padding: 0.8rem;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: white;
          font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 10px rgba(0, 136, 255, 0.2); }
        .form-group option {
          background-color: #0a0b0d; 
          color: #ffffff;
        }
        
        /* Remove default number arrows */
        input[type="number"]::-webkit-inner-spin-button, 
        input[type="number"]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type="number"] { -moz-appearance: textfield; }
        
        /* Custom Select Appearance */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem top 50%;
          background-size: 0.65rem auto;
          cursor: pointer;
        }

        /* Custom File Input Styles */
        .file-input-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .file-input-hidden {
          display: none;
        }
        .file-btn {
          cursor: pointer;
          padding: 0.6rem 1.5rem !important;
          font-size: 0.85rem;
          margin: 0;
        }
        .file-selected-text {
          font-size: 0.85rem;
          color: var(--text-dim);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 250px;
        }
        .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
        
        /* Table Styles */
        .table-responsive { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          padding: 1rem;
          border-bottom: 2px solid var(--glass-border);
          color: var(--text-dim);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          vertical-align: middle;
        }
        .admin-table tbody tr {
          transition: var(--transition);
        }
        .admin-table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }
        .table-img { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; }
        .badge { background: rgba(255,255,255,0.1); padding: 0.3rem 0.6rem; border-radius: 20px; font-size: 0.8rem; }
        .stock-badge { background: rgba(0, 255, 100, 0.2); color: #00ff66; padding: 0.3rem 0.6rem; border-radius: 4px; font-weight: bold; }
        .stock-badge.low { background: rgba(255, 100, 0, 0.2); color: #ff6600; }
        .actions-cell { display: flex; gap: 0.5rem; }
        .action-btn { 
          width: 32px; height: 32px; 
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; border: none; cursor: pointer; transition: 0.2s;
        }
        .action-btn.edit { background: rgba(0, 136, 255, 0.15); color: #0088ff; }
        .action-btn.edit:hover { background: #0088ff; color: white; }
        .action-btn.delete { background: rgba(255, 60, 60, 0.15); color: #ff3c3c; }
        .action-btn.delete:hover { background: #ff3c3c; color: white; }
        .text-center { text-align: center; }
        .py-4 { padding-top: 2rem; padding-bottom: 2rem; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
