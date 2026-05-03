// src/services/apiService.js - Real API Service with Mock Fallback & History Storage
import mockApi from './mockApi.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 8000; // 8 second timeout

// Cache configuration
let historyCache = null;
let analyticsCacheTime = 0;
let analyticsCache = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithTimeout(url, options = {}, timeoutMs = API_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const apiService = {
  // ============================================================================
  // LOCAL HISTORY MANAGEMENT (from localStorage)
  // ============================================================================

  saveToLocalHistory: (generatedWebsite) => {
    try {
      const history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      
      const historyItem = {
        id: Date.now().toString(),
        prompt: generatedWebsite.prompt,
        timestamp: new Date().toISOString(),
        html: generatedWebsite.html,
        css: generatedWebsite.css,
        js: generatedWebsite.js,
        variations: generatedWebsite.variations || [],
        analysis: generatedWebsite.analysis || {},
        isFavorite: false
      };

      history.unshift(historyItem); // Add to beginning
      
      // Keep only last 50 items
      if (history.length > 50) {
        history.pop();
      }

      localStorage.setItem('websiteHistory', JSON.stringify(history));
      console.log('✅ Saved to local history:', historyItem.id);
      historyCache = null; // Clear cache when new item added
      return historyItem;
    } catch (error) {
      console.error('❌ Error saving to local history:', error);
      return null;
    }
  },

  getLocalHistory: () => {
    try {
      const history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      console.log('📚 Retrieved local history:', history.length, 'items');
      return history;
    } catch (error) {
      console.error('❌ Error retrieving local history:', error);
      return [];
    }
  },

  getLocalHistoryItem: (id) => {
    try {
      const history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      const item = history.find(h => h.id === id);
      console.log('📄 Retrieved local history item:', id);
      return item || null;
    } catch (error) {
      console.error('❌ Error retrieving local history item:', error);
      return null;
    }
  },

  deleteLocalHistoryItem: (id) => {
    try {
      let history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      history = history.filter(h => h.id !== id);
      localStorage.setItem('websiteHistory', JSON.stringify(history));
      console.log('🗑️ Deleted from local history:', id);
      historyCache = null; // Clear cache
      return true;
    } catch (error) {
      console.error('❌ Error deleting local history item:', error);
      return false;
    }
  },

  clearLocalHistory: () => {
    try {
      localStorage.removeItem('websiteHistory');
      console.log('🗑️ Cleared all local history');
      historyCache = null; // Clear cache
      return true;
    } catch (error) {
      console.error('❌ Error clearing local history:', error);
      return false;
    }
  },

  toggleFavorite: (id) => {
    try {
      let history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      const item = history.find(h => h.id === id);
      if (item) {
        item.isFavorite = !item.isFavorite;
        localStorage.setItem('websiteHistory', JSON.stringify(history));
        console.log('⭐ Toggled favorite for:', id);
        historyCache = null; // Clear cache
        return item.isFavorite;
      }
      return false;
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      return false;
    }
  },

  getFavorites: () => {
    try {
      const history = JSON.parse(localStorage.getItem('websiteHistory') || '[]');
      const favorites = history.filter(h => h.isFavorite);
      console.log('⭐ Retrieved favorites:', favorites.length, 'items');
      return favorites;
    } catch (error) {
      console.error('❌ Error retrieving favorites:', error);
      return [];
    }
  },

  // ============================================================================
  // GENERATION SERVICE
  // ============================================================================

  generateUI: async (prompt, token) => {
    try {
      console.log('📤 Sending request to:', `${API_BASE_URL}/generate`);

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            prompt: prompt,
            timestamp: new Date().toISOString()
          })
        }
      );

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Response received (REAL):', data);

      // Save to local history
      apiService.saveToLocalHistory({
        prompt: prompt,
        html: data.html,
        css: data.css,
        js: data.js,
        variations: data.variations,
        analysis: data.analysis
      });

      return {
        success: true,
        data: data,
        source: 'real-api',
        isMockData: false
      };
    } catch (error) {
      console.warn('⚠️ Real API failed, falling back to mock data:', error.message);

      try {
        const mockResult = await mockApi.generate(prompt, {
          variationMode: false,
          variationCount: 1,
          exportFormat: 'html',
          saveHistory: true,
          simulateDelay: false
        });

        if (mockResult.success) {
          console.log('✅ Using MOCK data as fallback');

          // Save to local history
          apiService.saveToLocalHistory({
            prompt: prompt,
            html: mockResult.data.html,
            css: mockResult.data.css,
            js: mockResult.data.js,
            variations: mockResult.data.variations,
            analysis: mockResult.data.analysis
          });

          return {
            success: true,
            data: mockResult.data,
            source: 'mock-api',
            isMockData: true,
            warning: 'Real API unavailable. Using generated mock data.'
          };
        } else {
          throw new Error(mockResult.error?.message);
        }
      } catch (mockError) {
        console.error('❌ Both Real and Mock API failed:', mockError);
        return {
          success: false,
          error: mockError.message || 'Failed to generate UI from both real and mock APIs',
          source: 'error',
          isMockData: false
        };
      }
    }
  },

  // ============================================================================
  // HISTORY FETCHING (with caching to prevent infinite calls)
  // ============================================================================

  fetchHistory: async (token) => {
    try {
      const now = Date.now();
      
      // Return cached data if still valid (only call every 5 minutes max)
      if (historyCache && (now - historyCache.timestamp) < CACHE_DURATION) {
        console.log('📦 Using cached history (still valid)');
        return {
          success: true,
          data: historyCache.data,
          source: 'cache',
          isMockData: false,
          fromCache: true
        };
      }

      if (!token) {
        console.warn('⚠️ No token provided, using local history');
        const localHistory = apiService.getLocalHistory();
        return {
          success: true,
          data: localHistory,
          source: 'local',
          isMockData: false
        };
      }

      console.log('📤 Fetching history from API:', `${API_BASE_URL}/history`);

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/history`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn('⚠️ History endpoint not found (404), using local history');
        } else {
          throw new Error(`API Error: ${response.status}`);
        }
        
        // Fallback to local history
        const localHistory = apiService.getLocalHistory();
        return {
          success: true,
          data: localHistory,
          source: 'local',
          isMockData: false,
          warning: 'Real API unavailable. Using local history.'
        };
      }

      const data = await response.json();
      console.log('✅ History received from API:', data);

      // Cache the result
      historyCache = {
        data: data,
        timestamp: now
      };

      return {
        success: true,
        data: data,
        source: 'real-api',
        isMockData: false
      };
    } catch (error) {
      console.warn('⚠️ Error fetching history:', error.message);

      try {
        const localHistory = apiService.getLocalHistory();
        console.log('✅ Using LOCAL history as fallback');

        return {
          success: true,
          data: localHistory,
          source: 'local',
          isMockData: false,
          warning: 'Real API unavailable. Using local history.'
        };
      } catch (localError) {
        console.error('❌ History fetch failed completely:', localError);
        return {
          success: false,
          data: [],
          error: 'Failed to fetch history',
          source: 'error',
          isMockData: false
        };
      }
    }
  },

  // ============================================================================
  // DELETE SERVICE
  // ============================================================================

  deleteUI: async (id, token) => {
    try {
      console.log('📤 Deleting UI:', id);

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/history/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      console.log('✅ UI deleted (REAL)');
      historyCache = null; // Clear cache

      return {
        success: true,
        source: 'real-api',
        isMockData: false
      };
    } catch (error) {
      console.warn('⚠️ Real API delete failed, using local delete:', error.message);

      try {
        apiService.deleteLocalHistoryItem(id);
        console.log('✅ Using LOCAL delete as fallback');

        return {
          success: true,
          source: 'local-api',
          isMockData: false,
          warning: 'Real API unavailable. Deleted from local cache.'
        };
      } catch (localError) {
        console.error('❌ Delete operation failed:', localError);
        return {
          success: false,
          error: 'Failed to delete UI',
          source: 'error',
          isMockData: false
        };
      }
    }
  },

  // ============================================================================
  // ANALYTICS SERVICE (with caching)
  // ============================================================================

  getAnalytics: async (token) => {
    try {
      const now = Date.now();
      
      // Return cached analytics if still valid
      if (analyticsCache && (now - analyticsCacheTime) < CACHE_DURATION) {
        console.log('📦 Using cached analytics');
        return {
          success: true,
          data: analyticsCache,
          source: 'cache',
          isMockData: false,
          fromCache: true
        };
      }

      console.log('📤 Fetching analytics from API...');

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/analytics`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Analytics received (REAL):', data);

      // Cache the result
      analyticsCache = data;
      analyticsCacheTime = now;

      return {
        success: true,
        data: data,
        source: 'real-api',
        isMockData: false
      };
    } catch (error) {
      console.warn('⚠️ Real API analytics failed, generating from local data:', error.message);

      try {
        const history = apiService.getLocalHistory();
        const mockAnalytics = {
          totalGenerated: history.length,
          totalFavorites: history.filter(h => h.isFavorite).length,
          mostRecent: history[0] || null,
          generatedToday: history.filter(h => {
            const today = new Date().toDateString();
            const itemDate = new Date(h.timestamp).toDateString();
            return today === itemDate;
          }).length
        };

        console.log('✅ Using locally generated analytics');

        // Cache the result
        analyticsCache = mockAnalytics;
        analyticsCacheTime = Date.now();

        return {
          success: true,
          data: mockAnalytics,
          source: 'local',
          isMockData: false
        };
      } catch (localError) {
        console.error('❌ Analytics fetch failed:', localError);
        return {
          success: false,
          data: {},
          error: 'Failed to fetch analytics',
          source: 'error',
          isMockData: false
        };
      }
    }
  },

  // ============================================================================
  // HEALTH CHECK
  // ============================================================================

  checkHealth: async () => {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/health`,
        { method: 'GET' },
        3000
      );

      if (response.ok) {
        console.log('✅ Real API is healthy');
        return {
          realApiAvailable: true,
          source: 'real-api',
          isMockData: false
        };
      } else {
        throw new Error('Real API unhealthy');
      }
    } catch (error) {
      console.warn('⚠️ Real API unavailable, using mock:', error.message);
      return {
        realApiAvailable: false,
        source: 'mock-api',
        isMockData: true,
        warning: 'Real API is down. App will use mock data.'
      };
    }
  },

  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================

  clearCache: () => {
    historyCache = null;
    analyticsCache = null;
    analyticsCacheTime = 0;
    console.log('🧹 All caches cleared');
  }
};

export default apiService;