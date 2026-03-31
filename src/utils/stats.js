/**
 * Statistics calculation utilities
 */

export function calculateStats(steps) {
  if (steps.length === 0) {
    return {
      totalSteps: 0,
      hits: 0,
      faults: 0,
      hitRatio: 0,
      faultRatio: 0,
    };
  }

  const hits = steps.filter((s) => s.status === 'HIT').length;
  const faults = steps.filter((s) => s.status === 'FAULT').length;
  const total = steps.length;

  return {
    totalSteps: total,
    hits,
    faults,
    hitRatio: ((hits / total) * 100).toFixed(2),
    faultRatio: ((faults / total) * 100).toFixed(2),
  };
}

export function compareAlgorithms(results) {
  return results.map((result) => ({
    name: result.name,
    hits: result.stats.hits,
    faults: result.stats.faults,
    hitRatio: parseFloat(result.stats.hitRatio),
    faultRatio: parseFloat(result.stats.faultRatio),
  }));
}
