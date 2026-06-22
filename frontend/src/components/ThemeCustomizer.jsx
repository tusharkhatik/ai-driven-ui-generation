import React, { useEffect, useState } from 'react';

/**
 * Simple ThemeCustomizer
 * - toggles light/dark mode
 * - selects a primary color which is applied to CSS variable --primary
 * - persists settings in localStorage under key 'ui_theme'
 */

const LS_KEY = 'ui_theme';

const defaultSettings = {
  mode: 'light', // or 'dark'
  primary: '#2563eb' // nice blue
};

function applyTheme(settings) {
  const root = document.documentElement;
  if (settings.mode === 'dark') {
    root.style.setProperty('--bg', '#0f172a');
    root.style.setProperty('--text', '#e6eef8');
  } else {
    root.style.setProperty('--bg', '#ffffff');
    root.style.setProperty('--text', '#0b1220');
  }
  root.style.setProperty('--primary', settings.primary);
}

export default function ThemeCustomizer({ className = '' }) {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    applyTheme(settings);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  return (
    <div className={`theme-customizer ${className}`} style={containerStyle}>
      <h4 style={titleStyle}>Theme</h4>
      <div style={rowStyle}>
        <label style={labelStyle}>
          Mode:
          <select
            value={settings.mode}
            onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
            style={selectStyle}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>
          Primary color:
          <input
            type="color"
            value={settings.primary}
            onChange={(e) => setSettings({ ...settings, primary: e.target.value })}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
    </div>
  );
}

/* Inline styles to avoid adding new CSS files — replace with existing style system if needed */
const containerStyle = {
  padding: '8px 12px',
  borderRadius: 8,
  background: 'var(--panel-bg, rgba(255,255,255,0.03))',
  display: 'inline-block',
};

const rowStyle = { marginTop: 8, display: 'flex', alignItems: 'center' };
const labelStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 };
const selectStyle = { marginLeft: 8, padding: '4px 6px', fontSize: 14 };
const titleStyle = { margin: 0, fontSize: 14 };