const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user authentication
 */
const authValidationRules = () => [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/)
    .withMessage('Password must contain at least one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

/**
 * Validation rules for login
 */
const loginValidationRules = () => [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Validation rules for prompt input
 */
const promptValidationRules = () => [
  body('promptText')
    .trim()
    .notEmpty()
    .withMessage('Prompt text is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Prompt must be between 10 and 5000 characters'),
  
  body('uiType')
    .optional()
    .isIn(['landing', 'dashboard', 'form', 'portfolio', 'ecommerce', 'other'])
    .withMessage('Invalid UI type'),
  
  body('designPreference')
    .optional()
    .isIn(['modern', 'minimal', 'creative', 'professional', 'casual'])
    .withMessage('Invalid design preference')
];

/**
 * Validation middleware to handle errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Email format validation
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Strong password validation
 */
const isStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const isLongEnough = password.length >= 8;
  
  return hasUpperCase && hasLowerCase && hasNumbers && isLongEnough;
};

/**
 * Validate username format
 */
const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,50}$/;
  return usernameRegex.test(username);
};

/**
 * Validate input length
 */
const isValidLength = (str, min, max) => {
  const length = str.trim().length;
  return length >= min && length <= max;
};

/**
 * Sanitize user input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .substring(0, 5000); // Limit length
};

/**
 * Validate and sanitize prompt
 */
const validatePrompt = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt');
  }
  
  const trimmed = prompt.trim();
  
  if (trimmed.length < 10) {
    throw new Error('Prompt must be at least 10 characters');
  }
  
  if (trimmed.length > 5000) {
    throw new Error('Prompt must not exceed 5000 characters');
  }
  
  return sanitizeInput(trimmed);
};

module.exports = {
  authValidationRules,
  loginValidationRules,
  promptValidationRules,
  validate,
  isValidEmail,
  isStrongPassword,
  isValidUsername,
  isValidLength,
  sanitizeInput,
  validatePrompt
};