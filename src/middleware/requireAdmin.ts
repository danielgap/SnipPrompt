import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/ErrorResponse';

/**
 * Middleware para verificar si el usuario autenticado es un administrador.
 * Debe usarse después del middleware `requireAuth`.
 *
 * @param req Request - Objeto de solicitud de Express.
 * @param res Response - Objeto de respuesta de Express.
 * @param next NextFunction - Función para pasar al siguiente middleware.
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Asumimos que requireAuth ya ha sido ejecutado y req.user está definido.
  if (!req.user) {
    return next(
      new ErrorResponse(401, 'No autorizado. Se requiere autenticación.')
    );
  }

  // Verificamos si el rol del usuario es 'admin'.
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        403,
        'Acceso denegado. Se requieren privilegios de administrador.'
      )
    );
  }

  // Si el usuario es un administrador, pasamos al siguiente middleware.
  next();
};

export default requireAdmin; 