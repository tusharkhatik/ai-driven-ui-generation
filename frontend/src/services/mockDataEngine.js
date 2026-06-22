/**
 * mockDataEngine.js
 * Heuristic mock data generator that converts a free-form prompt into
 * structured mockData suitable for the repo's generators.
 *
 * Usage:
 *   import { buildMockData } from '../services/mockDataEngine.js'
 *   const cfg = buildMockData(prompt)
 *   // cfg => { category, layout, theme, mockData }
 *
 * This is intentionally lightweight and deterministic (uses RNG where helpful).
 */

import PromptAnalyzer from '../engines/promptAnalyzer.js';
import AdvancedRNG from '../engines/rng.js';

const rng = new AdvancedRNG();

/**
 * Safely run prompt analyzer if available.
 */
function analyzePrompt(prompt = '') {
  try {
    if (PromptAnalyzer && typeof PromptAnalyzer.analyze === 'function') {
      return PromptAnalyzer.analyze(prompt);
    }
  } catch (_) {}
  return {};
}

/**
 * Extract a quoted phrase from prompt (e.g., "'Solar Charger'").
 */
function extractQuoted(prompt = '') {
  const m = prompt.match(/["'‘’“”](.+?)["'‘’“”]/);
  return m ? m[1] : null;
}

/**
 * Build a simple theme object for a category.
 */
function themeForCategory(cat) {
  const themes = {
    ecommerce: { primary: '#0ea5e9', secondary: '#06b6d4', bg: '#ffffff', surface: '#f8fafc', text: '#0b1220' },
    saas: { primary: '#2563eb', secondary: '#7c3aed', bg: '#ffffff', surface: '#f8fafc', text: '#111827' },
    portfolio: { primary: '#7c3aed', secondary: '#ef4444', bg: '#ffffff', surface: '#f9fafb', text: '#0b1220' },
    travel: { primary: '#06b6d4', secondary: '#0891b2', bg: '#ffffff', surface: '#f8fafc', text: '#0b1220' },
    creative: { primary: '#ef4444', secondary: '#f59e0b', bg: '#ffffff', surface: '#fff7ed', text: '#0b1220' },
    default: { primary: '#667eea', secondary: '#764ba2', bg: '#ffffff', surface: '#f9fafb', text: '#0b1220' }
  };
  return themes[cat] || themes.default;
}

/**
 * Helper to generate N mock products for ecommerce use.
 */
function generateProducts(seedText = 'Product', count = 8) {
  const base = extractQuoted(seedText) || seedText.split('for').pop()?.trim() || 'Product';
  const products = [];
  for (let i = 0; i < count; i++) {
    const price = (rng.int(10, 300) * 1).toFixed(2);
    products.push({
      id: i + 1,
      title: `${base} ${i + 1}`,
      price,
      excerpt: `High quality ${base} with modern features.`,
      image: '🛍️',
      rating: (rng.int(30, 50) / 10).toFixed(1)
    });
  }
  return products;
}

/**
 * Generate mock messages for chat/aiTool.
 */
function generateMessages(prompt) {
  return [
    { own: false, avatar: '🤖', text: 'Hello! I can help design a UI for you. Tell me more.', time: 'Now' },
    { own: true, text: prompt, time: 'Now' },
    { own: false, avatar: '🤖', text: 'Great — I will prepare an interface based on that.', time: 'Now' }
  ];
}

/**
 * Generate mock projects for portfolio
 */
function generateProjects(seed, count = 6) {
  const title = extractQuoted(seed) || 'My Project';
  const projects = [];
  for (let i = 0; i < count; i++) {
    projects.push({
      id: i + 1,
      title: `${title} ${i + 1}`,
      description: `A brief description for ${title} ${i + 1}.`,
      image: '🖼️',
      tags: rng.pickMultiple(['React', 'Design', 'API', 'UX', 'Animation', 'Mobile'], 3)
    });
  }
  return projects;
}

/**
 * Main builder: returns normalized config
 * { category, layout, theme, mockData }
 */
export function buildMockData(prompt = '') {
  const p = (prompt || '').trim();
  const lower = p.toLowerCase();
  const analysis = analyzePrompt(p) || {};

  // Defaults
  const result = {
    category: 'generic',
    layout: undefined,
    theme: themeForCategory('default'),
    mockData: { prompt: p }
  };

  // Ecommerce heuristics
  if (analysis.isDomain?.ecommerce || /shop|store|product|buy|ecom|checkout/.test(lower)) {
    result.category = 'ecommerce';
    result.layout = 'product-grid';
    result.theme = themeForCategory('ecommerce');
    result.mockData.products = generateProducts(p, 8);
    result.mockData.categories = ['All', 'Featured', 'New'];
    return result;
  }

  // SaaS / dashboard heuristics
  if (analysis.isDomain?.saas || /dashboard|analytics|admin|panel|app|tool/.test(lower)) {
    result.category = 'aiTool';
    result.layout = 'chatApplication';
    result.theme = themeForCategory('saas');
    result.mockData.messages = generateMessages(p);
    result.mockData.widgets = [
      { id: 'w1', title: 'Active Users', value: rng.int(1200, 5400) },
      { id: 'w2', title: 'Revenue', value: `$${rng.int(5, 60)}k` }
    ];
    return result;
  }

  // Image generation requests
  if (/image|illustration|generate image|create image|photo of/.test(lower)) {
    result.category = 'aiTool';
    result.layout = 'imageGenerator';
    result.theme = themeForCategory('creative');
    result.mockData.images = [
      { placeholder: '🎨', prompt: p }
    ];
    return result;
  }

  // Portfolio / personal website
  if (/portfolio|personal website|showcase|resume|cv|designer|developer/.test(lower)) {
    result.category = 'portfolio';
    result.layout = 'portfolio';
    result.theme = themeForCategory('portfolio');
    result.mockData.projects = generateProjects(p, 6);
    result.mockData.profile = { name: extractQuoted(p) || 'John Doe', bio: 'Creative developer.' };
    return result;
  }

  // Travel / booking
  if (/travel|hotel|flight|booking|destination/.test(lower)) {
    result.category = 'travel';
    result.layout = 'travel-marketplace';
    result.theme = themeForCategory('travel');
    result.mockData.destinations = [
      { name: 'Santorini', summary: 'Island escape', image: '🏝️' },
      { name: 'Kyoto', summary: 'Cultural city', image: '🏯' }
    ];
    return result;
  }

  // Resume builder
  if (/resume|cv|curriculum vitae|resume builder/.test(lower)) {
    result.category = 'aiTool';
    result.layout = 'resumeBuilder';
    result.theme = themeForCategory('portfolio');
    const name = extractQuoted(p) || (p.match(/name[:\s]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i) || [])[1] || 'Jane Doe';
    result.mockData.resume = {
      name,
      email: `${name.replace(/\s+/g, '.').toLowerCase()}@example.com`,
      phone: '',
      summary: 'Experienced professional with a passion for technology.'
    };
    return result;
  }

  // Default: chat app / ai tool
  result.category = 'aiTool';
  result.layout = 'chatApplication';
  result.theme = themeForCategory('default');
  result.mockData.messages = generateMessages(p);
  result.mockData.prompt = p;
  return result;
}

export default { buildMockData };
