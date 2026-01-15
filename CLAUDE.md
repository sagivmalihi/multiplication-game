# Multiplication Adventure Game - אריאל והרפתקת הכפל

## Project Status

**Current State**: All 10 Chapters Complete! (AI-generated assets)
**Live URL**: https://sagivmalihi.github.io/multiplication-game/
**Last Updated**: January 2025

### What's Implemented
- [x] Chapter 1: האחו האזמרגדי (The Emerald Meadow) - 10 encounters
- [x] Chapter 2: יער הלחשים (Whispering Woods) - 10 encounters
- [x] Chapter 3: מערות הבדולח (Crystal Caves) - 10 encounters
- [x] Chapter 4: הגנים המרחפים (Floating Gardens) - 10 encounters
- [x] Chapter 5: מפלי הקשת (Rainbow Falls) - 10 encounters
- [x] Chapter 6: מדבר ההדים (Desert of Echoes) - 10 encounters
- [x] Chapter 7: פסגות הקרח (Frozen Peaks) - 10 encounters
- [x] Chapter 8: ביצת הדמדומים (Twilight Marsh) - 10 encounters
- [x] Chapter 9: גשר הכוכבים (Starlight Bridge) - 10 encounters
- [x] Chapter 10: ארמון הגביש (Crystal Palace) - 10 encounters + Boss battle with Balagan
- [x] All 3 minigame types (Timed Selection, Fill Blank, Match Pairs)
- [x] Combat system with speed-based damage (1x/2x/3x multipliers)
- [x] Procedural 8-bit audio via Web Audio API + external BGM
- [x] AI-generated character/monster sprites (anime/chibi style, transparent backgrounds)
- [x] AI-generated background music (chapter-specific story + battle themes)
- [x] Hebrew RTL interface
- [x] Save/Load system (localStorage)
- [x] 6 game screens (Title, Story, Battle, Victory, Retry, Complete)
- [x] Title screen with background image and auto-playing music
- [x] Multi-chapter progression system
- [x] Chapter-specific backgrounds (story, battle, victory, complete screens)
- [x] Final chapter extended timers (15s/20s/60s) for harder tables 1-12
- [x] Game completion celebration with special victory message

### What's Remaining (Future Enhancements)
- [ ] Statistics tracking (mastery of each multiplication fact)
- [ ] Free play mode with random encounters

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
| Match Pairs | 45s | Memory game with 4 pairs (8 cards), unique answers |

---

## Files

| File/Folder | Purpose |
|-------------|---------|
| `index.html` | **The game** - core HTML/CSS/JS |
| `assets/images/` | External image assets (characters, monsters, backgrounds) |
| `assets/audio/` | External audio files (music, SFX) |
| `assets/images/PROMPTS.md` | Prompts used to generate images (for reproducibility) |
| `assets/audio/PROMPTS.md` | Prompts used to generate audio (for reproducibility) |
| `generate_image.py` | AI image generation script (Gemini 2.0 Flash) |
| `generate_audio.py` | AI audio generation script (ElevenLabs SFX + music) |
| `remove_bg.py` | Background removal script using rembg |
| `.env` | API keys (gitignored) |
| `CLAUDE.md` | Project instructions and status (this file) |
| `architecture.md` | Detailed technical architecture spec |
| `design-system.md` | Visual design, colors, typography, sprites |
| `storyline.md` | Full story for all 10 chapters |
| `audio-design.md` | Audio philosophy and Web Audio API specs |
| `tests/` | Playwright E2E tests (core-flow, save-load, full-game) |
| `playwright.config.ts` | Playwright test configuration |

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
**When**: Adding new sound effects, background music, or generating audio with ElevenLabs
**Note**: This project has a paid ElevenLabs account. ALWAYS use `generate_audio.py` to create chapter-specific music (story + battle BGM) for new chapters.

### `story-writer`
**Use for**: Hebrew narrative, dialogue, character text
**Tools**: Read, Glob
**When**: Adding new chapters, dialogue, or story content

---

