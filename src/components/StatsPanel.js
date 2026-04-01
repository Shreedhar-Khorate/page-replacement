import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StatsPanel.css';

export function StatsPanel({ stats, algorithmName }) {
  if (!stats) {
    return (
      <div className="stats-panel-empty">
        <p className="empty-message">Run a simulation to see statistics</p>
      </div>
    );
  }

  const statItems = [
    { label: 'Total Pages', value: stats.totalPages, icon: '1', type: 'neutral' },
    { label: 'Page Hits', value: stats.hits, icon: '2', type: 'hit' },
    { label: 'Page Faults', value: stats.faults, icon: '3', type: 'fault' },
    { label: 'Hit Ratio', value: `${stats.hitRatio}%`, icon: '4', type: 'neutral' },
    { label: 'Fault Ratio', value: `${stats.faultRatio}%`, icon: '5', type: 'neutral' },
    { label: 'Frame Count', value: stats.frameCount, icon: '6', type: 'neutral' },
  ];

  return (
    <div className="stats-panel-wrapper">
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`stat-card ${item.type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{item.label}</div>
              <div className={`stat-value ${item.type}`}>
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
