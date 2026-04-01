import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePageInput, validateFrameCount } from '../utils';
import '../styles/InputPanel.css';

export function InputPanel({ onSimulate, isLoading }) {
  const [pagesInput, setPagesInput] = useState(
    '1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5'
  );
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
    <motion.div
      className="input-panel-wrapper"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="panel-header">
        <h2 className="panel-title">Configuration</h2>
        <p className="panel-subtitle">Set up your simulation</p>
      </div>

      <form onSubmit={handleSimulate} className="config-form">
        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="pages" className="form-label">
            <span className="label-icon">📝</span>
            Page Reference String
          </label>
          <textarea
            id="pages"
            value={pagesInput}
            onChange={(e) => setPagesInput(e.target.value)}
            placeholder="Enter page numbers separated by commas"
            disabled={isLoading}
            className="form-textarea"
            rows={4}
          />
          <p className="form-hint">
            Example: 1, 2, 3, 4, 1, 2, 5
          </p>
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="frames" className="form-label">
            <span className="label-icon">💾</span>
            Number of Frames (1-10)
          </label>
          <input
            id="frames"
            type="number"
            min="1"
            max="10"
            value={frameCount}
            onChange={(e) => setFrameCount(e.target.value)}
            disabled={isLoading}
            className="form-input"
          />
          <p className="form-hint">
            Memory frames available for pages
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="error-alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <span className="error-icon">⚠️</span>
              <p className="error-text">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="submit-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <span>Simulating...</span>
            </div>
          ) : (
            <div className="button-content">
              <span>Run Simulation</span>
              <span className="button-arrow">→</span>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
