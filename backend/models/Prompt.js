const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Prompt = sequelize.define('Prompt', {
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
  promptText: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  usageCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: true,
  tableName: 'prompts',
  indexes: [
    { fields: ['userId'] },
    { fields: ['userId', 'createdAt'] }
  ]
});

module.exports = Prompt;