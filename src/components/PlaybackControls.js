import React from 'react';
import { motion } from 'framer-motion';
import '../styles/PlaybackControls.css';

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="playback-icon">
    <path d="M1 4v6h6M23 20v-6h-6" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

const PreviousIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="playback-icon">
    <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="playback-icon">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="playback-icon">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const NextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="playback-icon">
    <path d="M16 18h2V6h-2v12zM2 18l8.5-6L2 6v12z" />
  </svg>
);

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
    <div className="playback-controls-container">
      {/* Step Info */}
      <div className="playback-step-info">
        <span className="step-label">
          Step{' '}
          <span className="step-number">
            {currentStep}
          </span>{' '}
          of{' '}
          <span className="step-number">
            {totalSteps}
          </span>
        </span>
        <div className="progress-percent">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="playback-progress-bar">
        <motion.div
          className="playback-progress-fill"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Control Buttons */}
      <div className="playback-buttons">
        <motion.button
          className="playback-button reset-button"
          onClick={onReset}
          title="Reset to first step"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <ResetIcon />
          <span>Reset</span>
        </motion.button>

        <motion.button
          className={`playback-button previous-button ${
            !canGoPrevious ? 'disabled' : ''
          }`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          title="Previous step"
          whileHover={canGoPrevious ? { scale: 1.08 } : {}}
          whileTap={canGoPrevious ? { scale: 0.92 } : {}}
        >
          <PreviousIcon />
          <span>Previous</span>
        </motion.button>

        <motion.button
          className="playback-button play-pause-button active"
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </motion.button>

        <motion.button
          className={`playback-button next-button ${
            !canGoNext ? 'disabled' : ''
          }`}
          onClick={onNext}
          disabled={!canGoNext}
          title="Next step"
          whileHover={canGoNext ? { scale: 1.08 } : {}}
          whileTap={canGoNext ? { scale: 0.92 } : {}}
        >
          <NextIcon />
          <span>Next</span>
        </motion.button>
      </div>

      {/* Speed Control */}
      <div className="playback-speed-control">
        <label htmlFor="speed" className="speed-label">
          Animation Speed:
        </label>
        <div className="speed-slider-wrapper">
          <input
            id="speed"
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="speed-slider"
            title="Adjust animation speed"
          />
        </div>
        <span className="speed-value">
          {speed}ms
        </span>
      </div>
    </div>
  );
}
