import '../styles/timeline.css';
import { FaHeart, FaRegHeart, FaTrash, FaDownload } from 'react-icons/fa';

export default function TimelineHistory({ history, onFavorite, onDelete, onDownload }) {
  if (history.length === 0) {
    return <p className="timeline-empty">No history yet</p>;
  }

  return (
    <div className="timeline">
      {history.map((item, index) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-marker">
            <span className="marker-number">{index + 1}</span>
          </div>

          <div className="timeline-content">
            <div className="timeline-header">
              <h4 className="timeline-title">{item.prompt.substring(0, 60)}...</h4>
              <span className="timeline-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="timeline-prompt">{item.prompt}</p>

            <div className="timeline-meta">
              <span className="meta-regenerated">🔄 {item.regenerationCount || 0}</span>
            </div>

            <div className="timeline-actions">
              <button
                className="action-btn favorite"
                onClick={() => onFavorite(item.id)}
                title="Add to favorites"
              >
                {item.isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button
                className="action-btn download"
                onClick={() => onDownload(item)}
                title="Download"
              >
                <FaDownload />
              </button>
              <button
                className="action-btn delete"
                onClick={() => onDelete(item.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}