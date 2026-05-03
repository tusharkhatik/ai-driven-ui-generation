const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UIGeneration } = require('../models');
const Logger = require('../config/logger');
const { Op } = require('sequelize');

const router = express.Router();
const logger = new Logger('Auth');

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

/**
 * Middleware to verify JWT token from Authorization header
 * Extracts user ID and adds to req.user
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      logger.warn('No token provided in request');
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_secret_key',
      (err, user) => {
        if (err) {
          logger.warn('Invalid or expired token', { error: err.message });
          return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
          });
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {
    logger.error('Token verification error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('📨 Received signup request');
    console.log('Request body:', req.body);

    const { username, email, password, confirmPassword } = req.body;

    console.log('Extracted fields:', { username, email, password: '***', confirmPassword: '***' });

    // Validation
    if (!username || !email || !password) {
      console.log('❌ Missing fields');
      logger.warn('Missing required fields in signup');
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    if (username.trim().length < 3) {
      console.log('❌ Username too short');
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters'
      });
    }

    if (password.length < 8) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      console.log('❌ Passwords do not match');
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      console.log('❌ User already exists');
      logger.warn(`User already exists: ${email}`);
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    console.log('Creating user...');

    // Create new user
    const newUser = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    console.log('✅ User created:', newUser.id);

    // Create JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    logger.info(`User created successfully: ${email}`);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    logger.error('Signup error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log('📨 Received login request');
    console.log('Request body:', { email: req.body.email, password: '***' });

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      logger.warn('Missing email or password in login');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      logger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      logger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    console.log('✅ User logged in successfully:', email);
    logger.info(`User logged in successfully: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    logger.error('Login error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// ============================================================================
// PROTECTED ROUTES (Require Authentication)
// ============================================================================

/**
 * GET /api/auth/stats
 * Returns user statistics for the authenticated user
 * Authentication: Bearer token required
 */
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      logger.warn('Stats requested without userId');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user ID in token'
      });
    }

    logger.info('Fetching stats for user', { userId });

    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn('Stats requested for non-existent user', { userId });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get UIGeneration stats
    const stats = await UIGeneration.findAll({
      where: { userId },
      raw: true,
      attributes: ['id', 'prompt', 'isFavorite', 'regenerationCount']
    });

    const totalPrompts = stats.length;
    const totalFavorites = stats.filter(s => s.isFavorite).length;
    const totalRegenerated = stats.reduce((sum, s) => sum + (s.regenerationCount || 0), 0);
    const averageLength = totalPrompts > 0
      ? Math.round(
          stats.reduce((sum, s) => sum + (s.prompt ? s.prompt.length : 0), 0) / totalPrompts
        )
      : 0;

    logger.info('Stats fetched successfully', {
      userId,
      totalPrompts,
      totalFavorites,
      totalRegenerated
    });

    return res.status(200).json({
      success: true,
      totalPrompts,
      totalFavorites,
      totalRegenerated,
      averageLength
    });

  } catch (error) {
    logger.error('Get stats error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/auth/profile
 * Returns the authenticated user's profile
 * Authentication: Bearer token required
 */
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'createdAt']
    });

    if (!user) {
      logger.warn('Profile not found', { userId });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.info('Profile fetched', { userId });

    return res.status(200).json({
      success: true,
      user: user.toJSON()
    });

  } catch (error) {
    logger.error('Get profile error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
});

/**
 * PUT /api/auth/profile
 * Updates the authenticated user's profile
 * Authentication: Bearer token required
 */
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { username, email } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      logger.warn('User not found for update', { userId });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Check if email is already taken
      const existingEmail = await User.findOne({
        where: { 
          email: email.toLowerCase(),
          id: { [Op.ne]: userId }
        }
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Update fields
    if (username) user.username = username.trim();
    if (email) user.email = email.toLowerCase().trim();

    await user.save();

    logger.info('User profile updated', { userId });

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    logger.error('Update profile error', { error: error.message });
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

module.exports = router;
