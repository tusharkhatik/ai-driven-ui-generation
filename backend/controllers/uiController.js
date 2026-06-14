const { GoogleGenerativeAI } = require('@google/generative-ai');
const Logger = require('../config/logger');
const { UIGeneration } = require('../models');
const CustomUIGenerator = require('./customUIGenerator');

const logger = new Logger('UIController');

const uiController = {
  generateUI: async (req, res) => {
    try {
      const { promptText } = req.body;
      const userId = req.user?.id;

      // ========================================================================
      // STEP 1: VALIDATE INPUT
      // ========================================================================
      if (!promptText || promptText.trim().length === 0) {
        logger.warn('Empty prompt received');
        return res.status(400).json({
          success: false,
          message: 'Prompt is required'
        });
      }

      if (promptText.length > 2000) {
        return res.status(400).json({
          success: false,
          message: 'Prompt is too long (max 2000 characters)'
        });
      }

      logger.info('🔄 Starting UI Generation', { prompt: promptText.substring(0, 50) });

      // ========================================================================
      // STEP 2: TRY GEMINI API FIRST (Primary)
      // ========================================================================
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (apiKey) {
        try {
          logger.info('🚀 Attempting Gemini API generation...');

          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

          const enhancedPrompt = `You are an expert web UI/UX designer. Generate a MODERN, UNIQUE, and BEAUTIFUL HTML/CSS/JavaScript UI based on this EXACT requirement:

PROMPT: "${promptText}"

IMPORTANT INSTRUCTIONS:
1. Return ONLY valid JSON - NO markdown, NO code blocks, NO explanations
2. Use this exact JSON structure:
{
  "html": "<html code>",
  "css": "<css code>",
  "js": "<javascript code>"
}

3. DESIGN REQUIREMENTS:
   - Make it VISUALLY STUNNING with gradients and animations
   - Use modern design principles (spacing, typography, colors)
   - Include emojis as icons (📱, 🎯, ⭐, etc.)
   - Add smooth transitions and hover effects
   - Make it RESPONSIVE for mobile/tablet/desktop
   - Use CSS Grid and Flexbox for layouts
   - Include proper semantic HTML5

4. COMPONENT GUIDELINES:
   - If user asks for "dashboard" → Multi-column with sidebar, cards, tables
   - If user asks for "landing page" → Hero banner, feature cards, CTA buttons
   - If user asks for "product store" → Navigation, product grid, prices, cart
   - If user asks for "form" → Professional form fields with validation styling
   - If user asks for "social feed" → Posts, comments, likes, user profiles
   - For ANY prompt → Generate appropriate layout + components

5. STYLING REQUIREMENTS:
   - Use vibrant color gradients (NOT flat colors)
   - Include shadow effects for depth
   - Add border-radius for modern look
   - Use professional fonts
   - Ensure at least 1.6 line-height
   - Add transition effects on all interactive elements

6. JavaScript MUST:
   - Add button click handlers
   - Form submission handling
   - Interactive effects
   - Console logging for debugging

DO NOT generate the same generic landing page. Make it UNIQUE based on the prompt.
Return ONLY the JSON object.`;

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 35000);

          const result = await model.generateContent(enhancedPrompt);
          clearTimeout(timeout);

          if (!result || !result.response) {
            throw new Error('No response from Gemini API');
          }

          const responseText = result.response.text();
          logger.info('✅ Gemini response received', { length: responseText.length });

          // Parse JSON from response
          let parsedResponse;
          try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            
            if (!jsonMatch) {
              throw new Error('No JSON found in response');
            }

            parsedResponse = JSON.parse(jsonMatch[0]);

            if (!parsedResponse.html) {
              throw new Error('Missing HTML in parsed response');
            }

            logger.info('✅ Successfully parsed Gemini response');

            // ================================================================
            // SUCCESS: Use Gemini API response
            // ================================================================
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated UI</title>
  <style>
    ${parsedResponse.css}
  </style>
</head>
<body>
  ${parsedResponse.html}
  <script>
    ${parsedResponse.js}
  </script>
</body>
</html>`;

            const uiData = {
              html: html,
              css: parsedResponse.css || '',
              js: parsedResponse.js || '',
              source: 'gemini-api',
              timestamp: new Date().toISOString()
            };

            // Save to database
            if (userId) {
              try {
                await UIGeneration.create({
                  userId,
                  prompt: promptText,
                  html: uiData.html,
                  css: uiData.css,
                  js: uiData.js,
                  source: 'gemini-api'
                });
              } catch (dbError) {
                logger.error('Database save error (non-critical)', { error: dbError.message });
              }
            }

            return res.status(200).json({
              success: true,
              message: 'UI generated successfully using Gemini API',
              data: uiData,
              source: 'gemini-api'
            });

          } catch (parseError) {
            logger.warn('⚠️ Failed to parse Gemini response, using fallback generator', {
              error: parseError.message
            });
            // Continue to fallback
          }

        } catch (apiError) {
          logger.warn('⚠️ Gemini API failed, using fallback generator', {
            error: apiError.message
          });
          // Continue to fallback
        }
      } else {
        logger.warn('⚠️ GEMINI_API_KEY not configured, using fallback generator');
      }

      // ========================================================================
      // STEP 3: USE CUSTOM GENERATOR AS FALLBACK
      // ========================================================================
      logger.info('🎨 Generating UI with custom generator...');

      const customUIResult = CustomUIGenerator.generate(promptText);

      if (!customUIResult.success) {
        throw new Error('Custom generator failed');
      }

      logger.info('✅ Custom generator completed successfully');

      // Save to database
      if (userId) {
        try {
          await UIGeneration.create({
            userId,
            prompt: promptText,
            html: customUIResult.html,
            css: customUIResult.css,
            js: customUIResult.js,
            source: 'custom-generator'
          });
        } catch (dbError) {
          logger.error('Database save error (non-critical)', { error: dbError.message });
        }
      }

      return res.status(200).json({
        success: true,
        message: 'UI generated successfully using custom generator',
        data: {
          html: customUIResult.html,
          css: customUIResult.css,
          js: customUIResult.js,
          source: 'custom-generator',
          analysis: customUIResult.analysis,
          colors: customUIResult.colors,
          timestamp: customUIResult.generated_at
        },
        source: 'custom-generator'
      });

    } catch (error) {
      logger.error('❌ UI Generation failed', {
        error: error.message,
        stack: error.stack
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to generate UI',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  },

  /**
   * Get UI generation statistics
   */
  getUserStats: async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const stats = await UIGeneration.findAll({
        where: { userId },
        raw: true
      });

      const geminiCount = stats.filter(s => s.source === 'gemini-api').length;
      const generatorCount = stats.filter(s => s.source === 'custom-generator').length;

      return res.status(200).json({
        success: true,
        totalGenerated: stats.length,
        generatedByGeminiAPI: geminiCount,
        generatedByCustomGenerator: generatorCount,
        lastGenerated: stats[0]?.createdAt || null
      });

    } catch (error) {
      logger.error('Error getting stats', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Failed to get statistics'
      });
    }
  },

  /**
   * Get UI generation history
   */
  getHistory: async (req, res) => {
    try {
      const userId = req.user?.id;
      const limit = req.query.limit || 10;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const history = await UIGeneration.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        attributes: ['id', 'prompt', 'source', 'createdAt']
      });

      return res.status(200).json({
        success: true,
        history: history
      });

    } catch (error) {
      logger.error('Error getting history', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Failed to get history'
      });
    }
  }
};

module.exports = uiController;
