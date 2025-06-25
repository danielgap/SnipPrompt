/**
 * Interfaz que representa los datos públicos de un usuario.
 * Coincide con la `UserPublicAttributes` del backend.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt: string; // Las fechas llegan como strings en JSON
  updatedAt: string;
} 