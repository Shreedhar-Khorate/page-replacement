import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ComparisonMode.css';

const ComparisonIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v18M3 12h18M6 6l6 6-6 6M12 6l6 6-6 6" />
  </svg>
);

export function ComparisonMode({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="comparison-mode-container">
        <h3 className="comparison-title">
          Algorithm Comparison
        </h3>
        <div className="comparison-empty-state">
          <div className="comparison-icon">
            <ComparisonIcon />
          </div>
          <p className="comparison-empty-text">Run simulations to compare algorithms</p>
        </div>
      </div>
    );
  }

  const bestAlgorithm = results.reduce((best, current) =>
    parseFloat(current.stats.hitRatio) > parseFloat(best.stats.hitRatio)
      ? current
      : best
  );

  return (
    <div className="comparison-mode-container">
      <h3 className="comparison-title">
        Algorithm Comparison
      </h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Hits</th>
              <th>Faults</th>
              <th>Hit %</th>
              <th>Fault %</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <motion.tr
                key={result.name}
                className={`comparison-row ${
                  result.name === bestAlgorithm.name ? 'best-algorithm' : ''
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="algorithm-cell">
                  <div className="algorithm-info">
                    <span className="algorithm-name">
                      {result.name}
                    </span>
                    {result.name === 'Optimal' && (
                      <span className="algorithm-badge optimal">Optimal</span>
                    )}
                    {result.name === bestAlgorithm.name &&
                      result.name !== 'Optimal' && (
                        <span className="algorithm-badge best">Best</span>
                      )}
                  </div>
                </td>
                <td className="stats-cell hits-cell">
                  <span className="stat-value-hits">
                    {result.stats.hits}
                  </span>
                </td>
                <td className="stats-cell faults-cell">
                  <span className="stat-value-faults">
                    {result.stats.faults}
                  </span>
                </td>
                <td className="stats-cell">
                  <span className="stat-value">
                    {result.stats.hitRatio}%
                  </span>
                </td>
                <td className="stats-cell">
                  <span className="stat-value">
                    {result.stats.faultRatio}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
