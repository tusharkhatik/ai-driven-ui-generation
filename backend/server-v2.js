console.log('🚀 Starting server v2 (with Logger)...\n');

require('dotenv').config();

// 1. Load modules
console.log('1️⃣ Loading modules...');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
console.log('✅ Express modules loaded');

// 2. Load logger
console.log('2️⃣ Loading Logger...');
const Logger = require('./config/logger');
const logger = new Logger('Server');
console.log('✅ Logger loaded');

// 3. Load database
console.log('3️⃣ Loading Database...');
const { testConnection } = require('./config/database');
console.log('✅ Database loaded\n');

// 4. Create app
console.log('4️⃣ Creating Express app...');
const app = express();
console.log('✅ App created\n');

// 5. Use middleware
console.log('5️⃣ Adding middleware...');
app.use(helmet());
app.use(cors());
app.use(express.json());
console.log('✅ Middleware added\n');

// 6. Add routes
console.log('6️⃣ Adding routes...');
app.get('/api/health', (req, res) => {
  res.json({ status: 'running', time: new Date().toISOString() });
});
console.log('✅ Routes added\n');

// 7. Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 8. Start server
console.log('7️⃣ Starting server and testing database...\n');
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // Test DB connection
    console.log('Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Database connection failed');
      process.exit(1);
    }
    
    console.log('✅ Database connected\n');

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server started on http://localhost:${PORT}\n`);
      logger.info('Server started', { port: PORT });
    });
  } catch (error) {
    console.error('❌ Failed to start:', error.message);
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

start();