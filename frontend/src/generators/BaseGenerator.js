/**
 * BaseGenerator.js - Abstract base class for all UI generators
 * Provides common functionality, template methods, and utilities
 * 
 * @abstract
 * @version 2.0.0
 */

import AdvancedRNG from '../../engines/rng.js';

class BaseGenerator {
  /**
   * Initialize generator with configuration
   * @param {Object} config - Generator configuration
   * @param {string} config.category - Category name
   * @param {string} config.layout - Layout type
   * @param {string} config.style - Design style
   * @param {string} config.theme - Color theme
   * @param {Object} config.mockData - Mock data for generation
   * @param {AdvancedRNG} config.rng - Random number generator
   */
  constructor(config = {}) {
    this.category = config.category || 'generic';
    this.layout = config.layout || 'default';
    this.style = config.style || 'modernSaas';
    this.theme = config.theme || 'blue';
    this.mockData = config.mockData || {};
    this.rng = config.rng || new AdvancedRNG();
    this.components = new Map();
    this.metadata = {
      generated: new Date().toISOString(),
      version: '2.0.0',
      category: this.category,
      layout: this.layout,
      style: this.style,
      theme: this.theme
    };
  }

  /**
   * Main generation method - orchestrates HTML, CSS, JS creation
   * @async
   * @returns {Promise<Object>} Generated UI with html, css, js
   */
  async generate() {
    try {
      const html = await this.generateHTML();
      const css = await this.generateCSS();
      const js = await this.generateJS();

      return {
        html,
        css,
        js,
        metadata: this.metadata,
        category: this.category,
        layout: this.layout,
        style: this.style,
        theme: this.theme
      };
    } catch (error) {
      console.error(`Generation failed for ${this.category}:`, error);
      throw new Error(`Failed to generate ${this.category} UI: ${error.message}`);
    }
  }

  /**
   * Template method - override in subclasses
   * @abstract
   * @returns {Promise<string>} HTML content
   */
  async generateHTML() {
    throw new Error('generateHTML() must be implemented by subclass');
  }

  /**
   * Template method - override in subclasses
   * @abstract
   * @returns {Promise<string>} CSS content
   */
  async generateCSS() {
    throw new Error('generateCSS() must be implemented by subclass');
  }

  /**
   * Template method - override in subclasses
   * @abstract
   * @returns {Promise<string>} JavaScript content
   */
  async generateJS() {
    throw new Error('generateJS() must be implemented by subclass');
  }

  /**
   * Register a component for rendering
   * @param {string} name - Component identifier
   * @param {Object} data - Component data
   */
  registerComponent(name, data) {
    this.components.set(name, data);
  }

  /**
   * Get registered component
   * @param {string} name - Component identifier
   * @returns {Object|null} Component data or null
   */
  getComponent(name) {
    return this.components.get(name) || null;
  }

  /**
   * Render component with data
   * @param {string} name - Component name
   * @param {Object} data - Component-specific data
   * @returns {string} Rendered HTML
   */
  renderComponent(name, data = {}) {
    const component = this.getComponent(name);
    if (!component) {
      console.warn(`Component ${name} not found`);
      return '';
    }
    return this._renderComponentData(component, data);
  }

  /**
   * Internal component rendering
   * @private
   * @param {Object} component - Component definition
   * @param {Object} data - Component data
   * @returns {string} Rendered HTML
   */
  _renderComponentData(component, data) {
    return `<!-- ${component.name} -->`;
  }

  /**
   * Get color from theme
   * @param {string} colorName - Color key name
   * @returns {string} Hex color value
   */
  getColor(colorName) {
    return this.theme[colorName] || '#667eea';
  }

  /**
   * Wrap HTML with full document structure
   * @param {string} bodyHtml - Body content HTML
   * @param {string} styles - CSS content
   * @param {string} scripts - JavaScript content
   * @returns {string} Complete HTML document
   */
  wrapDocument(bodyHtml, styles, scripts) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Generated ${this.category} UI">
  <meta name="generator" content="UI Generator v2.0.0">
  <title>Generated ${this.category} - ${new Date().toLocaleDateString()}</title>
  <style>
    ${styles}
  </style>
</head>
<body>
  <div id="root">
    ${bodyHtml}
  </div>
  <script>
    ${scripts}
  </script>
</body>
</html>
    `.trim();
  }

  /**
   * Generate base CSS that applies to all generators
   * @returns {string} Base CSS
   */
  generateBaseCss() {
    return `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: ${this.theme.text || '#1f2937'};
  background: ${this.theme.bg || '#ffffff'};
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: ${this.theme.primary || '#667eea'};
  color: white;
}

.btn-primary:hover {
  background: ${this.theme.secondary || '#764ba2'};
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.btn-secondary {
  background: transparent;
  color: ${this.theme.primary || '#667eea'};
  border: 2px solid ${this.theme.primary || '#667eea'};
}

.btn-secondary:hover {
  background: ${this.theme.primary || '#667eea'};
  color: white;
}

/* Forms */
input, textarea, select {
  padding: 0.75rem 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: ${this.theme.primary || '#667eea'};
  box-shadow: 0 0 0 3px ${this.theme.primary || '#667eea'}33;
}

/* Cards */
.card {
  background: ${this.theme.surface || '#f9fafb'};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-success {
  background: #10b98120;
  color: #10b981;
}

.badge-error {
  background: #ef444420;
  color: #ef4444;
}

.badge-warning {
  background: #f59e0b20;
  color: #f59e0b;
}

.badge-info {
  background: ${this.theme.primary || '#667eea'}20;
  color: ${this.theme.primary || '#667eea'};
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
  }
  
  input, textarea, select {
    padding: 0.6rem 0.8rem;
    font-size: 16px;
  }
}
    `.trim();
  }

  /**
   * Generate base JavaScript for common interactions
   * @returns {string} Base JavaScript
   */
  generateBaseJs() {
    return `
(function() {
  'use strict';
  
  console.log('✅ ${this.category} UI initialized');
  
  // Event delegation
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
      console.log('Button clicked:', e.target.textContent);
    }
  });
  
  // Form handling
  document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
      e.preventDefault();
      console.log('Form submitted');
    }
  });
})();
    `.trim();
  }

  /**
   * Create a random variant identifier
   * @returns {string} Unique variant ID
   */
  getVariantId() {
    return `${this.category}-${this.layout}-${this.style}-${this.theme}`;
  }

  /**
   * Validate theme object
   * @param {Object} theme - Theme object to validate
   * @returns {boolean} True if valid
   */
  isValidTheme(theme) {
    const requiredColors = ['primary', 'secondary', 'bg', 'surface', 'text'];
    return requiredColors.every(color => color in theme);
  }

  /**
   * Merge theme with defaults
   * @param {Object} theme - Custom theme
   * @returns {Object} Merged theme
   */
  mergeTheme(theme) {
    const defaults = {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      bg: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      subtext: '#6b7280',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return { ...defaults, ...theme };
  }
}

export default BaseGenerator;

