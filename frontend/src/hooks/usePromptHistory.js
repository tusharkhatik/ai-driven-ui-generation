// src/hooks/usePromptHistory.js
import { useState, useCallback } from 'react';

const PROMPT_HISTORY_KEY = 'promptHistory';

export const usePromptHistory = () => {
  const [promptHistory, setPromptHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PROMPT_HISTORY_KEY)) || [];
    } catch (error) {
      console.error('Error loading prompt history:', error);
      return [];
    }
  });

  const addPrompt = useCallback((prompt) => {
    if (!prompt || !prompt.trim()) return;

    setPromptHistory(prev => {
      // Remove duplicates and add new prompt at the beginning
      const filtered = prev.filter(p => p !== prompt);
      const updated = [prompt, ...filtered];
      
      // Keep only last 20 items
      if (updated.length > 20) {
        updated.pop();
      }
      
      try {
        localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(updated));
        console.log('✅ Prompt added to history');
      } catch (err) {
        console.error('Error saving prompt history:', err);
      }
      return updated;
    });
  }, []);

  const removePrompt = useCallback((prompt) => {
    setPromptHistory(prev => {
      const updated = prev.filter(p => p !== prompt);
      try {
        localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(updated));
        console.log('🗑️ Prompt removed from history');
      } catch (err) {
        console.error('Error removing prompt:', err);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setPromptHistory([]);
    try {
      localStorage.removeItem(PROMPT_HISTORY_KEY);
      console.log('🗑️ History cleared');
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  }, []);

  return {
    promptHistory,
    addPrompt,
    removePrompt,
    clearHistory
  };
};

export default usePromptHistory;