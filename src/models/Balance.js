import { DataTypes } from 'sequelize';
import db from '../db/conn.js';
import Category from './Category.js';

const Balance = db.define('balance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  val_balance: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

Balance.belongsTo(Category, {
  constraints: true,
  foreignKey: {
    name: 'idCategory',
    allowNull: false
  }
});

export default Balance