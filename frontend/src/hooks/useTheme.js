import { useState, useCallback, useEffect } from 'react';
import { THEMES } from '../constants';

const THEME_KEY = 'appTheme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isReady, setIsReady] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
      setCurrentTheme(savedTheme);
      applyThemeToDOM(savedTheme);
      setIsReady(true);
    } catch (error) {
      console.error('Error loading theme:', error);
      setCurrentTheme('light');
      applyThemeToDOM('light');
      setIsReady(true);
    }
  }, []);

  const applyThemeToDOM = useCallback((theme) => {
    try {
      // Validate theme
      if (!THEMES[theme]) {
        console.warn(`Theme '${theme}' not found`);
        theme = 'light';
      }

      // Update root and body
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      
      // Get the dashboard container
      const container = document.querySelector('.dashboard-container');
      if (container) {
        // Remove all theme classes
        container.classList.remove('theme-light', 'theme-dark', 'theme-gradient');
        // Add the new theme class
        container.classList.add(`theme-${theme}`);
      }

      // Force reflow to apply changes immediately
      void document.documentElement.offsetHeight;
    } catch (error) {
      console.error('Error applying theme to DOM:', error);
    }
  }, []);

  const switchTheme = useCallback((theme) => {
    try {
      // Validate theme
      if (!THEMES[theme]) {
        console.warn(`Theme '${theme}' not found. Valid themes: ${Object.keys(THEMES).join(', ')}`);
        return;
      }

      // Update state
      setCurrentTheme(theme);
      
      // Save to localStorage
      localStorage.setItem(THEME_KEY, theme);
      
      // Apply to DOM immediately (don't wait for state update)
      applyThemeToDOM(theme);
    } catch (error) {
      console.error('Error switching theme:', error);
    }
  }, [applyThemeToDOM]);

  return {
    currentTheme,
    switchTheme,
    isReady,
    availableThemes: Object.keys(THEMES)
  };
};