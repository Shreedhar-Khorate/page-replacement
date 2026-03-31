import React from 'react';
import '../styles/StepTimeline.css';

export function StepTimeline({ steps, currentStep, onStepClick }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="step-timeline">
        <h3>Step Timeline</h3>
        <p className="no-data">No steps available</p>
      </div>
    );
  }

  return (
    <div className="step-timeline">
      <h3>Step Timeline</h3>
      <div className="timeline-container">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`timeline-step ${step.status.toLowerCase()} ${
              idx + 1 === currentStep ? 'active' : ''
            }`}
            onClick={() => onStepClick(idx + 1)}
            title={`Step ${idx + 1}: Page ${step.page}, ${step.status}`}
          >
            <div className="step-number">{idx + 1}</div>
            <div className="step-page">{step.page}</div>
            <div className="step-status">{step.status.charAt(0)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
