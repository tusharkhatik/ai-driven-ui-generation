const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE'
};

const LOG_COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[35m', // Magenta
  TRACE: '\x1b[37m', // White
  RESET: '\x1b[0m'   // Reset
};

class Logger {
  constructor(name) {
    this.name = name;
    this.logFile = path.join(logsDir, 'app.log');
    this.errorFile = path.join(logsDir, 'error.log');
    this.currentLevel = process.env.LOG_LEVEL || 'INFO';
  }

  /**
   * Log with timestamp and level
   */
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      name: this.name,
      message,
      ...(data && { data })
    };

    const logString = `[${timestamp}] [${level}] [${this.name}] ${message}`;
    const logObject = JSON.stringify(logEntry);

    // Console output with colors
    if (this.shouldLog(level)) {
      const color = LOG_COLORS[level] || '';
      console.log(
        `${color}${logString}${LOG_COLORS.RESET}`,
        data ? '\n' + JSON.stringify(data, null, 2) : ''
      );
    }

    // File output
    this.writeToFile(this.logFile, logObject);

    // Error file for errors
    if (level === 'ERROR' || level === 'WARN') {
      this.writeToFile(this.errorFile, logObject);
    }
  }

  /**
   * Check if should log based on level
   */
  shouldLog(level) {
    const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];
    const currentIndex = levels.indexOf(this.currentLevel);
    const levelIndex = levels.indexOf(level);
    return levelIndex <= currentIndex;
  }

  /**
   * Write to file
   */
  writeToFile(filepath, content) {
    try {
      fs.appendFileSync(filepath, content + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write log file:', error);
    }
  }

  // Convenience methods
  error(message, data) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }

  warn(message, data) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  info(message, data) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  trace(message, data) {
    this.log(LOG_LEVELS.TRACE, message, data);
  }
}

module.exports = Logger;