import React from 'react';
import '../styles/PlaybackControls.css';

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
  return (
    <div className="playback-controls">
      <div className="controls-group">
        <button
          className="btn-control"
          onClick={onReset}
          title="Reset to first step"
        >
          ⏮️ Reset
        </button>
        <button
          className="btn-control"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          title="Go to previous step"
        >
          ⏪ Previous
        </button>
        <button
          className={`btn-control btn-play ${isPlaying ? 'playing' : ''}`}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button
          className="btn-control"
          onClick={onNext}
          disabled={!canGoNext}
          title="Go to next step"
        >
          Next ⏩
        </button>
      </div>

      <div className="step-info">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="speed-control">
        <label htmlFor="speed">Speed: {speed}ms</label>
        <input
          id="speed"
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          title="Adjust animation speed"
        />
      </div>
    </div>
  );
}
