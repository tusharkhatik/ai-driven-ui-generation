// config/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Logger = require('./logger');

const logger = new Logger('Gemini');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateUICode = async (promptText) => {
  try {
    logger.info('🤖 Generating UI code for prompt:', promptText);

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash'
    });

    const prompt = `You are an expert web developer. Generate clean, modern HTML/CSS/JavaScript code for the following UI:

${promptText}

Return ONLY a JSON object with three fields: "html", "css", and "js". 
The HTML should be complete and self-contained.
The CSS should be embedded in a <style> tag in the HTML.
The JavaScript should be embedded in a <script> tag in the HTML.

Return format (JSON ONLY, no markdown):
{
  "html": "<html>...</html>",
  "css": "/* css code */",
  "js": "// js code"
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('📄 Raw Gemini Response:', text); // ADD THIS TO SEE RAW RESPONSE

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No JSON found in response:', text); // ADD THIS
      throw new Error('Invalid response format from Gemini');
    }

    const generatedCode = JSON.parse(jsonMatch[0]);

    logger.info('✅ UI code generated successfully');

    return {
      html: generatedCode.html || '',
      css: generatedCode.css || '',
      js: generatedCode.js || ''
    };
  } catch (error) {
    console.error('🔴 DETAILED ERROR:', error); // ADD THIS
    console.error('Error message:', error.message); // ADD THIS
    console.error('Error code:', error.code); // ADD THIS
    logger.error('Gemini API Error:', error.message);
    throw new Error('Failed to generate UI code');
  }
};

module.exports = {
  generateUICode
};