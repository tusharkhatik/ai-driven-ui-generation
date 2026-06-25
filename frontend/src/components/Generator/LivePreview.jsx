import React, { useEffect, useState, forwardRef } from 'react';
import '../../styles/live-preview.css';

const LivePreview = forwardRef(({ html, css, js }, ref) => {
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    // ✅ Always build preview (even if empty)
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            overflow: auto;
          }
          ${css || ''}
        </style>
      </head>
      <body>
        ${html || '<p style="color:#888; padding: 20px; text-align: center;">Preview will appear here...</p>'}

        <script>
          try {
            ${js || ''}
          } catch (e) {
            console.error('Preview JS Error:', e);
          }
        <\/script>
      </body>
      </html>
    `;

    setSrcDoc(fullHTML);
  }, [html, css, js]);

  return (
    <div className="live-preview-container">
      <div className="preview-header">
        <h3>Live Preview</h3>
        <span className="preview-info">Responsive View</span>
      </div>

      {/* ✅ KEY IMPROVEMENTS:
          - Removed key prop to maintain iframe state
          - Added sandbox attributes
          - Better error handling
          - Proper height/width management
      */}
      <div className="preview-wrapper">
        <iframe
          ref={ref}
          srcDoc={srcDoc}
          title="Live Preview"
          className="preview-iframe"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
            display: 'block'
          }}
        />
      </div>

      {/* ✅ Fallback message */}
      {!html && (
        <div className="preview-empty">
          <p>👀 Your generated UI will appear here</p>
        </div>
      )}
    </div>
  );
});

LivePreview.displayName = 'LivePreview';

export default LivePreview;
