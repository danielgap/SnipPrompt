import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/ErrorResponse';

/**
 * Middleware to check if the authenticated user is an administrator.
 * Must be used after the `requireAuth` middleware.
 *
 * @param req Request - Express request object.
 * @param res Response - Express response object.
 * @param next NextFunction - Function to pass to the next middleware.
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // We assume that requireAuth has already been executed and req.user is defined.
  if (!req.user) {
    return next(
      new ErrorResponse(401, 'Unauthorized. Authentication is required.')
    );
  }

  // We check if the user's role is 'admin'.
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        403,
        'Access denied. Administrator privileges are required.'
      )
    );
  }

  // If the user is an administrator, we pass to the next middleware.
  next();
};

export default requireAdmin; 