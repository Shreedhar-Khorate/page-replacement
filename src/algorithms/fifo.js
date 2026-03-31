/**
 * FIFO (First In First Out) Page Replacement Algorithm
 * Replaces the oldest page in memory
 */

export function runFIFO(pages, frameCount) {
  const frames = [];
  const steps = [];
  let hits = 0;
  let faults = 0;

  pages.forEach((page, index) => {
    const isHit = frames.includes(page);

    if (isHit) {
      hits++;
      steps.push({
        step: index + 1,
        page,
        frames: [...frames],
        status: 'HIT',
        replacedPage: null,
      });
    } else {
      faults++;
      let replacedPage = null;

      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        replacedPage = frames.shift();
        frames.push(page);
      }

      steps.push({
        step: index + 1,
        page,
        frames: [...frames],
        status: 'FAULT',
        replacedPage,
      });
    }
  });

  const hitRatio = pages.length > 0 ? (hits / pages.length) * 100 : 0;
  const faultRatio = pages.length > 0 ? (faults / pages.length) * 100 : 0;

  return {
    name: 'FIFO',
    steps,
    stats: {
      totalPages: pages.length,
      hits,
      faults,
      hitRatio: hitRatio.toFixed(2),
      faultRatio: faultRatio.toFixed(2),
      frameCount,
    },
  };
}
