import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  InputPanel,
  FrameDisplay,
  PlaybackControls,
  StatsPanel,
  StepTimeline,
  ComparisonMode,
} from '../components';
import { useSimulation, useAutoPlay } from '../hooks';
import { runFIFO, runLRU, runOptimal, runClock } from '../algorithms';

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
        // Simulate async operation
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
    <div className="min-h-screen bg-midnight p-6">
      {/* Header */}
      <motion.header
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-slate-300 bg-clip-text text-transparent mb-3">
          Page Replacement Simulator
        </h1>
        <p className="text-slate-400 text-xl">
          Professional algorithm visualization and analysis
        </p>
      </motion.header>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Algorithm Selection & Input */}
        <motion.aside
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6">
            <InputPanel onSimulate={handleSimulate} isLoading={isLoading} />
          </div>

          <AnimatePresence>
            {results && (
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
                  Algorithm
                </h3>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.name}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                        selectedAlgorithm === result.name
                          ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300'
                          : 'ghost-button text-slate-300 hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setSelectedAlgorithm(result.name);
                        simulation.reset();
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{result.name}</span>
                        {result.name === 'Optimal' && (
                          <span className="pill-badge text-xs">Optimal</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Main Content - Memory Frames Hero */}
        <motion.main
          className="lg:col-span-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key="simulation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Memory Frames Hero Section */}
                <div className="glass-card p-8 mb-6">
                  <h2 className="text-2xl font-bold text-slate-200 mb-6 text-center">
                    Memory Frames
                  </h2>
                  <div className="memory-slot">
                    {currentStepData ? (
                      <FrameDisplay
                        frames={currentStepData.frames}
                        currentPage={currentStepData.page}
                        status={currentStepData.status}
                        replacedPage={currentStepData.replacedPage}
                      />
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        <div className="text-6xl mb-4">🧠</div>
                        <p className="text-lg">No simulation data available</p>
                        <p className="text-sm text-slate-500 mt-2">
                          Run a simulation to visualize memory frames
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="glass-card p-6 mb-6">
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
                </div>

                {/* Timeline Scrubber */}
                <div className="glass-card p-6">
                  <StepTimeline
                    steps={currentResult.steps}
                    currentStep={simulation.currentStep}
                    onStepClick={simulation.goToStep}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="welcome"
                className="glass-card p-16 text-center min-h-[500px] flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-9xl mb-8">🚀</div>
                <h2 className="text-4xl font-bold text-slate-200 mb-6 text-center">
                  Page Replacement Simulator
                </h2>
                <p className="text-slate-400 text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-center">
                  Visualize and analyze page replacement algorithms in real-time.
                  Compare FIFO, LRU, Optimal, and Clock algorithms with interactive
                  step-by-step execution and comprehensive performance metrics.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="font-semibold text-slate-200 text-sm">Optimal</div>
                    <div className="text-xs text-slate-500 mt-1">Theoretical best</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-semibold text-slate-200 text-sm">LRU</div>
                    <div className="text-xs text-slate-500 mt-1">Least recently used</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-3xl mb-2">🔄</div>
                    <div className="font-semibold text-slate-200 text-sm">FIFO</div>
                    <div className="text-xs text-slate-500 mt-1">First in, first out</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-3xl mb-2">🕐</div>
                    <div className="font-semibold text-slate-200 text-sm">Clock</div>
                    <div className="text-xs text-slate-500 mt-1">Second chance</div>
                  </div>
                </div>
                <div className="mt-8 text-slate-500 text-sm text-center">
                  ← Configure your simulation parameters on the left panel to begin
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        {/* Right Sidebar - Stats & Comparison */}
        <motion.aside
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence>
            {results && (
              <>
                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <StatsPanel
                    stats={currentResult?.stats}
                    algorithmName={selectedAlgorithm}
                  />
                </motion.div>

                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <ComparisonMode results={results} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.aside>
      </div>
    </div>
  );
}
