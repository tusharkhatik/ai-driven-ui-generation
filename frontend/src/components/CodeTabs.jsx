import { useState } from 'react';
import { copyToClipboard } from '../utils/fileUtils';
import '../styles/code-tabs.css';
import { FaCopy } from 'react-icons/fa';

export default function CodeTabs({ html, css, js, onCopy }) {
  const [activeTab, setActiveTab] = useState('html');

  const handleCopy = async (code, label) => {
    const success = await copyToClipboard(code);
    if (success) {
      onCopy(`${label} copied!`);
    }
  };

  const getCode = () => {
    switch (activeTab) {
      case 'html':
        return html;
      case 'css':
        return css;
      case 'js':
        return js;
      default:
        return html;
    }
  };

  return (
    <div className="code-tabs-container">
      <div className="code-tabs-header">
        <div className="code-tabs">
          {['html', 'css', 'js'].map(tab => (
            <button
              key={tab}
              className={`code-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="copy-code-btn"
          onClick={() => handleCopy(getCode(), activeTab.toUpperCase())}
          title="Copy code"
        >
          <FaCopy /> Copy {activeTab.toUpperCase()}
        </button>
      </div>

      <pre className="code-display">
        <code>{getCode()}</code>
      </pre>
    </div>
  );
}