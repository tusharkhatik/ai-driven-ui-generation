const pool = require('../config/database');
const Logger = require('../config/logger');
const logger = new Logger('Troubleshoot');

/**
 * Comprehensive troubleshooting guide
 */
const troubleshoot = async () => {
  console.log('\n🔍 Running Troubleshooting Checks...\n');

  // 1. Check Node version
  console.log('1️⃣  Node.js Version:');
  console.log(`   Version: ${process.version}`);
  console.log(`   Status: ✅ OK\n`);

  // 2. Check environment variables
  console.log('2️⃣  Environment Variables:');
  const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'DB_HOST',
    'DB_USER',
    'DB_NAME',
    'JWT_SECRET',
    'GEMINI_API_KEY'
  ];

  let envStatus = true;
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];
    const status = value ? '✅' : '❌';
    console.log(`   ${status} ${envVar}: ${value ? 'Set' : 'Missing'}`);
    if (!value && envVar !== 'GEMINI_API_KEY') {
      envStatus = false;
    }
  }
  console.log();

  // 3. Check database connection
  console.log('3️⃣  Database Connection:');
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('SELECT NOW() as current_time');
    console.log(`   ✅ Connected to ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`   ✅ Database: ${process.env.DB_NAME}`);
    console.log(`   ✅ Current Time: ${result[0].current_time}`);
    connection.release();
  } catch (error) {
    console.log(`   ❌ Connection Failed: ${error.message}`);
    console.log(`   Error Code: ${error.code}`);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('   💡 Tip: MySQL server might be down. Check with: mysql -u root -p');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('   💡 Tip: Check DB_USER and DB_PASSWORD in .env');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('   💡 Tip: Database does not exist. Run: mysql < database/schema.sql');
    }
  }
  console.log();

  // 4. Check database tables
  console.log('4️⃣  Database Tables:');
  try {
    const connection = await pool.getConnection();
    const [tables] = await connection.query(
      'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?',
      [process.env.DB_NAME]
    );
    const requiredTables = ['users', 'prompts', 'generated_ui', 'favorites'];
    for (const table of requiredTables) {
      const exists = tables.find(t => t.TABLE_NAME === table);
      console.log(`   ${exists ? '✅' : '❌'} ${table}`);
    }
    connection.release();
  } catch (error) {
    console.log(`   ❌ Error checking tables: ${error.message}`);
  }
  console.log();

  // 5. Check required npm packages
  console.log('5️⃣  Required Packages:');
  const packages = ['express', 'mysql2', 'dotenv', 'jsonwebtoken', 'bcryptjs'];
  for (const pkg of packages) {
    try {
      require.resolve(pkg);
      console.log(`   ✅ ${pkg}`);
    } catch {
      console.log(`   ❌ ${pkg} - Install with: npm install ${pkg}`);
    }
  }
  console.log();

  // 6. Check file structure
  console.log('6️⃣  Required Files:');
  const fs = require('fs');
  const path = require('path');
  const requiredFiles = [
    'config/database.js',
    'config/logger.js',
    'middleware/auth.js',
    'middleware/errorHandler.js',
    'models/User.js',
    'models/Prompt.js',
    'models/GeneratedUI.js',
    'controllers/authController.js',
    'controllers/uiController.js',
    'routes/auth.js',
    'utils/jwt.js',
    'utils/validators.js',
    '.env'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  }
  console.log();

  console.log('✨ Troubleshooting Complete!\n');
};

// Run if called directly
if (require.main === module) {
  troubleshoot().catch(error => {
    logger.error('Troubleshooting failed', { error: error.message });
    process.exit(1);
  });
}

module.exports = troubleshoot;