## Development Guidelines

### Chapter Generation Guide

This is a comprehensive checklist of all assets and code changes needed to add a new chapter.

#### Asset Checklist

| Category | Asset | Location | Required? | Notes |
|----------|-------|----------|-----------|-------|
| **Images** | Story background | `assets/images/backgrounds/chapter{N}-{name}.png` | Yes | Peaceful scene for dialogue |
| | Battle arena | `assets/images/backgrounds/chapter{N}-battle.png` | Yes | Dramatic battle scene |
| | Chapter complete | `assets/images/backgrounds/chapter{N}-complete.png` | Yes | Celebration scene with crystal |
| | Monsters (3+) | `assets/images/monsters/{name}.png` | Yes | Transparent backgrounds |
| | Victory background | `assets/images/backgrounds/chapter{N}-victory.png` | Yes | Chapter-specific celebration |
| **Audio** | Story BGM | `assets/audio/music/chapter{N}-story.mp3` | Yes | Generate with ElevenLabs |
| | Battle BGM | `assets/audio/music/chapter{N}-battle.mp3` | Yes | Generate with ElevenLabs |
| | Victory jingle | `assets/audio/sfx/victory-jingle.mp3` | No | Shared |
| | Chapter complete SFX | `assets/audio/sfx/chapter-complete.mp3` | No | Shared |

#### Required Assets Per Chapter Summary

Each new chapter needs **6 required image assets + 2 audio assets**:
1. `chapter{N}-{name}.png` - Story/dialogue background
2. `chapter{N}-battle.png` - Battle arena background
3. `chapter{N}-victory.png` - Victory celebration (after defeating each monster)
4. `chapter{N}-complete.png` - Chapter completion celebration
5. 3+ monster PNGs with transparent backgrounds
6. `chapter{N}-story.mp3` - Chapter-specific story BGM (generate with ElevenLabs)
7. `chapter{N}-battle.mp3` - Chapter-specific battle BGM (generate with ElevenLabs)

#### Image Generation Commands

```bash
# Story background (peaceful, matches chapter theme)
uv run python generate_image.py "Fantasy game background of [CHAPTER SETTING]. [DESCRIPTION]. Anime style landscape for children's game. [COLOR PALETTE]. No characters. Wide aspect ratio." assets/images/backgrounds/chapter{N}-{name}.png

# Battle arena (dramatic version of chapter setting)
uv run python generate_image.py "Fantasy game battle arena in [CHAPTER SETTING]. Circular clearing with glowing runes. Dramatic lighting. [CHAPTER ELEMENTS]. Anime style. Action-ready. Wide aspect ratio. No characters." assets/images/backgrounds/chapter{N}-battle.png

# Victory celebration (after defeating each monster)
uv run python generate_image.py "Fantasy game victory celebration background in [CHAPTER SETTING]. [CHAPTER ELEMENTS]. Magical fireworks, golden sparkles and confetti. Triumphant joyful atmosphere. Anime style. Wide aspect ratio 16:9. No characters." assets/images/backgrounds/chapter{N}-victory.png

# Chapter complete celebration (golden hour with crystal)
uv run python generate_image.py "Fantasy game chapter complete celebration background. [CHAPTER SETTING] at golden hour with magical sparkles, confetti, and [CELEBRATION ELEMENTS]. [CRYSTAL COLOR] crystal glowing in center with rays of light. Triumphant joyful atmosphere. Anime style. Wide aspect ratio. No characters." assets/images/backgrounds/chapter{N}-complete.png

# Monster (always needs background removal)
uv run python generate_image.py "Cute confused [CREATURE TYPE] monster anime chibi style. [DESCRIPTION]. Big eyes with spiral confusion. Pokemon-like. Transparent background. Child-friendly." assets/images/monsters/{name}-raw.png
uv run python remove_bg.py assets/images/monsters/{name}-raw.png assets/images/monsters/{name}.png
```

#### Audio Generation Commands

