import '../styles/prompt-history.css';
import { FaHistory, FaTrash } from 'react-icons/fa';

export default function PromptHistory({ history, onSelect, onDelete, disabled }) {
  if (history.length === 0) {
    return (
      <div className="prompt-history-empty">
        <FaHistory /> No history yet
      </div>
    );
  }

  return (
    <div className="prompt-history">
      <h3 className="history-title">📝 Recent Prompts</h3>
      <div className="history-list">
        {history.slice(0, 5).map((prompt, index) => (
          <div key={index} className="history-item">
            <button
              className="history-text"
              onClick={() => onSelect(prompt)}
              disabled={disabled}
              title="Use this prompt"
            >
              {prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt}
            </button>
            <button
              className="history-delete"
              onClick={() => onDelete(prompt)}
              disabled={disabled}
              title="Delete from history"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}