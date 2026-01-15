/**
 * Centralized DOM selectors for Playwright tests
 */
export const selectors = {
  // Screens
  screens: {
    title: '#title-screen',
    story: '#story-screen',
    battle: '#battle-screen',
    victory: '#victory-screen',
    retry: '#retry-screen',
    complete: '#complete-screen',
  },

  // Buttons
  buttons: {
    start: '#start-btn',
    continue: '#continue-btn',
    storyContinue: '#story-continue-btn',
    victoryContinue: '#victory-continue-btn',
    retry: '#retry-btn',
    playAgain: '#play-again-btn',
    submitAnswer: '#submit-answer-btn',
    musicToggle: '#music-toggle',
    sfxToggle: '#sfx-toggle',
  },

  // Battle elements
  battle: {
    answerOptions: '.answer-option',
    fillBlankInput: '#fill-blank-input',
    matchCards: '.match-card',
    monsterHpFill: '#monster-hp-fill',
    playerHpFill: '#player-hp-fill',
    problemDisplay: '#problem-display',
    timerDisplay: '#timer-display',
    timerFill: '#timer-fill',
    monsterName: '#monster-name',
  },

  // Match pairs specific
  matchPairs: {
    card: '.match-card',
    flipped: '.match-card.flipped',
    matched: '.match-card.matched',
  },

  // Story elements
  story: {
    chapterTitle: '#chapter-title',
    continueContainer: '#continue-container',
  },
} as const;

// localStorage keys
export const storageKeys = {
  save: 'arielle_multiplication_save',
} as const;
