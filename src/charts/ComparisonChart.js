import React from 'react';
import '../styles/ComparisonChart.css';

export function ComparisonChart({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  const maxHitRatio = Math.max(
    ...results.map((r) => parseFloat(r.stats.hitRatio))
  );

  return (
    <div className="comparison-chart">
      <h3>Hit Ratio Comparison</h3>
      <div className="chart-bars">
        {results.map((result) => (
          <div key={result.name} className="chart-item">
            <div className="chart-value" style={{ color: '#3b82f6' }}>
              {result.stats.hitRatio}%
            </div>
            <div
              className="chart-bar"
              style={{
                height: `${(parseFloat(result.stats.hitRatio) / maxHitRatio) * 200}px`,
              }}
            />
            <div className="chart-label">{result.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
