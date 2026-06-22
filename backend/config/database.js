const { Sequelize } = require('sequelize');
const Logger = require('./logger');

const logger = new Logger('Database');

console.log('Initializing Sequelize connection...');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'ai_ui_generator',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

console.log('Sequelize instance created:', !!sequelize);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection successful');
    console.log('✅ Database connected successfully');
    
    // Sync models
    await sequelize.sync({ alter: true });
    logger.info('Models synced successfully');
    
    return true;
  } catch (error) {
    logger.error('Database connection failed', { error: error.message });
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  Sequelize
};