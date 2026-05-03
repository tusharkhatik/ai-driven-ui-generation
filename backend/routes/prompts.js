const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Logger = require('../config/logger');
const { Prompt } = require('../models');

const logger = new Logger('PromptRoutes');

// Get all user prompts
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const prompts = await Prompt.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    logger.info('Prompts fetched', { userId, count: prompts.length });

    return res.status(200).json({
      success: true,
      data: prompts
    });
  } catch (error) {
    logger.error('Get prompts error', { error: error.message });
    next(error);
  }
});

// Get single prompt
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const prompt = await Prompt.findOne({
      where: { id, userId }
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: prompt
    });
  } catch (error) {
    logger.error('Get prompt error', { error: error.message });
    next(error);
  }
});

// Create prompt
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { promptText } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    if (!promptText || promptText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt text is required'
      });
    }

    const prompt = await Prompt.create({
      userId,
      promptText
    });

    logger.info('Prompt created', { userId, promptId: prompt.id });

    return res.status(201).json({
      success: true,
      message: 'Prompt created successfully',
      data: prompt
    });
  } catch (error) {
    logger.error('Create prompt error', { error: error.message });
    next(error);
  }
});

// Update prompt
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { promptText } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const prompt = await Prompt.findOne({
      where: { id, userId }
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found'
      });
    }

    if (promptText) {
      prompt.promptText = promptText;
    }

    await prompt.save();

    logger.info('Prompt updated', { userId, promptId: id });

    return res.status(200).json({
      success: true,
      message: 'Prompt updated successfully',
      data: prompt
    });
  } catch (error) {
    logger.error('Update prompt error', { error: error.message });
    next(error);
  }
});

// Delete prompt
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const prompt = await Prompt.findOne({
      where: { id, userId }
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found'
      });
    }

    await prompt.destroy();

    logger.info('Prompt deleted', { userId, promptId: id });

    return res.status(200).json({
      success: true,
      message: 'Prompt deleted successfully'
    });
  } catch (error) {
    logger.error('Delete prompt error', { error: error.message });
    next(error);
  }
});

module.exports = router;