```bash
# Story BGM (requires paid ElevenLabs)
uv run python generate_audio.py music "Gentle [MOOD] fantasy music for [CHAPTER THEME]. Soft atmospheric with [INSTRUMENTS]. Child-friendly. Seamless loop." --duration 60 assets/audio/music/chapter{N}-story.mp3

# Battle BGM (requires paid ElevenLabs)
uv run python generate_audio.py music "Energetic [MOOD] battle music for [CHAPTER THEME]. Exciting but not scary. For 7 year old. Seamless loop." --duration 60 assets/audio/music/chapter{N}-battle.mp3
```

#### Code Changes Required

**1. CSS Variables** (add chapter color theme):
```css
/* Chapter N: [Name] */
--chapter-{N}-primary: #XXXXXX;   /* Main theme color */
--chapter-{N}-secondary: #XXXXXX; /* Lighter accent */
--chapter-{N}-accent: #XXXXXX;    /* Darker accent */
--chapter-{N}-bg: #XXXXXX;        /* Light background tint */
```

**2. StoryContent** (add chapter data object):
```javascript
chapter{N}: {
  title: 'פרק {N}: [Hebrew Chapter Name]',
  intro: [
    { speaker: 'מספר', text: '[Narrator intro text]' },
    { speaker: 'פיפ', text: '[Pip dialogue]' },
    // 3-5 intro lines
  ],
  // tutorial: [] - Only for chapter 1
  encounters: [
    { monster: '{monster-id}', name: '[Hebrew name]', intro: '[Encounter text]' },
    // 10 encounters total, can repeat monsters
  ],
  outro: [
    { speaker: 'פיפ', text: '[Victory celebration text]' },
    // 2-4 outro lines
  ]
}
```

**3. Screen Backgrounds** (update CSS for chapter-specific backgrounds):
```css
#story-screen.chapter-{N} {
  background: url('assets/images/backgrounds/chapter{N}-{name}.png') center/cover no-repeat;
}
#battle-screen.chapter-{N} {
  background: url('assets/images/backgrounds/chapter{N}-battle.png') center/cover no-repeat;
}
#victory-screen.chapter-{N} {
  background: url('assets/images/backgrounds/chapter{N}-victory.png') center/cover no-repeat;
}
#complete-screen.chapter-{N} {
  background: url('assets/images/backgrounds/chapter{N}-complete.png') center/cover no-repeat;
}
```

**4. RiddleGenerator** (update difficulty for chapter):
```javascript
// Chapter difficulty progression
// Chapters 1-3: Tables 1-5
// Chapters 4-6: Tables 1-7
// Chapters 7-9: Tables 1-10
// Chapter 10: Tables 1-20
```

**5. AudioManager** (if using chapter-specific music):
```javascript
this.bgmElements.storyChapter{N} = new Audio('assets/audio/music/chapter{N}-story.mp3');
this.bgmElements.battleChapter{N} = new Audio('assets/audio/music/chapter{N}-battle.mp3');
```

#### Chapter Themes Reference (from storyline.md)

| Ch | Hebrew Name | English | Setting | Color Palette |
|----|-------------|---------|---------|---------------|
| 1 | האחו האזמרגדי | Emerald Meadows | Green hills, flowers | Greens, blue sky |
| 2 | יער הלחשים | Whispering Woods | Enchanted forest | Deep greens, purple mist |
| 3 | מערות הבדולח | Crystal Caves | Underground caverns | Blues, crystal whites |
| 4 | הגנים המרחפים | Floating Gardens | Sky islands | Sky blue, flower colors |
| 5 | מפלי הקשת | Rainbow Falls | Colorful waterfalls | Rainbow spectrum |
| 6 | מדבר ההדים | Desert of Echoes | Sandy dunes | Golds, oranges |
| 7 | פסגות הקרח | Frozen Peaks | Snowy mountains | Whites, ice blues |
| 8 | ביצת הדמדומים | Twilight Marsh | Purple swampland | Purples, dark blues |
| 9 | גשר הכוכבים | Starlight Bridge | Space bridge | Dark blue, starlight |
| 10 | ארמון הגביש | Crystal Palace | Royal palace | Golds, crystal rainbow |

