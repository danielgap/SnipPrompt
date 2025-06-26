import React, { ReactNode } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, isUserAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Muestra un loader mientras se verifica la autenticación
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated || !isUserAdmin) {
    // Si no está autenticado o no es admin, redirige al login
    // Guardamos la ubicación original para poder redirigir de vuelta después del login
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }

  // Si es un admin autenticado, renderiza el contenido protegido
  return <>{children}</>;
};

export default AdminGuard; 