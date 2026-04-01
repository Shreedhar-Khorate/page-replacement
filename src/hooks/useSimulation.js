import { useState, useCallback } from 'react';

/**
 * Custom hook for managing simulation state and navigation
 */

export function useSimulation(simulationResult) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = simulationResult?.steps || [];
  const currentStepData = steps[currentStep];

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (stepNumber) => {
      const index = Math.max(0, Math.min(stepNumber - 1, steps.length - 1));
      setCurrentStep(index);
    },
    [steps.length]
  );

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const canGoNext = currentStep < steps.length - 1;
  const canGoPrevious = currentStep > 0;

  return {
    currentStep: currentStep + 1, // Return 1-based step number
    currentStepData,
    totalSteps: steps.length,
    nextStep,
    previousStep,
    goToStep,
    reset,
    canGoNext,
    canGoPrevious,
  };
}
