import React from 'react'
import { FiX, FiClock } from 'react-icons/fi'
import HistoryPanel from './HistoryPanel'
import '../../styles/sidebar.css'

const Sidebar = ({ isOpen, onClose, history, onSelectHistoryItem }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>
          <FiClock size={20} />
          History
        </h3>
        <button className="close-button" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>
      <HistoryPanel 
        history={history}
        onSelectItem={onSelectHistoryItem}
      />
    </div>
  )
}

export default Sidebar