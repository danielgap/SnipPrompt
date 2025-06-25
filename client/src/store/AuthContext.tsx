import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';
import { User } from '../typescript/interfaces';

// --- Tipos para el Contexto ---
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  userId: number;
  exp: number;
}

// --- Creación del Contexto ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Hook para usar el Contexto ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// --- Proveedor del Contexto ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          // Comprobar si el token ha expirado
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            // Si el token es válido, obtenemos los datos del perfil
            const response = await api.get('/auth/profile');
            setUser(response.data.data.user);
          }
        } catch (error) {
          console.error('Token inválido', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  const login = async (loginData: any) => {
    const response = await api.post('/auth/login', loginData);
    const { user, token } = response.data.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const register = async (registerData: any) => {
    const response = await api.post('/auth/register', registerData);
    const { user, token } = response.data.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 