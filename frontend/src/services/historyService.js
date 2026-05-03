// src/services/historyService.js - Dedicated History Management Service
import LZ from 'lz-string'; // Add this: npm install lz-string

const STORAGE_KEY = 'ui_generation_history';
const MAX_HISTORY_ITEMS = 50; // Reduced from 100
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB limit

/**
 * Compress data before storing
 */
const compressData = (data) => {
  try {
    return LZ.compressToUTF16(JSON.stringify(data));
  } catch (error) {
    console.error('❌ Error compressing data:', error);
    return JSON.stringify(data);
  }
};

/**
 * Decompress data after retrieving
 */
const decompressData = (compressed) => {
  try {
    // Check if data is already decompressed (fallback for old data)
    if (compressed.startsWith('[') || compressed.startsWith('{')) {
      return JSON.parse(compressed);
    }
    const decompressed = LZ.decompressFromUTF16(compressed);
    return JSON.parse(decompressed);
  } catch (error) {
    console.error('❌ Error decompressing data:', error);
    return [];
  }
};

/**
 * Check storage size and cleanup if needed
 */
const checkAndCleanupStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const sizeInBytes = new Blob([data]).size;
    
    if (sizeInBytes > MAX_STORAGE_SIZE) {
      console.warn(`⚠️ Storage exceeds ${MAX_STORAGE_SIZE / 1024 / 1024}MB. Cleaning up...`);
      
      let history = decompressData(data);
      
      // Remove oldest items until we're under limit
      while (history.length > 10 && new Blob([compressData(history)]).size > MAX_STORAGE_SIZE) {
        history.pop();
      }
      
      localStorage.setItem(STORAGE_KEY, compressData(history));
      console.log(`✅ Cleaned up history. Kept ${history.length} items.`);
    }
  } catch (error) {
    console.error('❌ Error checking storage:', error);
  }
};

