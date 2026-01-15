# Multiplication Adventure Game

A magical web-based multiplication practice game featuring Arielle (אריאל), designed for 7-year-olds learning multiplication tables. Built with HTML/CSS/JS and hosted on GitHub Pages.

**Live Demo**: https://sagivmalihi.github.io/multiplication-game/

## Features

- 10 chapters of fantasy adventure story (Hebrew)
- 3 minigame types: Timed Selection, Fill in the Blank, Match Pairs
- Combat system with speed-based damage multipliers
- AI-generated anime-style characters, monsters, and backgrounds
- Chapter-specific background music (procedural + external audio)
- Save/Load system via localStorage
- RTL Hebrew interface optimized for children

## Quick Start

### Prerequisites

- **Node.js** (v18+) - for running tests
- **Python 3.12** - for asset generation scripts
- **uv** - Python package manager ([install guide](https://github.com/astral-sh/uv))

### Installation

```bash
# Clone the repository
git clone https://github.com/sagivmalihi/multiplication-game.git
cd multiplication-game

# Install Node.js dependencies (for tests)
npm install
npx playwright install chromium

# Set up Python environment with uv
uv venv
uv pip install google-genai python-dotenv elevenlabs rembg[cli] Pillow tqdm
```

### Environment Setup

Create a `.env` file in the project root for AI asset generation:

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

**Getting API Keys:**
- **Gemini API**: https://aistudio.google.com/apikey
- **ElevenLabs API**: https://elevenlabs.io/app/settings/api-keys (requires paid plan for music generation)

### Running Locally

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Run local server (recommended for testing)
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Testing

The project uses Playwright for end-to-end testing.

```bash
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

## Contributing with Claude Code

This project is optimized for development with [Claude Code](https://claude.com/claude-code). It includes specialized subagents that help with different aspects of game development.

### Available Subagents

Use these agents via the Task tool in Claude Code:

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `game-architect` | Technical architecture, state management, game systems | Planning new features, debugging game logic |
| `visual-designer` | CSS styles, SVG sprites, AI image generation | Adding characters, monsters, visual effects |
| `audio-designer` | Web Audio API sounds, external music/SFX | Sound effects, background music |
| `story-writer` | Hebrew narrative, dialogue, story content | New chapters, dialogue, character text |

### Example Usage

```
User: I want to add a new monster to chapter 3

Claude Code will:
1. Use `story-writer` agent to create Hebrew dialogue
2. Use `visual-designer` agent to generate monster image
3. Use `game-architect` agent to wire up the encounter
```

### Adding a New Chapter

Follow the Chapter Generation Guide in `CLAUDE.md`. Summary:

1. **Story Content** - Use `story-writer` agent for Hebrew narrative
2. **Visual Assets** - Use `visual-designer` agent to generate:
   - Story background (`chapter{N}-{name}.png`)
   - Battle arena (`chapter{N}-battle.png`)
   - Victory background (`chapter{N}-victory.png`)
   - Chapter complete (`chapter{N}-complete.png`)
   - 3+ monsters with transparent backgrounds
3. **Audio Assets** - Use `audio-designer` agent to generate:
   - Story BGM (`chapter{N}-story.mp3`)
   - Battle BGM (`chapter{N}-battle.mp3`)
4. **Code Changes** - Add chapter data to `StoryContent` object in `index.html`

## Asset Generation

### Image Generation (Gemini)

```bash
# Generate an image
uv run python generate_image.py "anime chibi forest monster, big eyes, cute, transparent background" assets/images/monsters/monster-raw.png

# Remove background for transparency
uv run python remove_bg.py assets/images/monsters/monster-raw.png assets/images/monsters/monster.png
```

### Audio Generation (ElevenLabs)

```bash
# Generate sound effect
uv run python generate_audio.py sfx "magical sparkle chime" assets/audio/sfx/sparkle.mp3 --duration 2

# Generate background music
uv run python generate_audio.py music "gentle fantasy adventure theme, child-friendly" --duration 60 assets/audio/music/theme.mp3

# List available presets
uv run python generate_audio.py --list-presets

# Generate a preset sound
uv run python generate_audio.py --preset correct
```

## Project Structure

```
multiplication-game/
├── index.html              # The game (HTML/CSS/JS)
├── CLAUDE.md               # Project instructions for Claude Code
├── architecture.md         # Technical architecture spec
├── design-system.md        # Visual design documentation
├── storyline.md            # Full story for all 10 chapters
├── audio-design.md         # Audio philosophy and specs
├── generate_image.py       # AI image generation script
├── generate_audio.py       # AI audio generation script
├── remove_bg.py            # Background removal script
├── assets/
│   ├── images/
│   │   ├── characters/     # Arielle, Pip, NPCs
│   │   ├── monsters/       # Enemy sprites
│   │   ├── backgrounds/    # Scene backgrounds
│   │   └── PROMPTS.md      # Image generation prompts
│   └── audio/
│       ├── music/          # Background music
│       ├── sfx/            # Sound effects
│       └── PROMPTS.md      # Audio generation prompts
├── tests/
│   └── e2e/                # Playwright E2E tests
├── .claude/
│   └── agents/             # Claude Code subagent definitions
├── package.json            # Node.js dependencies
└── playwright.config.ts    # Test configuration
```

## Documentation

| File | Description |
|------|-------------|
| `CLAUDE.md` | Complete development guide, chapter generation checklist |
| `architecture.md` | Game systems, state management, technical design |
| `design-system.md` | Colors, typography, sprites, visual style |
| `storyline.md` | Full narrative for all 10 chapters |
| `audio-design.md` | Sound design philosophy, Web Audio API patterns |

## Deployment

The game auto-deploys to GitHub Pages when you push to `main`:

```bash
git add .
git commit -m "Your changes"
git push origin main
# Auto-deploys to https://sagivmalihi.github.io/multiplication-game/
```

## Technical Details

- **Format**: Single HTML file with embedded CSS/JS
- **Storage**: localStorage for save data
- **Audio**: Web Audio API (procedural) + external MP3 files
- **Browser Support**: Chrome, Safari, Firefox
- **Responsive**: Desktop and tablet (min 768px)

## License

ISC

## Acknowledgments

- Built for Arielle, a wonderful 7-year-old learning multiplication
- AI assets generated with Google Gemini and ElevenLabs
- Hebrew language support with RTL layout
