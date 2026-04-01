import React from 'react';
import { motion } from 'framer-motion';

export function PlaybackControls({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onReset,
  canGoNext,
  canGoPrevious,
  isPlaying,
  onPlayPause,
  speed,
  onSpeedChange,
}) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Step Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Step{' '}
          <span className="font-mono font-semibold text-slate-200">
            {currentStep}
          </span>{' '}
          of{' '}
          <span className="font-mono font-semibold text-slate-200">
            {totalSteps}
          </span>
        </span>
        <div className="text-xs text-slate-500">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-2">
        <motion.button
          className="ghost-button px-3 py-2 text-sm"
          onClick={onReset}
          title="Reset to first step"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">⏮️</span>
        </motion.button>

        <motion.button
          className={`ghost-button px-3 py-2 text-sm ${
            !canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          title="Go to previous step"
          whileHover={canGoPrevious ? { scale: 1.05 } : {}}
          whileTap={canGoPrevious ? { scale: 0.95 } : {}}
        >
          <span className="text-lg">⏪</span>
        </motion.button>

        <motion.button
          className={`outline-button px-4 py-2 text-sm font-medium ${
            isPlaying
              ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
              : ''
          }`}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg mr-1">{isPlaying ? '⏸️' : '▶️'}</span>
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>

        <motion.button
          className={`ghost-button px-3 py-2 text-sm ${
            !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onNext}
          disabled={!canGoNext}
          title="Go to next step"
          whileHover={canGoNext ? { scale: 1.05 } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
        >
          <span className="text-lg">⏩</span>
        </motion.button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center space-x-3">
        <label
          htmlFor="speed"
          className="text-sm text-slate-400 whitespace-nowrap"
        >
          Speed:
        </label>
        <div className="flex-1">
          <input
            id="speed"
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            title="Adjust animation speed"
          />
        </div>
        <span className="text-sm font-mono text-slate-300 min-w-[3rem]">
          {speed}ms
        </span>
      </div>
    </div>
  );
}
