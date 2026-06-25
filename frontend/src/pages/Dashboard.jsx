import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { historyService } from '../services/historyService';
import { useUIGeneration } from '../hooks/useUIGeneration';
import { usePromptHistory } from '../hooks/usePromptHistory';
import {
  downloadFile,
  copyToClipboard,
  generateHTMLFile,
  generateIframeHTML,
  downloadZip,
} from '../utils/fileUtils';
import { MESSAGES, TEMPLATES, TIMEOUTS } from '../constants';
import Alert from '../components/Alert';
import Toast from '../components/Toast';
import PromptSuggestions from '../components/PromptSuggestions';
import PromptHistory from '../components/PromptHistory';
import Analytics from '../components/Analytics';
import LoadingSkeleton from '../components/LoadingSkeleton';
import '../styles/dashboard.css';
import {
  FaUser,
  FaHistory,
  FaSignOutAlt,
  FaHeart,
  FaRegHeart,
  FaRedo,
  FaBox,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaSun,
  FaMoon,
  FaPalette,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaDownload,
  FaCode,
  FaEye,
  FaCopy,
  FaCheck,
  FaBell,
  FaExclamationTriangle,
  FaPlus,
  FaLightbulb,
  FaUndo,
  FaVolumeUp,
  FaMagic,
  FaFilter,
  FaSearch,
  FaTimes,
  FaSpinner,
  FaChartBar,
  FaClock,
  FaRocket,
  FaCog,
} from 'react-icons/fa';

// ===== DEFAULT UI =====
const DEFAULT_UI = {
  html: `<div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
  <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 800px; width: 100%;">
    <h1 style="color: #667eea; text-align: center; margin-bottom: 20px; font-size: 2rem; margin: 0 0 20px 0;">Welcome</h1>
    <p style="color: #666; text-align: center; margin-bottom: 30px; line-height: 1.6; margin: 0 0 30px 0;">This is a default preview. Enter a prompt and click Generate to create custom UI.</p>
    <button style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s; margin: 0;">
      Click Me
    </button>
  </div>
</div>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`,
  js: `(function() {
  console.log('Default UI Preview Loaded');
  const btn = document.querySelector('button');
  if (btn) {
    btn.addEventListener('click', function() {
      alert('Button clicked! Ready for your custom UI.');
    });
  }
})();`,
};

// ===== ENHANCEMENT PRESETS =====
const AI_ENHANCEMENT_PRESETS = [
  { id: 'minimal', name: '✨ Minimal', enhancement: 'Clean and modern aesthetic' },
  { id: 'glassmorphism', name: '🎨 Glassmorphism', enhancement: 'Frosted glass effect' },
  { id: 'neumorphism', name: '🌊 Neumorphism', enhancement: 'Soft shadows and depth' },
  { id: 'dark-mode', name: '🌙 Dark Mode', enhancement: 'Dark theme optimized' },
  { id: 'animated', name: '⚡ Animated', enhancement: 'Smooth animations' },
  { id: 'gradient', name: '🌈 Gradient', enhancement: 'Vibrant gradients' },
];

// ===== DEVICE PRESETS =====
const DEVICE_PRESETS = {
  desktop: { width: '100%', height: '100%', icon: FaDesktop, label: 'Desktop', class: 'preview-desktop' },
  tablet: { width: '768px', height: '1024px', icon: FaTabletAlt, label: 'Tablet', class: 'preview-tablet' },
  mobile: { width: '375px', height: '844px', icon: FaMobileAlt, label: 'Mobile', class: 'preview-mobile' },
};

// ===== CUSTOM HOOK FOR THEME =====
const useThemeHook = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  }, []);

  return { currentTheme, switchTheme };
};

