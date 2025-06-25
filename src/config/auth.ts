import { config } from 'dotenv';

// Cargar variables de entorno
config();

export const authConfig = {
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'default_secret_change_in_production_min_32_chars_long',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  
  // Bcrypt Configuration
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
  
  // Rate Limiting Configuration
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  
  // User Configuration
  defaultRole: 'user',
  allowedRoles: ['user', 'admin'] as const
};

// Validar configuración crítica
if (authConfig.jwtSecret === 'default_secret_change_in_production_min_32_chars_long') {
  console.warn('⚠️  WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production!');
}

if (authConfig.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long for security');
}

export type UserRole = typeof authConfig.allowedRoles[number]; 