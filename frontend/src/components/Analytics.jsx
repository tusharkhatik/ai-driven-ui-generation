// src/components/Analytics.jsx
import { useMemo } from 'react';
import '../styles/analytics.css';
import { FaChartBar, FaHeart, FaRedo, FaFileAlt } from 'react-icons/fa';

export default function Analytics({ stats = {} }) {
  // Ensure we have default values for all stats
  const analyticsData = useMemo(() => ({
    totalGenerated: stats?.total || stats?.totalGenerated || 0,
    totalFavorites: stats?.favorites || stats?.totalFavorites || 0,
    totalRegenerated: stats?.regenerationCount || stats?.totalRegenerated || 0,
    averageLength: stats?.averageLength || stats?.avgLength || 0
  }), [stats]);

  return (
    <div className="analytics-container">
      <h3 className="analytics-title">📊 Your Analytics</h3>
      
      <div className="analytics-grid">
        {/* Generated Count */}
        <div className="analytics-card">
          <div className="analytics-icon generated">
            <FaFileAlt />
          </div>
          <div className="analytics-content">
            <p className="analytics-label">Generated</p>
            <p className="analytics-value">{analyticsData.totalGenerated}</p>
          </div>
        </div>

        {/* Favorites Count */}
        <div className="analytics-card">
          <div className="analytics-icon heart">
            <FaHeart />
          </div>
          <div className="analytics-content">
            <p className="analytics-label">Favorites</p>
            <p className="analytics-value">{analyticsData.totalFavorites}</p>
          </div>
        </div>

        {/* Regenerated Count */}
        <div className="analytics-card">
          <div className="analytics-icon regenerated">
            <FaRedo />
          </div>
          <div className="analytics-content">
            <p className="analytics-label">Regenerated</p>
            <p className="analytics-value">{analyticsData.totalRegenerated}</p>
          </div>
        </div>

        {/* Average Length */}
        <div className="analytics-card">
          <div className="analytics-icon average">
            <FaChartBar />
          </div>
          <div className="analytics-content">
            <p className="analytics-label">Avg Length</p>
            <p className="analytics-value">{Math.round(analyticsData.averageLength)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}