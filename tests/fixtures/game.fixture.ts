import { test as base, Page, expect } from '@playwright/test';
import { selectors, storageKeys } from '../helpers/selectors';
import { injectSeededRandom } from './seeded-random';
import path from 'path';

// Type definitions for game state
interface GameState {
  currentScreen: string;
  chapter: number;
  encounter: number;
  playerHP: number;
  playerMaxHP: number;
  monsterHP: number;
  monsterMaxHP: number;
  score: number;
  currentProblem: {
    answer: number;
    missingValue: number;
    a: number;
    b: number;
    display: string;
  } | null;
  minigameType: string;
  matchPairsState: {
    cards: Array<{ id: number; pairId: number; value: string }>;
    flipped: number[];
    matched: number;
  };
  isPlaying: boolean;
  isAnswering: boolean;
}

interface SaveData {
  chapter: number;
  encounter: number;
  score: number;
  timestamp: number;
}

export interface GameHelpers {
  // Navigation
  startNewGame(): Promise<void>;
  continueGame(): Promise<void>;

  // Story progression
  advanceStory(times?: number): Promise<void>;
  advanceToBattle(): Promise<void>;

  // Battle helpers
  solveCurrentMinigame(): Promise<void>;
  solveSelection(): Promise<void>;
  solveFillBlank(): Promise<void>;
  solveMatchPairs(): Promise<void>;

  // State access
  getGameState(): Promise<GameState>;
  setGameState(state: Partial<GameState>): Promise<void>;

  // Save/Load
  setSaveData(data: SaveData): Promise<void>;
  getSaveData(): Promise<SaveData | null>;
  clearSave(): Promise<void>;
  hasSave(): Promise<boolean>;

  // Timer control
  expireTimer(): Promise<void>;

  // Assertions
  expectScreen(screenId: string): Promise<void>;
  getMinigameType(): Promise<string>;
}

// Fixture options
interface GameFixtureOptions {
  seed?: number;
}

// Extended test with game helpers
export const test = base.extend<{ game: GameHelpers } & GameFixtureOptions>({
  seed: [undefined, { option: true }],

  game: async ({ page, seed }, use) => {
    // Inject seeded random if seed provided
    if (seed !== undefined) {
      await injectSeededRandom(page, seed);
    }

    // Navigate to game using file:// protocol
    const gamePath = path.resolve(process.cwd(), 'index.html');
    await page.goto(`file://${gamePath}`);

    // Wait for game to initialize
    await page.waitForSelector(selectors.screens.title);

    const helpers: GameHelpers = {
      async startNewGame() {
        await page.click(selectors.buttons.start);
        await page.waitForSelector(`${selectors.screens.story}.active`);
      },

      async continueGame() {
        await page.click(selectors.buttons.continue);
        await page.waitForSelector(`${selectors.screens.story}.active`);
      },

      async advanceStory(times = 1) {
        for (let i = 0; i < times; i++) {
          // Wait for the continue button to be visible and clickable
          await page.waitForSelector(selectors.buttons.storyContinue, {
            state: 'visible',
          });
          await page.click(selectors.buttons.storyContinue);
          await page.waitForTimeout(100); // Allow screen transition
        }
      },

      async advanceToBattle() {
        // Keep clicking story continue until we reach battle screen
        let maxClicks = 20;
        while (maxClicks > 0) {
          const isBattle = await page
            .locator(`${selectors.screens.battle}.active`)
            .isVisible();
          if (isBattle) break;

          const storyBtn = page.locator(selectors.buttons.storyContinue);
          if (await storyBtn.isVisible()) {
            await storyBtn.click();
            await page.waitForTimeout(100);
          }
          maxClicks--;
        }
        await page.waitForSelector(`${selectors.screens.battle}.active`);
      },

      async getGameState() {
        return await page.evaluate(() => {
          const gs = (window as any).GameState;
          return {
            currentScreen: gs.currentScreen,
            chapter: gs.chapter,
            encounter: gs.encounter,
            playerHP: gs.playerHP,
            playerMaxHP: gs.playerMaxHP,
            monsterHP: gs.monsterHP,
            monsterMaxHP: gs.monsterMaxHP,
            score: gs.score,
            currentProblem: gs.currentProblem,
            minigameType: gs.minigameType,
            matchPairsState: gs.matchPairsState,
            isPlaying: gs.isPlaying,
            isAnswering: gs.isAnswering,
          };
        });
      },

      async setGameState(state: Partial<GameState>) {
        await page.evaluate((newState) => {
          Object.assign((window as any).GameState, newState);
        }, state);
      },

      async solveCurrentMinigame() {
        const state = await this.getGameState();
        switch (state.minigameType) {
          case 'selection':
            await this.solveSelection();
            break;
          case 'fillBlank':
            await this.solveFillBlank();
            break;
          case 'matchPairs':
            await this.solveMatchPairs();
            break;
          default:
            throw new Error(`Unknown minigame type: ${state.minigameType}`);
        }
      },

      async solveSelection() {
        const answer = await page.evaluate(
          () => (window as any).GameState.currentProblem.answer
        );
        // Click the button with the correct answer
        await page.click(`${selectors.battle.answerOptions}:has-text("${answer}")`);
      },

      async solveFillBlank() {
        const answer = await page.evaluate(
          () => (window as any).GameState.currentProblem.missingValue
        );
        await page.fill(selectors.battle.fillBlankInput, answer.toString());
        await page.click(selectors.buttons.submitAnswer);
      },

      async solveMatchPairs() {
        // Get card data from game state
        const cards = await page.evaluate(
          () => (window as any).GameState.matchPairsState.cards
        );

        // Group cards by pairId
        const pairs = new Map<number, any[]>();
        cards.forEach((card: any) => {
          if (!pairs.has(card.pairId)) pairs.set(card.pairId, []);
          pairs.get(card.pairId)!.push(card);
        });

        // Match each pair
        for (const [, pairCards] of pairs) {
          for (const card of pairCards) {
            await page.click(`${selectors.matchPairs.card}[data-id="${card.id}"]`);
            await page.waitForTimeout(100);
          }
          await page.waitForTimeout(500); // Wait for match animation
        }
      },

      async setSaveData(data: SaveData) {
        await page.evaluate(
          ({ key, saveData }) => {
            localStorage.setItem(key, JSON.stringify(saveData));
          },
          { key: storageKeys.save, saveData: data }
        );
      },

      async getSaveData() {
        return await page.evaluate((key) => {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        }, storageKeys.save);
      },

      async clearSave() {
        await page.evaluate((key) => {
          localStorage.removeItem(key);
        }, storageKeys.save);
      },

      async hasSave() {
        return await page.evaluate((key) => {
          return localStorage.getItem(key) !== null;
        }, storageKeys.save);
      },

      async expireTimer() {
        // Simulate timer expiration by manipulating state and calling update
        await page.evaluate(() => {
          const gs = (window as any).GameState;
          const ts = (window as any).TimerSystem;

          // Set timer start time to way in the past
          gs.timerStartTime = Date.now() - 100000;
          ts.elapsed = 100000;

          // Trigger timer update which will fire time_up event
          ts.update();
        });
        await page.waitForTimeout(300); // Allow for time_up handling
      },

      async expectScreen(screenId: string) {
        await expect(page.locator(`#${screenId}-screen`)).toHaveClass(/active/);
      },

      async getMinigameType() {
        const state = await this.getGameState();
        return state.minigameType;
      },
    };

    await use(helpers);
  },
});

export { expect } from '@playwright/test';
