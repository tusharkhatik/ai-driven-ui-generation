const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

console.log('Loading models...');
console.log('Sequelize instance:', !!sequelize);

if (!sequelize) {
  console.error('ERROR: sequelize is undefined in models/index.js');
  process.exit(1);
}

// Import models from individual files
const User = require('./User');
const UIGeneration = require('./UIGeneration');
const Prompt = require('./Prompt');

// Define associations
User.hasMany(UIGeneration, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
UIGeneration.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Prompt, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Prompt.belongsTo(User, {
  foreignKey: 'userId'
});

console.log('✅ Models loaded successfully');

module.exports = {
  sequelize,
  User,
  UIGeneration,
  Prompt
};