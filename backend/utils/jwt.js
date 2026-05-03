const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {object} payload - Token payload
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - JWT token
 */
const generateToken = (payload, expiresIn = '7d') => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    throw new Error('Failed to generate token');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object} - Decoded token
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};

/**
 * Decode JWT token without verification (for debugging)
 * @param {string} token - JWT token
 * @returns {object} - Decoded token
 */
const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    throw new Error('Failed to decode token');
  }
};

/**
 * Refresh token
 * @param {string} token - Expired token
 * @returns {string} - New token
 */
const refreshToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) {
      throw new Error('Invalid token structure');
    }
    return generateToken({ 
      id: decoded.id, 
      email: decoded.email,
      username: decoded.username 
    });
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired, false otherwise
 */
const isTokenExpired = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return false;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return true;
    }
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  refreshToken,
  isTokenExpired
};