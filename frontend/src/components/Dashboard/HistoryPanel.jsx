import React from 'react'
import '../../styles/history-panel.css'

const HistoryPanel = ({ history, onSelectItem }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="history-panel">
      {history.length === 0 ? (
        <div className="empty-history">
          <p>📋 No history yet</p>
          <p className="subtitle">Your generated UIs will appear here</p>
        </div>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={item.id} className="history-item">
              <button
                className="history-button"
                onClick={() => onSelectItem(item)}
              >
                <div className="history-number">#{index + 1}</div>
                <div className="history-details">
                  <p className="history-prompt">{item.prompt_text.substring(0, 50)}...</p>
                  <p className="history-date">{formatDate(item.created_at)}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HistoryPanel