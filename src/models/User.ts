import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { User, UserCreationAttributes } from '../typescript/interfaces';

const { INTEGER, STRING, DATE, BOOLEAN } = DataTypes;

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {}

export const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
        notEmpty: true
      }
    },
    email: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
        notEmpty: true
      }
    },
    firstName: {
      type: STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50]
      }
    },
    lastName: {
      type: STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50]
      }
    },
    role: {
      type: STRING(20),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'admin']]
      }
    },
    isActive: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
); 