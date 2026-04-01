import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePageInput, validateFrameCount } from '../utils';

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
    <div>
      <h2 className="text-xl font-semibold text-slate-200 mb-6">
        Configuration
      </h2>
      <form onSubmit={handleSimulate} className="space-y-6">
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            htmlFor="pages"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Page Reference String
          </label>
          <textarea
            id="pages"
            value={pagesInput}
            onChange={(e) => setPagesInput(e.target.value)}
            placeholder="Enter page numbers separated by commas"
            disabled={isLoading}
            className="w-full px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono text-sm resize-none"
            rows={3}
          />
          <p className="text-xs text-slate-500">
            Example: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5
          </p>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="frames"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Number of Frames
          </label>
          <input
            id="frames"
            type="number"
            min="1"
            max="10"
            value={frameCount}
            onChange={(e) => setFrameCount(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono"
          />
          <p className="text-xs text-slate-500">
            Enter a number between 1 and 10
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full solid-button disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Running Simulation...</span>
            </div>
          ) : (
            'Run Simulation'
          )}
        </motion.button>
      </form>
    </div>
  );
}