export const historyService = {
  /**
   * Get all history items
   */
  getHistory: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const history = data ? decompressData(data) : [];
      
      // Sort by date descending
      return history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('❌ Error reading history:', error);
      return [];
    }
  },

  /**
   * Add item to history
   */
  addToHistory: (item) => {
    try {
      if (!item || !item.prompt) {
        console.warn('⚠️ Invalid history item');
        return null;
      }

      const history = historyService.getHistory();

      const newItem = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        prompt: item.prompt || '',
        // Store only essential HTML/CSS/JS (remove bulky data)
        html: (item.html || '').substring(0, 50000), // Limit to 50KB
        css: (item.css || '').substring(0, 10000),   // Limit to 10KB
        js: (item.js || '').substring(0, 10000),     // Limit to 10KB
        variations: (item.variations || []).slice(0, 3), // Keep only 3 variations
        analysis: item.analysis || {},
        theme: item.theme || 'default',
        layout: item.layout || 'default',
        source: item.source || 'mock',
        isFavorite: false,
        regenerationCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to beginning of array
      history.unshift(newItem);

      // Keep only last 50 items
      if (history.length > MAX_HISTORY_ITEMS) {
        history.splice(MAX_HISTORY_ITEMS);
      }

      // Save compressed to localStorage
      localStorage.setItem(STORAGE_KEY, compressData(history));
      
      console.log('✅ Added to history:', newItem.id);
      console.log('📊 Total items in history:', history.length);
      
      return newItem;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('⚠️ Storage full! Removing oldest items...');
        
        try {
          const history = historyService.getHistory();
          // Remove last 10 items
          history.splice(-10);
          localStorage.setItem(STORAGE_KEY, compressData(history));
          console.log('✅ Cleanup successful. Retrying save...');
          
          // Retry the add
          return historyService.addToHistory(item);
        } catch (retryError) {
          console.error('❌ Failed to save even after cleanup:', retryError);
          return null;
        }
      } else {
        console.error('❌ Error adding to history:', error);
        return null;
      }
    }
  },

  /**
   * Save UI (alias for addToHistory)
   */
  saveUI: (item) => {
    return historyService.addToHistory(item);
  },

  /**
   * Get single history item by ID
   */
  getHistoryItem: (id) => {
    try {
      const history = historyService.getHistory();
      return history.find(item => item.id === id) || null;
    } catch (error) {
      console.error('❌ Error getting history item:', error);
      return null;
    }
  },

  /**
   * Delete history item by ID
   */
  deleteHistoryItem: (id) => {
    try {
      let history = historyService.getHistory();
      history = history.filter(item => item.id !== id);
      
      localStorage.setItem(STORAGE_KEY, compressData(history));
      
      console.log('🗑️ Deleted from history:', id);
      console.log('📊 Total items in history:', history.length);
      
      return true;
    } catch (error) {
      console.error('❌ Error deleting history item:', error);
      return false;
    }
  },

  /**
   * Toggle favorite status
   */
  toggleFavorite: (id) => {
    try {
      let history = historyService.getHistory();
      const item = history.find(h => h.id === id);
      
      if (item) {
        item.isFavorite = !item.isFavorite;
        item.updatedAt = new Date().toISOString();
        
        localStorage.setItem(STORAGE_KEY, compressData(history));
        
        console.log('⭐ Toggled favorite:', id, 'to', item.isFavorite);
        
        return item.isFavorite;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      return false;
    }
  },

  /**
   * Get all favorites
   */
  getFavorites: () => {
    try {
      const history = historyService.getHistory();
      return history.filter(item => item.isFavorite);
    } catch (error) {
      console.error('❌ Error getting favorites:', error);
      return [];
    }
  },

  /**
   * Clear all history
   */
  clearHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🗑️ Cleared all history');
      return true;
    } catch (error) {
      console.error('❌ Error clearing history:', error);
      return false;
    }
  },

  /**
   * Search history by prompt
   */
  searchHistory: (query) => {
    try {
      const history = historyService.getHistory();
      if (!query || query.trim() === '') return history;
      
      const lowerQuery = query.toLowerCase();
      return history.filter(item =>
        item.prompt.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('❌ Error searching history:', error);
      return [];
    }
  },

  /**
   * Update history item
   */
  updateHistoryItem: (id, updates) => {
    try {
      let history = historyService.getHistory();
      const item = history.find(h => h.id === id);
      
      if (item) {
        Object.assign(item, updates, { updatedAt: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEY, compressData(history));
        
        console.log('✏️ Updated history item:', id);
        
        return item;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error updating history item:', error);
      return null;
    }
  },

  /**
   * Export history as JSON
   */
  exportHistory: () => {
    try {
      const history = historyService.getHistory();
      const dataStr = JSON.stringify(history, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `history-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      console.log('📥 Exported history');
      
      return true;
    } catch (error) {
      console.error('❌ Error exporting history:', error);
      return false;
    }
  },

  /**
   * Import history from JSON
   */
  importHistory: (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      if (!Array.isArray(imported)) {
        throw new Error('Invalid format');
      }
      
      const current = historyService.getHistory();
      const merged = [...imported, ...current];
      
      // Remove duplicates
      const seen = new Set();
      const unique = merged.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
      
      // Keep only last 50
      const final = unique.slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(STORAGE_KEY, compressData(final));
      
      console.log('📤 Imported history');
      
      return true;
    } catch (error) {
      console.error('❌ Error importing history:', error);
      return false;
    }
  },

  /**
   * Get statistics / Analytics
   */
  getStats: () => {
    try {
      const history = historyService.getHistory();
      const favorites = history.filter(h => h.isFavorite);
      
      return {
        total: history.length,
        favorites: favorites.length,
        recent: history[0] ? history[0].createdAt : null,
        sources: {
          mock: history.filter(h => h.source === 'mock').length,
          api: history.filter(h => h.source === 'api').length
        }
      };
    } catch (error) {
      console.error('❌ Error getting stats:', error);
      return { total: 0, favorites: 0, recent: null, sources: {} };
    }
  },

  /**
   * Get analytics data (alias for getStats)
   */
  getAnalytics: () => {
    return historyService.getStats();
  },

  /**
   * Increment regeneration count
   */
  incrementRegenerationCount: (id) => {
    try {
      let history = historyService.getHistory();
      const item = history.find(h => h.id === id);
      
      if (item) {
        item.regenerationCount = (item.regenerationCount || 0) + 1;
        item.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, compressData(history));
        console.log('🔄 Incremented regeneration count for:', id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error incrementing regeneration count:', error);
      return false;
    }
  }
};

export default historyService;