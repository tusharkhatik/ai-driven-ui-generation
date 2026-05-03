console.log('🚀 Starting simple server...\n');

require('dotenv').config();

// 1. Load modules
console.log('1️⃣ Loading modules...');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
console.log('✅ Express modules loaded\n');

// 2. Create app
console.log('2️⃣ Creating Express app...');
const app = express();
console.log('✅ App created\n');

// 3. Use middleware
console.log('3️⃣ Adding middleware...');
app.use(helmet());
app.use(cors());
app.use(express.json());
console.log('✅ Middleware added\n');

// 4. Simple route
console.log('4️⃣ Adding routes...');
app.get('/api/health', (req, res) => {
  res.json({ status: 'running', time: new Date().toISOString() });
});
console.log('✅ Routes added\n');

// 5. Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 6. Start server
console.log('5️⃣ Starting server...');
const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}\n`);
    console.log('Test: http://localhost:5000/api/health\n');
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}