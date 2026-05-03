// src/pages/History.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { historyService } from '../services/historyService';
import { FaArrowLeft, FaTrash, FaEye, FaHeart, FaRegHeart, FaCopy, FaCheck, FaDownload } from 'react-icons/fa';
import { copyToClipboard, downloadZip, generateIframeHTML } from '../utils/fileUtils';
import '../styles/history.css';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUI, setSelectedUI] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [toasts, setToasts] = useState([]);

  // Load history on mount
  useEffect(() => {
    const loadHistory = () => {
      const historyData = historyService.getHistory();
      setHistory(historyData);
      setFilteredHistory(historyData);
    };
    loadHistory();
  }, []);

  // Filter history based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = history.filter(item =>
        item.prompt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(history);
    }
  }, [searchQuery, history]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleViewPreview = (item) => {
    setSelectedUI(item);
    setShowPreviewModal(true);
    setActiveTab('preview');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this UI from history?')) {
      historyService.deleteHistoryItem(id);
      const updated = history.filter(item => item.id !== id);
      setHistory(updated);
      setFilteredHistory(updated);
      showToast('🗑️ Deleted from history', 'success');
    }
  };

  const handleToggleFavorite = (id) => {
    const isFav = historyService.toggleFavorite(id);
    const updated = history.map(item =>
      item.id === id ? { ...item, isFavorite: isFav } : item
    );
    setHistory(updated);
    setFilteredHistory(updated);
    if (selectedUI?.id === id) {
      setSelectedUI({ ...selectedUI, isFavorite: isFav });
    }
    showToast(isFav ? '❤️ Favorited!' : '💔 Removed', 'success');
  };

  const handleCopyCode = async (code, label) => {
    try {
      const success = await copyToClipboard(code);
      if (success) {
        setCopiedCode(label);
        showToast(`✅ ${label} copied!`, 'success');
        setTimeout(() => setCopiedCode(null), 2000);
      }
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const handleDownload = async () => {
    try {
      if (!selectedUI?.html) {
        showToast('No UI to download', 'error');
        return;
      }
      showToast('📦 Creating ZIP...', 'info');
      const success = await downloadZip(selectedUI.html, selectedUI.css, selectedUI.js);
      showToast(success ? '📦 Downloaded!' : 'Download failed', success ? 'success' : 'error');
    } catch (err) {
      showToast('Download failed', 'error');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const getThemeLabel = (theme) => {
    const themes = {
      light: '☀️ Light',
      dark: '🌙 Dark',
      default: '🎨 Default'
    };
    return themes[theme] || theme;
  };

  const iframeHTML = selectedUI ? generateIframeHTML(selectedUI.html, selectedUI.css, selectedUI.js) : '';

  return (
    <div className="history-page">
      {/* Toast Container */}
      <div className="toast-container top-right">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="history-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Back
        </button>
        <h1>📚 UI History</h1>
      </div>

      {/* Search Bar */}
      <div className="history-search">
        <input
          type="text"
          placeholder="Search by prompt..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="result-count">{filteredHistory.length} items</span>
      </div>

      {/* History Grid */}
      <div className="history-container">
        {filteredHistory.length > 0 ? (
          <div className="history-grid">
            {filteredHistory.map((item) => (
              <div key={item.id} className="history-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="card-date">
                    <span className="date-label">📅</span>
                    <span className="date-value">{formatDate(item.createdAt)}</span>
                  </div>
                  <button
                    className={`favorite-btn ${item.isFavorite ? 'active' : ''}`}
                    onClick={() => handleToggleFavorite(item.id)}
                    title={item.isFavorite ? 'Remove favorite' : 'Add favorite'}
                  >
                    {item.isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                {/* Card Prompt */}
                <div className="card-prompt">
                  <p className="prompt-text">"{item.prompt}"</p>
                </div>

                {/* Card Meta */}
                <div className="card-meta">
                  <span className="meta-badge">{getThemeLabel(item.theme)}</span>
                  <span className="meta-badge enhancement">{item.enhancement || 'default'}</span>
                  <span className="meta-badge">Generated</span>
                </div>

                {/* Card Preview Placeholder */}
                <div className="card-preview-placeholder">
                  <FaEye className="eye-icon" />
                  <span>Click to preview</span>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <button
                    className="action-btn preview-btn"
                    onClick={() => handleViewPreview(item)}
                    title="View Preview"
                  >
                    <FaEye /> Preview
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No UI history yet. Generate your first UI to get started!</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedUI && (
        <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title">
                <h2>Preview: {selectedUI.prompt}</h2>
                <span className="modal-date">{formatDate(selectedUI.createdAt)}</span>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowPreviewModal(false)}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="modal-tabs">
              <button
                className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                👁️ Preview
              </button>
              <button
                className={`tab ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                📄 HTML
              </button>
              <button
                className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                🎨 CSS
              </button>
              <button
                className={`tab ${activeTab === 'js' ? 'active' : ''}`}
                onClick={() => setActiveTab('js')}
              >
                ⚙️ JS
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {activeTab === 'preview' && (
                <div className="preview-section">
                  <div className="preview-container">
                    <iframe
                      title="UI Preview"
                      className="preview-iframe"
                      srcDoc={iframeHTML}
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'html' && (
                <div className="code-section">
                  <div className="code-header">
                    <button
                      className={`copy-btn ${copiedCode === 'HTML' ? 'copied' : ''}`}
                      onClick={() => handleCopyCode(selectedUI.html, 'HTML')}
                    >
                      {copiedCode === 'HTML' ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
                    </button>
                  </div>
                  <pre><code>{selectedUI.html}</code></pre>
                </div>
              )}

              {activeTab === 'css' && (
                <div className="code-section">
                  <div className="code-header">
                    <button
                      className={`copy-btn ${copiedCode === 'CSS' ? 'copied' : ''}`}
                      onClick={() => handleCopyCode(selectedUI.css, 'CSS')}
                    >
                      {copiedCode === 'CSS' ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
                    </button>
                  </div>
                  <pre><code>{selectedUI.css}</code></pre>
                </div>
              )}

              {activeTab === 'js' && (
                <div className="code-section">
                  <div className="code-header">
                    <button
                      className={`copy-btn ${copiedCode === 'JS' ? 'copied' : ''}`}
                      onClick={() => handleCopyCode(selectedUI.js, 'JS')}
                    >
                      {copiedCode === 'JS' ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
                    </button>
                  </div>
                  <pre><code>{selectedUI.js}</code></pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                className="download-btn"
                onClick={handleDownload}
                title="Download as ZIP"
              >
                <FaDownload /> Download ZIP
              </button>
              <button
                className="close-modal-btn"
                onClick={() => setShowPreviewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}