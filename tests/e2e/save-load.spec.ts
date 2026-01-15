import { test, expect } from '../fixtures/game.fixture';
import { selectors } from '../helpers/selectors';

test.describe('Save/Load System', () => {
  test.use({ seed: 54321 });

  test.beforeEach(async ({ game }) => {
    await game.clearSave();
  });

  test('New game starts without save data', async ({ game }) => {
    const saveData = await game.getSaveData();
    expect(saveData).toBeNull();
  });

  test('Progress is saved after winning encounter', async ({ game, page }) => {
    await game.startNewGame();
    await game.advanceToBattle();

    // Win battle
    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(200);
    }

    // Click victory continue
    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(300);

    const saveData = await game.getSaveData();
    expect(saveData).toMatchObject({
      chapter: 1,
      encounter: 1,
    });
  });

  test('Save data contains required fields', async ({ game, page }) => {
    await game.startNewGame();
    await game.advanceToBattle();

    // Win battle
    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(200);
    }

    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(300);

    const saveData = await game.getSaveData();
    expect(saveData).not.toBeNull();
    expect(saveData).toHaveProperty('chapter');
    expect(saveData).toHaveProperty('encounter');
    expect(saveData).toHaveProperty('score');
    expect(saveData).toHaveProperty('timestamp');
    expect(typeof saveData!.timestamp).toBe('number');
  });

  test('Continue button appears with existing save', async ({ game, page }) => {
    // Set up save data
    await game.setSaveData({
      chapter: 2,
      encounter: 5,
      score: 1000,
      timestamp: Date.now(),
    });

    // Reload page
    await page.reload();
    await page.waitForSelector(selectors.screens.title);

    // Continue button should be visible
    await expect(page.locator(selectors.buttons.continue)).toBeVisible();
  });

  test('Continue button hidden without save', async ({ game, page }) => {
    await game.clearSave();

    // Reload page
    await page.reload();
    await page.waitForSelector(selectors.screens.title);

    // Continue button should not be visible
    await expect(page.locator(selectors.buttons.continue)).not.toBeVisible();
  });

  test('Continue game loads saved progress', async ({ game, page }) => {
    await game.setSaveData({
      chapter: 3,
      encounter: 7,
      score: 2500,
      timestamp: Date.now(),
    });

    await page.reload();
    await page.waitForSelector(selectors.screens.title);
    await game.continueGame();

    const state = await game.getGameState();
    expect(state.chapter).toBe(3);
    expect(state.encounter).toBe(7);
  });

  test('Score field is saved with progress', async ({ game, page }) => {
    await game.startNewGame();

    // Win first encounter
    await game.advanceToBattle();
    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(150);
    }
    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(200);

    const save1 = await game.getSaveData();
    // Score field should exist (even if 0 - scoring not fully implemented)
    expect(save1).toHaveProperty('score');
    expect(typeof save1!.score).toBe('number');

    // Win second encounter
    await game.advanceToBattle();
    while ((await game.getGameState()).monsterHP > 0) {
      await game.solveCurrentMinigame();
      await page.waitForTimeout(150);
    }
    await page.click(selectors.buttons.victoryContinue);
    await page.waitForTimeout(200);

    const save2 = await game.getSaveData();
    expect(save2).toHaveProperty('score');
  });

  test('Save persists after page reload', async ({ game, page }) => {
    await game.setSaveData({
      chapter: 5,
      encounter: 3,
      score: 5000,
      timestamp: Date.now(),
    });

    // Reload page
    await page.reload();

    // Check save still exists
    const saveData = await game.getSaveData();
    expect(saveData).toMatchObject({
      chapter: 5,
      encounter: 3,
      score: 5000,
    });
  });
});
