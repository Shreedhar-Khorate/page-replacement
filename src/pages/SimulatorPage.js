import React, { useState, useCallback } from 'react';
import {
  InputPanel,
  FrameDisplay,
  PlaybackControls,
  StatsPanel,
  StepTimeline,
  ComparisonMode,
} from '../components';
import { useSimulation, useAutoPlay } from '../hooks';
import { runFIFO, runLRU, runOptimal } from '../algorithms';
import '../styles/SimulatorPage.css';

export function SimulatorPage() {
  const [results, setResults] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FIFO');
  const [isLoading, setIsLoading] = useState(false);

  const currentResult = results ? results.find((r) => r.name === selectedAlgorithm) : null;
  const simulation = useSimulation(currentResult);
  const autoPlay = useAutoPlay(
    simulation.nextStep,
    simulation.totalSteps,
    false
  );

  const handleSimulate = useCallback(async (input) => {
    setIsLoading(true);
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 300));

      const fifoResult = runFIFO(input.pages, input.frameCount);
      const lruResult = runLRU(input.pages, input.frameCount);
      const optimalResult = runOptimal(input.pages, input.frameCount);

      setResults([fifoResult, lruResult, optimalResult]);
      setSelectedAlgorithm('FIFO');
      simulation.reset();
    } catch (error) {
      console.error('Error running simulation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [simulation]);

  const currentStepData = simulation.currentStepData;

  return (
    <div className="simulator-page">
      <header className="simulator-header">
        <h1>📄 Page Replacement Algorithm Simulator</h1>
        <p>Visualize and compare FIFO, LRU, and Optimal page replacement algorithms</p>
      </header>

      <div className="simulator-container">
        <aside className="sidebar-left">
          <InputPanel onSimulate={handleSimulate} isLoading={isLoading} />
        </aside>

        <main className="main-content">
          {results ? (
            <>
              <div className="algorithm-selector">
                <h3>Select Algorithm</h3>
                <div className="algorithm-buttons">
                  {results.map((result) => (
                    <button
                      key={result.name}
                      className={`algo-btn ${
                        selectedAlgorithm === result.name ? 'active' : ''
                      }`}
                      onClick={() => {
                        setSelectedAlgorithm(result.name);
                        simulation.reset();
                      }}
                    >
                      {result.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="simulation-area">
                <div className="frame-section">
                  {currentStepData ? (
                    <FrameDisplay
                      frames={currentStepData.frames}
                      currentPage={currentStepData.page}
                      status={currentStepData.status}
                      replacedPage={currentStepData.replacedPage}
                    />
                  ) : (
                    <div className="empty-simulation">No steps available</div>
                  )}
                </div>

                <PlaybackControls
                  currentStep={simulation.currentStep}
                  totalSteps={simulation.totalSteps}
                  onPrevious={simulation.previousStep}
                  onNext={
                    autoPlay.isPlaying
                      ? () => {} // No-op during auto play
                      : simulation.nextStep
                  }
                  onReset={simulation.reset}
                  canGoNext={simulation.canGoNext}
                  canGoPrevious={simulation.canGoPrevious}
                  isPlaying={autoPlay.isPlaying}
                  onPlayPause={autoPlay.togglePlayPause}
                  speed={autoPlay.speed}
                  onSpeedChange={autoPlay.changeSpeed}
                />

                <StepTimeline
                  steps={currentResult.steps}
                  currentStep={simulation.currentStep}
                  onStepClick={simulation.goToStep}
                />
              </div>
            </>
          ) : (
            <div className="no-simulation">
              <p>👈 Enter page reference string and frame count to start simulation</p>
            </div>
          )}
        </main>

        <aside className="sidebar-right">
          {results && (
            <>
              <StatsPanel stats={currentResult?.stats} algorithmName={selectedAlgorithm} />
              <ComparisonMode results={results} />
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
