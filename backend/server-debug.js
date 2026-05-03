console.log('🚀 Starting server...');

require('dotenv').config();
console.log('✅ .env loaded');

const express = require('express');
console.log('✅ Express loaded');

const cors = require('cors');
console.log('✅ CORS loaded');

const helmet = require('helmet');
console.log('✅ Helmet loaded');

const Logger = require('./config/logger');
console.log('✅ Logger loaded');

const logger = new Logger('Server');
logger.info('Logger initialized');

console.log('Loading database...');
const { testConnection } = require('./config/database');
console.log('✅ Database loaded');

console.log('Loading middleware...');
const { errorHandler } = require('./middleware/errorHandler');
console.log('✅ ErrorHandler loaded');

const requestLogger = require('./middleware/requestLogger');
console.log('✅ RequestLogger loaded');

console.log('Loading routes...');
const authRoutes = require('./routes/auth');
console.log('✅ Auth routes loaded');

const promptRoutes = require('./routes/prompts');
console.log('✅ Prompt routes loaded');

const uiRoutes = require('./routes/ui');
console.log('✅ UI routes loaded');

console.log('Creating Express app...');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/ui', uiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'running', version: '1.0.0' });
});

app.use(errorHandler);

console.log('Testing database connection...');
testConnection().then(connected => {
  if (!connected) {
    console.error('❌ Database connection failed');
    process.exit(1);
  }

  console.log('✅ Database connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🎉 Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});