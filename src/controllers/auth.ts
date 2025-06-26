import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authConfig } from '../config/auth';
import { ErrorResponse } from '../utils';
import { asyncWrapper } from '../middleware';
import { UserCreationAttributes, UserLoginAttributes, UserPublicAttributes } from '../typescript/interfaces';

// Función utilitaria para crear respuesta de usuario sin password
const createUserResponse = (user: any): UserPublicAttributes => {
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

// Función utilitaria para generar JWT
const generateToken = (userId: number): string => {
  // @ts-ignore - Bypass temporal de TypeScript para resolver conflictos de tipos
  return jwt.sign({ userId }, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn
  });
};

/**
 * @desc    Registrar nuevo usuario
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password, firstName, lastName }: UserCreationAttributes = req.body;

    // Validaciones básicas
    if (!username || !email || !password) {
      return next(new ErrorResponse(400, 'Username, email y password son requeridos'));
    }

    if (password.length < 6) {
      return next(new ErrorResponse(400, 'La contraseña debe tener al menos 6 caracteres'));
    }

    // Comprobar si es el primer usuario para asignarle el rol de admin
    const userCount = await User.count();
    const role = userCount === 0 ? 'admin' : authConfig.defaultRole;

    // Verificar si usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return next(new ErrorResponse(409, 'Username o email ya están en uso'));
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, authConfig.bcryptRounds);

    // Construir objeto de usuario dinámicamente
    const newUser: UserCreationAttributes = {
      username,
      email,
      password: hashedPassword,
      role: role,
      isActive: true,
    };

    if (firstName) {
      newUser.firstName = firstName;
    }
    if (lastName) {
      newUser.lastName = lastName;
    }

    // Crear usuario
    const user = await User.create(newUser);

    // Generar token
    const token = generateToken(user.id);

    // Respuesta sin password
    const userResponse = createUserResponse(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: userResponse,
        token
      }
    });
  }
);

/**
 * @desc    Autenticar usuario
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { usernameOrEmail, password }: UserLoginAttributes = req.body;

    // Validaciones básicas
    if (!usernameOrEmail || !password) {
      return next(new ErrorResponse(400, 'Username/email y password son requeridos'));
    }

    // Buscar usuario por username o email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    });

    if (!user) {
      return next(new ErrorResponse(401, 'Credenciales inválidas'));
    }

    // Verificar si usuario está activo
    if (!user.isActive) {
      return next(new ErrorResponse(401, 'Cuenta desactivada. Contacte al administrador'));
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorResponse(401, 'Credenciales inválidas'));
    }

    // Generar token
    const token = generateToken(user.id);

    // Respuesta sin password
    const userResponse = createUserResponse(user);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: userResponse,
        token
      }
    });
  }
);

/**
 * @desc    Obtener perfil del usuario autenticado
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // El middleware de auth debe añadir userId a req
    const userId = (req as any).userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorResponse(404, 'Usuario no encontrado'));
    }

    const userResponse = createUserResponse(user);

    res.status(200).json({
      success: true,
      data: {
        user: userResponse
      }
    });
  }
);

/**
 * @desc    Logout usuario (opcional - para invalidar token del lado cliente)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // En implementación JWT simple, logout es del lado cliente
    // Se puede implementar blacklist de tokens si es necesario

    res.status(200).json({
      success: true,
      message: 'Logout exitoso'
    });
  }
); 