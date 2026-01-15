import { test, expect } from '../fixtures/game.fixture';
import { selectors } from '../helpers/selectors';

test.describe('Core Game Flow', () => {
  // Use fixed seed for deterministic tests
  test.use({ seed: 12345 });

  test.describe('Win Scenario', () => {
    test('Title -> Story -> Battle -> Victory flow', async ({ game, page }) => {
      // Start on title screen
      await game.expectScreen('title');

      // Start new game
      await game.startNewGame();
      await game.expectScreen('story');

      // Advance through intro story to battle
      await game.advanceToBattle();
      await game.expectScreen('battle');

      // Record initial monster HP
      const initialState = await game.getGameState();
      expect(initialState.monsterHP).toBeGreaterThan(0);

      // Defeat monster by solving problems until HP = 0
      while ((await game.getGameState()).monsterHP > 0) {
        await game.solveCurrentMinigame();
        await page.waitForTimeout(300);
      }

      // Should show victory screen
      await game.expectScreen('victory');
    });

    test('Correct answer deals damage to monster', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      const initialHP = (await game.getGameState()).monsterHP;

      // Solve one minigame
      await game.solveCurrentMinigame();
      await page.waitForTimeout(300);

      const newHP = (await game.getGameState()).monsterHP;
      expect(newHP).toBeLessThan(initialHP);
    });

    test('Victory increments encounter and saves progress', async ({
      game,
      page,
    }) => {
      await game.clearSave();
      await game.startNewGame();
      await game.advanceToBattle();

      const initialState = await game.getGameState();
      expect(initialState.encounter).toBe(0);

      // Win the battle
      while ((await game.getGameState()).monsterHP > 0) {
        await game.solveCurrentMinigame();
        await page.waitForTimeout(200);
      }

      // Click victory continue
      await page.click(selectors.buttons.victoryContinue);
      await page.waitForTimeout(300);

      // Verify save was created with incremented encounter
      const saveData = await game.getSaveData();
      expect(saveData).not.toBeNull();
      expect(saveData!.encounter).toBe(1);
    });
  });

  test.describe('Lose Scenario', () => {
    test('Title -> Story -> Battle -> Retry flow (time up)', async ({
      game,
      page,
    }) => {
      await game.startNewGame();
      await game.advanceToBattle();
      await game.expectScreen('battle');

      // Get initial player HP
      const initialHP = (await game.getGameState()).playerHP;
      expect(initialHP).toBe(100);

      // Force timeouts to deplete HP (20 damage each, 100 HP total = 5 timeouts)
      for (let i = 0; i < 5; i++) {
        await game.expireTimer();
        await page.waitForTimeout(400);

        // Check if we're on retry screen
        const isRetry = await page
          .locator(`${selectors.screens.retry}.active`)
          .isVisible();
        if (isRetry) break;
      }

      // Should show retry screen
      await game.expectScreen('retry');
    });

    test('Retry restores HP and continues battle', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      // Deplete HP with timeouts
      for (let i = 0; i < 5; i++) {
        await game.expireTimer();
        await page.waitForTimeout(400);

        const isRetry = await page
          .locator(`${selectors.screens.retry}.active`)
          .isVisible();
        if (isRetry) break;
      }

      await game.expectScreen('retry');

      // Click retry
      await page.click(selectors.buttons.retry);
      await page.waitForTimeout(300);

      // Retry goes back to story/encounter screen first, then battle
      // Advance back to battle
      await game.advanceToBattle();
      await game.expectScreen('battle');

      const state = await game.getGameState();
      expect(state.playerHP).toBe(100);
    });

    test('Player takes 20 damage on time up', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      const initialHP = (await game.getGameState()).playerHP;
      expect(initialHP).toBe(100);

      // Expire timer once
      await game.expireTimer();
      await page.waitForTimeout(400);

      // HP should be reduced by 20
      const newHP = (await game.getGameState()).playerHP;
      expect(newHP).toBe(80);
    });
  });

  test.describe('Minigame Types', () => {
    test('Selection minigame shows 4 answer options', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      // Force selection minigame
      await page.evaluate(() => {
        (window as any).MinigameEngine.startMinigame('selection');
      });
      await page.waitForTimeout(200);

      // Should have 4 answer buttons
      const buttons = page.locator(selectors.battle.answerOptions);
      await expect(buttons).toHaveCount(4);
    });

    test('Fill blank minigame shows input field', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      // Force fill blank minigame
      await page.evaluate(() => {
        (window as any).MinigameEngine.startMinigame('fillBlank');
      });
      await page.waitForTimeout(200);

      // Should have input field visible
      await expect(page.locator(selectors.battle.fillBlankInput)).toBeVisible();
      await expect(page.locator(selectors.buttons.submitAnswer)).toBeVisible();
    });

    test('Match pairs minigame shows 8 cards', async ({ game, page }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      // Force match pairs minigame
      await page.evaluate(() => {
        (window as any).MinigameEngine.startMinigame('matchPairs');
      });
      await page.waitForTimeout(200);

      // Should have 8 cards (4 pairs)
      const cards = page.locator(selectors.matchPairs.card);
      await expect(cards).toHaveCount(8);
    });

    test('Match pairs - completing all pairs defeats monster', async ({
      game,
      page,
    }) => {
      await game.startNewGame();
      await game.advanceToBattle();

      // Force match pairs minigame
      await page.evaluate(() => {
        (window as any).MinigameEngine.startMinigame('matchPairs');
      });
      await page.waitForTimeout(200);

      // Solve match pairs
      await game.solveMatchPairs();
      await page.waitForTimeout(500);

      // Should show victory (match pairs = instant win)
      await game.expectScreen('victory');
    });
  });
});
