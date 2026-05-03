require('dotenv').config();

console.log('Testing imports...');

try {
  console.log('1. Loading models...');
  const { User, UIGeneration } = require('./models');
  console.log('✅ Models loaded:', { User: !!User, UIGeneration: !!UIGeneration });

  console.log('2. Loading authController...');
  const authController = require('./controllers/authController');
  console.log('✅ AuthController loaded');
  console.log('   Methods:', Object.keys(authController));

  console.log('3. Loading authRoutes...');
  const authRoutes = require('./routes/auth');
  console.log('✅ AuthRoutes loaded');

  console.log('\n✅ All imports successful!');
  process.exit(0);
} catch (error) {
  console.error('❌ Import error:', error.message);
  console.error(error.stack);
  process.exit(1);
}