// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalPrompts: 0,
    totalFavorites: 0,
    totalRegenerated: 0,
    averageLength: 0
  });

  // ✅ Notification state
  const [notifications, setNotifications] = useState([]);

  // ✅ Request deduplication flag
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Load stats once on mount
      loadUserStats(storedToken);
    }
    
    setLoading(false);
  }, []);

  // =========================
  // ✅ NOTIFICATION FUNCTIONS
  // =========================

  const addNotification = (message, type = 'info') => {
    const id = Date.now();

    const newNotification = { id, message, type };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notif) => notif.id !== id)
      );
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== id)
    );
  };

  // =========================
  // ✅ STATS FUNCTIONS
  // =========================

  const loadUserStats = async (authToken) => {
    // Prevent duplicate requests
    if (isLoadingStats) {
      console.log('⏳ Stats already loading, skipping duplicate request');
      return;
    }

    try {
      setIsLoadingStats(true);
      const token = authToken || localStorage.getItem('token');
      
      if (!token) {
        console.warn('⚠️ No token found, using default stats');
        loadStatsFromLocalStorage();
        setIsLoadingStats(false);
        return;
      }

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        console.log('📡 Fetching stats from API:', `${API_BASE_URL}/auth/stats`);
        
        const response = await fetch(`${API_BASE_URL}/auth/stats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal,
          credentials: 'include'
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Stats fetched successfully:', data);
          
          setStats({
            totalPrompts: data.totalPrompts || 0,
            totalFavorites: data.totalFavorites || 0,
            totalRegenerated: data.totalRegenerated || 0,
            averageLength: data.averageLength || 0
          });

          // Save to localStorage as backup
          localStorage.setItem('userStats', JSON.stringify({
            totalPrompts: data.totalPrompts || 0,
            totalFavorites: data.totalFavorites || 0,
            totalRegenerated: data.totalRegenerated || 0,
            averageLength: data.averageLength || 0
          }));

        } else if (response.status === 404) {
          console.warn('⚠️ Stats endpoint not available (404). Using localStorage.');
          loadStatsFromLocalStorage();
        } else if (response.status === 401) {
          console.warn('⚠️ Unauthorized (401). Token may be invalid.');
          logout();
        } else {
          console.warn(`⚠️ API returned status ${response.status}. Using localStorage.`);
          loadStatsFromLocalStorage();
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn('⚠️ Stats request timed out (5s). Using localStorage.');
        } else if (error instanceof TypeError) {
          console.warn('⚠️ Network error or CORS issue. Using localStorage.');
        } else {
          console.warn('⚠️ Error fetching stats:', error.message);
        }
        loadStatsFromLocalStorage();
      }
    } catch (error) {
      console.error('❌ Error in loadUserStats:', error);
      loadStatsFromLocalStorage();
    } finally {
      setIsLoadingStats(false);
    }
  };

  const loadStatsFromLocalStorage = () => {
    try {
      const savedStats = localStorage.getItem('userStats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        console.log('✅ Stats loaded from localStorage:', stats);
        setStats(stats);
      } else {
        console.log('✅ No stats in localStorage, using defaults');
        setStats({
          totalPrompts: 0,
          totalFavorites: 0,
          totalRegenerated: 0,
          averageLength: 0
        });
      }
    } catch (err) {
      console.error('❌ Error loading stats from localStorage:', err);
      setStats({
        totalPrompts: 0,
        totalFavorites: 0,
        totalRegenerated: 0,
        averageLength: 0
      });
    }
  };

  // =========================
  // ✅ AUTH FUNCTIONS
  // =========================

  const login = (token, userData) => {
    console.log('🔐 Logging in user:', userData.email);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    loadUserStats(token);

    addNotification('✅ Login successful', 'success');
  };

  const logout = () => {
    console.log('🚪 Logging out user');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('uiHistory');
    localStorage.removeItem('autoSavedPrompt');
    localStorage.removeItem('userStats');
    
    setToken(null);
    setUser(null);
    setStats({
      totalPrompts: 0,
      totalFavorites: 0,
      totalRegenerated: 0,
      averageLength: 0
    });

    addNotification('👋 Logged out successfully', 'info');
  };

  const updateUser = (userData) => {
    console.log('📝 Updating user:', userData.email);
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const updateStats = (newStats) => {
    console.log('📊 Updating stats:', newStats);
    
    setStats(prevStats => {
      const updatedStats = {
        ...prevStats,
        ...newStats
      };
      // Save to localStorage as backup
      localStorage.setItem('userStats', JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  const incrementPromptCount = () => {
    console.log('📈 Incrementing prompt count');
    updateStats({ totalPrompts: stats.totalPrompts + 1 });
  };

  const incrementFavoriteCount = () => {
    console.log('⭐ Incrementing favorite count');
    updateStats({ totalFavorites: stats.totalFavorites + 1 });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        loading, 
        login, 
        logout,
        updateUser,
        stats,
        updateStats,
        incrementPromptCount,
        incrementFavoriteCount,
        loadUserStats,

        // ✅ Notifications
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
