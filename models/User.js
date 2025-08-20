import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.js';

export class User extends Model {}

User.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: true // puede ser null por compatibilidad
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario','supervisor'),
    allowNull: false,
    defaultValue: 'usuario'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true // incluye createdAt y updatedAt automáticamente
});
