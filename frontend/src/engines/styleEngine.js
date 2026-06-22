/**
 * @fileoverview Generates design tokens (spacing, typography, borders) based on theme/complexity.
 */

const BASE_TYPOGRAPHY = Object.freeze({
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  baseFontSize: "16px",
  lineHeight: "1.5"
});

// Complexity dictates spatial density
const COMPLEXITY_METRICS = Object.freeze({
  low: { spacing: '1.5rem', borderRadius: '12px', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  medium: { spacing: '1rem', borderRadius: '8px', shadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  high: { spacing: '0.75rem', borderRadius: '4px', shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }
});

// Theme dictates decorative elements
const THEME_DECORATIONS = Object.freeze({
  minimalist: { borderWidth: '1px', borderStyle: 'solid', backdropFilter: 'none' },
  playful: { borderWidth: '3px', borderStyle: 'solid', backdropFilter: 'none' },
  corporate: { borderWidth: '1px', borderStyle: 'solid', backdropFilter: 'none' },
  dark: { borderWidth: '1px', borderStyle: 'solid', backdropFilter: 'blur(12px)' },
  light: { borderWidth: '1px', borderStyle: 'solid', backdropFilter: 'none' }
});

/**
 * Generates a comprehensive style token dictionary for UI components.
 * * @param {string} theme - e.g., 'dark', 'light', 'minimalist'.
 * @param {string} complexity - 'low', 'medium', 'high'.
 * @returns {Object} Nested dictionary of CSS design tokens.
 */
export const generateStyleTokens = (theme = 'light', complexity = 'medium') => {
  const metrics = COMPLEXITY_METRICS[complexity] || COMPLEXITY_METRICS.medium;
  const decorations = THEME_DECORATIONS[theme] || THEME_DECORATIONS.light;

  return {
    typography: { ...BASE_TYPOGRAPHY },
    spacing: {
      xs: `calc(${metrics.spacing} * 0.25)`,
      sm: `calc(${metrics.spacing} * 0.5)`,
      base: metrics.spacing,
      md: `calc(${metrics.spacing} * 1.5)`,
      lg: `calc(${metrics.spacing} * 2)`,
      xl: `calc(${metrics.spacing} * 3)`
    },
    borders: {
      radius: metrics.borderRadius,
      width: decorations.borderWidth,
      style: decorations.borderStyle
    },
    effects: {
      boxShadow: metrics.shadow,
      backdropFilter: decorations.backdropFilter
    }
  };
};