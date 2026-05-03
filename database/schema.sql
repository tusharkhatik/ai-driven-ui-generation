-- Create database
CREATE DATABASE IF NOT EXISTS ai_ui_generator;

-- Create user
CREATE USER IF NOT EXISTS 'ai_user'@'localhost' IDENTIFIED BY 'ai_password_123';

-- Grant privileges
GRANT ALL PRIVILEGES ON ai_ui_generator.* TO 'ai_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Use database
USE ai_ui_generator;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Prompts Table
CREATE TABLE IF NOT EXISTS prompts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  prompt_text LONGTEXT NOT NULL,
  ui_type VARCHAR(50) DEFAULT 'generic',
  design_preference VARCHAR(50) DEFAULT 'modern',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_ui_type (ui_type)
);

-- Generated UI Table
CREATE TABLE IF NOT EXISTS generated_ui (
  id INT PRIMARY KEY AUTO_INCREMENT,
  prompt_id INT NOT NULL,
  html_code LONGTEXT NOT NULL,
  css_code LONGTEXT,
  js_code LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
  INDEX idx_prompt_id (prompt_id),
  INDEX idx_created_at (created_at)
);

-- UI Variations Table
CREATE TABLE IF NOT EXISTS ui_variations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  original_ui_id INT NOT NULL,
  html_code LONGTEXT NOT NULL,
  css_code LONGTEXT,
  js_code LONGTEXT,
  variation_number INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (original_ui_id) REFERENCES generated_ui(id) ON DELETE CASCADE,
  INDEX idx_original_ui_id (original_ui_id)
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  ui_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (ui_id) REFERENCES generated_ui(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, ui_id),
  INDEX idx_user_id (user_id)
);

-- Activity Log Table
CREATE TABLE IF NOT EXISTS activity_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id INT,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- Show confirmation
SELECT 'Database setup complete!' as Status;
SELECT DATABASE() as 'Current Database';
SHOW TABLES;