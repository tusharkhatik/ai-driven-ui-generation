// src/hooks/useUIGeneration.js
import { useState, useCallback } from 'react';
import apiService from '../services/apiService';

export const useUIGeneration = () => {
  const [generatedUI, setGeneratedUI] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [metadata, setMetadata] = useState({
    category: 'landing',
    style: {},
    theme: 'modern'
  });

  const generateUI = useCallback(async (prompt, token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiService.generateUI(prompt, token);

      if (response.success && response.data) {
        const primaryVar = response.data.primaryVariation || {};

        const uiData = {
          html: primaryVar.html || response.data.html || '',
          css: primaryVar.css || response.data.css || '',
          js: primaryVar.js || response.data.js || ''
        };

        console.log('✅ UI Generated:', {
          category: response.data.category,
          theme: primaryVar.themeKey,
          prompt: prompt
        });

        setGeneratedUI(uiData);
        setMetadata({
          category: response.data.category || 'landing',
          style: response.data.style || {},
          theme: primaryVar.themeKey || 'modern'
        });
        setSuccess(true);

        return {
          success: true,
          data: {
            ...uiData,
            primaryVariation: primaryVar,
            category: response.data.category,
            themeKey: primaryVar.themeKey || 'modern'
          },
          isMockData: response.isMockData || false,
          source: response.source
        };
      } else {
        const errorMsg = response.error || 'Failed to generate UI';
        setError(errorMsg);
        setSuccess(false);
        return {
          success: false,
          error: errorMsg,
          isMockData: false
        };
      }
    } catch (err) {
      console.error('Generation error:', err);
      const errorMsg = err.message || 'An error occurred';
      setError(errorMsg);
      setSuccess(false);
      return {
        success: false,
        error: errorMsg,
        isMockData: false
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    generatedUI,
    setGeneratedUI,
    loading,
    error,
    success,
    metadata,
    generateUI,
    clearMessages
  };
};

export default useUIGeneration;