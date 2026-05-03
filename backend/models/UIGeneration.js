const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UIGeneration = sequelize.define('UIGeneration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  prompt: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  html: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  css: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  js: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  regenerationCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  theme: {
    type: DataTypes.STRING(50),
    defaultValue: 'light'
  }
}, {
  timestamps: true,
  tableName: 'ui_generations',
  indexes: [
    { fields: ['userId'] },
    { fields: ['userId', 'createdAt'] },
    { fields: ['isFavorite'] }
  ]
});

module.exports = UIGeneration;