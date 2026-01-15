import { Page } from '@playwright/test';

/**
 * Mulberry32 PRNG - fast, seedable, good distribution
 * Used to make tests deterministic by seeding Math.random()
 */
export function createSeededRandom(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Inject seeded random into page before game initializes
 * This makes minigame type selection and problem generation deterministic
 */
export async function injectSeededRandom(page: Page, seed: number): Promise<void> {
  await page.addInitScript((seedValue: number) => {
    // Mulberry32 PRNG implementation
    function mulberry32(seed: number): () => number {
      return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    Math.random = mulberry32(seedValue);
  }, seed);
}
