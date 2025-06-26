import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { ErrorResponse } from '../utils';
import { asyncWrapper } from '../middleware';
import { UserPublicAttributes } from '../typescript/interfaces';

// Utility function to create user response without password
const createUserResponse = (user: any): UserPublicAttributes => {
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

/**
 * @desc    Get all users
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
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;

    // Prevent an admin from deleting themselves
    if (req.user && req.user.id.toString() === userId) {
      return next(new ErrorResponse(400, 'You cannot delete your own administrator account.'));
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorResponse(404, `User not found with id ${userId}`));
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully.'
    });
  }
);

/**
 * @desc    Promote a user to admin
 * @route   PUT /api/users/:id/promote
 * @access  Private (Admin)
 */
export const promoteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new ErrorResponse(404, `User not found with id ${req.params.id}`));
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User promoted to administrator.',
      data: createUserResponse(user)
    });
  }
);

/**
 * @desc    Demote an admin to user
 * @route   PUT /api/users/:id/demote
 * @access  Private (Admin)
 */
export const demoteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;

    // Prevent an admin from demoting themselves
    if (req.user && req.user.id.toString() === userId) {
      return next(new ErrorResponse(400, 'You cannot change your own administrator role.'));
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorResponse(404, `User not found with id ${userId}`));
    }

    user.role = 'user';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Administrator demoted to user.',
      data: createUserResponse(user)
    });
  }
); 