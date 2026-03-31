import React from 'react';
import '../styles/StatsPanel.css';

export function StatsPanel({ stats, algorithmName }) {
  if (!stats) {
    return (
      <div className="stats-panel">
        <h3>Statistics</h3>
        <p className="no-data">Run a simulation to see statistics</p>
      </div>
    );
  }

  return (
    <div className="stats-panel">
      <h3>{algorithmName}</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total Pages</span>
          <span className="stat-value">{stats.totalPages}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Page Hits</span>
          <span className="stat-value hit">{stats.hits}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Page Faults</span>
          <span className="stat-value fault">{stats.faults}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Hit Ratio</span>
          <span className="stat-value">{stats.hitRatio}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Fault Ratio</span>
          <span className="stat-value">{stats.faultRatio}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Frame Count</span>
          <span className="stat-value">{stats.frameCount}</span>
        </div>
      </div>
    </div>
  );
}
