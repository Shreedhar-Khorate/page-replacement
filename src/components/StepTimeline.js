import React from 'react';
import { motion } from 'framer-motion';

export function StepTimeline({ steps, currentStep, onStepClick }) {
  if (!steps || steps.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Timeline</h3>
        <div className="text-center py-8 text-slate-500">
          <div className="text-3xl mb-2">⏱️</div>
          <p className="text-sm">No steps available</p>
        </div>
      </div>
    );
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Timeline</h3>

      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>
            {steps[currentStep - 1]?.page &&
              `Page ${steps[currentStep - 1].page}`}
          </span>
        </div>
        <div className="timeline-scrubber relative cursor-pointer">
          <motion.div
            className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
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
      <div className="relative">
        <div className="flex justify-between items-center">
          {steps.map((step, idx) => {
            const isActive = idx + 1 === currentStep;
            const isPast = idx + 1 < currentStep;

            return (
              <motion.button
                key={idx}
                className={`relative flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-500/20 border border-indigo-500/50'
                    : isPast
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                }`}
                onClick={() => onStepClick(idx + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* Step number */}
                <div
                  className={`text-xs font-mono font-bold mb-1 ${
                    isActive
                      ? 'text-indigo-400'
                      : isPast
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                  }`}
                >
                  {idx + 1}
                </div>

                {/* Page number */}
                <div
                  className={`text-sm font-mono font-semibold ${
                    isActive
                      ? 'text-slate-200'
                      : isPast
                        ? 'text-slate-300'
                        : 'text-slate-500'
                  }`}
                >
                  {step.page}
                </div>

                {/* Status indicator */}
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    step.status === 'HIT' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
