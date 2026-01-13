#!/usr/bin/env python3
"""Remove background from images using rembg."""

import sys
from pathlib import Path
from rembg import remove
from PIL import Image


def remove_background(input_path: str, output_path: str = None):
    """Remove background from an image.

    Args:
        input_path: Path to input image
        output_path: Path to save output (defaults to overwriting input)
    """
    if output_path is None:
        output_path = input_path  # Overwrite original

    input_img = Image.open(input_path)
    output_img = remove(input_img)
    output_img.save(output_path)
    print(f"Background removed: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove_bg.py <input_image> [output_image]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    remove_background(input_file, output_file)
