import { runFIFO } from '../algorithms/fifo';
import { runLRU } from '../algorithms/lru';
import { runOptimal } from '../algorithms/optimal';
import { runClock } from '../algorithms/clock';

describe('Page Replacement Algorithms', () => {
  const pages = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
  const frameCount = 3;

  describe('FIFO Algorithm', () => {
    test('should simulate FIFO correctly', () => {
      const result = runFIFO(pages, frameCount);

      expect(result.name).toBe('FIFO');
      expect(result.steps).toHaveLength(pages.length);
      expect(result.stats.totalPages).toBe(pages.length);
      expect(result.stats.frameCount).toBe(frameCount);
      expect(result.stats.hits + result.stats.faults).toBe(pages.length);
    });

    test('should calculate correct hit and fault ratios', () => {
      const result = runFIFO(pages, frameCount);

      expect(result.stats.hitRatio).toBeDefined();
      expect(result.stats.faultRatio).toBeDefined();
      expect(
        parseFloat(result.stats.hitRatio) + parseFloat(result.stats.faultRatio)
      ).toBeCloseTo(100);
    });
  });

  describe('LRU Algorithm', () => {
    test('should simulate LRU correctly', () => {
      const result = runLRU(pages, frameCount);

      expect(result.name).toBe('LRU');
      expect(result.steps).toHaveLength(pages.length);
      expect(result.stats.totalPages).toBe(pages.length);
      expect(result.stats.frameCount).toBe(frameCount);
      expect(result.stats.hits + result.stats.faults).toBe(pages.length);
    });
  });

  describe('Optimal Algorithm', () => {
    test('should simulate Optimal correctly', () => {
      const result = runOptimal(pages, frameCount);

      expect(result.name).toBe('Optimal');
      expect(result.steps).toHaveLength(pages.length);
      expect(result.stats.totalPages).toBe(pages.length);
      expect(result.stats.frameCount).toBe(frameCount);
      expect(result.stats.hits + result.stats.faults).toBe(pages.length);
    });
  });

  describe('Clock Algorithm', () => {
    test('should simulate Clock correctly', () => {
      const result = runClock(pages, frameCount);

      expect(result.name).toBe('Clock');
      expect(result.steps).toHaveLength(pages.length);
      expect(result.stats.totalPages).toBe(pages.length);
      expect(result.stats.frameCount).toBe(frameCount);
      expect(result.stats.hits + result.stats.faults).toBe(pages.length);
    });
  });
});
