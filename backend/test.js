console.log('1️⃣ Loading dotenv...');
require('dotenv').config();
console.log('✅ dotenv loaded');

console.log('2️⃣ Loading logger...');
const Logger = require('./config/logger');
console.log('✅ Logger loaded');

console.log('3️⃣ Creating logger instance...');
const logger = new Logger('Test');
console.log('✅ Logger instance created');

console.log('4️⃣ Testing database...');
const db = require('./config/database');
console.log('✅ Database module loaded');

console.log('5️⃣ Environment variables:');
console.log('  DB_HOST:', process.env.DB_HOST);
console.log('  DB_USER:', process.env.DB_USER);
console.log('  DB_NAME:', process.env.DB_NAME);
console.log('  PORT:', process.env.PORT);

console.log('\n✨ All modules loaded successfully!');