// ===== PROMPT SECTION COMPONENT =====
const PromptSection = ({
  prompt,
  setPrompt,
  loading,
  onGenerate,
  onRegenerate,
  generatedUI,
  showToast,
  historyIndex,
  historyStack,
  undo,
  redo,
  isVoiceActive,
  toggleVoiceInput,
  smartSuggestions,
  promptHistory,
  removePrompt,
  searchQuery,
  setSearchQuery,
  filteredHistory,
  analytics,
  selectedEnhancement,
  setSelectedEnhancement,
  showAnalyticsPanel,
  setShowAnalyticsPanel,
}) => {
  return (
    <div className="prompt-section">
      <h2>📝 Describe your UI</h2>

      <form onSubmit={onGenerate}>
        {/* Toolbar */}
        <div className="prompt-toolbar">
          <button
            type="button"
            className={`toolbar-btn undo-btn ${historyIndex <= 0 ? 'disabled' : ''}`}
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            <FaUndo />
          </button>
          <button
            type="button"
            className={`toolbar-btn redo-btn ${historyIndex >= historyStack.length - 1 ? 'disabled' : ''}`}
            onClick={redo}
            disabled={historyIndex >= historyStack.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <FaRedo />
          </button>
          <button
            type="button"
            className={`toolbar-btn voice-btn ${isVoiceActive ? 'active' : ''}`}
            onClick={toggleVoiceInput}
            title="Voice Input (Ctrl+Shift+V)"
          >
            <FaVolumeUp />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g.: Create a modern login form with glassmorphism..."
          disabled={loading}
          rows="6"
          maxLength="2000"
          className="prompt-textarea"
        />
        <div className="char-count">{prompt.length}/2000</div>

        {/* Smart Suggestions */}
        {smartSuggestions.length > 0 && (
          <div className="smart-suggestions">
            <p className="suggestions-label">
              <FaLightbulb /> Smart Suggestions:
            </p>
            <div className="suggestions-grid">
              {smartSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => setPrompt((prev) => prev + ' ' + suggestion)}
                >
                  <FaPlus /> {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="generate-btn"
            title="Generate UI (Ctrl+Enter)"
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Generating...
              </>
            ) : (
              <>
                <FaMagic /> Generate
              </>
            )}
          </button>
          <button
            type="button"
            disabled={loading || !generatedUI.html}
            onClick={onRegenerate}
            className="regenerate-btn"
            title="Regenerate"
          >
            <FaRedo />
          </button>
        </div>
      </form>

      {/* Analytics Panel */}
      {showAnalyticsPanel && Analytics && (
        <div className="analytics-panel">
          <Analytics stats={analytics} />
        </div>
      )}

      {/* Suggestions Component */}
      {PromptSuggestions && <PromptSuggestions onSelect={(s) => setPrompt((prev) => prev + ' ' + s)} disabled={loading} />}

      {/* History Search */}
      <div className="history-search-wrapper">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="history-search-input"
          />
        </div>
        <PromptHistory
          history={filteredHistory}
          onSelect={(p) => setPrompt(p)}
          onDelete={removePrompt}
          disabled={loading}
        />
      </div>
    </div>
  );
};

// ===== DEVICE SELECTOR COMPONENT =====
const DeviceSelector = ({ device, onDeviceChange }) => {
  return (
    <div className="device-selector-container">
      <div className="device-selector-scroll">
        {Object.entries(DEVICE_PRESETS).map(([key, preset]) => {
          const IconComponent = preset.icon;
          return (
            <button
              key={key}
              className={`device-btn ${device === key ? 'active' : ''}`}
              onClick={() => onDeviceChange(key)}
              title={preset.label}
            >
              <IconComponent />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ===== PREVIEW SECTION COMPONENT =====
const PreviewSection = ({
  showCode,
  setShowCode,
  generatedUI,
  showPreview,
  device,
  onDeviceChange,
  iframeHTML,
  onDownloadZip,
  onToggleFavorite,
  isFavorite,
  currentUIData,
  onEnablePreview,
  copiedCode,
  onCopyCode,
  activeCodeTab,
  setActiveCodeTab,
  formatCode,
}) => {
  return (
    <div className="preview-section">
      <div className="preview-header">
        <h2>📱 Preview</h2>
        <div className="preview-actions">
          {(generatedUI?.html || showPreview) && (
            <>
              <button
                className="preview-action-btn"
                onClick={() => setShowCode(!showCode)}
                title="Toggle Code View (Ctrl+T)"
              >
                {showCode ? <FaEye /> : <FaCode />}
              </button>

              <button
                className="preview-download-btn"
                onClick={onDownloadZip}
                title="Download as ZIP"
              >
                <FaBox /> Download
              </button>

              {generatedUI?.html && (
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={onToggleFavorite}
                  title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {!showCode ? (
        <>
          {/* Empty State */}
          {!showPreview && !generatedUI?.html && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <FaRocket style={{ fontSize: '3.5rem', color: '#667eea', marginBottom: '16px', opacity: 0.5 }} />
              <p style={{ color: '#666', marginBottom: '20px', fontSize: '1.1rem' }}>
                👀 Your UI will appear here
              </p>
              <button
                onClick={onEnablePreview}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                🚀 Enable Preview Mode
              </button>
            </div>
          )}

          {/* Device Selector */}
          {(generatedUI?.html || showPreview) && <DeviceSelector device={device} onDeviceChange={onDeviceChange} />}

          {/* Preview Wrapper */}
          <div className={`preview-wrapper device-${device}`}>
            {generatedUI?.html || showPreview ? (
              <div className="preview-container">
                {/* FIXED WRAPPER: Matches CSS scale target and adds flex constraints without touching CSS */}
                <div className="preview-iframe-wrapper" style={{ minWidth: 'max-content' }}>
                  <iframe
                    title="UI Preview"
                    className={`ui-preview ${DEVICE_PRESETS[device]?.class || 'preview-desktop'}`}
                    srcDoc={iframeHTML}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    style={{
                      maxWidth: 'none',
                      flexShrink: 0,
                      width: DEVICE_PRESETS[device].width,
                      height: DEVICE_PRESETS[device].height,
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="empty-preview">
                <FaRocket className="empty-icon" />
                <p>👀 Your UI will appear here</p>
              </div>
            )}
          </div>
        </>
      ) : (
        // Code View
        <div className="code-view">
          <div className="code-tabs-header">
            <button
              className={`code-tab ${activeCodeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('html')}
            >
              📄 HTML
            </button>
            <button
              className={`code-tab ${activeCodeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('css')}
            >
              🎨 CSS
            </button>
            <button
              className={`code-tab ${activeCodeTab === 'js' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('js')}
            >
              ⚙️ JS
            </button>
          </div>

          <div className="code-content">
            {activeCodeTab === 'html' && (
              <div className="code-block">
                <button
                  className={`copy-code-btn ${copiedCode === 'HTML' ? 'copied' : ''}`}
                  onClick={() => onCopyCode(currentUIData?.html, 'HTML')}
                >
                  {copiedCode === 'HTML' ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
                <pre>
                  <code>{formatCode(currentUIData?.html)}</code>
                </pre>
              </div>
            )}

            {activeCodeTab === 'css' && (
              <div className="code-block">
                <button
                  className={`copy-code-btn ${copiedCode === 'CSS' ? 'copied' : ''}`}
                  onClick={() => onCopyCode(currentUIData?.css, 'CSS')}
                >
                  {copiedCode === 'CSS' ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
                <pre>
                  <code>{formatCode(currentUIData?.css)}</code>
                </pre>
              </div>
            )}

            {activeCodeTab === 'js' && (
              <div className="code-block">
                <button
                  className={`copy-code-btn ${copiedCode === 'JS' ? 'copied' : ''}`}
                  onClick={() => onCopyCode(currentUIData?.js, 'JS')}
                >
                  {copiedCode === 'JS' ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
                <pre>
                  <code>{formatCode(currentUIData?.js)}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== HEADER COMPONENT =====
const DashboardHeader = ({
  currentTheme,
  switchTheme,
  showAnalyticsPanel,
  setShowAnalyticsPanel,
  navigate,
  handleLogout,
  promptHistory,
  isPWAInstallable,
  handlePWAInstall,
  tokenExpireIn,
  setShowAdvancedSettings,
  showToast,
}) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>✨ AI UI Generator</h1>
      </div>

      <div className="header-right">
        {tokenExpireIn && tokenExpireIn < 5 * 60 * 1000 && tokenExpireIn > 0 && (
          <div className="token-expiry-warning">
            <FaExclamationTriangle /> {Math.floor(tokenExpireIn / 60000)}m left
          </div>
        )}

        <div className="theme-selector-wrapper">
          {['light', 'dark', 'gradient'].map((theme) => {
            const iconMap = {
              light: <FaSun />,
              dark: <FaMoon />,
              gradient: <FaPalette />,
            };

            return (
              <button
                key={theme}
                className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
                onClick={() => {
                  switchTheme(theme);
                  showToast(`Theme: ${theme}`, 'info', 1500);
                }}
                title={`${theme} theme`}
              >
                {iconMap[theme]}
              </button>
            );
          })}
        </div>

        {isPWAInstallable && (
          <button className="nav-btn pwa-install-btn" onClick={handlePWAInstall} title="Install App">
            <FaDownload />
          </button>
        )}

        <button className="nav-btn settings-btn" onClick={() => setShowAdvancedSettings(true)} title="Settings">
          <FaCog />
        </button>

        <button
          className="nav-btn analytics-btn"
          onClick={() => setShowAnalyticsPanel(!showAnalyticsPanel)}
          title="Analytics"
        >
          <FaChartBar />
        </button>

        <button className="nav-btn profile-btn" onClick={() => navigate('/profile')} title="Profile">
          <FaUser />
        </button>

        <button className="nav-btn history-btn" onClick={() => navigate('/history')} title="History">
          <FaHistory />
          <span className="nav-badge">{promptHistory.length}</span>
        </button>

        <button className="nav-btn logout-btn" onClick={handleLogout} title="Logout">
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

// ===== FOOTER COMPONENT =====
const DashboardFooter = ({ performanceMetrics }) => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-section">
        <div className="about-section">
 <div className="about-section">
  <h4>🚀 About</h4>

  <p className="about-main">
    An intelligent platform to design, preview, and optimize modern UIs faster.
  </p>

  <div className="about-features">
    <span>✨ Smart automation</span>
    <span>📱 Real-time previews</span>
    <span>⚡ Instant feedback</span>
  </div>

</div>

  <p className="about-tagline">
    Build smarter. Create faster.
  </p>
</div>
        </div>
        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li>
              <a href="/history">History</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <div className="contact-links">
            <a href="mailto:support@aiuigenerator.com">
              <FaEnvelope />
              Gmail
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
              Github
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AI UI Generator. All rights reserved.</p>
        <p>Performance: {performanceMetrics.fps} FPS</p>
      </div>
    </footer>
  );
};

// ===== KEYBOARD SHORTCUTS MODAL =====
const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="shortcuts-modal-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <h3>⌨️ Keyboard Shortcuts</h3>
        <div className="shortcuts-grid">
          <div className="shortcut-item">
            <kbd>⌘/Ctrl + Enter</kbd>
            <span>Generate UI</span>
          </div>
          <div className="shortcut-item">
            <kbd>⌘/Ctrl + T</kbd>
            <span>Toggle Code</span>
          </div>
          <div className="shortcut-item">
            <kbd>⌘/Ctrl + K</kbd>
            <span>Show Shortcuts</span>
          </div>
          <div className="shortcut-item">
            <kbd>⌘/Ctrl + Z</kbd>
            <span>Undo</span>
          </div>
          <div className="shortcut-item">
            <kbd>⌘/Ctrl + Y</kbd>
            <span>Redo</span>
          </div>
          <div className="shortcut-item">
            <kbd>Escape</kbd>
            <span>Close</span>
          </div>
        </div>
        <button className="close-btn full-width" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// ===== ADVANCED SETTINGS MODAL =====
const AdvancedSettingsModal = ({ isOpen, onClose, selectedEnhancement, setSelectedEnhancement, codeValidationErrors, performanceMetrics }) => {
  if (!isOpen) return null;

  return (
    <div className="advanced-settings-modal-overlay" onClick={onClose}>
      <div className="advanced-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚙️ Advanced Settings</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="settings-section">
          <h4>🎨 AI Enhancement</h4>
          <div className="enhancement-grid">
            {AI_ENHANCEMENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                className={`enhancement-card ${selectedEnhancement === preset.id ? 'active' : ''}`}
                onClick={() => setSelectedEnhancement(preset.id)}
                title={preset.enhancement}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h4>📊 Code Validation</h4>
          {codeValidationErrors.length > 0 ? (
            <div className="validation-errors">
              {codeValidationErrors.map((err, idx) => (
                <div key={idx} className="error-item">
                  <span className="error-type">{err.type}</span>
                  <span className="error-msg">{err.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="validation-success">✅ All code is valid</p>
          )}
        </div>

        <div className="settings-section">
          <h4>⚡ Performance</h4>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">FPS</span>
              <span className="metric-value">{performanceMetrics.fps}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Load Time</span>
              <span className="metric-value">{performanceMetrics.loadTime}ms</span>
            </div>
          </div>
        </div>

        <button className="close-btn full-width" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// ===== MAIN DASHBOARD COMPONENT =====
export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, incrementPromptCount, stats } = useAuth();
  const { generatedUI, setGeneratedUI, loading, error, success, generateUI, clearMessages } = useUIGeneration();
  const { promptHistory, addPrompt, removePrompt, clearHistory } = usePromptHistory();
  const { currentTheme, switchTheme } = useThemeHook();

  // ===== CORE STATE =====
  const [prompt, setPrompt] = useState('');
  const [device, setDevice] = useState('desktop');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUIId, setCurrentUIId] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPWAInstallable, setIsPWAInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [tokenExpireIn, setTokenExpireIn] = useState(null);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [historyStack, setHistoryStack] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedEnhancement, setSelectedEnhancement] = useState('minimal');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [codeValidationErrors, setCodeValidationErrors] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({ fps: 60, loadTime: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [htmlWithCode, setHtmlWithCode] = useState('');
  const [isMockData, setIsMockData] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalGenerated: 0,
    totalFavorites: 0,
    totalRegenerated: 0,
    averageLength: 0,
  });

  // ===== REFS =====
  const autoSaveTimerRef = useRef(null);
  const jwtCheckTimerRef = useRef(null);
  const voiceRecognitionRef = useRef(null);
  const performanceMonitorRef = useRef(null);

  // ===== TOAST SYSTEM =====
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ===== AUTO-REMOVE TOAST =====
  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((toast) => {
        return setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration || 4000);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [toasts, removeToast]);

  // ===== UNDO/REDO =====
  const pushToHistory = useCallback(
    (state) => {
      setHistoryStack((prev) => [...prev.slice(0, historyIndex + 1), state]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setPrompt(historyStack[newIndex]);
      setHistoryIndex(newIndex);
      showToast('↶ Undo', 'info', 1500);
    }
  }, [historyIndex, historyStack, showToast]);

  const redo = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setPrompt(historyStack[newIndex]);
      setHistoryIndex(newIndex);
      showToast('↷ Redo', 'info', 1500);
    }
  }, [historyIndex, historyStack, showToast]);

  // ===== VOICE INPUT =====
  const initializeVoiceRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice recognition not supported', 'error');
      return;
    }

    voiceRecognitionRef.current = new SpeechRecognition();
    voiceRecognitionRef.current.continuous = true;
    voiceRecognitionRef.current.interimResults = true;

    voiceRecognitionRef.current.onstart = () => {
      setIsVoiceActive(true);
      showToast('🎤 Listening...', 'info');
    };

    voiceRecognitionRef.current.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setPrompt((prev) => prev + ' ' + transcript);
        }
      }
    };

    voiceRecognitionRef.current.onerror = (event) => {
      showToast(`Voice error: ${event.error}`, 'error');
    };

    voiceRecognitionRef.current.onend = () => {
      setIsVoiceActive(false);
    };
  }, [showToast]);

  const toggleVoiceInput = useCallback(() => {
    if (!voiceRecognitionRef.current) {
      initializeVoiceRecognition();
    }
    if (isVoiceActive) {
      voiceRecognitionRef.current?.stop();
    } else {
      voiceRecognitionRef.current?.start();
    }
  }, [isVoiceActive, initializeVoiceRecognition]);

  // ===== CODE VALIDATION =====
  const validateCode = useCallback((html, css, js) => {
    const errors = [];
    try {
      new Function(js);
    } catch (err) {
      errors.push({ type: 'JS', message: err.message });
    }
    setCodeValidationErrors(errors);
    return errors.length === 0;
  }, []);

  // ===== PERFORMANCE MONITORING =====
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 800) {
        setPerformanceMetrics({
          fps: Math.round((frameCount * 800) / (currentTime - lastTime)),
          loadTime: 0,
        });
        frameCount = 0;
        lastTime = currentTime;
      }
      performanceMonitorRef.current = requestAnimationFrame(measurePerformance);
    };

    performanceMonitorRef.current = requestAnimationFrame(measurePerformance);
    return () => cancelAnimationFrame(performanceMonitorRef.current);
  }, []);

  // ===== JWT CHECK =====
  useEffect(() => {
    const checkTokenExpiry = () => {
      const expiryTime = localStorage.getItem('tokenExpiry');
      if (expiryTime) {
        const timeLeft = parseInt(expiryTime) - Date.now();
        setTokenExpireIn(timeLeft);
        if (timeLeft < 5 * 60 * 1000 && timeLeft > 0) {
          showToast('Your session is expiring soon!', 'warning', 10000);
        }
        if (timeLeft <= 0) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiry');
          logout();
          navigate('/login');
          showToast('Session expired', 'error');
        }
      }
    };

    checkTokenExpiry();
    jwtCheckTimerRef.current = setInterval(checkTokenExpiry, 30000);
    return () => clearInterval(jwtCheckTimerRef.current);
  }, [logout, navigate, showToast]);

  // ===== AUTO SAVE =====
  useEffect(() => {
    autoSaveTimerRef.current = setTimeout(() => {
      if (prompt.trim()) {
        try {
          const savedData = JSON.parse(localStorage.getItem('autoSavedPrompt') || '{}');
          savedData.lastPrompt = {
            text: prompt,
            timestamp: new Date().toISOString(),
            device,
            theme: currentTheme,
            enhancement: selectedEnhancement,
          };
          localStorage.setItem('autoSavedPrompt', JSON.stringify(savedData));
        } catch (err) {
          console.error('Error saving prompt:', err);
        }
      }
    }, 5000);

    return () => clearTimeout(autoSaveTimerRef.current);
  }, [prompt, device, currentTheme, selectedEnhancement]);

  // ===== LOAD AUTO-SAVED =====
  useEffect(() => {
    const loadAutoSaved = setTimeout(() => {
      try {
        const savedData = JSON.parse(localStorage.getItem('autoSavedPrompt') || '{}');
        if (savedData.lastPrompt) {
          setPrompt(savedData.lastPrompt.text);
          setDevice(savedData.lastPrompt.device || 'desktop');
          setSelectedEnhancement(savedData.lastPrompt.enhancement || 'minimal');
          showToast('✨ Loaded auto-saved prompt', 'success', 2000);
        }
      } catch (err) {
        console.error('Error loading auto-saved prompt:', err);
      }
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(loadAutoSaved);
  }, [showToast]);

  // ===== REFACTORED THEME HOOK (Respects CSS rules) =====
  useEffect(() => {
    try {
      // Let React handle the .dashboard-container class naturally via the render method.
      // This applies the necessary attributes to the DOM root without fighting CSS overrides.
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.body.setAttribute('data-theme', currentTheme);
    } catch (err) {
      console.error('Error applying theme:', err);
    }
  }, [currentTheme]);

  // ===== PWA =====
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWAInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handlePWAInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('🚀 App installed!', 'success');
          setIsPWAInstallable(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('PWA install error:', err);
      }
    }
  }, [deferredPrompt, showToast]);

  // ===== KEYBOARD SHORTCUTS =====
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (prompt.trim() && !loading) handleGenerateUI(e);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        setShowCode((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        toggleVoiceInput();
      }
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowAdvancedSettings(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prompt, generatedUI, loading, undo, redo, toggleVoiceInput]);

  // ===== SMART SUGGESTIONS =====
  useEffect(() => {
    const generateSmartSuggestions = (currentPrompt) => {
      const suggestions = [];
      const lowerPrompt = currentPrompt.toLowerCase();

      if (lowerPrompt.includes('form')) {
        suggestions.push('Add email validation', 'Include password strength');
      }
      if (lowerPrompt.includes('button')) {
        suggestions.push('Add hover effects', 'Include loading state');
      }
      if (lowerPrompt.includes('card')) {
        suggestions.push('Add shadow effects', 'Include responsive grid');
      }
      if (lowerPrompt.includes('navbar')) {
        suggestions.push('Add sticky position', 'Include search bar');
      }

      setSmartSuggestions(suggestions.slice(0, 4));
    };

    if (prompt.length > 5) {
      generateSmartSuggestions(prompt);
    } else {
      setSmartSuggestions([]);
    }
  }, [prompt]);

  // ===== FILTER HISTORY =====
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = promptHistory.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(promptHistory);
    }
  }, [searchQuery, promptHistory]);

  // ===== UPDATE ANALYTICS =====
  useEffect(() => {
    const updateAnalytics = () => {
      const stats = historyService.getAnalytics();
      setAnalytics({
        totalGenerated: stats.total || 0,
        totalFavorites: stats.favorites || 0,
        totalRegenerated: 0,
        averageLength: 0,
      });
    };

    updateAnalytics();
  }, [currentUIId, isFavorite]);

  // ===== GENERATE HTML =====
  const generateHtmlWithCode = useCallback((html, css, js) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <title>Generated UI</title>
    <style>
${css.split('\n').map((line) => '        ' + line).join('\n')}
    </style>
</head>
<body>
${html.split('\n').map((line) => '    ' + line).join('\n')}
    <script>
${js.split('\n').map((line) => '        ' + line).join('\n')}
    <\/script>
</body>
</html>`;
  }, []);

  // ===== GENERATE UI HANDLER =====
  const handleGenerateUI = useCallback(
    async (e) => {
      e?.preventDefault?.();
      if (!prompt.trim()) {
        showToast('Please enter a prompt', 'error');
        return;
      }

      pushToHistory(prompt);

      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Auth token not found', 'error');
        navigate('/login');
        return;
      }

      showToast('✨ Generating your UI...', 'info', 4000);

      const result = await generateUI(prompt, token);

      if (result && result.success) {
        try {
          validateCode(result.data?.html || '', result.data?.css || '', result.data?.js || '');

          const fullHtml = generateHtmlWithCode(
            result.data?.html || '',
            result.data?.css || '',
            result.data?.js || ''
          );
          setHtmlWithCode(fullHtml);

          // Save to history service
          const savedUI = historyService.addToHistory({
            prompt,
            html: result.data?.html || '',
            css: result.data?.css || '',
            js: result.data?.js || '',
            theme: currentTheme,
            enhancement: selectedEnhancement,
          });

          if (savedUI) {
            setCurrentUIId(savedUI.id);
            setIsFavorite(false);
            addPrompt(prompt);
            incrementPromptCount();
            setIsMockData(result.isMockData || false);

            // Update analytics immediately
            const updatedStats = historyService.getAnalytics();
            setAnalytics({
              totalGenerated: updatedStats.total || 0,
              totalFavorites: updatedStats.favorites || 0,
              totalRegenerated: 0,
              averageLength: 0,
            });

            if (result.isMockData) {
              showToast('⚠️ ', 'warning');
            } else {
              showToast('🎉 UI generated successfully!', 'success');
            }

            localStorage.removeItem('autoSavedPrompt');
            setShowPreview(false);
            setActiveCodeTab('html');
          } else {
            showToast('Failed to save UI to history', 'error');
          }
        } catch (err) {
          console.error('Error:', err);
          showToast('Failed to save UI', 'error');
        }
      } else {
        const errorMsg = result?.error || 'Generation failed';
        showToast(errorMsg, 'error');
      }
    },
    [
      prompt,
      selectedEnhancement,
      generateUI,
      currentTheme,
      addPrompt,
      navigate,
      showToast,
      pushToHistory,
      validateCode,
      generateHtmlWithCode,
      incrementPromptCount,
    ]
  );

  // ===== REGENERATE =====
  const handleRegenerate = useCallback(async () => {
    if (!prompt) {
      showToast('Enter a prompt first', 'error');
      return;
    }

    showToast('🔄 Regenerating...', 'info');
    const token = localStorage.getItem('token');
    const result = await generateUI(prompt, token);

    if (result && result.success && currentUIId) {
      validateCode(result.data?.html || '', result.data?.css || '', result.data?.js || '');
      const fullHtml = generateHtmlWithCode(
        result.data?.html || '',
        result.data?.css || '',
        result.data?.js || ''
      );
      setHtmlWithCode(fullHtml);
      historyService.incrementRegenerationCount(currentUIId);

      // Update analytics
      const updatedStats = historyService.getAnalytics();
      setAnalytics({
        totalGenerated: updatedStats.total || 0,
        totalFavorites: updatedStats.favorites || 0,
        totalRegenerated: 0,
        averageLength: 0,
      });

      showToast('✨ Regenerated!', 'success');
    }
  }, [prompt, generateUI, currentUIId, showToast, validateCode, generateHtmlWithCode]);

  // ===== PREVIEW MODE =====
  const enablePreviewMode = useCallback(() => {
    setShowPreview(true);
    setPrompt('Sample Preview');
    const fullHtml = generateHtmlWithCode(DEFAULT_UI.html, DEFAULT_UI.css, DEFAULT_UI.js);
    setHtmlWithCode(fullHtml);
    showToast('Preview mode enabled', 'info', 3000);
  }, [showToast, generateHtmlWithCode]);

  // ===== DOWNLOAD ZIP =====
  const handleDownloadZip = useCallback(async () => {
    try {
      const uiToDownload = showPreview ? DEFAULT_UI : generatedUI;
      if (!uiToDownload?.html) {
        showToast('No UI to download', 'error');
        return;
      }

      showToast('📦 Creating ZIP...', 'info');
      const success = await downloadZip(uiToDownload.html, uiToDownload.css, uiToDownload.js);
      showToast(success ? '📦 Downloaded!' : 'Download failed', success ? 'success' : 'error');
    } catch (err) {
      console.error('ZIP error:', err);
      showToast('ZIP creation failed', 'error');
    }
  }, [showPreview, generatedUI, showToast]);

  // ===== COPY CODE =====
  const handleCopyCode = useCallback(async (code, label) => {
    try {
      const success = await copyToClipboard(code);
      if (success) {
        setCopiedCode(label);
        showToast(`✅ ${label} copied!`, 'success', 2000);
        setTimeout(() => setCopiedCode(null), 2000);
      } else {
        showToast('Copy failed', 'error');
      }
    } catch (err) {
      console.error('Copy error:', err);
      showToast('Copy failed', 'error');
    }
  }, [showToast]);

  // ===== DEVICE CHANGE HANDLER =====
  const handleDeviceChange = useCallback((newDevice) => {
    setDevice(newDevice);
  }, []);

  // ===== TOGGLE FAVORITE =====
  const handleToggleFavorite = useCallback(() => {
    if (!currentUIId) {
      showToast('Generate a UI first', 'error');
      return;
    }

    try {
      const newStatus = historyService.toggleFavorite(currentUIId);
      setIsFavorite(newStatus);
      showToast(newStatus ? '❤️ Favorited!' : '💔 Removed', 'success', 2000);

      // Update analytics
      const updatedStats = historyService.getAnalytics();
      setAnalytics({
        totalGenerated: updatedStats.total || 0,
        totalFavorites: updatedStats.favorites || 0,
        totalRegenerated: 0,
        averageLength: 0,
      });
    } catch (err) {
      console.error('Favorite error:', err);
      showToast('Failed to update', 'error');
    }
  }, [currentUIId, isFavorite, showToast]);

  // ===== LOGOUT =====
  const handleLogout = useCallback(() => {
    if (window.confirm('Logout?')) {
      try {
        localStorage.removeItem('autoSavedPrompt');
        logout();
        navigate('/login');
        showToast('👋 Logged out', 'info');
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
  }, [logout, navigate, showToast]);

  // ===== FORMAT CODE =====
  const formatCode = (code) => {
    if (!code) return '';
    return code.trim();
  };

  // ===== COMPUTED VALUES =====
  const currentUIData = showPreview ? DEFAULT_UI : generatedUI;
  const iframeHTML = generateIframeHTML(currentUIData.html, currentUIData.css, currentUIData.js);

  // ===== LOADING STATE =====
  if (isInitialLoading) {
    return <LoadingSkeleton />;
  }

  // ===== RENDER =====
  return (
    <div className={`dashboard-container theme-${currentTheme}`}>
      {/* Toast Container */}
      <div className="toast-container top-right">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Modals */}
      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <AdvancedSettingsModal
        isOpen={showAdvancedSettings}
        onClose={() => setShowAdvancedSettings(false)}
        selectedEnhancement={selectedEnhancement}
        setSelectedEnhancement={setSelectedEnhancement}
        codeValidationErrors={codeValidationErrors}
        performanceMetrics={performanceMetrics}
      />

      {/* Header */}
      <DashboardHeader
        currentTheme={currentTheme}
        switchTheme={switchTheme}
        showAnalyticsPanel={showAnalyticsPanel}
        setShowAnalyticsPanel={setShowAnalyticsPanel}
        navigate={navigate}
        handleLogout={handleLogout}
        promptHistory={promptHistory}
        isPWAInstallable={isPWAInstallable}
        handlePWAInstall={handlePWAInstall}
        tokenExpireIn={tokenExpireIn}
        setShowAdvancedSettings={setShowAdvancedSettings}
        showToast={showToast}
      />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Prompt Section - Left */}
        <PromptSection
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          onGenerate={handleGenerateUI}
          onRegenerate={handleRegenerate}
          generatedUI={generatedUI}
          showToast={showToast}
          historyIndex={historyIndex}
          historyStack={historyStack}
          undo={undo}
          redo={redo}
          isVoiceActive={isVoiceActive}
          toggleVoiceInput={toggleVoiceInput}
          smartSuggestions={smartSuggestions}
          promptHistory={promptHistory}
          removePrompt={removePrompt}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredHistory={filteredHistory}
          analytics={analytics}
          selectedEnhancement={selectedEnhancement}
          setSelectedEnhancement={setSelectedEnhancement}
          showAnalyticsPanel={showAnalyticsPanel}
          setShowAnalyticsPanel={setShowAnalyticsPanel}
        />

        {/* Preview Section - Right */}
        <PreviewSection
          showCode={showCode}
          setShowCode={setShowCode}
          generatedUI={generatedUI}
          showPreview={showPreview}
          device={device}
          onDeviceChange={handleDeviceChange}
          iframeHTML={iframeHTML}
          onDownloadZip={handleDownloadZip}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          currentUIData={currentUIData}
          onEnablePreview={enablePreviewMode}
          copiedCode={copiedCode}
          onCopyCode={handleCopyCode}
          activeCodeTab={activeCodeTab}
          setActiveCodeTab={setActiveCodeTab}
          formatCode={formatCode}
        />
      </div>

      {/* Footer */}
      <DashboardFooter performanceMetrics={performanceMetrics} />
    </div>
  );
}