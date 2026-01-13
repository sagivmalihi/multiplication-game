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

A web game hosted on GitHub Pages featuring a retro-style fantasy adventure designed to help practice multiplication. The game is personalized for Arielle (אריאל), a 7-year-old girl in second grade.

**Note**: While the core game logic lives in `index.html`, external assets (images, audio) are now supported and encouraged for richer visuals and audio.

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

| File/Folder | Purpose |
|-------------|---------|
| `index.html` | **The game** - core HTML/CSS/JS |
| `assets/images/` | External image assets (characters, monsters, backgrounds) |
| `assets/audio/` | External audio files (music, SFX) |
| `generate_image.py` | AI image generation script (Gemini nano-banana) |
| `generate_audio.py` | AI audio generation script (ElevenLabs SFX + music) |
| `.env` | API keys (gitignored) |
| `CLAUDE.md` | Project instructions and status (this file) |
| `architecture.md` | Detailed technical architecture spec |
| `design-system.md` | Visual design, colors, typography, sprites |
| `storyline.md` | Full story for all 10 chapters |
| `audio-design.md` | Audio philosophy and Web Audio API specs |

### Asset Folder Structure
```
assets/
├── images/
│   ├── characters/    # Arielle, Pip, NPCs
│   ├── monsters/      # Enemy sprites
│   └── backgrounds/   # Scene backgrounds
└── audio/
    ├── music/         # Background music loops
    └── sfx/           # Sound effects
```

---

## Sub-Agent Roles

When extending the game, use these specialized sub-agents:

### `game-architect`
**Use for**: State management, game systems, code structure
**Tools**: Read, Glob, Grep
**When**: Planning new features, debugging game logic

### `visual-designer`
**Use for**: CSS styles, SVG sprites, animations, UI components, AI-generated images
**Tools**: Read, Glob, Grep, Bash
**When**: Adding new characters, monsters, visual effects, generating artwork

### `audio-designer`
**Use for**: Web Audio API sounds, music, SFX, external audio files
**Tools**: Read, Glob, Bash
**When**: Adding new sound effects, background music, or sourcing audio files

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
**Option A: SVG (simple monsters)**
1. Create SVG in `<defs>` section with `<symbol id="monster-[name]">`
2. Add monster to chapter's encounters array in `StoryContent`
3. Reference with `<use href="#monster-[name]"/>`

**Option B: AI-Generated Image (complex monsters)**
1. Use `visual-designer` agent to generate image with `generate_image.py`
2. Save to `assets/images/monsters/[name].png`
3. Reference with `<img src="assets/images/monsters/[name].png">`

### Adding Sound Effects
**Option A: Procedural (simple SFX)**
1. Add method to `AudioManager` object
2. Use Web Audio API oscillators (square, triangle, sawtooth)
3. Hook into game events via `Events.on()`

**Option B: External Audio File (complex sounds/music)**
1. Source or create audio file (MP3/OGG)
2. Save to `assets/audio/sfx/` or `assets/audio/music/`
3. Load and play via `AudioManager` with `new Audio('assets/audio/...')`

### Hebrew Text Guidelines
- All UI text must be in Hebrew
- Use encouraging, child-friendly language
- Never use punishing or negative messages
- Test RTL rendering carefully

---

## Technical Requirements
- **Format**: HTML + external assets hosted on GitHub Pages
- **Assets**: Images in `assets/images/`, audio in `assets/audio/`
- **Storage**: localStorage for saving progress
- **Dependencies**: None (self-contained)
- **Responsiveness**: Desktop and tablet (min 768px)
- **Browsers**: Chrome, Safari, Firefox

### Asset Guidelines
- Use relative paths: `assets/images/...` (not absolute `/assets/...`)
- Optimize images for web (compress PNGs, use appropriate dimensions)
- Audio: MP3 for broad compatibility, keep files small
- Commit assets to git for GitHub Pages deployment

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
