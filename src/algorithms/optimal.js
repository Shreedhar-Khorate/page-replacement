/**
 * Optimal Page Replacement Algorithm
 * Replaces the page that will be used farthest in the future
 */

export function runOptimal(pages, frameCount) {
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
        // Find the page that will be used farthest in the future
        let pageToReplace = frames[0];
        let farthestUse = index;

        for (const f of frames) {
          let nextUse = pages.length; // Default to infinity
          for (let i = index + 1; i < pages.length; i++) {
            if (pages[i] === f) {
              nextUse = i;
              break;
            }
          }
          if (nextUse > farthestUse) {
            farthestUse = nextUse;
            pageToReplace = f;
          }
        }

        replacedPage = pageToReplace;
        frames.splice(frames.indexOf(pageToReplace), 1);
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
    name: 'Optimal',
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
