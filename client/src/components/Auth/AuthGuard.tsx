import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { Layout } from '../UI';
import { PageHeader } from '../UI/PageHeader';

interface AuthGuardProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Mientras se valida el token, es mejor mostrar un estado de carga
    // para evitar un parpadeo de la página de login.
    return (
      <Layout>
        <PageHeader title="Cargando..." />
        <p>Verificando autenticación...</p>
      </Layout>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          // Si está autenticado, renderiza el componente solicitado
          <Component {...props} />
        ) : (
          // Si no, redirige a /login, guardando la ubicación original
          // para poder volver a ella después del login.
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}; 