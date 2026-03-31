import React, { useState } from 'react';
import { parsePageInput, validateFrameCount } from '../utils';
import '../styles/InputPanel.css';

export function InputPanel({ onSimulate, isLoading }) {
  const [pagesInput, setPagesInput] = useState('1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5');
  const [frameCount, setFrameCount] = useState('3');
  const [error, setError] = useState('');

  const handleSimulate = (e) => {
    e.preventDefault();
    setError('');

    try {
      const pages = parsePageInput(pagesInput);
      const frames = validateFrameCount(frameCount);

      onSimulate({ pages, frameCount: frames });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="input-panel">
      <h2>Page Replacement Simulator</h2>
      <form onSubmit={handleSimulate}>
        <div className="form-group">
          <label htmlFor="pages">Page Reference String</label>
          <textarea
            id="pages"
            value={pagesInput}
            onChange={(e) => setPagesInput(e.target.value)}
            placeholder="Enter page numbers separated by commas"
            disabled={isLoading}
          />
          <small>Example: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</small>
        </div>

        <div className="form-group">
          <label htmlFor="frames">Number of Frames</label>
          <input
            id="frames"
            type="number"
            min="1"
            max="10"
            value={frameCount}
            onChange={(e) => setFrameCount(e.target.value)}
            disabled={isLoading}
          />
          <small>Enter a number between 1 and 10</small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Running...' : 'Run Simulation'}
        </button>
      </form>
    </div>
  );
}
