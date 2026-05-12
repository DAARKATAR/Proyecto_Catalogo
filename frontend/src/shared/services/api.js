// Fake database initialization for demo purposes.
const INITIAL_PRODUCTS = [
  // MOTOLOOK
  { id: 1, name: 'Llantas Pirelli Diablo Rosso III', storeType: 'motolook', category: 'Repuestos', price: 180, stock: 15, imageUrl: 'https://images.unsplash.com/photo-1549557451-b847ae91b107?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Kit Exploradoras LED', storeType: 'motolook', category: 'Lujos', price: 65, stock: 8, imageUrl: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'GPS Monitoreo 24/7', storeType: 'motolook', category: 'Seguridad', price: 120, stock: 5, imageUrl: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  // AUTOLOOK
  { id: 4, name: 'Rines Aleación 19" Black', storeType: 'autolook', category: 'Rines', price: 1200, stock: 4, imageUrl: '/auto-g1.png' },
  { id: 5, name: 'Kit Fibra de Carbono', storeType: 'autolook', category: 'Aerodinámica', price: 850, stock: 2, imageUrl: '/auto-g3.png' },
  { id: 6, name: 'Panel LED Cockpit', storeType: 'autolook', category: 'Iluminación', price: 340, stock: 10, imageUrl: '/auto-g2.png' },
  // LOOK VIP
  { id: 7, name: 'Reloj Mecánico Zafiro Oro', storeType: 'look', category: 'Relojería', price: 4500, stock: 1, imageUrl: '/look-g1.png' },
  { id: 8, name: 'Drone Cinematic 8K Pro', storeType: 'look', category: 'Drones', price: 2100, stock: 3, imageUrl: '/look-g2.png' },
  { id: 9, name: 'Tech Smart Control Hub', storeType: 'look', category: 'Gadgets', price: 650, stock: 7, imageUrl: '/look-g3.png' }
];

const DB_VERSION = 2; // Forzar reseteo de localStorage del cliente

// Initialize DB if empty or if version is outdated
if (!localStorage.getItem('catalog_products') || localStorage.getItem('db_version') !== String(DB_VERSION)) {
  localStorage.setItem('catalog_products', JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem('db_version', String(DB_VERSION));
}

// SIMULATED LATENCY to make it feel like a real API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const catalogApi = {
  // GET ALL PRODUCTS
  getProducts: async () => {
    await delay(600); // Simulate network latency
    const data = localStorage.getItem('catalog_products');
    return JSON.parse(data) || [];
  },

  // CREATE PRODUCT
  addProduct: async (producto) => {
    await delay(800);
    const data = JSON.parse(localStorage.getItem('catalog_products') || '[]');
    const newProduct = { ...producto, id: Date.now() }; // Fake Auto-Increment ID
    data.push(newProduct);
    localStorage.setItem('catalog_products', JSON.stringify(data));
    return newProduct;
  },

  // UPDATE PRODUCT
  updateProduct: async (id, updatedFields) => {
    await delay(800);
    const data = JSON.parse(localStorage.getItem('catalog_products') || '[]');
    const index = data.findIndex(p => p.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedFields };
      localStorage.setItem('catalog_products', JSON.stringify(data));
      return data[index];
    }
    throw new Error('Producto no encontrado');
  },

  // DELETE PRODUCT
  deleteProduct: async (id) => {
    await delay(800);
    const data = JSON.parse(localStorage.getItem('catalog_products') || '[]');
    const newData = data.filter(p => p.id !== id);
    localStorage.setItem('catalog_products', JSON.stringify(newData));
    return true;
  }
};

export const authApi = {
  // SIMULATED JWT LOGIN
  login: async (username, password) => {
    await delay(1000);
    if (username === 'admin' && password === 'admin123') {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MockTokenVip123';
      localStorage.setItem('token', fakeToken);
      return { success: true, token: fakeToken };
    }
    throw new Error('Credenciales inválidas');
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
