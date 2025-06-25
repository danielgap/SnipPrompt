import { QueryInterface, DataTypes } from 'sequelize';

const { INTEGER, STRING, DATE, BOOLEAN } = DataTypes;

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      firstName: {
        type: STRING(50),
        allowNull: true,
      },
      lastName: {
        type: STRING(50),
        allowNull: true,
      },
      role: {
        type: STRING(20),
        allowNull: false,
        defaultValue: 'user',
      },
      isActive: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
  },
}; 