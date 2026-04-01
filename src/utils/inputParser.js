/**
 * Utility functions for input validation and parsing
 */

export function parsePageInput(input) {
  if (!input || input.trim() === '') {
    throw new Error('Pages input cannot be empty');
  }

  const pages = input.split(',').map((p) => {
    const parsed = parseInt(p.trim(), 10);
    if (isNaN(parsed) || parsed < 0) {
      throw new Error('Invalid page number');
    }
    return parsed;
  });

  if (pages.length === 0) {
    throw new Error('Please enter at least one page');
  }

  return pages;
}

export function validateFrameCount(frameCount, maxFrames = 10) {
  const count = parseInt(frameCount, 10);

  if (isNaN(count) || count <= 0) {
    throw new Error('Frame count must be a positive number');
  }

  if (count > maxFrames) {
    throw new Error(`Frame count cannot exceed ${maxFrames}`);
  }

  return count;
}

export function generateRandomPages(count, maxPageNumber = 10) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * maxPageNumber)
  );
}
