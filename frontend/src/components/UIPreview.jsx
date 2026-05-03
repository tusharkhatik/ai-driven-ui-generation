import React, { useState, useRef } from 'react';
import '../styles/ui-preview.css';

export default function UIPreview({ html = '', css = '', js = '' }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [scale, setScale] = useState(100);
  const iframeRef = useRef(null);

  // Device presets
  const devices = {
    desktop: { width: '100%', height: '100%', label: '🖥️ Desktop', icon: '💻' },
    tablet: { width: '768px', height: '1024px', label: '📱 Tablet', icon: '📱' },
    mobile: { width: '375px', height: '667px', label: '📲 Mobile', icon: '📲' },
  };

  const currentDevice = devices[deviceMode];
  const isMobile = deviceMode !== 'desktop';

  // Generate proper srcDoc for iframe
  const generateSrcDoc = () => {
    if (!html) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: white;
              }
              .placeholder {
                text-align: center;
              }
              .placeholder h2 {
                font-size: 2rem;
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>
            <div class="placeholder">
              <h2>📝 No Preview Available</h2>
              <p>Generate a UI to see the preview</p>
            </div>
          </body>
        </html>
      `;
    }

    // Properly embed CSS and JS
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

${css || ''}
          </style>
        </head>
        <body>
          ${html || ''}
          <script>
${js || ''}
          </script>
        </body>
      </html>
    `;
  };

  const copyToClipboard = (code, type) => {
    navigator.clipboard.writeText(code);
    alert(`✅ ${type} copied to clipboard!`);
  };

  const downloadFile = (code, filename, type) => {
    const blob = new Blob([code], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllFiles = () => {
    const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated UI</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;

    downloadFile(completeHTML, 'index.html', 'text/html');
  };

  return (
    <div className="ui-preview-container">
      {/* Header with Tabs */}
      <div className="preview-header">
        <div className="preview-tabs">
          <button
            className={`preview-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            📱 Preview
          </button>
          <button
            className={`preview-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            💻 Code
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="device-selector">
            {Object.entries(devices).map(([key, device]) => (
              <button
                key={key}
                className={`device-btn ${deviceMode === key ? 'active' : ''}`}
                onClick={() => setDeviceMode(key)}
                title={device.label}
              >
                {device.icon}
              </button>
            ))}

            {isMobile && (
              <div className="scale-controls">
                <button
                  className="scale-btn"
                  onClick={() => setScale(Math.max(50, scale - 10))}
                >
                  −
                </button>
                <span className="scale-value">{scale}%</span>
                <button
                  className="scale-btn"
                  onClick={() => setScale(Math.min(150, scale + 10))}
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="preview-content">
        {activeTab === 'preview' ? (
          // Preview Tab
          <div className="preview-area">
            <div 
              className="device-container" 
              style={{ 
                transform: isMobile ? `scale(${scale / 100})` : 'none',
                transformOrigin: 'top center'
              }}
            >
              <div
                className={`device-frame ${deviceMode}`}
                style={{
                  width: isMobile ? currentDevice.width : '100%',
                  height: isMobile ? currentDevice.height : '100%',
                }}
              >
                {deviceMode === 'mobile' && <div className="notch"></div>}
                <iframe
                  ref={iframeRef}
                  srcDoc={generateSrcDoc()}
                  className="preview-iframe"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  title="UI Preview"
                  key={`${deviceMode}-${scale}`}
                />
              </div>
            </div>
          </div>
        ) : (
          // Code Tab
          <div className="code-area">
            <CodeViewer html={html} css={css} js={js} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="preview-actions">
        <button
          className="action-btn download-html"
          onClick={() => downloadFile(html, 'index.html', 'text/html')}
          disabled={!html}
        >
          📄 HTML
        </button>
        <button
          className="action-btn download-css"
          onClick={() => downloadFile(css, 'style.css', 'text/css')}
          disabled={!css}
        >
          🎨 CSS
        </button>
        <button
          className="action-btn download-js"
          onClick={() => downloadFile(js, 'script.js', 'text/javascript')}
          disabled={!js}
        >
          ⚙️ JS
        </button>
        <button
          className="action-btn download-all"
          onClick={downloadAllFiles}
          disabled={!html}
        >
          📦 All
        </button>
      </div>
    </div>
  );
}

// Code Viewer Component
function CodeViewer({ html, css, js }) {
  const [activeCode, setActiveCode] = useState('html');

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert('✅ Code copied to clipboard!');
  };

  return (
    <div className="code-viewer">
      <div className="code-tabs">
        <button
          className={`code-tab ${activeCode === 'html' ? 'active' : ''}`}
          onClick={() => setActiveCode('html')}
        >
          HTML
        </button>
        <button
          className={`code-tab ${activeCode === 'css' ? 'active' : ''}`}
          onClick={() => setActiveCode('css')}
        >
          CSS
        </button>
        <button
          className={`code-tab ${activeCode === 'js' ? 'active' : ''}`}
          onClick={() => setActiveCode('js')}
        >
          JavaScript
        </button>
        <button
          className="code-copy-btn"
          onClick={() => copyToClipboard(
            activeCode === 'html' ? html : activeCode === 'css' ? css : js
          )}
        >
          📋 Copy
        </button>
      </div>

      <div className="code-display">
        <pre className="code-content">
          <code>
            {activeCode === 'html' && html}
            {activeCode === 'css' && css}
            {activeCode === 'js' && js}
          </code>
        </pre>
      </div>
    </div>
  );
}