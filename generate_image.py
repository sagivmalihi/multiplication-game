#!/usr/bin/env python3
"""Generate images using Gemini 2.5 Flash (nano banana)"""

import os
import base64
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env
load_dotenv()


def generate_image(prompt: str, output_path: str = "output.png"):
    """Generate an image from a text prompt."""

    # Initialize client
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found. Add it to your .env file.")
        return

    client = genai.Client(api_key=api_key)

    # Generate image using Gemini 2.5 Flash
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            response_modalities=["image", "text"]
        )
    )

    # Extract and save the image
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            image_data = base64.b64decode(part.inline_data.data)
            with open(output_path, "wb") as f:
                f.write(image_data)
            print(f"Image saved to {output_path}")
            return

    print("No image generated. Response text:", response.text)


if __name__ == "__main__":
    import sys
    prompt = sys.argv[1] if len(sys.argv) > 1 else "A cute cat wearing a tiny wizard hat"
    output = sys.argv[2] if len(sys.argv) > 2 else "output.png"
    generate_image(prompt, output)
