// src/main.jsx
// ============================================================================
// App entry point.
// AuthProvider wraps the entire tree so every component can access:
//   - auth state (user, token, loading, isAuthenticated)
//   - mockApi bridge (generate, generateAll, analyzePrompt, …)
//   - notifications (addNotification, removeNotification, …)
//   - user stats (totalPrompts, totalSaved, totalConcepts, totalUIs)
//   - design history (saveDesign, getHistory, clearHistory)
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);