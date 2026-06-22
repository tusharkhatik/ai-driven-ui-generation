/**
 * @fileoverview Core category definitions and detection logic.
 */

/**
 * Supported categories frozen to prevent runtime mutations.
 * @readonly
 * @enum {string}
 */
export const CATEGORIES = Object.freeze({
  AI_TOOL: 'AITool',
  FINANCE: 'Finance',
  CRM: 'CRM',
  ECOMMERCE: 'Ecommerce',
  HEALTHCARE: 'Healthcare',
  EDUCATION: 'Education',
  TRAVEL: 'Travel',
  SOCIAL: 'Social',
  PORTFOLIO: 'Portfolio',
  REAL_ESTATE: 'RealEstate',
  FOOD_DELIVERY: 'FoodDelivery'
});

/**
 * Keyword dictionaries for text analysis.
 * @type {Record<string, string[]>}
 */
const CATEGORY_KEYWORDS = Object.freeze({
  [CATEGORIES.AI_TOOL]: ['ai', 'artificial intelligence', 'machine learning', 'chatgpt', 'bot', 'generator', 'prompt', 'llm'],
  [CATEGORIES.FINANCE]: ['bank', 'crypto', 'wallet', 'finance', 'trading', 'stocks', 'budget', 'expense', 'money'],
  [CATEGORIES.CRM]: ['crm', 'customer', 'sales', 'pipeline', 'leads', 'support', 'helpdesk', 'tickets', 'marketing'],
  [CATEGORIES.ECOMMERCE]: ['shop', 'store', 'cart', 'checkout', 'product', 'ecommerce', 'retail', 'marketplace'],
  [CATEGORIES.HEALTHCARE]: ['health', 'doctor', 'patient', 'clinic', 'telemedicine', 'medical', 'hospital', 'fitness'],
  [CATEGORIES.EDUCATION]: ['learn', 'course', 'student', 'school', 'university', 'lms', 'class', 'tutor'],
  [CATEGORIES.TRAVEL]: ['flight', 'hotel', 'booking', 'travel', 'trip', 'itinerary', 'vacation', 'tour'],
  [CATEGORIES.SOCIAL]: ['social', 'network', 'friends', 'feed', 'post', 'chat', 'dating', 'community'],
  [CATEGORIES.PORTFOLIO]: ['portfolio', 'resume', 'cv', 'showcase', 'gallery', 'freelance', 'personal site'],
  [CATEGORIES.REAL_ESTATE]: ['real estate', 'property', 'house', 'apartment', 'rent', 'buy', 'agent', 'broker'],
  [CATEGORIES.FOOD_DELIVERY]: ['food', 'delivery', 'restaurant', 'meal', 'grocery', 'menu', 'order']
});

/**
 * Analyzes user input to determine the closest matching app category using a scoring system.
 * * @param {string} prompt - The raw user input.
 * @returns {string} The matched category (defaults to Portfolio if no strong match).
 */
export const detectCategory = (prompt = '') => {
  if (typeof prompt !== 'string' || !prompt.trim()) return CATEGORIES.PORTFOLIO;
  
  const normalizedPrompt = prompt.toLowerCase();
  
  const scores = Object.entries(CATEGORY_KEYWORDS).map(([category, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      // Use regex word boundaries to avoid partial matches (e.g., "bot" in "bottle")
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = normalizedPrompt.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);
    return { category, score };
  });

  // Find the highest scoring category
  const bestMatch = scores.reduce((max, current) => (current.score > max.score ? current : max), { score: 0, category: CATEGORIES.PORTFOLIO });

  return bestMatch.score > 0 ? bestMatch.category : CATEGORIES.PORTFOLIO;
};