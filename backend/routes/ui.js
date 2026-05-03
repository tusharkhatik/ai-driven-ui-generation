const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Logger = require('../config/logger');
const { UIGeneration } = require('../models');
const { generateUICode } = require('../config/gemini'); // ✅ IMPORT GEMINI

const logger = new Logger('UIRoutes');

// ======================
// Generate UI (MAIN FIX)
// ======================
router.post('/generate', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { promptText } = req.body;

    if (!userId) {
      logger.warn('Generate UI request without userId');
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

    logger.info('🤖 Generating UI with Gemini', {
      userId,
      prompt: promptText.substring(0, 50)
    });

    let html = '', css = '', js = '';

    try {
      // ✅ CALL GEMINI
      const result = await generateUICode(promptText);
      html = result.html;
      css = result.css;
      js = result.js;

      // ⚠️ fallback if Gemini gives empty output
      if (!html) throw new Error('Empty AI response');

    } catch (aiError) {
      logger.error('⚠️ Gemini failed, using fallback mock', {
        error: aiError.message
      });

      // ✅ FALLBACK (so app never breaks)
      html = generateMockHTML(promptText);
      css = generateMockCSS();
      js = generateMockJS();
    }

    // Save to DB
    const uiGeneration = await UIGeneration.create({
      userId,
      prompt: promptText,
      html,
      css,
      js
    });

    logger.info('✅ UI generated successfully', {
      userId,
      uiId: uiGeneration.id
    });

    return res.status(201).json({
      success: true,
      message: 'UI generated successfully',
      data: {
        id: uiGeneration.id,
        html,
        css,
        js
      }
    });

  } catch (error) {
    logger.error('Generate UI error', { error: error.message });
    next(error);
  }
});

// ======================
// Get all UIs
// ======================
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const uis = await UIGeneration.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    return res.status(200).json({
      success: true,
      data: uis
    });

  } catch (error) {
    logger.error('Get UIs error', { error: error.message });
    next(error);
  }
});

// ======================
// Get single UI
// ======================
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

    const ui = await UIGeneration.findOne({
      where: { id, userId }
    });

    if (!ui) {
      return res.status(404).json({
        success: false,
        message: 'UI not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: ui
    });

  } catch (error) {
    logger.error('Get UI error', { error: error.message });
    next(error);
  }
});

// ======================
// Delete UI
// ======================
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

    const ui = await UIGeneration.findOne({
      where: { id, userId }
    });

    if (!ui) {
      return res.status(404).json({
        success: false,
        message: 'UI not found'
      });
    }

    await ui.destroy();

    return res.status(200).json({
      success: true,
      message: 'UI deleted successfully'
    });

  } catch (error) {
    logger.error('Delete UI error', { error: error.message });
    next(error);
  }
});

// ======================
// FALLBACK MOCK (SAFE)
// ======================
function generateMockHTML(prompt) {
  return `<div class="container">
  <h1>Generated UI</h1>
  <p>${prompt}</p>
  <button class="btn">Click Me</button>
</div>`;
}

function generateMockCSS() {
  return `.container {
  text-align: center;
  padding: 20px;
}
.btn {
  background: #667eea;
  color: white;
  padding: 10px;
  border: none;
}`;
}

function generateMockJS() {
  return `document.querySelector('.btn')?.addEventListener('click', () => {
  alert('Clicked!');
});`;
}

module.exports = router;