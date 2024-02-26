import { DataTypes } from 'sequelize';
import db from '../db/conn.js';

const Category = db.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false
  }
});

export default Category;
