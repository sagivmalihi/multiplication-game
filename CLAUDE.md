# Multiplication Adventure Game - אריאל והרפתקת הכפל

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
- **Character**: Female protagonist - Arielle

## Technical Requirements
- **Format**: Single HTML file containing all HTML, CSS, and JavaScript
- **Storage**: localStorage for saving progress
- **Dependencies**: None (self-contained)
- **Responsiveness**: Should work on desktop and tablet

## Game Structure

### Core Loop
1. Story/narrative segment (Hebrew text, anime-style visuals)
2. Encounter obstacle/monster
3. Multiplication minigame to overcome challenge
4. Victory → progress story
5. Repeat

### Minigame Types (Mix & Match)
- **Timed Selection**: Choose correct answer from multiple options
- **Fill in the Blank**: Solve for missing number (e.g., ? × 4 = 12)
- **Match Pairs**: Memory-style matching of equations to answers
- **Additional types**: TBD as development progresses

### Difficulty Progression
- **Early levels**: Small numbers (1-5 tables)
- **Mid levels**: Full 1-10 tables
- **Late levels**: Mixed practice, harder combinations
- **Final level**: Up to 20×20

## Audio
- Background music (to be created via sub-agents)
- Sound effects for:
  - Correct answers
  - Wrong answers
  - Level completion
  - Story progression
  - Combat/encounters

## Art Assets
- Character sprites (Arielle)
- Monster/obstacle sprites
- Background scenes
- UI elements
- Will be created via sub-agents

## Story & Setting
- To be determined
- Fantasy adventure genre
- Obstacles and monsters overcome through multiplication mastery

## Progress System
- Save current level/chapter
- Track mastered multiplication facts
- Possibly: stars/scores per level

## Development Notes
- Keep code modular within the single file
- Comment sections clearly for maintainability
- Ensure Hebrew RTL is properly handled throughout
- Test on common browsers (Chrome, Safari, Firefox)

---

## File Structure (within single HTML file)
```
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <!-- Meta, title, embedded CSS -->
</head>
<body>
  <!-- Game container -->
  <script>
    // Game engine
    // State management
    // Minigame logic
    // Story/dialogue system
    // Audio manager
    // Save/load system
  </script>
</body>
</html>
```
