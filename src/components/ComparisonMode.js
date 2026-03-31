import React from 'react';
import '../styles/ComparisonMode.css';

export function ComparisonMode({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="comparison-mode">
        <h3>Algorithm Comparison</h3>
        <p className="no-data">Run simulations to compare algorithms</p>
      </div>
    );
  }

  const bestAlgorithm = results.reduce((best, current) =>
    parseFloat(current.stats.hitRatio) > parseFloat(best.stats.hitRatio) ? current : best
  );

  return (
    <div className="comparison-mode">
      <h3>Algorithm Comparison</h3>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Hits</th>
              <th>Faults</th>
              <th>Hit Ratio</th>
              <th>Fault Ratio</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.name}
                className={result.name === bestAlgorithm.name ? 'best' : ''}
              >
                <td className="algo-name">
                  {result.name}
                  {result.name === bestAlgorithm.name && ' ⭐'}
                </td>
                <td className="hits">{result.stats.hits}</td>
                <td className="faults">{result.stats.faults}</td>
                <td className="hit-ratio">{result.stats.hitRatio}%</td>
                <td className="fault-ratio">{result.stats.faultRatio}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
