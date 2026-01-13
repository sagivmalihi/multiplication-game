# Multiplication Adventure Game - אריאל והרפתקת הכפל

## Project Status

**Current State**: Chapter 1 MVP Complete
**Live URL**: https://sagivmalihi.github.io/multiplication-game/
**Last Updated**: January 2025

### What's Implemented
- [x] Chapter 1: האחו האזמרגדי (The Emerald Meadow) - 10 encounters
- [x] All 3 minigame types (Timed Selection, Fill Blank, Match Pairs)
- [x] Combat system with speed-based damage (1x/2x/3x multipliers)
- [x] Procedural 8-bit audio via Web Audio API
- [x] SVG character sprites (Arielle, Pip, 3 monster types)
- [x] Hebrew RTL interface
- [x] Save/Load system (localStorage)
- [x] 6 game screens (Title, Story, Battle, Victory, Retry, Complete)

### What's Remaining (Future Chapters)
- [ ] Chapters 2-10 (storyline exists in storyline.md)
- [ ] Additional monster types per chapter
- [ ] Chapter-specific backgrounds and themes
- [ ] Background music loops
- [ ] Boss battle with Balagan (Chapter 10)
- [ ] Statistics tracking
- [ ] Difficulty progression (tables 1-5 → 1-10 → 1-20)

---

## Project Overview

A single-file HTML game (HTML + CSS + JavaScript) featuring a retro-style fantasy adventure designed to help practice multiplication. The game is personalized for Arielle (אריאל), a 7-year-old girl in second grade.

## Language
- **UI Language**: Hebrew (RTL)
- **Protagonist Name**: אריאל (Arielle)

## Target Audience
- **Age**: 7 years old (2nd grade)
- **Primary Goal**: Memorize multiplication tables up to 10×10
- **Stretch Goal**: Handle up to 20×20 in final/bonus levels

## Visual Theme
- **Style**: Anime-inspired, similar to K-pop demon hunters aesthetic
- **Era**: Retro fantasy adventure
- **Character**: Female protagonist - Arielle with blue hair, fur coat

---

## Architecture

### Game Screens
1. **Title** - Start/continue game
2. **Story** - Dialogue and narrative
3. **Battle** - Minigame encounters
4. **Victory** - Monster defeated celebration
5. **Retry** - Encouraging retry on failure
6. **Complete** - Chapter completion

### Core Systems (in index.html)
- `GameState` - Central state object
- `Events` - Pub/sub event bus
- `ScreenManager` - Screen transitions
- `SaveManager` - localStorage persistence
- `AudioManager` - Web Audio API procedural sounds
- `TimerSystem` - Countdown with visual feedback
- `CombatSystem` - HP and damage calculations
- `RiddleGenerator` - Multiplication problem generation
- `MinigameEngine` - Handles all 3 minigame types
- `GameFlow` - Story progression and encounter flow

### Minigame Types
| Type | Timer | Description |
|------|-------|-------------|
| Timed Selection | 10s | Pick correct answer from 4 options |
| Fill Blank | 15s | Enter missing number in equation |
| Match Pairs | 30s | Memory game matching problems to answers |

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | **The game** - single file with all HTML/CSS/JS |
| `CLAUDE.md` | Project instructions and status (this file) |
| `architecture.md` | Detailed technical architecture spec |
| `design-system.md` | Visual design, colors, typography, sprites |
| `storyline.md` | Full story for all 10 chapters |
| `audio-design.md` | Audio philosophy and Web Audio API specs |

---

## Sub-Agent Roles

When extending the game, use these specialized sub-agents:

### `game-architect`
**Use for**: State management, game systems, code structure
**Tools**: Read, Glob, Grep
**When**: Planning new features, debugging game logic

### `visual-designer`
**Use for**: CSS styles, SVG sprites, animations, UI components
**Tools**: Read, Glob, Grep
**When**: Adding new characters, monsters, visual effects

### `audio-designer`
**Use for**: Web Audio API sounds, music, SFX
**Tools**: Read, Glob
**When**: Adding new sound effects or background music

### `story-writer`
**Use for**: Hebrew narrative, dialogue, character text
**Tools**: Read, Glob
**When**: Adding new chapters, dialogue, or story content

---

## Development Guidelines

### Adding a New Chapter
1. Use `story-writer` agent to create Hebrew content for the chapter
2. Use `visual-designer` agent to create monster SVGs and background theme
3. Use `audio-designer` agent if chapter needs unique audio
4. Add chapter data to `StoryContent` object in index.html
5. Update `RiddleGenerator` difficulty for the chapter's multiplication tables

### Adding a New Monster
1. Create SVG in `<defs>` section with `<symbol id="monster-[name]">`
2. Add monster to chapter's encounters array in `StoryContent`
3. Reference with `<use href="#monster-[name]"/>`

### Adding Sound Effects
1. Add method to `AudioManager` object
2. Use Web Audio API oscillators (square, triangle, sawtooth)
3. Hook into game events via `Events.on()`

### Hebrew Text Guidelines
- All UI text must be in Hebrew
- Use encouraging, child-friendly language
- Never use punishing or negative messages
- Test RTL rendering carefully

---

## Technical Requirements
- **Format**: Single HTML file containing all HTML, CSS, and JavaScript
- **Storage**: localStorage for saving progress
- **Dependencies**: None (self-contained)
- **Responsiveness**: Desktop and tablet (min 768px)
- **Browsers**: Chrome, Safari, Firefox

---

## Game Structure

### Core Loop
1. Story/narrative segment (Hebrew text, anime-style visuals)
2. Encounter obstacle/monster
3. Multiplication minigame to overcome challenge
4. Victory → progress story
5. Repeat until chapter complete

### Difficulty Progression
- **Chapter 1-3**: Tables 1-5 (easy)
- **Chapter 4-6**: Tables 1-7 (medium)
- **Chapter 7-9**: Tables 1-10 (hard)
- **Chapter 10**: Tables 1-20 (final challenge)

### Combat Mechanics
- Monster HP scales with chapter (5-10 HP)
- Correct answers deal damage based on speed:
  - Fast (< 30% time): 3x damage
  - Medium (< 60% time): 2x damage
  - Normal: 1x damage
- Wrong answers show encouragement, no punishment
- Time up = player takes 20 HP damage

---

## Quick Reference

### Run Locally
```bash
open index.html
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

### Deploy to GitHub Pages
```bash
git add index.html
git commit -m "Update game"
git push origin main
# Auto-deploys to https://sagivmalihi.github.io/multiplication-game/
```

### Key CSS Variables
```css
--arielle-blue-medium: #3B82F6;  /* Primary blue */
--magic-purple: #A855F7;          /* Magic effects */
--success-green: #10B981;         /* Correct answers */
--gold: #FBBF24;                  /* Highlights */
--arielle-pink: #F472B6;          /* Accents */
```
