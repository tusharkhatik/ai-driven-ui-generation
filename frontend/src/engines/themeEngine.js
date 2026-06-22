/**
 * @fileoverview Manages color palettes and CSS custom property generation.
 */

/**
 * Standardized semantic color palettes.
 * @type {Record<string, Record<string, string>>}
 */
const PALETTES = Object.freeze({
  light: {
    primary: '#2563eb', 
    secondary: '#4f46e5', 
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    success: '#10b981',
    error: '#ef4444'
  },
  dark: {
    primary: '#3b82f6', 
    secondary: '#818cf8', 
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    success: '#34d399',
    error: '#f87171'
  },
  minimalist: {
    primary: '#171717',
    secondary: '#525252',
    background: '#ffffff',
    surface: '#fafafa',
    border: '#e5e5e5',
    textPrimary: '#171717',
    textSecondary: '#737373',
    success: '#171717', // Monochrome success
    error: '#dc2626'
  },
  playful: {
    primary: '#ec4899', 
    secondary: '#8b5cf6', 
    background: '#fdf4ff',
    surface: '#ffffff',
    border: '#fbcfe8',
    textPrimary: '#4a044e',
    textSecondary: '#86198f',
    success: '#10b981',
    error: '#f43f5e'
  },
  corporate: {
    primary: '#0f766e', 
    secondary: '#0369a1', 
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#cbd5e1',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    success: '#059669',
    error: '#dc2626'
  }
});

/**
 * Retrieves the raw hex color palette object for a requested theme.
 * * @param {string} themeName - e.g., 'dark', 'playful'.
 * @returns {Record<string, string>} Color palette object.
 */
export const getThemePalette = (themeName = 'light') => {
  const normalizedTheme = themeName.toLowerCase();
  return PALETTES[normalizedTheme] || PALETTES.light;
};

/**
 * Transforms a palette object into a string of CSS Custom Properties.
 * Can be injected into a `<style>` tag on the `:root` pseudo-class.
 * * @param {string} themeName - The target theme.
 * @returns {string} CSS variable declarations (e.g., "--color-primary: #fff;").
 */
export const getThemeCssVariables = (themeName = 'light') => {
  const palette = getThemePalette(themeName);
  
  return Object.entries(palette)
    .map(([key, value]) => {
      // Convert camelCase keys to kebab-case for CSS standards
      const cssVarName = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      return `--color-${cssVarName}: ${value};`;
    })
    .join('\n');
};