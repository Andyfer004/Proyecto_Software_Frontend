import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('userToken');
  const user = localStorage.getItem('user');

  // Si no hay token o usuario, redirigir al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderizar la ruta protegida
  return <Outlet />;
};

export default ProtectedRoute;
