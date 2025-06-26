import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { ErrorResponse } from '../utils';
import { asyncWrapper } from '../middleware';
import { UserPublicAttributes } from '../typescript/interfaces';

// Función utilitaria para crear respuesta de usuario sin password
const createUserResponse = (user: any): UserPublicAttributes => {
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

/**
 * @desc    Obtener todos los usuarios
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getAllUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  }
);

/**
 * @desc    Eliminar un usuario
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;

    // Evitar que un admin se elimine a sí mismo
    if (req.user && req.user.id.toString() === userId) {
      return next(new ErrorResponse(400, 'No puedes eliminar tu propia cuenta de administrador.'));
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorResponse(404, `Usuario no encontrado con id ${userId}`));
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'Usuario eliminado correctamente.'
    });
  }
);

/**
 * @desc    Promover un usuario a administrador
 * @route   PUT /api/users/:id/promote
 * @access  Private (Admin)
 */
export const promoteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new ErrorResponse(404, `Usuario no encontrado con id ${req.params.id}`));
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Usuario promovido a administrador.',
      data: createUserResponse(user)
    });
  }
);

/**
 * @desc    Degradar un administrador a usuario
 * @route   PUT /api/users/:id/demote
 * @access  Private (Admin)
 */
export const demoteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;

    // Evitar que un admin se degrade a sí mismo
    if (req.user && req.user.id.toString() === userId) {
      return next(new ErrorResponse(400, 'No puedes cambiar tu propio rol de administrador.'));
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorResponse(404, `Usuario no encontrado con id ${userId}`));
    }

    user.role = 'user';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Administrador degradado a usuario.',
      data: createUserResponse(user)
    });
  }
); 