#### Monster Design Guidelines

- **Style**: Anime chibi, Pokemon-like, child-friendly
- **Expression**: Confused (spiral eyes, question marks), never scary
- **Theme**: Match chapter setting (forest creatures, cave creatures, etc.)
- **Colors**: Match chapter color palette
- **Background**: Always transparent (use `remove_bg.py`)
- **Naming**: Hebrew name should be playful pun (e.g., חישובון = calculation + cute suffix)

#### Workflow Summary

1. **Story** (`story-writer` agent): Write Hebrew dialogue for intro, encounters, outro
2. **Visuals** (`visual-designer` agent): Generate backgrounds and monsters
3. **Audio** (`audio-designer` agent): Generate chapter-specific music (optional)
4. **Code** (`game-architect` agent): Add StoryContent, CSS, wire up assets
5. **Test**: Play through entire chapter, verify all encounters work

### Adding a New Chapter (Quick Version)
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

### Run Tests (Playwright E2E)
```bash
# Install dependencies (first time only)
npm install
npx playwright install chromium

# Run all tests
npm test

# Run specific test suites
npm run test:core      # Core flow tests (~45s)
npm run test:e2e       # All E2E tests
npm run test:full      # Full 100-encounter playthrough (~5min)

# Interactive/debug modes
npm run test:ui        # Playwright UI mode
npm run test:headed    # Watch tests run in browser
npm run test:debug     # Debug mode with inspector

# View test report
npm run report
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

---

## Lessons Learned / Gotchas

### User Preferences
- **Always use `uv run`** instead of `source .venv/bin/activate` for running Python scripts
- Example: `uv run python generate_image.py "prompt" output.png`

### AI Image Generation (Gemini)
- Model: `gemini-2.0-flash-exp-image-generation`
- **CRITICAL**: `part.inline_data.data` returns RAW BYTES, not base64-encoded
- Must check `part.inline_data.mime_type == 'image/png'` before saving
- Images come with solid backgrounds - need post-processing for transparency

### Background Removal (rembg)
- Use `remove_bg.py` script for transparent backgrounds
- **First run downloads ~176MB model** to `~/.u2net/u2net.onnx`
- Requires `tqdm` package for download progress bar
- Install: `uv pip install rembg[cli] Pillow tqdm`
- If dependency issues on Python 3.12, install with `--no-deps` then add: `onnxruntime pillow pooch numpy pymatting scipy opencv-python-headless scikit-image jsonschema tqdm`

### AI Audio Generation (ElevenLabs)
- **This project has a PAID ElevenLabs account** - always use it for audio generation
- Music API and SFX generation both work with paid plan
- **ALWAYS generate chapter-specific audio** for new chapters (story + battle BGM)
- Store prompts in `assets/audio/PROMPTS.md` for reproducibility

### Game Balance (for 7-year-old)
- Match Pairs: 6 pairs (12 cards) was TOO HARD
- Better: 4 pairs (8 cards) with 45s timer
- Always ensure unique answer numbers to avoid confusion
- Keep encouragement high, never punish mistakes

### Asset Management
- Store generation prompts in `PROMPTS.md` files for reproducibility
- Use relative paths: `assets/images/...` (not `/assets/...`)
- Commit binary assets to git for GitHub Pages deployment

### Environment Setup
```bash
# Create venv and install dependencies
uv venv
uv pip install google-genai python-dotenv elevenlabs rembg[cli] Pillow tqdm

# Required .env file
GEMINI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
```

### Common Commands
```bash
# Generate image
uv run python generate_image.py "anime chibi character" output.png

# Remove background
uv run python remove_bg.py input.png output.png

# Generate SFX
uv run python generate_audio.py sfx "magical sparkle sound" sfx.mp3

# Generate music (requires paid ElevenLabs)
uv run python generate_audio.py music "fantasy adventure theme" --duration 60 music.mp3
```
