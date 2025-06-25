import { Model } from '.';
import { Optional } from 'sequelize';

export interface User extends Model {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
}

export interface UserCreationAttributes
  extends Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'role' | 'isActive'> {}

export interface UserLoginAttributes {
  usernameOrEmail: string;
  password: string;
}

export interface UserPublicAttributes {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 