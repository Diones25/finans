import { DataTypes } from 'sequelize';
import db from '../db/conn.js';
import Category from './Category.js';

const Spent = db.define('spent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  val_spent: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Spent.belongsTo(Category, {
  constraints: true,
  foreignKey: {
    name: 'idCategory',
    allowNull: false
  }
});

export default Spent;
