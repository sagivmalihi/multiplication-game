#!/usr/bin/env python3
"""Generate sound effects and music using ElevenLabs API."""

import os
import sys
import argparse
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def get_client():
    """Initialize ElevenLabs client."""
    try:
        from elevenlabs.client import ElevenLabs
    except ImportError:
        print("Error: elevenlabs package not installed.")
        print("Run: pip install elevenlabs")
        sys.exit(1)

    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        print("Error: ELEVENLABS_API_KEY not found in .env file")
        sys.exit(1)

    return ElevenLabs(api_key=api_key)


def generate_sfx(prompt: str, output_path: str, duration: float = 5.0, loop: bool = False):
    """
    Generate a sound effect from a text prompt.

    Args:
        prompt: Description of the sound effect
        output_path: Where to save the MP3 file
        duration: Length in seconds (0.5-30)
        loop: Whether to create a seamless loop
    """
    client = get_client()

    print(f"Generating SFX: {prompt[:50]}...")
    print(f"Duration: {duration}s, Loop: {loop}")

    result = client.text_to_sound_effects.convert(
        text=prompt,
        duration_seconds=duration,
        prompt_influence=0.5,  # Balance between prompt adherence and quality
    )

    # Save the audio
    with open(output_path, "wb") as f:
        for chunk in result:
            f.write(chunk)

    print(f"Saved to: {output_path}")


def generate_music(prompt: str, output_path: str, duration_seconds: int = 30):
    """
    Generate background music from a text prompt.

    Args:
        prompt: Description of the music style
        output_path: Where to save the MP3 file
        duration_seconds: Length in seconds (10-300)
    """
    client = get_client()

    print(f"Generating music: {prompt[:50]}...")
    print(f"Duration: {duration_seconds}s")

    # Convert to milliseconds for API
    duration_ms = duration_seconds * 1000

    result = client.music.compose(
        prompt=prompt,
        music_length_ms=duration_ms,
    )

    # Save the audio
    with open(output_path, "wb") as f:
        for chunk in result:
            f.write(chunk)

    print(f"Saved to: {output_path}")


# Preset prompts for game audio
PRESETS = {
    # Sound Effects
    "correct": {
        "type": "sfx",
        "prompt": "Bright magical chime, positive rewarding sound, fantasy game success, sparkling",
        "duration": 1.5,
    },
    "wrong": {
        "type": "sfx",
        "prompt": "Soft gentle woosh, not harsh, encouraging game sound, subtle",
        "duration": 1.0,
    },
    "victory": {
        "type": "sfx",
        "prompt": "Triumphant fanfare, magical victory sound, celebratory chimes, fantasy game win",
        "duration": 3.0,
    },
    "damage": {
        "type": "sfx",
        "prompt": "Cartoon impact sound, soft thud, game hit sound, not violent, playful",
        "duration": 0.8,
    },
    "monster-appear": {
        "type": "sfx",
        "prompt": "Playful creature appearance sound, magical poof, whimsical, not scary",
        "duration": 1.5,
    },
    "button-click": {
        "type": "sfx",
        "prompt": "Soft UI click, gentle button press, satisfying tap sound",
        "duration": 0.3,
    },
    "powerup": {
        "type": "sfx",
        "prompt": "Magical power up sound, ascending sparkles, fantasy game buff",
        "duration": 2.0,
    },
    "timer-warning": {
        "type": "sfx",
        "prompt": "Gentle clock ticking urgency, soft warning beeps, not stressful",
        "duration": 2.0,
    },
    # Background Music
    "menu-music": {
        "type": "music",
        "prompt": "Whimsical fantasy adventure music, magical and inviting, medium tempo, suitable for children's game menu, orchestral with chimes",
        "duration": 60,
    },
    "battle-music": {
        "type": "music",
        "prompt": "Energetic fantasy battle music, exciting but not scary, suitable for children's math game, playful adventure feel, upbeat tempo",
        "duration": 60,
    },
    "story-music": {
        "type": "music",
        "prompt": "Soft atmospheric fantasy music, gentle and magical, suitable for story narration, calm and dreamy, children's adventure game",
        "duration": 60,
    },
    "victory-music": {
        "type": "music",
        "prompt": "Triumphant celebration music, joyful and rewarding, fantasy victory fanfare, suitable for children, magical achievement",
        "duration": 30,
    },
}


def list_presets():
    """Display available presets."""
    print("\nAvailable presets:")
    print("-" * 60)
    print("\nSound Effects:")
    for name, config in PRESETS.items():
        if config["type"] == "sfx":
            print(f"  {name:18} - {config['prompt'][:45]}...")
    print("\nBackground Music:")
    for name, config in PRESETS.items():
        if config["type"] == "music":
            print(f"  {name:18} - {config['prompt'][:45]}...")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Generate game audio using ElevenLabs API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate a preset sound effect
  python generate_audio.py --preset correct

  # Generate custom sound effect
  python generate_audio.py sfx "magical sparkle sound" sparkle.mp3 --duration 2

  # Generate custom music
  python generate_audio.py music "calm forest ambient music" forest.mp3 --duration 60

  # List all presets
  python generate_audio.py --list-presets

  # Generate all presets at once
  python generate_audio.py --all-presets
        """,
    )

    parser.add_argument("--list-presets", action="store_true", help="List available presets")
    parser.add_argument("--preset", type=str, help="Generate a preset sound")
    parser.add_argument("--all-presets", action="store_true", help="Generate all presets")
    parser.add_argument("type", nargs="?", choices=["sfx", "music"], help="Type of audio to generate")
    parser.add_argument("prompt", nargs="?", help="Text description of the audio")
    parser.add_argument("output", nargs="?", help="Output filename (MP3)")
    parser.add_argument("--duration", type=float, help="Duration in seconds")
    parser.add_argument("--loop", action="store_true", help="Create looping audio (SFX only)")

    args = parser.parse_args()

    # Handle preset listing
    if args.list_presets:
        list_presets()
        return

    # Handle single preset
    if args.preset:
        if args.preset not in PRESETS:
            print(f"Unknown preset: {args.preset}")
            list_presets()
            return

        config = PRESETS[args.preset]
        if config["type"] == "sfx":
            output_path = f"assets/audio/sfx/{args.preset}.mp3"
        else:
            output_path = f"assets/audio/music/{args.preset}.mp3"

        Path(output_path).parent.mkdir(parents=True, exist_ok=True)

        if config["type"] == "sfx":
            generate_sfx(config["prompt"], output_path, config["duration"])
        else:
            generate_music(config["prompt"], output_path, config["duration"])
        return

    # Handle all presets
    if args.all_presets:
        print("Generating all presets...")
        for name, config in PRESETS.items():
            if config["type"] == "sfx":
                output_path = f"assets/audio/sfx/{name}.mp3"
            else:
                output_path = f"assets/audio/music/{name}.mp3"

            Path(output_path).parent.mkdir(parents=True, exist_ok=True)

            try:
                if config["type"] == "sfx":
                    generate_sfx(config["prompt"], output_path, config["duration"])
                else:
                    generate_music(config["prompt"], output_path, config["duration"])
                print(f"✓ {name}")
            except Exception as e:
                print(f"✗ {name}: {e}")
        print("\nDone!")
        return

    # Handle custom generation
    if args.type and args.prompt and args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)

        if args.type == "sfx":
            duration = args.duration or 5.0
            generate_sfx(args.prompt, args.output, duration, args.loop)
        else:
            duration = int(args.duration or 30)
            generate_music(args.prompt, args.output, duration)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
