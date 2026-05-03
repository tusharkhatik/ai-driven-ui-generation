import React, { useState } from 'react'
import { FiCopy, FiDownload } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { downloadSingleFile } from '../../services/downloadService'
import CodeTabs from './CodeTabs'
import '../../styles/code-output.css'

const CodeOutput = ({ code, onDownload }) => {
  const [activeTab, setActiveTab] = useState('html')

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const downloadFile = (content, filename, type) => {
    const mimeType = type === 'html' ? 'text/html' : type === 'css' ? 'text/css' : 'text/javascript'
    downloadSingleFile(content, filename, mimeType)
    toast.success(`${filename} downloaded!`)
  }

  const tabs = [
    { id: 'html', label: 'HTML', icon: '<>', content: code?.html },
    { id: 'css', label: 'CSS', icon: '{}', content: code?.css },
    { id: 'js', label: 'JavaScript', icon: '(){}', content: code?.js }
  ]

  return (
    <div className="code-output-container">
      <div className="code-header">
        <h3>Generated Code</h3>
        <button 
          className="download-all-btn"
          onClick={onDownload}
          disabled={!code}
        >
          <FiDownload size={18} />
          Download All
        </button>
      </div>

      <CodeTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="code-content">
        {code ? (
          <>
            <pre className="code-block">
              <code>
                {tabs.find(t => t.id === activeTab)?.content}
              </code>
            </pre>
            <div className="code-actions">
              <button 
                onClick={() => copyToClipboard(
                  tabs.find(t => t.id === activeTab)?.content,
                  activeTab.toUpperCase()
                )}
                className="action-button"
              >
                <FiCopy size={16} />
                Copy
              </button>
              <button 
                onClick={() => downloadFile(
                  tabs.find(t => t.id === activeTab)?.content,
                  `code.${activeTab}`,
                  activeTab
                )}
                className="action-button"
              >
                <FiDownload size={16} />
                Download
              </button>
            </div>
          </>
        ) : (
          <div className="code-empty">
            <p>📝 Generated code will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeOutput