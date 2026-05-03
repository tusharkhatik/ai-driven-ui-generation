const { GoogleGenerativeAI } = require('@google/generative-ai');
const Logger = require('../config/logger');
const { UIGeneration } = require('../models');

const logger = new Logger('UIController');

const uiController = {
  generateUI: async (req, res) => {
    try {
      const { promptText } = req.body;
      const userId = req.user?.id;

      // Validate input
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

      // Check API key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        logger.error('GEMINI_API_KEY not configured');
        return res.status(500).json({
          success: false,
          message: 'API configuration error'
        });
      }

      logger.info('Calling Gemini API', { promptLength: promptText.length, userId });

      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Enhanced prompt for better results
      const enhancedPrompt = `You are an expert web UI designer and developer. Generate modern, beautiful, and responsive HTML, CSS, and JavaScript code based on this requirement:

USER REQUIREMENT: ${promptText}

IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or code blocks. Use this exact structure:
{
  "html": "complete HTML structure here",
  "css": "complete CSS styling here",
  "js": "JavaScript code here (can be empty string if not needed)"
}

GUIDELINES:
1. Generate valid, semantic HTML5
2. Create modern, responsive CSS (mobile-first approach)
3. Use flexbox/grid for layouts
4. Include smooth transitions and hover effects
5. Ensure accessibility (proper colors, contrast, labels)
6. Make it beautiful with modern design principles
7. Include proper spacing and typography
8. Ensure the CSS is scoped and won't conflict
9. Add dark mode consideration if applicable
10. Return empty string "" for JS if no interactivity is needed

Return ONLY the JSON object, nothing else.`;

      // Call Gemini API with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const result = await model.generateContent(enhancedPrompt);
        clearTimeout(timeout);
        
        if (!result || !result.response) {
          logger.error('No response from Gemini API');
          return res.status(500).json({
            success: false,
            message: 'No response from AI service'
          });
        }

        const responseText = result.response.text();
        logger.info('Gemini API response received', { length: responseText.length });

        // Parse JSON response
        let parsedResponse;
        try {
          // Try to extract JSON from the response
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          
          if (!jsonMatch) {
            logger.error('No JSON found in response', { response: responseText.substring(0, 200) });
            return res.status(500).json({
              success: false,
              message: 'Invalid AI response format'
            });
          }

          parsedResponse = JSON.parse(jsonMatch[0]);
          
          logger.info('JSON parsed successfully');
        } catch (parseError) {
          logger.error('Failed to parse JSON', { error: parseError.message });
          return res.status(500).json({
            success: false,
            message: 'Failed to parse AI response'
          });
        }

        // Validate response structure
        if (!parsedResponse.html) {
          logger.error('Missing HTML in response');
          return res.status(500).json({
            success: false,
            message: 'Invalid response from AI'
          });
        }

        const uiData = {
          html: parsedResponse.html || '',
          css: parsedResponse.css || '',
          js: parsedResponse.js || ''
        };

        // Save to database (optional)
        if (userId) {
          try {
            await UIGeneration.create({
              userId,
              prompt: promptText,
              html: uiData.html,
              css: uiData.css,
              js: uiData.js
            });
            logger.info('UI generation saved to database');
          } catch (dbError) {
            logger.error('Failed to save to database', { error: dbError.message });
            // Don't fail the request if DB save fails
          }
        }

        return res.status(200).json({
          success: true,
          message: 'UI generated successfully',
          data: uiData
        });

      } catch (timeoutError) {
        clearTimeout(timeout);
        logger.error('API request timeout');
        return res.status(504).json({
          success: false,
          message: 'Request timeout - Please try again'
        });
      }

    } catch (error) {
      logger.error('Error in generateUI', { 
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

  getUserStats: async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      // Get stats from database
      const stats = await UIGeneration.findAll({
        where: { userId },
        raw: true
      });

      const totalPrompts = stats.length;
      const totalFavorites = stats.filter(s => s.isFavorite).length;
      const totalRegenerated = stats.reduce((sum, s) => sum + (s.regenerationCount || 0), 0);
      const averageLength = totalPrompts > 0
        ? Math.round(stats.reduce((sum, s) => sum + (s.prompt ? s.prompt.length : 0), 0) / totalPrompts)
        : 0;

      return res.status(200).json({
        success: true,
        totalPrompts,
        totalFavorites,
        totalRegenerated,
        averageLength
      });

    } catch (error) {
      logger.error('Error getting user stats', { error: error.message });
      return res.status(500).json({
        success: false,
        message: 'Failed to get stats'
      });
    }
  }
};

module.exports = uiController;