# Architecture - Multiplication Adventure Game
# אריאל והרפתקת הכפל

## Table of Contents
1. [Overview](#overview)
2. [Game Flow](#game-flow)
3. [State Management](#state-management)
4. [Data Models](#data-models)
5. [Screen System](#screen-system)
6. [Minigame Engine](#minigame-engine)
7. [Combat System](#combat-system)
8. [Timer System](#timer-system)
9. [Save/Load System](#saveload-system)
10. [Event & Audio Hooks](#event--audio-hooks)
11. [Code Structure](#code-structure)
12. [Implementation Guidelines](#implementation-guidelines)
13. [Questions to Other Agents](#questions-to-other-agents)

---

## Overview

### Game Summary
- **Format**: Single HTML file with embedded CSS and JavaScript
- **Language**: Hebrew (RTL)
- **Target**: 7-year-old girl learning multiplication (1-10 tables, up to 20×20 in final chapter)
- **Platform**: Desktop and tablet browsers

### Core Specifications
| Metric | Value |
|--------|-------|
| Total Chapters | 10 |
| Encounters per Chapter | 10 |
| Total Encounters | 100 |
| Riddles per Encounter | 5-10 (based on monster HP) |
| Time per Riddle | ~5 seconds |
| Encounter Time Limit | ~60 seconds |
| Minigame Types | 3 (randomly selected) |

### Design Principles
1. **Child-friendly**: No punishment, only encouragement
2. **Story-driven**: Progression through narrative is the reward
3. **Celebration-focused**: Big rewards on victory
4. **Simple UI**: Minimal screens, maximum clarity

---

## Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      TITLE SCREEN                           │
│              (Auto-continues if save exists)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STORY/DIALOGUE VIEW                      │
│              Chapter intro / pre-encounter narrative        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BATTLE/MINIGAME VIEW                     │
│    ┌─────────────────────────────────────────────────────┐  │
│    │  Monster HP Bar          Timer: 0:45                │  │
│    │  ████████░░░░░░░░                                   │  │
│    │                                                     │  │
│    │         [MONSTER SPRITE]                            │  │
│    │                                                     │  │
│    │  ┌─────────────────────────────────────────────┐   │  │
│    │  │         MINIGAME AREA                       │   │  │
│    │  │   (Timed Selection / Fill Blank / Match)    │   │  │
│    │  └─────────────────────────────────────────────┘   │  │
│    │                                                     │  │
│    │         [ARIELLE SPRITE]                            │  │
│    └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
      [Monster Defeated]              [Timer Expired]
              │                               │
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│      VICTORY SCREEN      │    │    RETRY PROMPT          │
│   Big celebration!       │    │  "!נסי שוב, את יכולה"   │
│   Confetti, sounds,      │    │                          │
│   encouraging message    │    │  [Try Again Button]      │
└──────────────────────────┘    └──────────────────────────┘
              │                               │
              ▼                               │
┌──────────────────────────┐                  │
│   SAVE PROGRESS          │◄─────────────────┘
│   Next encounter/chapter │      (on retry success)
└──────────────────────────┘
              │
              ▼
       [Loop to Story/Dialogue]
```

### Flow States
1. `TITLE` - Initial game start (auto-continues if save exists)
2. `STORY` - Narrative/dialogue display
3. `BATTLE` - Active minigame encounter
4. `VICTORY` - Post-battle celebration
5. `RETRY` - Timer expired, encourage retry
6. `GAME_COMPLETE` - All 100 encounters finished

---

## State Management

### Global State Object

```javascript
const GameState = {
  // Current position in game
  currentChapter: 1,        // 1-10
  currentEncounter: 1,      // 1-10

  // Battle state
  battle: {
    active: false,
    monsterHP: 0,
    monsterMaxHP: 0,
    timeRemaining: 0,
    currentMinigameType: null,
    currentRiddle: null,
    riddleStartTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  },

  // UI state
  screen: 'TITLE',          // TITLE | STORY | BATTLE | VICTORY | RETRY | GAME_COMPLETE

  // Statistics (persisted)
  stats: {
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    totalEncountersCompleted: 0,
    totalTimePlayed: 0,      // in seconds
    fastestAnswer: null,     // in milliseconds
    multiplicationMastery: {} // tracks performance per fact
  },

  // Settings
  settings: {
    musicEnabled: true,
    sfxEnabled: true
  }
};
```

### State Manager Module

```javascript
const StateManager = {
  // Initialize or load state
  init() {},

  // Get current state (read-only)
  getState() {},

  // Update state with partial object
  updateState(partial) {},

  // Reset battle state for new encounter
  resetBattle() {},

  // Advance to next encounter/chapter
  advanceProgress() {},

  // Check if game is complete
  isGameComplete() {},

  // Get difficulty parameters for current position
  getCurrentDifficulty() {}
};
```

---

## Data Models

### Chapter Model

```javascript
const Chapter = {
  id: 1,                    // 1-10
  title: "שם הפרק",          // Hebrew chapter title
  storySegments: [          // Narrative pieces
    {
      type: 'intro',        // intro | mid | outro
      text: "טקסט הסיפור",
      background: 'forest', // background scene key
      character: 'arielle_happy' // character sprite key
    }
  ],
  encounters: [/* 10 Encounter objects */],
  difficultyRange: {
    minMultiplier: 1,       // smallest number in tables
    maxMultiplier: 5,       // largest number in tables
    timeLimit: 60           // seconds
  }
};
```

### Encounter Model

```javascript
const Encounter = {
  id: 1,                    // 1-10 within chapter
  monster: {
    name: "שם המפלצת",
    sprite: 'monster_slime',
    hp: 5,                  // 5-10 based on difficulty
    dialogue: {
      intro: "!אני אתגר אותך",
      hit: "!אאוץ",
      defeated: "...ניצחת אותי"
    }
  },
  preStory: {               // Optional story before battle
    text: "טקסט לפני הקרב",
    background: 'cave'
  },
  postStory: {              // Optional story after victory
    text: "טקסט אחרי הניצחון"
  }
};
```

### Riddle Model

```javascript
const Riddle = {
  type: 'TIMED_SELECTION',  // TIMED_SELECTION | FILL_BLANK | MATCH_PAIRS

  // For TIMED_SELECTION and FILL_BLANK
  operand1: 6,
  operand2: 7,
  correctAnswer: 42,
  blankPosition: null,      // 'first' | 'second' | 'result' for FILL_BLANK
  options: [42, 48, 36, 35], // For TIMED_SELECTION

  // For MATCH_PAIRS (array of pairs to match)
  // Each pair matched deals 1 damage to monster
  pairs: [
    { equation: '6 × 7', answer: 42 },
    { equation: '8 × 4', answer: 32 },
    // ... more pairs
  ]
};
```

### Save Data Model

```javascript
const SaveData = {
  version: 1,               // For migration support
  timestamp: Date.now(),

  // Progress
  currentChapter: 1,
  currentEncounter: 1,

  // Statistics
  stats: {
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    totalEncountersCompleted: 0,
    totalTimePlayed: 0,
    fastestAnswer: null,
    multiplicationMastery: {
      // Key format: "3x7" -> { correct: 5, wrong: 1, avgTime: 2500 }
    }
  },

  // Settings
  settings: {
    musicEnabled: true,
    sfxEnabled: true
  }
};
```

### Difficulty Configuration

```javascript
const DifficultyConfig = {
  // Chapter 1-3: Easy (tables 1-5)
  // Chapter 4-6: Medium (tables 1-7)
  // Chapter 7-9: Hard (tables 1-10)
  // Chapter 10: Expert (tables 1-20)

  chapters: {
    1:  { minMult: 1, maxMult: 3,  baseHP: 5,  timeLimit: 70 },
    2:  { minMult: 1, maxMult: 4,  baseHP: 5,  timeLimit: 65 },
    3:  { minMult: 2, maxMult: 5,  baseHP: 6,  timeLimit: 65 },
    4:  { minMult: 2, maxMult: 6,  baseHP: 6,  timeLimit: 60 },
    5:  { minMult: 3, maxMult: 7,  baseHP: 7,  timeLimit: 60 },
    6:  { minMult: 3, maxMult: 8,  baseHP: 7,  timeLimit: 55 },
    7:  { minMult: 4, maxMult: 9,  baseHP: 8,  timeLimit: 55 },
    8:  { minMult: 4, maxMult: 10, baseHP: 8,  timeLimit: 50 },
    9:  { minMult: 5, maxMult: 10, baseHP: 9,  timeLimit: 50 },
    10: { minMult: 5, maxMult: 20, baseHP: 10, timeLimit: 60 }
  }
};
```

---

## Screen System

### Screen Manager

```javascript
const ScreenManager = {
  currentScreen: null,

  // Initialize with starting screen
  init() {},

  // Transition to a new screen
  showScreen(screenName, data = {}) {},

  // Hide current screen
  hideCurrentScreen() {},

  // Screen-specific render functions
  screens: {
    title: {
      show() {},
      hide() {},
      onStart() {}
    },
    story: {
      show(storyData) {},
      hide() {},
      onContinue() {}
    },
    battle: {
      show(encounterData) {},
      hide() {},
      update() {},          // Called each frame during battle
      onAnswer(isCorrect, answerTime) {}
    },
    victory: {
      show(stats) {},
      hide() {},
      onContinue() {}
    },
    retry: {
      show() {},
      hide() {},
      onRetry() {}
    },
    gameComplete: {
      show(finalStats) {},
      hide() {}
    }
  }
};
```

### Screen HTML Structure

```html
<!-- All screens live in a single container, shown/hidden via CSS -->
<div id="game-container">

  <!-- Title Screen -->
  <div id="screen-title" class="screen">
    <h1>אריאל והרפתקת הכפל</h1>
    <button id="btn-start">התחל משחק</button>
    <!-- Auto-continues if save exists, no menu needed -->
  </div>

  <!-- Story/Dialogue Screen -->
  <div id="screen-story" class="screen hidden">
    <div id="story-background"></div>
    <div id="story-character"></div>
    <div id="story-dialogue-box">
      <p id="story-text"></p>
      <button id="btn-continue">המשך</button>
    </div>
  </div>

  <!-- Battle Screen -->
  <div id="screen-battle" class="screen hidden">
    <div id="battle-header">
      <div id="monster-hp-bar"></div>
      <div id="battle-timer"></div>
    </div>
    <div id="battle-arena">
      <div id="monster-sprite"></div>
      <div id="minigame-area"></div>
      <div id="arielle-sprite"></div>
    </div>
    <div id="battle-feedback"></div>
  </div>

  <!-- Victory Screen -->
  <div id="screen-victory" class="screen hidden">
    <div id="victory-effects"></div>
    <h2 id="victory-message"></h2>
    <button id="btn-next">המשך בהרפתקה</button>
  </div>

  <!-- Retry Screen -->
  <div id="screen-retry" class="screen hidden">
    <h2>!נסי שוב, את יכולה</h2>
    <button id="btn-retry">נסי שוב</button>
  </div>

  <!-- Game Complete Screen -->
  <div id="screen-complete" class="screen hidden">
    <h1>!כל הכבוד, אריאל</h1>
    <p>!סיימת את כל ההרפתקה</p>
    <div id="final-stats"></div>
  </div>

</div>
```

---

## Minigame Engine

### Minigame Types

```javascript
const MinigameTypes = {
  TIMED_SELECTION: 'TIMED_SELECTION',
  FILL_BLANK: 'FILL_BLANK',
  MATCH_PAIRS: 'MATCH_PAIRS'
};
```

### Minigame Engine Module

```javascript
const MinigameEngine = {
  currentType: null,
  currentRiddle: null,
  riddleStartTime: 0,

  // Initialize minigame for current encounter
  init(difficulty) {},

  // Generate a random riddle based on difficulty
  generateRiddle(difficulty) {},

  // Select random minigame type
  selectMinigameType() {},

  // Render the current minigame UI
  render() {},

  // Handle player answer submission
  submitAnswer(answer) {},

  // Calculate answer time and bonus
  calculateAnswerTime() {},

  // Cleanup current minigame
  cleanup() {},

  // Type-specific handlers
  types: {
    TIMED_SELECTION: {
      generate(difficulty) {},
      render(riddle) {},
      checkAnswer(selected) {}
    },
    FILL_BLANK: {
      generate(difficulty) {},
      render(riddle) {},
      checkAnswer(input) {}
    },
    MATCH_PAIRS: {
      generate(difficulty) {},
      render(riddle) {},
      checkAnswer(matches) {},
      // Each pair matched deals 1 damage
      onPairMatched() {},
      // Special: tracks partial progress within one riddle
      state: { selectedPairs: [], matchedPairs: [] }
    }
  }
};
```

### Riddle Generation

```javascript
const RiddleGenerator = {
  // Generate multiplication riddle within difficulty bounds
  generate(minMult, maxMult, type) {
    const a = randomInt(minMult, maxMult);
    const b = randomInt(minMult, maxMult);
    const answer = a * b;

    switch(type) {
      case 'TIMED_SELECTION':
        return {
          type,
          operand1: a,
          operand2: b,
          correctAnswer: answer,
          options: this.generateOptions(answer, minMult, maxMult)
        };

      case 'FILL_BLANK':
        const blankPos = randomChoice(['first', 'second', 'result']);
        return {
          type,
          operand1: a,
          operand2: b,
          correctAnswer: blankPos === 'first' ? a :
                         blankPos === 'second' ? b : answer,
          blankPosition: blankPos
        };

      case 'MATCH_PAIRS':
        return {
          type,
          pairs: this.generatePairs(4, minMult, maxMult)
        };
    }
  },

  // Generate wrong answer options (plausible distractors)
  generateOptions(correct, minMult, maxMult) {
    const options = [correct];
    while (options.length < 4) {
      // Generate plausible wrong answers
      const distractor = this.generateDistractor(correct, minMult, maxMult);
      if (!options.includes(distractor)) {
        options.push(distractor);
      }
    }
    return shuffle(options);
  },

  // Generate plausible wrong answer
  generateDistractor(correct, minMult, maxMult) {
    // Strategies: ±1 from correct, nearby table result,
    // common mistakes (e.g., addition instead of multiplication)
  },

  // Generate pairs for matching game
  generatePairs(count, minMult, maxMult) {}
};
```

---

## Combat System

### Damage Calculation

```javascript
const CombatSystem = {
  // Time thresholds for damage bonus (in milliseconds)
  SPEED_THRESHOLDS: {
    SUPER_FAST: 1500,   // Under 1.5s = 3x damage
    FAST: 3000,         // Under 3s = 2x damage
    NORMAL: 5000,       // Under 5s = 1x damage
    SLOW: Infinity      // Over 5s = 1x damage (no penalty, child-friendly)
  },

  BASE_DAMAGE: 1,

  // Calculate damage based on answer time
  calculateDamage(answerTimeMs) {
    if (answerTimeMs < this.SPEED_THRESHOLDS.SUPER_FAST) {
      return this.BASE_DAMAGE * 3;
    } else if (answerTimeMs < this.SPEED_THRESHOLDS.FAST) {
      return this.BASE_DAMAGE * 2;
    }
    return this.BASE_DAMAGE;
  },

  // Apply damage to monster
  applyDamage(damage) {
    GameState.battle.monsterHP -= damage;

    // Trigger visual/audio feedback
    Events.emit('monster_hit', { damage, remainingHP: GameState.battle.monsterHP });

    if (GameState.battle.monsterHP <= 0) {
      this.onMonsterDefeated();
    }
  },

  // Handle correct answer
  onCorrectAnswer(answerTimeMs) {
    const damage = this.calculateDamage(answerTimeMs);
    this.applyDamage(damage);

    // Update stats
    GameState.stats.totalCorrectAnswers++;
    this.updateMasteryStats(true, answerTimeMs);

    // Trigger feedback
    Events.emit('correct_answer', { damage, answerTimeMs });
  },

  // Handle wrong answer
  // NOTE: Timer keeps counting during wrong attempts
  // Visual feedback: screen shake or red flash
  onWrongAnswer() {
    GameState.battle.wrongAnswers++;
    GameState.stats.totalWrongAnswers++;
    this.updateMasteryStats(false, null);

    // Trigger encouragement feedback (no damage to player, no time penalty)
    // Visual: screen shake or red flash to indicate wrong
    Events.emit('wrong_answer');
  },

  // Monster defeated
  onMonsterDefeated() {
    GameState.battle.active = false;
    Events.emit('monster_defeated');
    ScreenManager.showScreen('victory');
  },

  // Update per-fact mastery tracking
  updateMasteryStats(correct, answerTimeMs) {
    const riddle = GameState.battle.currentRiddle;
    const key = `${riddle.operand1}x${riddle.operand2}`;

    if (!GameState.stats.multiplicationMastery[key]) {
      GameState.stats.multiplicationMastery[key] = {
        correct: 0, wrong: 0, totalTime: 0, attempts: 0
      };
    }

    const stat = GameState.stats.multiplicationMastery[key];
    if (correct) {
      stat.correct++;
      stat.totalTime += answerTimeMs;
    } else {
      stat.wrong++;
    }
    stat.attempts++;
  }
};
```

### Visual Damage Feedback

```javascript
const DamageFeedback = {
  // Show damage number floating up
  showDamageNumber(damage, element) {},

  // Monster shake/flash animation
  monsterHitAnimation() {},

  // Arielle attack animation
  arielleAttackAnimation() {},

  // Speed bonus indicator
  showSpeedBonus(multiplier) {},

  // HP bar update animation
  animateHPBar(oldHP, newHP, maxHP) {},

  // Wrong answer feedback
  // Screen shake or red flash - timer keeps running
  showWrongAnswerFeedback() {}
};
```

---

## Timer System

### Timer Module

```javascript
const TimerSystem = {
  intervalId: null,
  startTime: 0,
  duration: 0,

  // Start encounter timer
  start(durationSeconds) {
    this.duration = durationSeconds;
    this.startTime = Date.now();
    GameState.battle.timeRemaining = durationSeconds;

    this.intervalId = setInterval(() => this.tick(), 100);
  },

  // Timer tick (called every 100ms)
  // NOTE: Timer continues during wrong answers (no pause)
  tick() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const remaining = Math.max(0, this.duration - elapsed);

    GameState.battle.timeRemaining = remaining;
    Events.emit('timer_tick', { remaining });

    if (remaining <= 0) {
      this.onTimeUp();
    }
  },

  // Stop timer
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  // Time ran out
  onTimeUp() {
    this.stop();
    GameState.battle.active = false;
    Events.emit('time_up');
    ScreenManager.showScreen('retry');
  },

  // Get formatted time string
  getFormattedTime() {
    const remaining = GameState.battle.timeRemaining;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },

  // Riddle-level timing (for speed bonus calculation)
  startRiddleTimer() {
    GameState.battle.riddleStartTime = Date.now();
  },

  getRiddleElapsedTime() {
    return Date.now() - GameState.battle.riddleStartTime;
  }
};
```

### Timer Visual Updates

```javascript
const TimerUI = {
  element: null,

  init() {
    this.element = document.getElementById('battle-timer');
  },

  update(remaining) {
    this.element.textContent = TimerSystem.getFormattedTime();

    // Warning colors
    if (remaining <= 10) {
      this.element.classList.add('timer-critical');
    } else if (remaining <= 20) {
      this.element.classList.add('timer-warning');
    }
  }
};
```

---

## Save/Load System

### Save Manager

```javascript
const SaveManager = {
  STORAGE_KEY: 'arielle_multiplication_adventure',
  SAVE_VERSION: 1,

  // Save current game state
  save() {
    const saveData = {
      version: this.SAVE_VERSION,
      timestamp: Date.now(),
      currentChapter: GameState.currentChapter,
      currentEncounter: GameState.currentEncounter,
      stats: { ...GameState.stats },
      settings: { ...GameState.settings }
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saveData));
      Events.emit('game_saved');
      return true;
    } catch (e) {
      console.error('Failed to save game:', e);
      return false;
    }
  },

  // Load saved game
  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;

      const saveData = JSON.parse(data);

      // Version migration if needed
      if (saveData.version < this.SAVE_VERSION) {
        return this.migrate(saveData);
      }

      return saveData;
    } catch (e) {
      console.error('Failed to load save:', e);
      return null;
    }
  },

  // Check if save exists
  hasSave() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  },

  // Delete save (for new game)
  deleteSave() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // Apply loaded save to game state
  applySave(saveData) {
    GameState.currentChapter = saveData.currentChapter;
    GameState.currentEncounter = saveData.currentEncounter;
    GameState.stats = { ...saveData.stats };
    GameState.settings = { ...saveData.settings };
  },

  // Version migration
  migrate(saveData) {
    // Handle save format changes between versions
    // Return migrated data
  },

  // Called after each encounter completion
  onEncounterComplete() {
    StateManager.advanceProgress();
    this.save();
  }
};
```

### Auto-Save Triggers

```javascript
// Save only after successful encounter completion
Events.on('monster_defeated', () => {
  SaveManager.onEncounterComplete();
});

// Update play time periodically
setInterval(() => {
  GameState.stats.totalTimePlayed++;
}, 1000);
```

---

## Event & Audio Hooks

### Event System

```javascript
const Events = {
  listeners: {},

  // Subscribe to event
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },

  // Unsubscribe from event
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  },

  // Emit event
  emit(event, data = {}) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
};
```

### Event Catalog

| Event | Data | Trigger Point |
|-------|------|---------------|
| `game_start` | `{}` | Title screen start button |
| `story_continue` | `{ segment }` | Story dialogue continue |
| `battle_start` | `{ encounter }` | Battle screen shown |
| `riddle_shown` | `{ riddle }` | New riddle displayed |
| `correct_answer` | `{ damage, answerTimeMs }` | Correct answer submitted |
| `wrong_answer` | `{}` | Wrong answer submitted (triggers screen shake/flash) |
| `monster_hit` | `{ damage, remainingHP }` | Damage applied |
| `monster_defeated` | `{}` | Monster HP reaches 0 |
| `timer_tick` | `{ remaining }` | Every 100ms during battle |
| `time_up` | `{}` | Timer reaches 0 |
| `victory_shown` | `{ stats }` | Victory screen displayed |
| `game_saved` | `{}` | Save completed |
| `chapter_complete` | `{ chapter }` | Last encounter of chapter done |
| `game_complete` | `{ finalStats }` | All 100 encounters done |

### Audio Manager Hook Points

```javascript
const AudioManager = {
  // Placeholders for audio agent implementation
  music: {
    play(track) {},
    stop() {},
    setVolume(level) {}
  },

  sfx: {
    play(sound) {}
  },

  // Hook into events for audio triggers
  init() {
    Events.on('game_start', () => this.music.play('adventure'));
    Events.on('battle_start', () => this.music.play('battle'));
    Events.on('correct_answer', (data) => {
      if (data.damage >= 3) this.sfx.play('super_hit');
      else if (data.damage >= 2) this.sfx.play('strong_hit');
      else this.sfx.play('hit');
    });
    Events.on('wrong_answer', () => this.sfx.play('encourage'));
    Events.on('monster_defeated', () => this.sfx.play('victory'));
    Events.on('victory_shown', () => this.music.play('victory'));
    Events.on('time_up', () => this.sfx.play('timeout'));
  }
};

// Sound effect keys for audio agent reference
const SFX_KEYS = [
  'hit',           // Normal correct answer
  'strong_hit',    // 2x damage answer
  'super_hit',     // 3x damage answer
  'encourage',     // Wrong answer (gentle, positive)
  'victory',       // Monster defeated
  'timeout',       // Time ran out
  'button_click',  // UI interaction
  'chapter_complete' // End of chapter
];
```

---

## Code Structure

### Single HTML File Organization

```html
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>אריאל והרפתקת הכפל</title>

  <style>
    /* ==========================================
       SECTION 1: CSS Reset & Base Styles
       ========================================== */

    /* ==========================================
       SECTION 2: Layout & Container Styles
       ========================================== */

    /* ==========================================
       SECTION 3: Screen Styles (Title, Story, Battle, etc.)
       ========================================== */

    /* ==========================================
       SECTION 4: Component Styles (Buttons, HP Bar, Timer)
       ========================================== */

    /* ==========================================
       SECTION 5: Minigame-Specific Styles
       ========================================== */

    /* ==========================================
       SECTION 6: Animation & Effects
       ========================================== */

    /* ==========================================
       SECTION 7: Responsive Styles
       ========================================== */
  </style>
</head>

<body>
  <!-- ==========================================
       SECTION 1: Game Container & Screens
       ========================================== -->
  <div id="game-container">
    <!-- Screen: Title -->
    <!-- Screen: Story -->
    <!-- Screen: Battle -->
    <!-- Screen: Victory -->
    <!-- Screen: Retry -->
    <!-- Screen: Game Complete -->
  </div>

  <!-- ==========================================
       SECTION 2: Templates (if needed)
       ========================================== -->

  <script>
    /* ==========================================
       SECTION 1: Configuration & Constants
       ========================================== */
    const CONFIG = { /* ... */ };
    const DifficultyConfig = { /* ... */ };

    /* ==========================================
       SECTION 2: Utility Functions
       ========================================== */
    function randomInt(min, max) { /* ... */ }
    function shuffle(array) { /* ... */ }
    function $(selector) { return document.querySelector(selector); }

    /* ==========================================
       SECTION 3: Event System
       ========================================== */
    const Events = { /* ... */ };

    /* ==========================================
       SECTION 4: State Management
       ========================================== */
    const GameState = { /* ... */ };
    const StateManager = { /* ... */ };

    /* ==========================================
       SECTION 5: Save/Load System
       ========================================== */
    const SaveManager = { /* ... */ };

    /* ==========================================
       SECTION 6: Timer System
       ========================================== */
    const TimerSystem = { /* ... */ };

    /* ==========================================
       SECTION 7: Combat System
       ========================================== */
    const CombatSystem = { /* ... */ };

    /* ==========================================
       SECTION 8: Riddle Generation
       ========================================== */
    const RiddleGenerator = { /* ... */ };

    /* ==========================================
       SECTION 9: Minigame Engine
       ========================================== */
    const MinigameEngine = { /* ... */ };

    /* ==========================================
       SECTION 10: Screen Manager
       ========================================== */
    const ScreenManager = { /* ... */ };

    /* ==========================================
       SECTION 11: Audio Manager (Hooks)
       ========================================== */
    const AudioManager = { /* ... */ };

    /* ==========================================
       SECTION 12: Story/Content Data
       ========================================== */
    const StoryContent = { /* ... */ };

    /* ==========================================
       SECTION 13: Game Initialization
       ========================================== */
    function initGame() {
      // Initialize all systems
      Events.init?.();
      StateManager.init();
      SaveManager.load();
      AudioManager.init();
      ScreenManager.init();

      // Auto-continue if save exists
      if (SaveManager.hasSave()) {
        SaveManager.applySave(SaveManager.load());
      }
      ScreenManager.showScreen('title');
    }

    // Start game when DOM is ready
    document.addEventListener('DOMContentLoaded', initGame);
  </script>
</body>
</html>
```

---

## Implementation Guidelines

### Hebrew RTL Handling
1. Use `dir="rtl"` on root `<html>` element
2. Use CSS `text-align: right` as default
3. Be careful with mixed content (numbers in Hebrew text)
4. Test dialogue boxes and button text alignment

### Child-Friendly UX Principles
1. Large, colorful buttons (minimum 48px touch target)
2. Clear visual feedback for all actions
3. Encouraging messages, never discouraging
4. Simple, uncluttered UI
5. Progress should feel constant and rewarding

### Wrong Answer Handling
- Timer continues running (no pause)
- Visual feedback: screen shake OR red flash
- Audio: gentle encouraging sound
- No punishment - just try again

### Performance Considerations
1. Minimize DOM updates during battle
2. Use CSS transforms for animations (GPU accelerated)
3. Preload audio files on game start
4. Keep monster/character sprites as base64 or inline SVG

### Browser Compatibility
- Target: Chrome, Safari, Firefox (latest 2 versions)
- Test on iPad Safari specifically for tablet use
- Use `localStorage` with try/catch for Safari private mode

### Content Placeholders
The following will be provided by other agents:
- **Story Content**: Chapter/encounter narratives (Story Writer Agent)
- **Visual Assets**: Sprites, backgrounds, UI elements (Visual Designer Agent)
- **Audio Assets**: Music tracks, sound effects (Audio Designer Agent)

Architecture code should use placeholder/stub implementations that can be replaced:

```javascript
// Story content placeholder
const StoryContent = {
  chapters: [
    // Will be populated by Story Writer Agent
    { id: 1, title: 'פרק 1', /* ... */ }
  ]
};

// Asset placeholders
const Assets = {
  sprites: {
    arielle: 'data:image/svg+xml,...', // Placeholder
    monster_1: 'data:image/svg+xml,...'
  },
  backgrounds: {
    forest: '#228B22', // Color placeholder
    cave: '#2F4F4F'
  }
};
```

---

## Summary Checklist

- [ ] State Management with GameState object
- [ ] Save/Load with localStorage (single slot, auto-continue)
- [ ] 4 screens: Title, Story, Battle, Victory (+ Retry, Game Complete)
- [ ] Timer system with encounter-level countdown (~60 sec)
- [ ] Combat system with speed-based damage bonus (1x/2x/3x)
- [ ] 3 minigame types with random selection
- [ ] Match Pairs: each pair matched = 1 damage
- [ ] Wrong answer: screen shake/flash, timer keeps running
- [ ] Riddle generator with difficulty scaling
- [ ] Event system for audio/visual hooks
- [ ] Statistics tracking for mastery
- [ ] Hebrew RTL support throughout
- [ ] Single-file HTML structure with clear sections

---

## Questions to Other Agents

### For Story Writer Agent
1. What is the overarching narrative that spans all 10 chapters?
2. What is Arielle's motivation/goal in this adventure?
3. What types of monsters/obstacles fit the K-pop demon hunter aesthetic while being appropriate for a 7-year-old?
4. How should dialogue change as Arielle progresses (character growth)?
5. What encouraging phrases should appear for wrong answers? (Hebrew)
6. What victory phrases should appear when defeating monsters? (Hebrew)
7. Should there be recurring characters (allies, mentors, rivals)?
8. How does the final chapter/boss differ narratively from earlier ones?

### For Visual Designer Agent
1. What is Arielle's character design? (outfit, hair, expressions for different states)
2. What visual style for the anime/K-pop aesthetic - specific references?
3. How many monster designs are needed? (unique per chapter? Per encounter?)
4. What background scenes are required for each chapter?
5. What should the victory celebration look like? (confetti, sparkles, animations?)
6. What visual feedback for wrong answers? (prefer screen shake or red flash?)
7. HP bar design - hearts vs. bar? Monster-themed?
8. Timer design - how prominent? Warning states visual treatment?
9. What button/UI styles fit the retro fantasy theme?
10. How should speed bonus feedback look (2x, 3x damage indicators)?

### For Audio Designer Agent
1. What mood/tempo for the main adventure theme?
2. Should battle music be different from exploration/story music?
3. How intense should the music be given the 7-year-old audience?
4. What style for the "correct answer" sounds at different damage levels (1x, 2x, 3x)?
5. What should the "wrong answer" encouragement sound like? (gentle chime? Voice?)
6. Victory fanfare style - how celebratory?
7. Should there be ambient sounds during story segments?
8. Timer warning sounds as time runs low?
9. Should chapter completion have a distinct sound/jingle?
10. Any voice acting considerations or just sound effects?

### For Level Designer (if applicable)
1. How should monster HP scale within a chapter (not just between chapters)?
2. Should certain multiplication facts appear more often based on mastery stats?
3. Any "boss" encounters that work differently mechanically?
4. Should the 10th encounter in each chapter have special significance?
5. How to balance the 20×20 difficulty spike in chapter 10?
