const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Logger = require('../config/logger');
const { User, UIGeneration } = require('../models');

const logger = new Logger('AuthController');

const authController = {
  // Register user
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, and password are required'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters'
        });
      }

      const existingUser = await User.findOne({
        where: { email }
      });

      if (existingUser) {
        logger.warn('Registration attempt with existing email', { email });
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      const existingUsername = await User.findOne({
        where: { username }
      });

      if (existingUsername) {
        logger.warn('Registration attempt with existing username', { username });
        return res.status(400).json({
          success: false,
          message: 'Username already taken'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      logger.info('User registered successfully', { userId: user.id, email });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (error) {
      logger.error('Registration error', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const user = await User.findOne({
        where: { email }
      });

      if (!user) {
        logger.warn('Login attempt with non-existent email', { email });
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        logger.warn('Login attempt with wrong password', { email });
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '7d' }
      );

      logger.info('User logged in successfully', { userId: user.id });

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
      logger.error('Login error', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        logger.warn('Profile not found', { userId });
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      });

    } catch (error) {
      logger.error('Get profile error', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Failed to get profile'
      });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user?.id;
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

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }
      }

      if (username) user.username = username;
      if (email) user.email = email;

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
  },

  // Get user stats
  getStats: async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        logger.warn('Stats requested without userId');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      logger.info('Fetching stats for user', { userId });

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
        message: 'Failed to get stats'
      });
    }
  }
};

console.log('AuthController methods:', Object.keys(authController));

module.exports = authController;