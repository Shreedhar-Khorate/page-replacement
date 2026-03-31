import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing auto-play functionality
 */

export function useAutoPlay(onStep, totalSteps, isEnabled = false) {
  const [isPlaying, setIsPlaying] = useState(isEnabled);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    if (!isPlaying || totalSteps === 0) {
      return;
    }

    const interval = setInterval(() => {
      onStep();
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, totalSteps, onStep]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const changeSpeed = useCallback((newSpeed) => {
    setSpeed(Math.max(100, Math.min(2000, newSpeed)));
  }, []);

  return {
    isPlaying,
    speed,
    togglePlayPause,
    play,
    pause,
    changeSpeed,
  };
}
