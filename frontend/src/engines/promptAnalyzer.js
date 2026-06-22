/**
 * @fileoverview Extracts structured metadata (platform, audience, theme, complexity) from raw text.
 */
import { detectCategory } from './categoryDetector.js';

// --- Pure Helper Functions for Extraction ---

const extractPlatform = (text) => {
  if (/(mobile|ios|android|smartphone|phone|app)/.test(text)) return 'mobile';
  if (/(desktop|web|browser|website|portal)/.test(text)) return 'web';
  return 'responsive'; // Safe default
};

const extractAudience = (text) => {
  if (/(b2b|enterprise|business|corporate|wholesale)/.test(text)) return 'B2B';
  if (/(internal|admin|employee|staff|backoffice)/.test(text)) return 'Internal';
  if (/(kids|children|students|youth)/.test(text)) return 'Youth';
  return 'B2C'; 
};

const extractTheme = (text) => {
  if (/(dark mode|dark|night|black)/.test(text)) return 'dark';
  if (/(minimal|clean|simple|whitespace|sleek)/.test(text)) return 'minimalist';
  if (/(playful|colorful|fun|vibrant|bright)/.test(text)) return 'playful';
  if (/(corporate|professional|enterprise|formal)/.test(text)) return 'corporate';
  return 'light'; 
};

const extractComplexity = (text) => {
  if (/(dashboard|analytics|admin|complex|advanced|charts|reports)/.test(text)) return 'high';
  if (/(landing page|simple|basic|single page|mvp|static)/.test(text)) return 'low';
  return 'medium'; 
};

/**
 * Parses raw text into a structured configuration object.
 * * @param {string} prompt - The raw user input.
 * @returns {Object} Extracted configuration metadata.
 */
export const analyzePrompt = (prompt = '') => {
  const normalizedText = typeof prompt === 'string' ? prompt.toLowerCase() : '';

  return {
    category: detectCategory(prompt),
    platform: extractPlatform(normalizedText),
    audience: extractAudience(normalizedText),
    theme: extractTheme(normalizedText),
    complexity: extractComplexity(normalizedText),
    originalPrompt: prompt
  };
};