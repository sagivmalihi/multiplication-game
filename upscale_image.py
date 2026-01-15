#!/usr/bin/env python3
"""Upscale images using EDSR neural network (4x resolution)"""

import sys
from pathlib import Path
from PIL import Image
from super_image import EdsrModel, ImageLoader

# Cache model globally to avoid reloading for batch processing
_model_cache = {}


def log(msg):
    """Print with immediate flush for progress visibility."""
    print(msg, flush=True)


def get_model(scale: int):
    """Get or load the EDSR model."""
    if scale not in _model_cache:
        log(f"Loading EDSR x{scale} model...")
        _model_cache[scale] = EdsrModel.from_pretrained('eugenesiow/edsr-base', scale=scale)
        log("Model loaded!")
    return _model_cache[scale]


def upscale_image(input_path: str, output_path: str = None, scale: int = 4, format: str = 'webp'):
    """Upscale an image using EDSR model.

    Args:
        input_path: Path to input image
        output_path: Path for output (default: input_4x.webp)
        scale: Upscale factor (2 or 4)
        format: Output format ('webp', 'png', 'jpg')
    """
    input_path = Path(input_path)

    if output_path is None:
        output_path = input_path.parent / f"{input_path.stem}_{scale}x.{format}"
    else:
        output_path = Path(output_path)

    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Load image
    img = Image.open(input_path)
    orig_size = f"{img.size[0]}x{img.size[1]}"

    # Get model (cached)
    model = get_model(scale)

    # Upscale
    log(f"  Upscaling...")
    inputs = ImageLoader.load_image(img)
    preds = model(inputs)

    # Save to temp file first (ImageLoader needs a path)
    temp_path = output_path.with_suffix('.tmp.png')
    ImageLoader.save_image(preds, str(temp_path))

    # Load and save in desired format with optimization
    log(f"  Saving as {format.upper()}...")
    out_img = Image.open(temp_path)

    if format == 'webp':
        out_img.save(output_path, 'WEBP', quality=90)
    elif format == 'jpg' or format == 'jpeg':
        out_img.convert('RGB').save(output_path, 'JPEG', quality=85)
    else:
        out_img.save(output_path, 'PNG', optimize=True)

    # Cleanup temp file
    temp_path.unlink()

    # Report results
    out_size_kb = output_path.stat().st_size / 1024
    log(f"  Done: {output_path.name} ({out_img.size[0]}x{out_img.size[1]}, {out_size_kb:.0f}KB)")

    return output_path


def batch_upscale(input_dir: str, output_dir: str = None, scale: int = 4, format: str = 'webp'):
    """Upscale all PNG images in a directory.

    Args:
        input_dir: Directory containing images
        output_dir: Output directory (default: same as input)
        scale: Upscale factor (2 or 4)
        format: Output format ('webp', 'png', 'jpg')
    """
    input_dir = Path(input_dir)
    output_dir = Path(output_dir) if output_dir else input_dir

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Find all PNG files (excluding already upscaled ones)
    png_files = [f for f in input_dir.glob('*.png') if '_4x' not in f.stem and '_2x' not in f.stem]

    log(f"Found {len(png_files)} images to upscale")
    log(f"Input:  {input_dir}")
    log(f"Output: {output_dir}")
    log(f"Format: {format.upper()}, Scale: {scale}x")
    log("")

    skipped = 0
    processed = 0

    for i, input_path in enumerate(sorted(png_files), 1):
        output_path = output_dir / f"{input_path.stem}.{format}"

        # Skip if output already exists and is valid (resumable)
        if output_path.exists():
            try:
                out_img = Image.open(output_path)
                input_img = Image.open(input_path)
                expected_width = input_img.size[0] * scale
                expected_height = input_img.size[1] * scale
                # Check if output is the expected upscaled size (with small tolerance)
                if abs(out_img.size[0] - expected_width) < 10 and abs(out_img.size[1] - expected_height) < 10:
                    log(f"[{i}/{len(png_files)}] {input_path.name} -> SKIPPED (already exists)")
                    skipped += 1
                    continue
            except Exception:
                pass  # If we can't verify, process it anyway

        log(f"[{i}/{len(png_files)}] {input_path.name}")
        try:
            upscale_image(input_path, output_path, scale, format)
            processed += 1
        except Exception as e:
            log(f"  ERROR: {e}")

    log("")
    log(f"Done! Processed: {processed}, Skipped: {skipped}, Total: {len(png_files)}")

    # Summary
    total_size = sum(f.stat().st_size for f in output_dir.glob(f'*.{format}'))
    log(f"Total output size: {total_size / (1024*1024):.1f}MB")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        log("Usage:")
        log("  Single file:  uv run python upscale_image.py <input.png> [output.webp] [scale]")
        log("  Batch:        uv run python upscale_image.py --batch <input_dir> <output_dir> [scale]")
        log("")
        log("Options:")
        log("  scale: 2 or 4 (default: 4)")
        log("  Output format is determined by extension (default: webp)")
        sys.exit(1)

    if sys.argv[1] == '--batch':
        input_dir = sys.argv[2] if len(sys.argv) > 2 else '.'
        output_dir = sys.argv[3] if len(sys.argv) > 3 else None
        scale = int(sys.argv[4]) if len(sys.argv) > 4 else 4
        batch_upscale(input_dir, output_dir, scale)
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
        scale = int(sys.argv[3]) if len(sys.argv) > 3 else 4
        upscale_image(input_file, output_file, scale)
