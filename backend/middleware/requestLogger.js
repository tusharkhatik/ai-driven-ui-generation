const Logger = require('../config/logger');

const logger = new Logger('Request');

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log request
  logger.debug(`Incoming ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    user: req.user?.id,
    headers: {
      'user-agent': req.headers['user-agent'],
      'content-type': req.headers['content-type']
    }
  });

  // Log response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    logger.debug(`Outgoing ${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      size: `${Buffer.byteLength(data, 'utf8')} bytes`
    });

    return originalSend.call(this, data);
  };

  next();
};

module.exports = requestLogger;