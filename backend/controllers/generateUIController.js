const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateUIController = {
  generateUI: async (req, res) => {
    try {
      const { promptText } = req.body;

      if (!promptText) {
        return res.status(400).json({ message: 'Prompt is required' });
      }

      // Initialize Gemini AI
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: 'API key not configured' });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Enhanced prompt for better UI generation
      const enhancedPrompt = `You are an expert web UI designer. Generate HTML, CSS, and JavaScript code for the following requirement:

${promptText}

Return ONLY a valid JSON object with this exact structure (no other text):
{
  "html": "<html structure here>",
  "css": "<css styling here>",
  "js": "<javascript code here>"
}

Requirements:
- HTML should be complete and valid
- CSS should be modern, responsive, and beautiful
- JS should handle any interactions
- Include proper styling for a modern UI
- Make it responsive for mobile, tablet, and desktop
- Use modern CSS features like flexbox and grid
- Include hover effects and transitions`;

      const result = await model.generateContent(enhancedPrompt);
      const response = result.response;
      const text = response.text();

      // Parse JSON from response
      let parsedResponse;
      try {
        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        parsedResponse = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(500).json({ 
          message: 'Failed to parse AI response',
          error: parseError.message 
        });
      }

      // Validate response structure
      if (!parsedResponse.html || !parsedResponse.css) {
        return res.status(500).json({ 
          message: 'Invalid response structure from AI',
          received: parsedResponse 
        });
      }

      return res.status(200).json({
        success: true,
        message: 'UI generated successfully',
        data: {
          html: parsedResponse.html,
          css: parsedResponse.css,
          js: parsedResponse.js || ''
        }
      });

    } catch (error) {
      console.error('Generate UI Error:', error);
      return res.status(500).json({ 
        message: 'Failed to generate UI',
        error: error.message 
      });
    }
  }
};

module.exports = generateUIController;