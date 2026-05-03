console.log('🔍 Testing MySQL Connection\n');

require('dotenv').config();

console.log('Environment Variables:');
console.log('  DB_HOST:', process.env.DB_HOST);
console.log('  DB_USER:', process.env.DB_USER);
console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***set***' : '❌ NOT SET');
console.log('  DB_NAME:', process.env.DB_NAME);
console.log('  DB_PORT:', process.env.DB_PORT);
console.log();

const mysql = require('mysql2/promise');

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ai_ui_generator',
  port: process.env.DB_PORT || 3306
};

console.log('Connection Config:');
console.log('  host:', connectionConfig.host);
console.log('  user:', connectionConfig.user);
console.log('  password:', connectionConfig.password ? '***set***' : '❌ EMPTY');
console.log('  database:', connectionConfig.database);
console.log('  port:', connectionConfig.port);
console.log();

async function testConnection() {
  try {
    console.log('🔗 Attempting to connect...');
    
    const connection = await mysql.createConnection(connectionConfig);
    
    console.log('✅ Connected successfully!');
    
    // Test query - fixed SQL syntax
    const [rows] = await connection.execute('SELECT NOW() AS `current_time`');
    console.log('✅ Query executed:', rows[0]);
    
    // Show databases
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('✅ Databases:', databases.map(db => db.Database).join(', '));
    
    // Show tables in ai_ui_generator
    try {
      const [tables] = await connection.execute('SHOW TABLES FROM `ai_ui_generator`');
      console.log('✅ Tables in ai_ui_generator:', tables.map(t => Object.values(t)[0]).join(', '));
    } catch (err) {
      console.log('⚠️  Could not read tables:', err.message);
    }
    
    await connection.end();
    
    console.log('\n🎉 All tests passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('Error Code:', error.code);
    process.exit(1);
  }
}

testConnection();