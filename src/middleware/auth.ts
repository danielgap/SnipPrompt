import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';
import { ErrorResponse } from '../utils';
import { UserModel } from '../models';

// Extendemos la interfaz de Request para incluir el userId
export interface AuthenticatedRequest extends Request {
  userId?: number;
}

/**
 * @desc Middleware para proteger rutas. Requiere un token JWT válido.
 */
export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  // Verificar que el header Authorization existe y tiene el formato correcto "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse(401, 'No autorizado para acceder a esta ruta'));
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, authConfig.jwtSecret) as { userId: number };

    // Verificar que el usuario del token existe y está activo
    const user = await UserModel.findOne({ where: { id: decoded.userId, isActive: true } });

    if (!user) {
      return next(new ErrorResponse(401, 'Usuario no encontrado o inactivo'));
    }

    // Adjuntar el ID del usuario a la petición para uso en los controllers
    req.userId = user.id;

    next();
  } catch (error) {
    return next(new ErrorResponse(401, 'Token no válido o expirado'));
  }
};

/**
 * @desc Middleware para autenticación opcional. Si hay token, lo verifica, si no, continúa.
 */
export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Si no hay token, simplemente continuamos sin autenticar
  if (!token) {
    return next();
  }

  try {
    // Verificar el token si existe
    const decoded = jwt.verify(token, authConfig.jwtSecret) as { userId: number };
    const user = await UserModel.findOne({ where: { id: decoded.userId, isActive: true } });

    // Si el token es válido y el usuario existe, adjuntamos el ID
    if (user) {
      req.userId = user.id;
    }
  } catch (error) {
    // Si el token es inválido, simplemente ignoramos y continuamos.
    // No queremos bloquear el acceso a rutas públicas por un token malo.
  }

  next();
}; 