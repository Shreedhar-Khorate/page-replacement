import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StepTimeline.css';

export function StepTimeline({ steps, currentStep, onStepClick }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="timeline-empty">
        <p className="timeline-empty-text">No steps available</p>
      </div>
    );
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="step-timeline-wrapper">
      {/* Progress indicator */}
      <div className="timeline-progress-section">
        <div className="progress-info">
          <span className="progress-text">
            Step <span className="progress-step">{currentStep}</span> of{' '}
            <span className="progress-total">{steps.length}</span>
          </span>
          {steps[currentStep - 1]?.page && (
            <span className="progress-page">
              Page {steps[currentStep - 1].page}
            </span>
          )}
        </div>
        <div className="timeline-scrubber-container">
          <motion.div
            className="timeline-progress-bar"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="timeline-marker"
            style={{ left: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step markers */}
      <div className="timeline-steps-container">
        {steps.map((step, idx) => {
          const isActive = idx + 1 === currentStep;
          const isPast = idx + 1 < currentStep;

          return (
            <motion.button
              key={idx}
              className={`timeline-step ${step.status === 'HIT' ? 'hit' : 'fault'} ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => onStepClick(idx + 1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              title={`Step ${idx + 1}: Page ${step.page} - ${step.status}`}
            >
              <div className="step-number">{idx + 1}</div>
              <div className="step-page">{step.page}</div>
              <div className="step-status-dot"></div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
