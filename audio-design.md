# Audio Design System: אריאל והרפתקת הכפל
## Arielle and the Multiplication Adventure

---

## Table of Contents
1. [Audio Philosophy](#audio-philosophy)
2. [Background Music Tracks](#background-music-tracks)
3. [Sound Effects Catalog](#sound-effects-catalog)
4. [Per-Chapter Audio Themes](#per-chapter-audio-themes)
5. [Technical Specifications](#technical-specifications)
6. [Web Audio API Implementation](#web-audio-api-implementation)
7. [Asset Creation Method](#asset-creation-method)

---

## Audio Philosophy

### Core Aesthetic
- **Style**: Retro 8-bit chiptune with mixed era influence
- **Era Mix**: Combines NES (square waves), Game Boy (pulse waves), and Genesis (FM synthesis)
- **Target Audience**: 7-year-old girls - encouraging, never punishing
- **Mood**: Magical, empowering, celebratory, adventurous
- **Voice**: Purely instrumental - NO synthesized speech or voice-like elements

### Audio Principles
1. **Encouraging Always**: Wrong answer sounds are cheerful "try again!" melodies, not buzzes
2. **Celebration-Focused**: Victory sounds are big and rewarding
3. **Retro But Modern**: 8-bit style with contemporary mixing and clarity
4. **Energy Variation**: Light melodic for story, fast-paced for battles, triumphant for victories
5. **Never Punishing**: All audio reinforces positive learning experience

### Technical Constraints
- Single HTML file implementation (Web Audio API)
- No external audio files required (procedurally generated)
- Mobile-friendly (user interaction to start audio)
- Mute/unmute functionality
- Volume control for music and SFX separately

---

## Background Music Tracks

### Track 1: Title Theme
**Name**: "Princess Arielle's Awakening"
**Description**: Opening title screen music, plays when game loads
**Mood**: Magical, inviting, adventurous, slightly mysterious
**Tempo**: 120 BPM (medium)
**Duration**: 45 seconds (loops seamlessly)
**Wave Forms**: Square (melody), Triangle (bass), Noise (light percussion)
**Key**: C Major
**Used In**: `TITLE` screen state

**Musical Structure**:
- Intro: 8 bars - ascending magical motif
- A Section: 16 bars - main adventurous melody
- B Section: 16 bars - softer, mysterious variation
- Loop point at bar 8

**Implementation Notes**:
- Two-channel square wave harmony
- Triangle bass arpeggio pattern
- Light noise percussion (kick, snare pattern)
- Auto-continues if save exists, so fade-out prepared

---

### Track 2: Story/Dialogue Theme
**Name**: "Tales of Numeria"
**Description**: Soft background music during story segments and dialogue
**Mood**: Gentle, atmospheric, unobtrusive, warm
**Tempo**: 80 BPM (slow)
**Duration**: 60 seconds loop
**Wave Forms**: Triangle (lead), Sine (pad), very quiet square (texture)
**Key**: F Major
**Used In**: `STORY` screen state (all chapters)

**Musical Structure**:
- Minimal melody, mostly pad textures
- Allows Hebrew dialogue to be primary focus
- Gentle arpeggios
- No percussion
- Smooth loop transition

**Implementation Notes**:
- Volume: 40% of maximum (low, supportive)
- Should not distract from reading Hebrew text
- Warm, comforting tone

---

### Track 3: Battle Theme (Early Chapters 1-3)
**Name**: "Emerald Challenge"
**Description**: Upbeat battle music for early game encounters
**Mood**: Energetic but not intimidating, encouraging, fun
**Tempo**: 140 BPM (fast)
**Duration**: 50 seconds loop
**Wave Forms**: Square (lead), Square (harmony), Triangle (bass), Noise (drums)
**Key**: G Major (bright, cheerful)
**Used In**: `BATTLE` state, Chapters 1-3

**Musical Structure**:
- Intro: 4 bars - call to action
- Verse: 16 bars - driving melody
- Chorus: 16 bars - more energetic
- Bridge: 8 bars - builds tension
- Back to Verse (loop)

**Implementation Notes**:
- NES-style square lead with fast arpeggios
- Game Boy-style bass line (triangle)
- Simple kick-snare pattern (noise channel)
- Fast enough to create urgency but not panic

---

### Track 4: Battle Theme (Mid Chapters 4-6)
**Name**: "Skyward Struggle"
**Description**: More complex battle music as difficulty increases
**Mood**: Adventurous, determined, heroic
**Tempo**: 145 BPM (faster)
**Duration**: 55 seconds loop
**Wave Forms**: Square (two channels), Triangle (bass), Sawtooth (accent), Noise (drums)
**Key**: D Major
**Used In**: `BATTLE` state, Chapters 4-6

**Musical Structure**:
- More complex harmony (two square channels interweaving)
- Added sawtooth for Genesis-style FM synthesis feel
- More varied drum patterns
- Builds on Track 3's energy

---

### Track 5: Battle Theme (Late Chapters 7-9)
**Name**: "Frozen Resolve"
**Description**: Epic battle theme for advanced challenges
**Mood**: Intense but encouraging, epic, heroic
**Tempo**: 150 BPM (fast)
**Duration**: 60 seconds loop
**Wave Forms**: Square x2 (harmony), Triangle (bass), Sawtooth (lead), Noise (full drums)
**Key**: A Minor (darker, more dramatic)
**Used In**: `BATTLE` state, Chapters 7-9

**Musical Structure**:
- Most complex arrangement
- Three melodic channels active simultaneously
- Full drum kit pattern (kick, snare, hi-hat)
- Key change at bridge (dramatic shift)

---

### Track 6: Boss Battle Theme (Chapter 10)
**Name**: "Balagan's Confusion"
**Description**: Special battle music for final chapter/Balagan encounter
**Mood**: Playful chaos, whimsical, not scary, builds to resolution
**Tempo**: 155 BPM (fastest), with tempo variations
**Duration**: 70 seconds loop
**Wave Forms**: All channels (Square x2, Triangle, Sawtooth, Noise)
**Key**: E Minor, modulates to E Major at resolution
**Used In**: `BATTLE` state, Chapter 10 (special encounters)

**Musical Structure**:
- Intentionally "chaotic" melody (off-beat rhythms)
- Random pitch bends (confusion magic!)
- Resolves into heroic major key theme
- Most Genesis-influenced (FM synthesis emulation)

---

### Track 7: Victory Jingle (Short)
**Name**: "Problem Solved!"
**Description**: Quick celebratory jingle when monster is defeated
**Mood**: Triumphant, cheerful, rewarding
**Tempo**: 160 BPM
**Duration**: 3 seconds (NO LOOP)
**Wave Forms**: Square (melody), Triangle (fanfare bass)
**Key**: C Major
**Used In**: `VICTORY` screen state (brief version)

**Musical Structure**:
- Classic "victory fanfare" pattern
- Ascending melody with resolution
- Three-note finale: ta-da-DAH!

---

### Track 8: Chapter Complete Theme
**Name**: "Crystal Restored"
**Description**: Longer celebration for completing a chapter (10 encounters)
**Mood**: Grand, triumphant, "level up" feeling
**Tempo**: 120 BPM
**Duration**: 8 seconds (NO LOOP)
**Wave Forms**: Square x2 (harmony), Triangle (bass), Noise (cymbal crash)
**Key**: F Major
**Used In**: `VICTORY` state when completing chapter's final encounter

**Musical Structure**:
- Full fanfare with harmony
- Builds in intensity
- Ends with cymbal crash and major chord

---

### Track 9: Game Complete Theme
**Name**: "Koach HaKefel - Power of Multiplication"
**Description**: Epic ending theme for completing all 100 encounters
**Mood**: Grand celebration, sense of accomplishment, emotional payoff
**Tempo**: 130 BPM
**Duration**: 20 seconds (plays once, then loops softer section)
**Wave Forms**: All channels at full capacity
**Key**: C Major
**Used In**: `GAME_COMPLETE` screen state

**Musical Structure**:
- Full orchestral-style chiptune arrangement
- Quotes melodic themes from earlier tracks
- Grand finale with all channels playing
- Final held major chord with arpeggio flourish

---

### Track 10: Retry Screen Theme
**Name**: "Try Again, You Can Do It!"
**Description**: Encouraging music when timer runs out
**Mood**: Supportive, gentle, motivating (NOT sad or failure-themed)
**Tempo**: 100 BPM (slower, calmer)
**Duration**: 30 seconds loop
**Wave Forms**: Triangle (lead), Sine (pad)
**Key**: G Major
**Used In**: `RETRY` screen state

**Musical Structure**:
- Soft, comforting melody
- Minimal percussion
- Builds confidence to try again
- Similar to Story theme but slightly more hopeful

---

## Sound Effects Catalog

### Event Hook Mapping (from architecture.md)

All SFX are procedurally generated using Web Audio API with authentic 8-bit constraints.

---

#### SFX-001: Game Start
**Event Hook**: `game_start`
**Description**: Initial sound when starting new game or continuing
**Duration**: 1.2 seconds
**Wave Forms**: Square sweep upward
**Notes**: C4 → C5 (one octave sweep)
**Implementation**:
```javascript
// Upward frequency sweep (powering up)
// Square wave, 0.5 second, C4 to C5
```

---

#### SFX-002: Button Click
**Event Hook**: UI button interactions
**Description**: Satisfying click for all button presses
**Duration**: 0.1 seconds
**Wave Forms**: Square pulse
**Notes**: C5 (short blip)
**Implementation**:
```javascript
// Quick square pulse at C5, exponential decay
```

---

#### SFX-003: Story Continue
**Event Hook**: `story_continue`
**Description**: Soft confirmation when advancing dialogue
**Duration**: 0.3 seconds
**Wave Forms**: Triangle
**Notes**: G4 → C5 (ascending fifth)
**Implementation**:
```javascript
// Gentle ascending tone, triangle wave
```

---

#### SFX-004: Battle Start
**Event Hook**: `battle_start`
**Description**: Energetic sound when entering battle screen
**Duration**: 0.8 seconds
**Wave Forms**: Square + Noise
**Notes**: C3 → C4 (dramatic sweep) + drum hit
**Implementation**:
```javascript
// Dramatic sweep with noise burst (like battle begin)
```

---

#### SFX-005: Riddle Shown
**Event Hook**: `riddle_shown`
**Description**: Light sound when new multiplication problem appears
**Duration**: 0.4 seconds
**Wave Forms**: Triangle arpeggio
**Notes**: C5-E5-G5 (major triad arpeggio)
**Implementation**:
```javascript
// Quick upward arpeggio, gentle and curious
```

---

#### SFX-006: Correct Answer (1x Damage)
**Event Hook**: `correct_answer` with `damage: 1`
**Description**: Positive, rewarding chime for normal-speed correct answer
**Duration**: 0.5 seconds
**Wave Forms**: Square
**Notes**: C5-E5 (major third)
**Implementation**:
```javascript
// Two-note ascending, bright and cheerful
```

---

#### SFX-007: Correct Answer (2x Damage - Fast)
**Event Hook**: `correct_answer` with `damage: 2`
**Description**: More exciting sound for fast correct answer
**Duration**: 0.6 seconds
**Wave Forms**: Square (rapid arpeggio)
**Notes**: C5-E5-G5 (major triad, fast)
**Implementation**:
```javascript
// Three-note ascending arpeggio, more energetic
// Add slight pitch bend for excitement
```

---

#### SFX-008: Correct Answer (3x Damage - Super Fast)
**Event Hook**: `correct_answer` with `damage: 3`
**Description**: Epic, celebratory sound for super-fast correct answer
**Duration**: 0.8 seconds
**Wave Forms**: Square + Triangle harmony
**Notes**: C5-E5-G5-C6 (octave leap)
**Implementation**:
```javascript
// Full arpeggio with harmony, power-up sound
// Includes swoosh noise burst
```

---

#### SFX-009: Wrong Answer (Encouraging Pip-like)
**Event Hook**: `wrong_answer`
**Description**: Gentle, encouraging melodic pattern - "try again!" feeling
**Duration**: 0.7 seconds
**Wave Forms**: Triangle (soft, warm)
**Notes**: E5-D5-C5 (descending but ends on resolution, not failure tone)
**Mood**: Encouraging beeps, pip-like, quick melodic pattern
**Implementation**:
```javascript
// Three-note descending pattern with triangle wave
// Soft volume, gentle envelope
// Ends on stable note (not dissonant)
// Think: "Oops! Try again!" not "WRONG!"
```

---

#### SFX-010: Monster Hit
**Event Hook**: `monster_hit`
**Description**: Impact sound when damage is dealt to monster
**Duration**: 0.3 seconds
**Wave Forms**: Noise burst + low square
**Notes**: C2 (low thud) + noise
**Implementation**:
```javascript
// Low thud with noise burst, not violent
// Cartoon-style impact
```

---

#### SFX-011: Monster Defeated
**Event Hook**: `monster_defeated`
**Description**: Monster calms down / disappears sound
**Duration**: 1.0 seconds
**Wave Forms**: Square sweep (descending to ascending)
**Notes**: Descend from C5 to C4, then quick ascend C4→G4 (resolution)
**Implementation**:
```javascript
// "Poof" sound - descending pitch sweep, then uplift
// Ends on positive resolution (monster is now happy!)
```

---

#### SFX-012: Timer Tick (Last 10 Seconds)
**Event Hook**: `timer_tick` when `remaining <= 10`
**Description**: Gentle reminder ticks when time is low (NOT scary)
**Duration**: 0.1 seconds per tick
**Wave Forms**: Triangle pulse
**Notes**: G4 (soft pulse)
**Implementation**:
```javascript
// Soft pulse every second
// NOT stressful, just a friendly reminder
// Volume increases slightly as time decreases
```

---

#### SFX-013: Time Up
**Event Hook**: `time_up`
**Description**: Time expired sound (gentle, not harsh)
**Duration**: 1.2 seconds
**Wave Forms**: Triangle descending sweep
**Notes**: G4 → C4 (descending)
**Implementation**:
```javascript
// Gentle descending tone
// Followed by soft noise (like a sigh)
// NOT punishing, just "time's up, let's try again"
```

---

#### SFX-014: Victory Screen Shown
**Event Hook**: `victory_shown`
**Description**: Big celebratory sound burst when victory screen appears
**Duration**: 0.5 seconds
**Wave Forms**: Square + Noise (cymbal crash emulation)
**Notes**: C5-E5-G5-C6 (triumphant chord arpeggio)
**Implementation**:
```javascript
// Rapid upward arpeggio with noise burst
// Like fireworks or confetti popping
```

---

#### SFX-015: Game Saved
**Event Hook**: `game_saved`
**Description**: Subtle confirmation that progress was saved
**Duration**: 0.4 seconds
**Wave Forms**: Sine (smooth)
**Notes**: C5 → G5 (perfect fifth)
**Implementation**:
```javascript
// Smooth ascending tone, reassuring
// Very quick, non-intrusive
```

---

#### SFX-016: Chapter Complete
**Event Hook**: `chapter_complete`
**Description**: Major celebration sound for finishing a chapter
**Duration**: 1.5 seconds
**Wave Forms**: Square + Triangle harmony
**Notes**: Full ascending scale C4→C5 with chord progression
**Implementation**:
```javascript
// Triumphant ascending run
// Ends with major chord (C-E-G)
// Matches "Crystal Restored" music theme
```

---

#### SFX-017: Game Complete
**Event Hook**: `game_complete`
**Description**: Ultimate celebration sound for completing all 100 encounters
**Duration**: 2.0 seconds
**Wave Forms**: All channels (Square x2, Triangle, Sawtooth)
**Notes**: Grand finale flourish
**Implementation**:
```javascript
// Most elaborate SFX in the game
// Multi-channel harmony explosion
// Ends with long sustained major chord
```

---

#### SFX-018: Pip Appears
**Event Hook**: When Pip sprite enters screen
**Description**: Magical sparkle sound for Pip's appearance
**Duration**: 0.5 seconds
**Wave Forms**: Triangle (high frequency)
**Notes**: Rapid ascending arpeggio C6-E6-G6-C7
**Implementation**:
```javascript
// High-pitched sparkle effect
// Very fast arpeggio (like magic fairy dust)
```

---

#### SFX-019: Crystal Collected
**Event Hook**: When chapter crystal is obtained
**Description**: Magical "power-up" sound
**Duration**: 1.0 seconds
**Wave Forms**: Square (melody) + Triangle (bass)
**Notes**: Classic power-up ascending pattern
**Implementation**:
```javascript
// Ascending pitch sweep with vibrato
// Ends on high sustained note
// Like collecting a special item in retro games
```

---

#### SFX-020: Confetti Burst
**Event Hook**: Visual confetti effect on victory screen
**Description**: Festive popping sound
**Duration**: 0.8 seconds
**Wave Forms**: Noise burst (filtered)
**Notes**: N/A (noise-based)
**Implementation**:
```javascript
// Series of quick noise bursts at different pitches
// Like fireworks or party poppers
// 3-4 rapid bursts with decay
```

---

## Per-Chapter Audio Themes

Each chapter has a recommended audio flavor that influences battle music variations and ambient SFX.

### Chapter 1: Emerald Meadows
**Dominant Mood**: Gentle, pastoral, beginning adventure
**Music Style**: Light 8-bit melody, major key (G Major)
**Tempo**: Moderate (140 BPM)
**Special Audio Elements**:
- Nature ambience suggestions (optional): soft wind noise (filtered white noise)
- Monster sounds are cute and gentle
- Victory fanfares are simple and cheerful

**Battle Music**: Use **Track 3** (Emerald Challenge)
**SFX Characteristics**: All SFX at normal pitch and speed

---

### Chapter 2: Whispering Woods
**Dominant Mood**: Mysterious but friendly, talking trees
**Music Style**: Echo effects, mysterious harmonies (F Major)
**Tempo**: Moderate (140 BPM)
**Special Audio Elements**:
- Add reverb/delay to simulate forest echoes
- Whisper-like swoosh sounds (filtered noise)
- Wood percussion elements

**Battle Music**: Use **Track 3** (Emerald Challenge) with subtle reverb
**SFX Characteristics**: Add slight delay/echo to correct answer sounds

---

### Chapter 3: Crystal Caves
**Dominant Mood**: Underground, glowing crystals, magical
**Music Style**: Resonant, echoing, crystalline tones (C Major)
**Tempo**: Moderate-slow (135 BPM)
**Special Audio Elements**:
- High-frequency sparkle effects (triangle wave)
- Cave reverb/echo
- Crystalline bell-like tones

**Battle Music**: Use **Track 3** with cave reverb, add high shimmer layer
**SFX Characteristics**: Add reverb to all sounds, crystal chime accents

---

### Chapter 4: Floating Gardens
**Dominant Mood**: Airy, light, sky adventure
**Music Style**: Bright, uplifting, floating melodies (D Major)
**Tempo**: Moderate-fast (145 BPM)
**Special Audio Elements**:
- Wind swoosh effects (filtered white noise)
- Light, bouncy rhythm
- Airy pads (sine waves)

**Battle Music**: Use **Track 4** (Skyward Struggle)
**SFX Characteristics**: Higher pitch variants, lighter tone

---

### Chapter 5: Rainbow Falls
**Dominant Mood**: Joyful, colorful, celebratory
**Music Style**: Most vibrant and varied, all colors represented musically
**Tempo**: Fast (145 BPM)
**Special Audio Elements**:
- Water sounds (filtered noise modulation)
- Color restoration SFX (ascending sweeps as colors return)
- Most melodic and happy of all chapters

**Battle Music**: Use **Track 4** with extra bright mixing
**SFX Characteristics**: Most colorful/varied pitch ranges, rainbow arpeggio patterns

---

### Chapter 6: Desert of Echoes
**Dominant Mood**: Expansive, echoing, mystery
**Music Style**: Echo-heavy, sparse instrumentation (E Minor)
**Tempo**: Moderate (145 BPM)
**Special Audio Elements**:
- Prominent delay/echo effects on all sounds
- Empty space in arrangement (like desert vastness)
- Echo repetition SFX

**Battle Music**: Use **Track 4** with heavy delay/echo effects
**SFX Characteristics**: All sounds echo (delay effect at 1/4 note intervals)

---

### Chapter 7: Frozen Peaks
**Dominant Mood**: Cold but beautiful, adventure perseverance
**Music Style**: Ice-like tones, slower attack (A Minor → A Major transition)
**Tempo**: Fast but deliberate (150 BPM)
**Special Audio Elements**:
- Icy wind sounds (high-frequency filtered noise)
- Bell-like ice tones (triangle wave)
- Warmth returning = major key shift

**Battle Music**: Use **Track 5** (Frozen Resolve)
**SFX Characteristics**: Add icy shimmer layer (high triangle wave)

---

### Chapter 8: Twilight Marsh
**Dominant Mood**: Mysterious, playful mischief, spooky-fun
**Music Style**: Dark but not scary, playful minor (D Minor)
**Tempo**: Fast (150 BPM)
**Special Audio Elements**:
- Swampy low-frequency pulses
- Will-o-wisp floating sounds (wobbling pitch)
- Purple/pink-themed (if translating to audio, use vibrato)

**Battle Music**: Use **Track 5** with minor key variation
**SFX Characteristics**: Add vibrato/wobble to sounds, mysterious but playful

---

### Chapter 9: Starlight Bridge
**Dominant Mood**: Cosmic, awe-inspiring, approaching destiny
**Music Style**: Space-like, synthesizer tones, grand (C Minor)
**Tempo**: Fast (150 BPM)
**Special Audio Elements**:
- Space ambience (low-frequency sine waves)
- Star twinkle sounds (high-frequency pulses)
- Epic, building intensity

**Battle Music**: Use **Track 5** with cosmic effects
**SFX Characteristics**: Add space reverb, star shimmer effects

---

### Chapter 10: Crystal Palace
**Dominant Mood**: Grand, royal, final confrontation, redemption
**Music Style**: Most complex, all elements combined (E Minor → E Major)
**Tempo**: Fastest (155 BPM)
**Special Audio Elements**:
- Royal fanfare elements
- Chaos magic (pitch bends, tempo variations)
- Resolution to major key (redemption theme)
- All previous chapter themes quoted

**Battle Music**: Use **Track 6** (Balagan's Confusion)
**SFX Characteristics**: Most elaborate, royal/regal quality, intentional chaos resolving to order

**Special Note**: Balagan "boss battle" is NOT combat - it's a mathematical duel ending in friendship. Music reflects this by starting chaotic and resolving into warm, friendly major key.

---

## Technical Specifications

### Authentic 8-Bit Constraints

To achieve genuine retro sound mixing NES, Game Boy, and Genesis aesthetics:

#### Channel Limitations
```
NES-Style (4 channels):
- Square Wave 1 (melody)
- Square Wave 2 (harmony)
- Triangle Wave (bass)
- Noise (drums/percussion)

Game Boy Addition:
- Wave Channel (custom waveforms for special effects)

Genesis Addition:
- Sawtooth/FM Synthesis (richer harmonics)
```

#### Wave Forms

**Square Wave** (50% duty cycle):
```javascript
// Primary melody and harmony
// Characteristics: Bright, hollow, classic chiptune sound
// NES-style pulse wave
```

**Triangle Wave**:
```javascript
// Bass lines, softer melodies
// Characteristics: Softer than square, rounder tone
// Used for bass and gentle lead
```

**Sawtooth Wave**:
```javascript
// Genesis-inspired FM synthesis emulation
// Characteristics: Buzzy, richer harmonics
// Used for accent notes and special effects
```

**Sine Wave**:
```javascript
// Smooth pads and sub-bass
// Characteristics: Pure tone, no harmonics
// Used sparingly for warmth
```

**Noise (White/Pink)**:
```javascript
// Percussion and effects
// Characteristics: Random frequencies
// Filtered for kicks, snares, hi-hats
```

#### Sample Rate & Bit Depth

**Authentic 8-bit specs**:
- Sample Rate: 44100 Hz (modern web standard, but simulate lower)
- Bit Depth: Simulate 8-bit (256 amplitude steps) via quantization
- Frequency Range: 20 Hz - 12000 Hz (roll off highs for authentic feel)

**Implementation**:
```javascript
// Apply bit-crushing effect for authentic lo-fi sound
function bitCrush(audioBuffer, bits = 8) {
  const step = Math.pow(2, bits);
  // Quantize samples to simulate lower bit depth
}

// Sample rate reduction simulation
function downSample(audioBuffer, factor = 2) {
  // Reduce effective sample rate for grit
}
```

#### Frequency Limitations

**Note Range**:
- Lowest note: C2 (65.41 Hz) - bass
- Highest note: C7 (2093 Hz) - effects/sparkles
- Sweet spot: C4-C6 (melody range)

**Avoid**:
- Sub-bass below 60 Hz (not period-accurate)
- Ultra-high frequencies above 12 kHz

#### Envelope (ADSR)

**Classic 8-bit envelopes**:

```
Attack: Instant (0-5ms) - no slow attacks
Decay: Fast (10-50ms)
Sustain: Variable (short for plucks, long for pads)
Release: Fast (10-100ms)
```

**Example envelopes by sound type**:
```javascript
// Pluck (correct answer, button clicks)
const pluckEnvelope = {
  attack: 0.001,
  decay: 0.05,
  sustain: 0,
  release: 0.01
};

// Pad (background, sustained notes)
const padEnvelope = {
  attack: 0.01,
  decay: 0.1,
  sustain: 0.7,
  release: 0.2
};

// Percussion (drums)
const percEnvelope = {
  attack: 0.001,
  decay: 0.05,
  sustain: 0,
  release: 0.01
};
```

#### Vibrato & Pitch Bend

**Vibrato** (periodic pitch modulation):
```javascript
// For expressive sustained notes
const vibratoFreq = 5-8 Hz; // Vibrato speed
const vibratoDepth = 0.5-2%; // Pitch variation
```

**Pitch Bend** (glissando effects):
```javascript
// For swooshes, power-ups, wrong answer descents
// Exponential curves preferred for natural feel
```

#### Volume Levels

**Relative mix** (all values relative to max = 1.0):
```
Music Background: 0.4-0.6
SFX: 0.7-1.0 (peak at 0.8 for most)
UI Sounds: 0.5 (subtle)
Victory/Celebration: 1.0 (full volume)
```

**Dynamic Range**:
- Compress audio to avoid clipping
- Keep headroom of -3dB
- 8-bit style = less dynamic range (intentional)

---

## Web Audio API Implementation

### Architecture Overview

```javascript
// ============================================
// AUDIO MANAGER - Main System
// ============================================

const AudioManager = {
  context: null,
  musicGain: null,
  sfxGain: null,
  currentBGM: null,

  // Settings
  settings: {
    musicEnabled: true,
    sfxEnabled: true,
    musicVolume: 0.5,
    sfxVolume: 0.7
  },

  // Initialize Audio Context
  init() {
    // Create on user interaction (mobile requirement)
    document.addEventListener('click', this.createContext.bind(this), { once: true });
  },

  createContext() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    // Master gain nodes
    this.musicGain = this.context.createGain();
    this.musicGain.gain.value = this.settings.musicVolume;
    this.musicGain.connect(this.context.destination);

    this.sfxGain = this.context.createGain();
    this.sfxGain.gain.value = this.settings.sfxVolume;
    this.sfxGain.connect(this.context.destination);
  },

  // Play background music
  playBGM(trackName) {
    if (!this.settings.musicEnabled) return;

    // Stop current music
    if (this.currentBGM) {
      this.stopBGM();
    }

    // Create new music
    this.currentBGM = this.createMusic(trackName);
    this.currentBGM.start();
  },

  // Stop background music
  stopBGM() {
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }
  },

  // Play sound effect
  playSFX(sfxName, options = {}) {
    if (!this.settings.sfxEnabled) return;

    const sfx = this.createSFX(sfxName, options);
    sfx.start();
  },

  // Volume controls
  setMusicVolume(level) {
    this.settings.musicVolume = Math.max(0, Math.min(1, level));
    if (this.musicGain) {
      this.musicGain.gain.value = this.settings.musicVolume;
    }
  },

  setSFXVolume(level) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, level));
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.settings.sfxVolume;
    }
  },

  // Mute controls
  toggleMusic() {
    this.settings.musicEnabled = !this.settings.musicEnabled;
    if (!this.settings.musicEnabled) {
      this.stopBGM();
    }
  },

  toggleSFX() {
    this.settings.sfxEnabled = !this.settings.sfxEnabled;
  },

  // Music and SFX creation (implemented below)
  createMusic(trackName) { /* ... */ },
  createSFX(sfxName, options) { /* ... */ }
};
```

---

### Wave Generator Helpers

```javascript
// ============================================
// WAVE GENERATORS
// ============================================

const WaveGenerator = {
  // Create oscillator with specified waveform
  createOscillator(ctx, type, frequency) {
    const osc = ctx.createOscillator();
    osc.type = type; // 'square', 'triangle', 'sawtooth', 'sine'
    osc.frequency.value = frequency;
    return osc;
  },

  // Create noise generator (white noise)
  createNoise(ctx) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  },

  // Create filtered noise (for kicks, snares, hi-hats)
  createFilteredNoise(ctx, filterType, frequency, q = 1) {
    const noise = this.createNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = filterType; // 'lowpass', 'highpass', 'bandpass'
    filter.frequency.value = frequency;
    filter.Q.value = q;

    noise.connect(filter);
    return { source: noise, filter: filter };
  },

  // Apply ADSR envelope
  createEnvelope(ctx, gainNode, startTime, attack, decay, sustain, release, duration) {
    const now = startTime || ctx.currentTime;
    const gain = gainNode.gain;

    gain.cancelScheduledValues(now);
    gain.setValueAtTime(0, now);

    // Attack
    gain.linearRampToValueAtTime(1, now + attack);

    // Decay
    gain.linearRampToValueAtTime(sustain, now + attack + decay);

    // Sustain (hold)
    const sustainEnd = now + duration - release;
    gain.setValueAtTime(sustain, sustainEnd);

    // Release
    gain.linearRampToValueAtTime(0, sustainEnd + release);
  }
};
```

---

### Note Frequency Table

```javascript
// ============================================
// NOTE FREQUENCIES (Equal Temperament)
// ============================================

const Notes = {
  // Octave 2
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,

  // Octave 3
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,

  // Octave 4 (middle C)
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,

  // Octave 5
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,

  // Octave 6
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.00, B6: 1975.53,

  // Octave 7 (high sparkles)
  C7: 2093.00
};
```

---

### Example SFX Implementation

```javascript
// ============================================
// SFX-006: Correct Answer (1x Damage)
// ============================================

function createCorrectAnswer1x(ctx, destinationNode) {
  const now = ctx.currentTime;
  const duration = 0.5;

  // Oscillator (square wave, bright tone)
  const osc = WaveGenerator.createOscillator(ctx, 'square', Notes.C5);

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(destinationNode);

  // Two-note ascending melody: C5 -> E5
  osc.frequency.setValueAtTime(Notes.C5, now);
  osc.frequency.setValueAtTime(Notes.E5, now + 0.25);

  // ADSR envelope
  const attack = 0.001;
  const decay = 0.05;
  const sustain = 0.6;
  const release = 0.1;

  WaveGenerator.createEnvelope(ctx, gain, now, attack, decay, sustain, release, duration);

  // Start and stop
  osc.start(now);
  osc.stop(now + duration);

  return { osc, gain };
}

// ============================================
// SFX-009: Wrong Answer (Encouraging)
// ============================================

function createWrongAnswer(ctx, destinationNode) {
  const now = ctx.currentTime;
  const duration = 0.7;

  // Triangle wave (softer, warmer tone)
  const osc = WaveGenerator.createOscillator(ctx, 'triangle', Notes.E5);

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(destinationNode);

  // Three-note descending BUT resolving pattern: E5 -> D5 -> C5
  // Ends on stable tone (not dissonant)
  osc.frequency.setValueAtTime(Notes.E5, now);
  osc.frequency.setValueAtTime(Notes.D5, now + 0.23);
  osc.frequency.setValueAtTime(Notes.C5, now + 0.46);

  // Gentle envelope (soft, encouraging)
  const attack = 0.01;
  const decay = 0.08;
  const sustain = 0.5;
  const release = 0.15;

  WaveGenerator.createEnvelope(ctx, gain, now, attack, decay, sustain, release, duration);

  // Start and stop
  osc.start(now);
  osc.stop(now + duration);

  return { osc, gain };
}

// ============================================
// SFX-008: Correct Answer (3x Damage - Super Fast)
// ============================================

function createCorrectAnswer3x(ctx, destinationNode) {
  const now = ctx.currentTime;
  const duration = 0.8;

  // Two oscillators for harmony (square + triangle)
  const osc1 = WaveGenerator.createOscillator(ctx, 'square', Notes.C5);
  const osc2 = WaveGenerator.createOscillator(ctx, 'triangle', Notes.E5);

  // Gain envelopes
  const gain1 = ctx.createGain();
  const gain2 = ctx.createGain();
  gain1.gain.value = 0;
  gain2.gain.value = 0;

  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(destinationNode);
  gain2.connect(destinationNode);

  // Full arpeggio: C5 -> E5 -> G5 -> C6
  const notes = [Notes.C5, Notes.E5, Notes.G5, Notes.C6];
  notes.forEach((note, i) => {
    const time = now + i * 0.15;
    osc1.frequency.setValueAtTime(note, time);
    osc2.frequency.setValueAtTime(note * 1.25, time); // Harmony above
  });

  // Envelopes
  const attack = 0.001;
  const decay = 0.03;
  const sustain = 0.7;
  const release = 0.1;

  WaveGenerator.createEnvelope(ctx, gain1, now, attack, decay, sustain, release, duration);
  WaveGenerator.createEnvelope(ctx, gain2, now, attack, decay, sustain * 0.6, release, duration);

  // Noise burst (swoosh effect)
  const noise = WaveGenerator.createFilteredNoise(ctx, 'highpass', 2000, 0.5);
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0;
  noise.filter.connect(noiseGain);
  noiseGain.connect(destinationNode);

  // Quick noise burst at beginning
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  // Start all
  osc1.start(now);
  osc2.start(now);
  noise.source.start(now);

  // Stop all
  osc1.stop(now + duration);
  osc2.stop(now + duration);
  noise.source.stop(now + 0.2);

  return { osc1, osc2, gain1, gain2, noise, noiseGain };
}

// ============================================
// SFX-010: Monster Hit
// ============================================

function createMonsterHit(ctx, destinationNode) {
  const now = ctx.currentTime;
  const duration = 0.3;

  // Low square thud
  const osc = WaveGenerator.createOscillator(ctx, 'square', Notes.C2);
  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(destinationNode);

  // Pitch bend down (impact feel)
  osc.frequency.setValueAtTime(Notes.C2, now);
  osc.frequency.exponentialRampToValueAtTime(Notes.C2 * 0.5, now + 0.1);

  // Sharp attack, quick decay
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.8, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  // Noise burst (impact)
  const noise = WaveGenerator.createFilteredNoise(ctx, 'lowpass', 400, 1);
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0;
  noise.filter.connect(noiseGain);
  noiseGain.connect(destinationNode);

  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.4, now + 0.02);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  // Start
  osc.start(now);
  noise.source.start(now);

  // Stop
  osc.stop(now + duration);
  noise.source.stop(now + 0.15);

  return { osc, gain, noise, noiseGain };
}
```

---

### Example Music Implementation

```javascript
// ============================================
// TRACK 7: Victory Jingle (Short)
// "Problem Solved!"
// ============================================

function createVictoryJingle(ctx, destinationNode) {
  const now = ctx.currentTime;
  const tempo = 160; // BPM
  const beatDuration = 60 / tempo;

  // Square wave melody
  const melody = WaveGenerator.createOscillator(ctx, 'square', Notes.C5);
  const melodyGain = ctx.createGain();
  melodyGain.gain.value = 0;

  melody.connect(melodyGain);
  melodyGain.connect(destinationNode);

  // Triangle bass fanfare
  const bass = WaveGenerator.createOscillator(ctx, 'triangle', Notes.C3);
  const bassGain = ctx.createGain();
  bassGain.gain.value = 0;

  bass.connect(bassGain);
  bassGain.connect(destinationNode);

  // Victory fanfare melody: C5 -> E5 -> G5 (ta-da-DAH!)
  const melodyNotes = [
    { note: Notes.C5, time: now, duration: beatDuration * 0.5 },
    { note: Notes.E5, time: now + beatDuration * 0.5, duration: beatDuration * 0.5 },
    { note: Notes.G5, time: now + beatDuration, duration: beatDuration * 2 }
  ];

  melodyNotes.forEach(({ note, time, duration }) => {
    melody.frequency.setValueAtTime(note, time);

    // Pluck envelope for each note
    melodyGain.gain.cancelScheduledValues(time);
    melodyGain.gain.setValueAtTime(0, time);
    melodyGain.gain.linearRampToValueAtTime(0.6, time + 0.01);
    melodyGain.gain.exponentialRampToValueAtTime(0.01, time + duration);
  });

  // Bass fanfare (follows melody)
  const bassNotes = [
    { note: Notes.C3, time: now, duration: beatDuration * 0.5 },
    { note: Notes.E3, time: now + beatDuration * 0.5, duration: beatDuration * 0.5 },
    { note: Notes.C3, time: now + beatDuration, duration: beatDuration * 2 }
  ];

  bassNotes.forEach(({ note, time, duration }) => {
    bass.frequency.setValueAtTime(note, time);

    bassGain.gain.cancelScheduledValues(time);
    bassGain.gain.setValueAtTime(0, time);
    bassGain.gain.linearRampToValueAtTime(0.4, time + 0.01);
    bassGain.gain.exponentialRampToValueAtTime(0.01, time + duration);
  });

  const totalDuration = beatDuration * 3;

  // Start
  melody.start(now);
  bass.start(now);

  // Stop
  melody.stop(now + totalDuration);
  bass.stop(now + totalDuration);

  return { melody, bass, melodyGain, bassGain };
}
```

---

### Event Integration

```javascript
// ============================================
// INTEGRATE WITH EVENT SYSTEM (from architecture.md)
// ============================================

// Initialize audio system
AudioManager.init();

// Hook into game events
Events.on('game_start', () => {
  AudioManager.playSFX('game_start');
  AudioManager.playBGM('title');
});

Events.on('story_continue', () => {
  AudioManager.playSFX('story_continue');
});

Events.on('battle_start', (data) => {
  const chapter = GameState.currentChapter;

  // Select appropriate battle theme based on chapter
  if (chapter <= 3) {
    AudioManager.playBGM('battle_early');
  } else if (chapter <= 6) {
    AudioManager.playBGM('battle_mid');
  } else if (chapter <= 9) {
    AudioManager.playBGM('battle_late');
  } else {
    AudioManager.playBGM('battle_boss');
  }

  AudioManager.playSFX('battle_start');
});

Events.on('riddle_shown', () => {
  AudioManager.playSFX('riddle_shown');
});

Events.on('correct_answer', (data) => {
  // Play appropriate SFX based on damage multiplier
  if (data.damage >= 3) {
    AudioManager.playSFX('correct_3x');
  } else if (data.damage >= 2) {
    AudioManager.playSFX('correct_2x');
  } else {
    AudioManager.playSFX('correct_1x');
  }
});

Events.on('wrong_answer', () => {
  AudioManager.playSFX('wrong_answer');
});

Events.on('monster_hit', (data) => {
  AudioManager.playSFX('monster_hit');
});

Events.on('monster_defeated', () => {
  AudioManager.playSFX('monster_defeated');
  AudioManager.stopBGM();
});

Events.on('timer_tick', (data) => {
  // Only play tick in last 10 seconds
  if (data.remaining <= 10 && data.remaining > 0) {
    AudioManager.playSFX('timer_tick');
  }
});

Events.on('time_up', () => {
  AudioManager.playSFX('time_up');
  AudioManager.stopBGM();
  AudioManager.playBGM('retry');
});

Events.on('victory_shown', (data) => {
  AudioManager.playSFX('victory_shown');
  AudioManager.playBGM('victory_jingle');
});

Events.on('game_saved', () => {
  AudioManager.playSFX('game_saved');
});

Events.on('chapter_complete', (data) => {
  AudioManager.playSFX('chapter_complete');
  AudioManager.playBGM('chapter_complete_theme');
});

Events.on('game_complete', (data) => {
  AudioManager.playSFX('game_complete');
  AudioManager.playBGM('game_complete_theme');
});
```

---

## Asset Creation Method

### Option 1: Fully Procedural (Recommended for Single HTML File)

**Approach**: All audio generated in real-time using Web Audio API
**Advantages**:
- Zero external files
- Smallest file size
- Maximum flexibility
- Perfect loop points
- Authentic 8-bit sound

**Implementation**:
1. Copy provided Web Audio API code into game's JavaScript section
2. All waveforms generated programmatically
3. Music is sequenced note-by-note in code
4. SFX are short procedural functions

**File Size Impact**: ~10-15KB of JavaScript code (compresses well)

---

### Option 2: Create External Audio Files (Then Inline as Base64)

If procedural generation is too complex, create actual audio files and embed them.

**Tools Recommended**:

1. **BeepBox** (https://www.beepbox.co/)
   - Free browser-based chiptune composer
   - Perfect for 8-bit NES/Game Boy style
   - Export as .wav
   - Excellent for melodies and full tracks

2. **FamiTracker** (NES-specific)
   - Authentic NES sound
   - More complex but most authentic
   - Windows application
   - Exports to .wav

3. **LSDJ (Little Sound DJ)** - Game Boy sound
   - Game Boy-specific tracker
   - Can run in emulator
   - Most authentic Game Boy sound

4. **Audacity** (for processing)
   - Free, open-source audio editor
   - Use "Generate → Tone" for simple SFX
   - Apply effects (bit-crushing, distortion for Genesis sound)
   - Export as OGG or MP3

5. **jsfxr** (https://sfxr.me/)
   - Browser-based 8-bit SFX generator
   - Perfect for game sound effects
   - Quick generation
   - Export as .wav

**Process**:
1. Create audio in BeepBox/FamiTracker/jsfxr
2. Export as .wav
3. Convert to OGG or MP3 (smaller file size)
4. Convert to Base64 string
5. Embed in HTML as data URI

**Base64 Embedding Example**:
```javascript
const Audio = {
  victory_jingle: 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAD...',
  correct_1x: 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAD...',
  // ... etc
};

// Play audio
const audio = new Audio(Audio.victory_jingle);
audio.play();
```

**File Size Impact**: ~50-200KB per music track (base64 encoded)

---

### Option 3: Hybrid Approach (Recommended Balance)

**Approach**: Procedural SFX + Composed music tracks

**SFX** (procedural - Web Audio API):
- All short SFX generated in real-time
- Total code: ~8KB
- Authentic 8-bit control

**Music** (pre-composed - Base64 embedded):
- 10 background music tracks created in BeepBox
- Each track: ~30-50KB (OGG format, base64)
- Total: ~300-500KB for all music

**Total File Size**: ~310-510KB for all audio (acceptable for single HTML file)

---

### Recommended Creation Workflow

#### For SFX (Use Web Audio API):
1. Use provided JavaScript code examples
2. Tweak frequencies and envelopes to taste
3. Test in browser console
4. Integrate into game event system

#### For Music (Use BeepBox):
1. Open BeepBox: https://www.beepbox.co/
2. Set preferences:
   - Scale: Major or Minor (as specified per track)
   - Tempo: As specified (120-160 BPM)
   - Instruments: Chip Wave (square), Harmonics (triangle), Chip Noise (drums)
3. Compose melody following track specifications above
4. Export as .wav
5. Convert to OGG using Audacity (File → Export → Export as OGG)
6. Convert OGG to Base64:
   - Use online tool: https://base64.guru/converter/encode/audio
   - Or command line: `base64 file.ogg > file.txt`
7. Embed in JavaScript as data URI

#### Audio Processing Tips (Audacity):

**For authentic 8-bit sound**:
1. Import WAV file
2. Apply effects:
   - **Bit-crush**: Effect → Distortion → Bitcrusher (8-bit)
   - **Low-pass filter**: Effect → Filter Curve → Roll off above 10kHz
   - **Normalize**: Effect → Normalize → -3dB
3. Export as OGG (quality: 5-7 for 8-bit style)

---

### Testing Checklist

- [ ] All SFX generate without errors
- [ ] Music loops seamlessly (no clicks/pops at loop point)
- [ ] Wrong answer sound is encouraging, not punishing
- [ ] Victory sounds are celebratory and rewarding
- [ ] Speed bonus SFX (1x, 2x, 3x) are clearly distinct
- [ ] Timer tick is gentle reminder, not stressful
- [ ] Volume levels are balanced (music doesn't drown out SFX)
- [ ] Mute/unmute functions work correctly
- [ ] Audio works on mobile after user interaction
- [ ] No audio lag or delay
- [ ] All 10 chapter battle themes feel distinct
- [ ] Pip-like wrong answer sound is melodic and quick
- [ ] No distortion or clipping at maximum volume

---

## Summary

This audio design provides:

1. **10 background music tracks** covering all game states and chapter progression
2. **20 sound effects** mapped to every event hook from architecture.md
3. **Per-chapter audio themes** with distinct characteristics for all 10 chapters
4. **Authentic 8-bit specifications** mixing NES, Game Boy, and Genesis styles
5. **Complete Web Audio API implementation** with working code examples
6. **Multiple asset creation methods** from fully procedural to hybrid approaches
7. **Child-friendly audio philosophy** that's always encouraging, never punishing

**Key Features**:
- Retro 8-bit aesthetic with modern clarity
- Purely instrumental (no voice synthesis)
- Wrong answer sound is pip-like encouraging beeps
- Energy levels vary: light melodic (story) → fast-paced (battle) → short triumph (victory)
- Single HTML file compatible (procedural or base64)
- Mobile-friendly implementation

Ready for integration into the game's AudioManager system and Event hooks!
