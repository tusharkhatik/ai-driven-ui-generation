/**
 * @fileoverview Provides domain-specific application variants based on category.
 */
import { CATEGORIES } from './categoryDetector.js';

/**
 * 5+ Business variants for every supported category.
 * @type {Record<string, string[]>}
 */
const VARIANTS = Object.freeze({
  [CATEGORIES.AI_TOOL]: ['Chatbot Interface', 'Image Generator Studio', 'Data Analysis Copilot', 'Content Writer Dashboard', 'Code Assistant IDE', 'Voice Synthesis App'],
  [CATEGORIES.FINANCE]: ['Retail Banking Dashboard', 'Crypto Trading Terminal', 'Personal Budget Tracker', 'Insurance Claims Portal', 'Wealth Management App', 'Invoice Generator'],
  [CATEGORIES.CRM]: ['Sales Pipeline Manager', 'Customer Support Helpdesk', 'Marketing Automation Hub', 'Lead Generation Funnel', 'Field Service App', 'Partner Portal'],
  [CATEGORIES.ECOMMERCE]: ['B2C Fashion Storefront', 'B2B Wholesale Portal', 'Multi-vendor Marketplace', 'Subscription Box Service', 'Flash Sales App', 'Digital Goods Store'],
  [CATEGORIES.HEALTHCARE]: ['Patient Medical Portal', 'Telemedicine Video App', 'Electronic Health Records (EHR)', 'Pharmacy Delivery', 'Fitness Tracking Dashboard', 'Mental Health Journal'],
  [CATEGORIES.EDUCATION]: ['LMS Student Dashboard', 'Course Catalog & Checkout', 'Interactive Quiz App', 'Tutor Matching Platform', 'Alumni Network Forum', 'Language Learning App'],
  [CATEGORIES.TRAVEL]: ['Flight Booking Engine', 'Hotel Reservation System', 'Trip Itinerary Planner', 'Ride Sharing App', 'Travel Guide Blog', 'Expense Tracker for Travel'],
  [CATEGORIES.SOCIAL]: ['Photo Sharing Feed', 'Microblogging App', 'Professional Networking', 'Dating Application', 'Community Forum', 'Event Discovery App'],
  [CATEGORIES.PORTFOLIO]: ['Creative Agency Showcase', 'Software Developer CV', 'Photography Gallery', 'Freelance Writer Blog', 'Architectural Portfolio', 'Musician Press Kit'],
  [CATEGORIES.REAL_ESTATE]: ['Property Search Portal', 'Agent CRM Dashboard', 'Virtual Tour Platform', 'Mortgage Calculator App', 'Property Management System', 'Commercial Leasing Portal'],
  [CATEGORIES.FOOD_DELIVERY]: ['Restaurant Aggregator', 'Driver Courier App', 'Restaurant POS Admin', 'Grocery Delivery', 'Meal Prep Subscription', 'Corporate Catering']
});

/**
 * Retrieves all available variants for a given category.
 * * @param {string} category - The matched category.
 * @returns {string[]} List of variants.
 */
export const getVariantsForCategory = (category) => {
  return VARIANTS[category] || VARIANTS[CATEGORIES.PORTFOLIO];
};

/**
 * Selects the best specific variant based on keywords in the prompt.
 * * @param {string} category - The detected category.
 * @param {string} prompt - The raw user prompt.
 * @returns {string} The most relevant variant string.
 */
export const matchVariant = (category, prompt = '') => {
  const variants = getVariantsForCategory(category);
  const normalizedPrompt = prompt.toLowerCase();
  
  // Basic heuristic: check if significant words from the variant exist in the prompt
  const matchedVariant = variants.find(variant => {
    const significantWords = variant.toLowerCase().split(' ').filter(word => word.length > 3);
    return significantWords.some(word => normalizedPrompt.includes(word));
  });

  return matchedVariant || variants[0]; // Fallback to the first (most common) variant
};