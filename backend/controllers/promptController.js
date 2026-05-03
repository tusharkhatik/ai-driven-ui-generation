const Prompt = require('../models/Prompt');
const { validatePrompt } = require('../utils/validators');

const createPrompt = async (req, res, next) => {
  try {
    const { promptText, uiType = 'generic', designPreference = 'modern' } = req.body;
    const userId = req.user.id;

    // Validate prompt
    const validatedPrompt = validatePrompt(promptText);

    const prompt = await Prompt.create({
      userId,
      promptText: validatedPrompt,
      uiType,
      designPreference
    });

    res.status(201).json({
      success: true,
      data: prompt
    });
  } catch (error) {
    next(error);
  }
};

const getPrompts = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const userId = req.user.id;

    const result = await Prompt.getUserPrompts(userId, parseInt(limit), parseInt(offset));

    res.json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        limit: result.limit,
        offset: result.offset
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPromptById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    // Verify ownership
    if (prompt.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      data: prompt
    });
  } catch (error) {
    next(error);
  }
};

const updatePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { promptText, uiType, designPreference } = req.body;

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    if (prompt.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await Prompt.update(id, {
      promptText,
      uiType,
      designPreference
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deletePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    if (prompt.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Prompt.delete(id);

    res.json({
      success: true,
      message: 'Prompt deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const searchPrompts = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const userId = req.user.id;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const prompts = await Prompt.search(userId, keyword);

    res.json({
      success: true,
      data: prompts
    });
  } catch (error) {
    next(error);
  }
};

const getStatistics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await Prompt.getStatistics(userId);
    const popularTypes = await Prompt.getPopularUITypes(userId);

    res.json({
      success: true,
      data: {
        ...stats,
        popularUITypes: popularTypes
      }
    });
  } catch (error) {
    next(error);
  }
};

const getRecentPrompts = async (req, res, next) => {
  try {
    const { days = 7, limit = 10 } = req.query;
    const userId = req.user.id;

    const prompts = await Prompt.getRecentPrompts(userId, parseInt(days), parseInt(limit));

    res.json({
      success: true,
      data: prompts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  searchPrompts,
  getStatistics,
  getRecentPrompts
};