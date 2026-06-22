// frontend/src/services/buildGeneratorConfig.js
// Convert a free-form user prompt into a generator config (category, layout, style, mockData).
// This is intentionally lightweight and heuristic-based. Replace heuristics with ML/NLP as needed.

import { PromptAnalyzer } from '../engines/promptAnalyzer.js'; // repo analyzer
import { default as themeEngine } from '../engines/themeEngine.js'; // optional engine to get themes

function safeAnalyze(prompt) {
  try {
    return PromptAnalyzer.analyze(prompt);
  } catch {
    return null;
  }
}

function extractQuoted(prompt) {
  const m = prompt.match(/["'‘’“”](.+?)["'‘’“”]/);
  return m ? m[1] : null;
}

export function buildGeneratorConfig(prompt = '') {
  const trimmed = (prompt || '').trim();
  const analysis = safeAnalyze(trimmed) || {};
  const lower = trimmed.toLowerCase();

  // default config
  const config = {
    category: 'generic',
    layout: undefined,
    style: undefined,
    theme: undefined,
    mockData: { prompt: trimmed }
  };

  // Domain based selection
  if (analysis.isDomain?.ecommerce || /shop|product|buy|store|ecom/.test(lower)) {
    config.category = 'ecommerce';
    config.layout = 'product-grid';
    // quick product extraction heuristics:
    const productMatch = extractQuoted(prompt) || (trimmed.split('for').pop() || '').trim();
    const productName = productMatch || 'Product';
    const priceMatch = prompt.match(/\$?(\d{2,5})(?:\.\d{2})?/);
    const price = priceMatch ? Number(priceMatch[1]) : 49;
    const products = [];
    for (let i = 0; i < 8; i++) {
      products.push({
        id: i + 1,
        title: `${productName} ${i + 1}`,
        price,
        excerpt: `High quality ${productName} for modern users.`,
        image: '🛍️'
      });
    }
    config.mockData.products = products;
    config.mockData.categories = ['All', 'Featured', 'Trending'];
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('ecommerce') : { primary: '#0ea5e9' };
    return config;
  }

  if (analysis.isDomain?.saas || /dashboard|analytics|admin|panel|tool|app/.test(lower)) {
    config.category = 'aiTool';
    config.layout = 'app';
    config.mockData.messages = [
      { own: false, avatar: '🤖', text: 'Hello! I can generate the UI for your app.', time: 'Now' },
      { own: true, text: prompt, time: 'Now' }
    ];
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('saas') : { primary: '#2563eb' };
    return config;
  }

  if (/portfolio|personal website|showcase|designer|developer/.test(lower)) {
    config.category = 'portfolio';
    config.layout = 'portfolio';
    config.mockData.projects = [
      { title: extractQuoted(prompt) || 'Project One', description: 'A short description', image: '🖼️' },
      { title: 'Project Two', description: 'Another sample project', image: '🖼️' }
    ];
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('portfolio') : { primary: '#7c3aed' };
    return config;
  }

  if (/travel|booking|hotel|flight|destination/.test(lower)) {
    config.category = 'travel';
    config.layout = 'travel-marketplace';
    config.mockData.destinations = [
      { name: 'Santorini', summary: 'Island escape', image: '🏝️' },
      { name: 'Kyoto', summary: 'Cultural city', image: '🏯' }
    ];
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('travel') : { primary: '#06b6d4' };
    return config;
  }

  if (/image|generate image|create image|picture|illustration/.test(lower)) {
    config.category = 'aiTool';
    config.layout = 'imageGenerator';
    config.mockData.images = [
      { placeholder: '🎨', prompt: prompt }
    ];
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('creative') : { primary: '#ef4444' };
    return config;
  }

  if (/resume|cv|curriculum vitae|resume builder/.test(lower)) {
    config.category = 'aiTool';
    config.layout = 'resumeBuilder';
    // quick resume parsing heuristics
    const name = (prompt.match(/name[: ]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i) || [])[1] || extractQuoted(prompt) || 'John Doe';
    config.mockData.resume = { name, email: `${name.replace(/\s+/g, '.').toLowerCase()}@example.com`, phone: '' };
    return config;
  }

  // fallback: use PromptAnalyzer results
  if (analysis.isDomain?.landing || /landing|homepage|website/.test(lower)) {
    config.category = 'website';
    config.layout = 'landing';
    config.mockData.hero = { title: extractQuoted(prompt) || 'Welcome', subtitle: 'Built with AI' };
    config.theme = themeEngine?.suggestTheme ? themeEngine.suggestTheme('landing') : { primary: '#10b981' };
    return config;
  }

  // default generic: try aiTool chat by default
  config.category = 'aiTool';
  config.layout = 'chatApplication';
  config.mockData.messages = [
    { own: false, avatar: '🤖', text: 'Describe the UI you want (layout, components, theme).', time: 'Now' },
    { own: true, text: prompt, time: 'Now' }
  ];
  return config;
}