import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navbar,
  InputPanel,
  FrameDisplay,
  PlaybackControls,
  StatsPanel,
  StepTimeline,
} from '../components';
import { ComparisonChart } from '../charts';
import { useSimulation, useAutoPlay } from '../hooks';
import { runFIFO, runLRU, runOptimal, runClock } from '../algorithms';
import '../styles/SimulatorPageNew.css';

export function SimulatorPage() {
  const [results, setResults] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FIFO');
  const [isLoading, setIsLoading] = useState(false);

  const currentResult = results
    ? results.find((r) => r.name === selectedAlgorithm)
    : null;
  const simulation = useSimulation(currentResult);
  const autoPlay = useAutoPlay(
    simulation.nextStep,
    simulation.totalSteps,
    false
  );

  const handleSimulate = useCallback(
    async (input) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const fifoResult = runFIFO(input.pages, input.frameCount);
        const lruResult = runLRU(input.pages, input.frameCount);
        const optimalResult = runOptimal(input.pages, input.frameCount);
        const clockResult = runClock(input.pages, input.frameCount);

        setResults([fifoResult, lruResult, optimalResult, clockResult]);
        setSelectedAlgorithm('FIFO');
        simulation.reset();
      } catch (error) {
        console.error('Error running simulation:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [simulation]
  );

  const currentStepData = simulation.currentStepData;

  return (
    <div className="simulator-page-wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="simulator-main">
        <div className="container-max">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key="simulation-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="simulation-grid"
              >
                {/* Left Column - Configuration & Algorithm Selection */}
                <motion.section
                  className="sidebar-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="section-card">
                    <InputPanel onSimulate={handleSimulate} isLoading={isLoading} />
                  </div>

                  <motion.div
                    className="section-card algorithm-selector"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="section-header">
                      <h3 className="section-title">Select Algorithm</h3>
                    </div>
                    <div className="algorithm-buttons">
                      {results.map((result, index) => (
                        <motion.button
                          key={result.name}
                          className={`algo-button ${selectedAlgorithm === result.name ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedAlgorithm(result.name);
                            simulation.reset();
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="algo-name">{result.name}</span>
                          {result.name === 'Optimal' && (
                            <span className="algo-badge">Best</span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.section>

                {/* Center Column - Main Simulation Display */}
                <motion.section
                  className="main-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Memory Section */}
                  <div className="section-card">
                    <div className="section-header">
                      <h2 className="section-title">Memory Frames</h2>
                      <span className="section-subtitle">
                        Step {simulation.currentStep} of {simulation.totalSteps}
                      </span>
                    </div>
                    <div className="memory-display">
                      {currentStepData ? (
                        <FrameDisplay
                          frames={currentStepData.frames}
                          currentPage={currentStepData.page}
                          status={currentStepData.status}
                          replacedPage={currentStepData.replacedPage}
                        />
                      ) : (
                        <div className="empty-display">
                          <p>No simulation data</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controls Section */}
                  <div className="section-card">
                    <div className="section-header">
                      <h3 className="section-title">Playback Controls</h3>
                    </div>
                    <PlaybackControls
                      currentStep={simulation.currentStep}
                      totalSteps={simulation.totalSteps}
                      onPrevious={simulation.previousStep}
                      onNext={
                        autoPlay.isPlaying
                          ? () => {}
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
                  </div>

                  {/* Timeline Section */}
                  <div className="section-card">
                    <div className="section-header">
                      <h3 className="section-title">Step Timeline</h3>
                    </div>
                    <StepTimeline
                      steps={currentResult.steps}
                      currentStep={simulation.currentStep}
                      onStepClick={simulation.goToStep}
                    />
                  </div>
                </motion.section>

                {/* Right Column - Statistics */}
                <motion.section
                  className="sidebar-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="section-card">
                    <div className="section-header">
                      <h3 className="section-title">Statistics</h3>
                      <span className="section-subtitle">{selectedAlgorithm}</span>
                    </div>
                    <StatsPanel
                      stats={currentResult?.stats}
                      algorithmName={selectedAlgorithm}
                    />
                  </div>
                </motion.section>
              </motion.div>
            ) : (
              <motion.div
                key="welcome-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="welcome-section"
              >
                <div className="section-card welcome-card">
                  <motion.div
                    className="welcome-content"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="welcome-icon">
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <rect x="10" y="20" width="60" height="40" stroke="currentColor" strokeWidth="2" fill="none" rx="6" />
                        <line x1="10" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                        <line x1="10" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                        <circle cx="35" cy="42.5" r="3" fill="currentColor" opacity="0.6" />
                        <circle cx="55" cy="42.5" r="3" fill="currentColor" opacity="0.6" />
                      </svg>
                    </div>
                    <h1 className="welcome-title">Page Replacement Simulator</h1>
                    <p className="welcome-subtitle">
                      Visualize and analyze page replacement algorithms with interactive step-by-step execution
                    </p>

                    <div className="algorithms-grid">
                      <div className="algo-info">
                        <div className="algo-circle">1</div>
                        <h4 className="algo-title">FIFO</h4>
                        <p className="algo-desc">First In, First Out</p>
                      </div>
                      <div className="algo-info">
                        <div className="algo-circle">2</div>
                        <h4 className="algo-title">LRU</h4>
                        <p className="algo-desc">Least Recently Used</p>
                      </div>
                      <div className="algo-info">
                        <div className="algo-circle">3</div>
                        <h4 className="algo-title">Optimal</h4>
                        <p className="algo-desc">Theoretical Best</p>
                      </div>
                      <div className="algo-info">
                        <div className="algo-circle">4</div>
                        <h4 className="algo-title">Clock</h4>
                        <p className="algo-desc">Second Chance</p>
                      </div>
                    </div>

                    <p className="welcome-instruction">
                      Configure your simulation using the panel →
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="welcome-input-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <InputPanel onSimulate={handleSimulate} isLoading={isLoading} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comparison Chart Section - Full Width */}
          {results && (
            <motion.section
              className="comparison-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="section-header">
                <h2 className="section-title">Algorithm Comparison Chart</h2>
                <p className="section-subtitle">
                  Compare performance metrics across all algorithms
                </p>
              </div>
              <div className="chart-section-card">
                <ComparisonChart results={results} />
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
