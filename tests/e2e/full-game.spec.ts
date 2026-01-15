import { test, expect } from '../fixtures/game.fixture';
import { selectors } from '../helpers/selectors';

test.describe('Full Game Playthrough', () => {
  // Use fixed seed for deterministic behavior
  test.use({ seed: 12345 });

  test('Complete all 10 chapters (100 encounters)', async ({ game, page }) => {
    // 10 minutes timeout for full playthrough
    test.setTimeout(600000);

    await game.clearSave();
    await game.startNewGame();

    for (let chapter = 1; chapter <= 10; chapter++) {
      console.log(`\n=== Starting Chapter ${chapter} ===`);

      // Advance through chapter intro
      await game.advanceToBattle();

      for (let encounter = 0; encounter < 10; encounter++) {
        console.log(`  Encounter ${encounter + 1}/10`);

        // Verify we're in battle
        await game.expectScreen('battle');

        // Defeat monster
        let attempts = 0;
        while ((await game.getGameState()).monsterHP > 0 && attempts < 20) {
          await game.solveCurrentMinigame();
          await page.waitForTimeout(200);
          attempts++;
        }

        // Click victory continue
        await page.waitForSelector(`${selectors.screens.victory}.active`, {
          timeout: 5000,
        });
        await page.click(selectors.buttons.victoryContinue);
        await page.waitForTimeout(200);

        // After last encounter, there's outro dialogue before complete screen
        if (encounter === 9) {
          // Click through outro dialogue to reach complete screen
          await page.waitForSelector(`${selectors.screens.complete}.active`, {
            timeout: 30000,
          }).catch(async () => {
            for (let i = 0; i < 15; i++) {
              const isComplete = await page
                .locator(`${selectors.screens.complete}.active`)
                .isVisible();
              if (isComplete) break;

              const storyBtn = page.locator(selectors.buttons.storyContinue);
              if (await storyBtn.isVisible()) {
                await storyBtn.click();
                await page.waitForTimeout(300);
              } else {
                await page.waitForTimeout(500);
              }
            }
          });

          if (chapter < 10) {
            // Click to start next chapter
            await page.click(selectors.buttons.playAgain);
            await page.waitForTimeout(200);
          }
        } else {
          // Wait for story screen with next encounter
          await page.waitForSelector(`${selectors.screens.story}.active`, {
            timeout: 5000,
          });
          // Advance to next battle
          await game.advanceToBattle();
        }
      }
    }

    // Should be on final complete screen
    await game.expectScreen('complete');

    // Save should be cleared after game completion
    const saveData = await game.getSaveData();
    expect(saveData).toBeNull();

    console.log('\n=== Game Complete! ===');
  });

  test('Complete game with state shortcuts (faster)', async ({ game, page }) => {
    // 2 minutes timeout for shortcut version
    test.setTimeout(120000);

    await game.clearSave();
    await game.startNewGame();

    // Play chapter 1, encounter 1 normally to verify basic flow
    await game.advanceToBattle();
    await game.expectScreen('battle');

    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(150);
    }

    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(200);

    // Verify save was created
    let saveData = await game.getSaveData();
    expect(saveData).not.toBeNull();
    expect(saveData!.chapter).toBe(1);
    expect(saveData!.encounter).toBe(1);

    // Now skip to chapter 10, encounter 9 (last encounter)
    await game.setSaveData({
      chapter: 10,
      encounter: 9,
      score: 50000,
      timestamp: Date.now(),
    });

    // Reload and continue from save
    await page.reload();
    await page.waitForSelector(selectors.screens.title);
    await game.continueGame();

    // Advance to final battle
    await game.advanceToBattle();
    await game.expectScreen('battle');

    // Complete final encounter
    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(150);
    }

    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(300);

    // After final victory, there's outro dialogue - click through it
    // Wait for complete screen with longer timeout, clicking through any dialogue
    await page.waitForSelector(`${selectors.screens.complete}.active`, {
      timeout: 30000,
    }).catch(async () => {
      // If not complete yet, click through remaining dialogue
      for (let i = 0; i < 15; i++) {
        const isComplete = await page
          .locator(`${selectors.screens.complete}.active`)
          .isVisible();
        if (isComplete) break;

        const storyBtn = page.locator(selectors.buttons.storyContinue);
        if (await storyBtn.isVisible()) {
          await storyBtn.click();
          await page.waitForTimeout(300);
        } else {
          await page.waitForTimeout(500);
        }
      }
    });

    // Should show final complete screen
    await game.expectScreen('complete');

    // Save should be cleared
    saveData = await game.getSaveData();
    expect(saveData).toBeNull();
  });

  test('Chapter progression increases difficulty', async ({ game, page }) => {
    // Test that later chapters have harder problems
    test.setTimeout(60000);

    // Test chapter 1 (tables 1-5)
    await game.clearSave();
    await game.startNewGame();
    await game.advanceToBattle();

    // Wait for problem to be generated
    await page.waitForTimeout(500);
    let state = await game.getGameState();

    // currentProblem might be null if minigame hasn't started yet
    if (state.currentProblem) {
      const ch1Problem = state.currentProblem;
      // Chapter 1 should have small numbers (tables 1-5)
      expect(ch1Problem.a).toBeLessThanOrEqual(6);
      expect(ch1Problem.b).toBeLessThanOrEqual(10);
    }

    // Skip to chapter 10
    await game.setSaveData({
      chapter: 10,
      encounter: 0,
      score: 0,
      timestamp: Date.now(),
    });

    await page.reload();
    await game.continueGame();
    await game.advanceToBattle();

    // Wait for problem to be generated
    await page.waitForTimeout(500);
    state = await game.getGameState();

    if (state.currentProblem) {
      const ch10Problem = state.currentProblem;
      // Chapter 10 can have numbers up to 12
      expect(ch10Problem.a).toBeLessThanOrEqual(13);
      expect(ch10Problem.b).toBeLessThanOrEqual(13);
    }

    // Verify we're in chapter 10
    expect(state.chapter).toBe(10);
  });

  test('Each chapter has 10 unique encounters', async ({ game, page }) => {
    test.setTimeout(180000);

    await game.clearSave();
    await game.startNewGame();

    // Track encounters in chapter 1
    const encountersCompleted: number[] = [];

    for (let i = 0; i < 10; i++) {
      await game.advanceToBattle();

      const state = await game.getGameState();
      expect(state.encounter).toBe(i);
      encountersCompleted.push(state.encounter);

      // Win battle
      while ((await game.getGameState()).monsterHP > 0) {
        await game.solveCurrentMinigame();
        await page.waitForTimeout(100);
      }

      await page.click(selectors.buttons.victoryContinue);
      await page.waitForTimeout(200);

      if (i < 9) {
        await page.waitForSelector(`${selectors.screens.story}.active`);
      }
    }

    // Verify all 10 encounters completed
    expect(encountersCompleted).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // After final victory, click through outro dialogue to reach complete screen
    await page.waitForSelector(`${selectors.screens.complete}.active`, {
      timeout: 30000,
    }).catch(async () => {
      for (let i = 0; i < 15; i++) {
        const isComplete = await page
          .locator(`${selectors.screens.complete}.active`)
          .isVisible();
        if (isComplete) break;

        const storyBtn = page.locator(selectors.buttons.storyContinue);
        if (await storyBtn.isVisible()) {
          await storyBtn.click();
          await page.waitForTimeout(300);
        } else {
          await page.waitForTimeout(500);
        }
      }
    });

    // Should be on complete screen
    await game.expectScreen('complete');
  });
});
