const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Logger = require('./config/logger');
const { sequelize } = require('./config/database');
const { User } = require('./models');

const app = express();
const logger = new Logger('Server');

// CORS configuration - more explicit
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ui', require('./routes/ui'));
app.use('/api/prompts', require('./routes/prompts'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('Initializing Sequelize connection...');
    await sequelize.authenticate();
    console.log('✅ Sequelize authenticated');

    console.log('Loading models...');
    const models = require('./models');
    console.log('✅ Models loaded');

    // Sync database
    await sequelize.sync({ alter: false });
    console.log('✅ Database synced');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server started on http://localhost:${PORT}`);
      console.log(`✅ CORS enabled for: http://localhost:3000`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

startServer();

module.exports = app;