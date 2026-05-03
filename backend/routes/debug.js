const express = require('express');
const router = express.Router();
const Logger = require('../config/logger');

const logger = new Logger('DebugRoutes');

// Test endpoint
router.get('/test', (req, res) => {
  logger.info('Test endpoint called');
  res.json({
    success: true,
    message: 'Server is working',
    timestamp: new Date().toISOString(),
    env: {
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT
    }
  });
});

// Check API key
router.get('/check-config', (req, res) => {
  const checks = {
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    geminiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
    hasJwtSecret: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    corsOrigins: ['http://localhost:3000', 'http://localhost:5173']
  };

  res.json({
    success: true,
    checks
  });
});

module.exports = router;