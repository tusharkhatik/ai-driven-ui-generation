#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n📋 Backend Setup Checker\n');

const checks = {
  '.env File': () => fs.existsSync('.env'),
  'config/database.js': () => fs.existsSync('config/database.js'),
  'config/logger.js': () => fs.existsSync('config/logger.js'),
  'middleware/auth.js': () => fs.existsSync('middleware/auth.js'),
  'middleware/errorHandler.js': () => fs.existsSync('middleware/errorHandler.js'),
  'models/User.js': () => fs.existsSync('models/User.js'),
  'models/Prompt.js': () => fs.existsSync('models/Prompt.js'),
  'models/GeneratedUI.js': () => fs.existsSync('models/GeneratedUI.js'),
  'controllers/authController.js': () => fs.existsSync('controllers/authController.js'),
  'controllers/uiController.js': () => fs.existsSync('controllers/uiController.js'),
  'controllers/promptController.js': () => fs.existsSync('controllers/promptController.js'),
  'routes/auth.js': () => fs.existsSync('routes/auth.js'),
  'routes/ui.js': () => fs.existsSync('routes/ui.js'),
  'utils/jwt.js': () => fs.existsSync('utils/jwt.js'),
  'utils/validators.js': () => fs.existsSync('utils/validators.js'),
  'utils/aiPromptFormatter.js': () => fs.existsSync('utils/aiPromptFormatter.js'),
  'package.json': () => fs.existsSync('package.json'),
};

let passed = 0;
let failed = 0;

for (const [check, fn] of Object.entries(checks)) {
  const result = fn();
  const status = result ? '✅' : '❌';
  console.log(`${status} ${check}`);
  if (result) passed++;
  else failed++;
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('⚠️  Some files are missing. Please create them.\n');
  process.exit(1);
}

console.log('✨ All files present!\n');