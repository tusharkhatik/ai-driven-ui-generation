import '../styles/loading-skeleton.css';

export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-item skeleton-title"></div>
        <div className="skeleton-items-row">
          <div className="skeleton-item skeleton-sm"></div>
          <div className="skeleton-item skeleton-sm"></div>
          <div className="skeleton-item skeleton-sm"></div>
          <div className="skeleton-item skeleton-sm"></div>
        </div>
      </div>

      <div className="skeleton-content">
        <div className="skeleton-sidebar">
          <div className="skeleton-item skeleton-lg"></div>
          <div className="skeleton-item skeleton-lg"></div>
          <div className="skeleton-item skeleton-lg"></div>
          <div className="skeleton-item skeleton-lg"></div>
        </div>

        <div className="skeleton-main">
          <div className="skeleton-item skeleton-xl"></div>
          <div className="skeleton-item skeleton-lg"></div>
          <div className="skeleton-item skeleton-lg"></div>
        </div>
      </div>
    </div>
  );
}