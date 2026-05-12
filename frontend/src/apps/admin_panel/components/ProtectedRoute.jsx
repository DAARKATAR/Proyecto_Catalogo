import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authApi } from '../../../shared/services/api';

const ProtectedRoute = () => {
  // If not authenticated, kick user back to login page
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes (Admin Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;
