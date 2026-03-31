/**
 * LRU (Least Recently Used) Page Replacement Algorithm
 * Replaces the page that hasn't been used for the longest time
 */

export function runLRU(pages, frameCount) {
  const frames = [];
  const steps = [];
  const lastUsed = {}; // Track when each page was last used
  let hits = 0;
  let faults = 0;

  pages.forEach((page, index) => {
    const isHit = frames.includes(page);

    if (isHit) {
      hits++;
      lastUsed[page] = index;
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
        lastUsed[page] = index;
      } else {
        // Find the least recently used page
        let lruPage = frames[0];
        let minTime = lastUsed[lruPage] ?? -1;

        for (const f of frames) {
          const time = lastUsed[f] ?? -1;
          if (time < minTime) {
            minTime = time;
            lruPage = f;
          }
        }

        replacedPage = lruPage;
        frames.splice(frames.indexOf(lruPage), 1);
        frames.push(page);
        lastUsed[page] = index;
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
    name: 'LRU',
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
