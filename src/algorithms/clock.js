/**
 * Clock Page Replacement Algorithm
 * Uses a circular list with reference bits
 */

export function runClock(pages, frameCount) {
  const frames = [];
  const referenceBits = [];
  const steps = [];
  let hits = 0;
  let faults = 0;
  let clockHand = 0;

  pages.forEach((page, index) => {
    const frameIndex = frames.indexOf(page);

    if (frameIndex !== -1) {
      // Hit: set reference bit
      hits++;
      referenceBits[frameIndex] = 1;
      steps.push({
        step: index + 1,
        page,
        frames: [...frames],
        status: 'HIT',
        replacedPage: null,
      });
    } else {
      // Fault
      faults++;
      let replacedPage = null;

      if (frames.length < frameCount) {
        // Add to frames
        frames.push(page);
        referenceBits.push(1);
      } else {
        // Find victim using clock algorithm
        while (true) {
          if (referenceBits[clockHand] === 0) {
            // Replace this page
            replacedPage = frames[clockHand];
            frames[clockHand] = page;
            referenceBits[clockHand] = 1;
            break;
          } else {
            // Give second chance
            referenceBits[clockHand] = 0;
          }
          clockHand = (clockHand + 1) % frameCount;
        }
        clockHand = (clockHand + 1) % frameCount;
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
    name: 'Clock',
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
