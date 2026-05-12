import React from 'react';
import { Routes, Route } from 'react-router-dom';

// MotoLook App
import MotoLanding from './apps/motolook/pages/Landing';
import MotoCatalog from './apps/motolook/pages/Catalog';

// AutoLook App
import AutoLanding from './apps/autolook/pages/Landing';
import AutoCatalog from './apps/autolook/pages/Catalog';

import LookLanding from './apps/look_general/pages/Landing';
import LookCatalog from './apps/look_general/pages/Catalog';

// Admin Panel App
import Login from './apps/admin_panel/pages/Login';
import AdminDashboard from './apps/admin_panel/pages/AdminDashboard';
import ProtectedRoute from './apps/admin_panel/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* --- SUCURSAL MATRIZ: LOOK GENERAL --- */}
      <Route path="/" element={<LookLanding />} />
      <Route path="/catalogo" element={<LookCatalog />} />

      {/* --- SUCURSAL: MOTOLOOK --- */}
      <Route path="/moto" element={<MotoLanding />} />
      <Route path="/moto/catalogo" element={<MotoCatalog />} />

      {/* --- SUCURSAL: AUTOLOOK --- */}
      <Route path="/auto" element={<AutoLanding />} />
      <Route path="/auto/catalogo" element={<AutoCatalog />} />

      {/* --- ADMIN CENTRALIZADO --- */}
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<MotoLanding />} /> {/* Redirect for testing */}
    </Routes>
  );
}

export default App;
