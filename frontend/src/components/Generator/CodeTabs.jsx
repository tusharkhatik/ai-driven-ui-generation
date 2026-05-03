import React from 'react'
import '../../styles/code-tabs.css'

const CodeTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="code-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default CodeTabs