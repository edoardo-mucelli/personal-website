"""Reproducible 56-frame idle loop. Requires Pillow with animated WebP support.

The original PNG is the immutable base. Only the soldering hand/tool mask and
spark pixels change; no generated/redrawn body, furniture, or background.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops
import hashlib
import json
import math
import random

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/media/solder-loop'
FRAMES = OUT / 'frames'
FRAMES.mkdir(parents=True, exist_ok=True)
original = Image.open(ROOT / 'public/media/pixel-character.png').convert('RGBA')
mask = Image.new('L', original.size)
ImageDraw.Draw(mask).polygon([
    (33, 47), (39, 47), (41, 57), (48, 61), (51, 70),
    (53, 83), (47, 85), (44, 77), (35, 74), (31, 64), (33, 58),
], fill=255)
hand_pixels = [(x, y) for y in range(128) for x in range(128) if mask.getpixel((x, y))]
rng = random.Random(560128)
particles = []
for i in range(16):
    start = 1 + i * 1.35
    life = rng.uniform(23, 31)
    vx, vy = rng.uniform(-0.82, 0.37), rng.uniform(-0.5, 0.1)
    ground = rng.uniform(119, 124)
    gravity = 2 * (ground - 81 - vy * life) / (life * life)
    particles.append((start, life, vx, vy, gravity))
frames = []
allowed = mask.copy()
for index in range(56):
    frame = original.copy()
    if 0 < index < 55:
        amplitude = 1.35 * math.sin(4 * math.pi * index / 55)
        for x, y in hand_pixels:
            # Nearest-neighbor displacement preserves the native pixel palette.
            # Taper towards the wrist and mask edges for a one-pixel soldering motion.
            taper = max(0, math.sin(math.pi * (y - 46) / 40))
            shift = round(amplitude * taper)
            if mask.getpixel((x - shift, y)):
                frame.putpixel((x, y), original.getpixel((x - shift, y)))
        sparks = Image.new('RGBA', original.size)
        draw = ImageDraw.Draw(sparks)
        # Tiny varying contact point keeps all 56 encoded frames distinct.
        flicker = round(130 + 115 * math.sin(math.pi * index / 55))
        draw.point((49, 81), fill=(255, 215 + index % 35, 100, flicker))
        allowed.putpixel((49, 81), 255)
        for start, life, vx, vy, gravity in particles:
            age = index - start
            if not 0 <= age < life:
                continue
            t = age / life
            x = round(49 + vx * age)
            y = round(81 + vy * age + gravity * age * age / 2)
            alpha = round(255 * min(1, (1 - t) * 4))
            color = (255, round(235 - 125 * t), round(135 * (1 - t)), alpha)
            draw.point((x, y), fill=color)
            allowed.putpixel((x, y), 255)
            if t < .22:
                draw.point((x, y - 1), fill=(255, 210, 70, alpha // 2))
                allowed.putpixel((x, y - 1), 255)
        frame = Image.alpha_composite(frame, sparks)
    frame.save(FRAMES / f'{index:02d}.png')
    frames.append(frame)

# Lossless RGBA retains the exact original pixels and real transparency.
frames[0].save(OUT / 'solder-loop.webp', save_all=True, append_images=frames[1:],
               duration=50, loop=0, lossless=True, quality=100, method=6,
               minimize_size=False, allow_mixed=False)
sheet = Image.new('RGBA', (128 * 8, 128 * 7))
for i, frame in enumerate(frames):
    sheet.paste(frame, ((i % 8) * 128, (i // 8) * 128))
sheet.save(OUT / 'sprite-sheet.png')
# Verify the invariants against every pixel, plus the encoded asset itself.
for frame in frames:
    for y in range(128):
        for x in range(128):
            if not allowed.getpixel((x, y)):
                assert frame.getpixel((x, y)) == original.getpixel((x, y))
assert frames[0].tobytes() == original.tobytes() == frames[-1].tobytes()
encoded = Image.open(OUT / 'solder-loop.webp')
assert encoded.n_frames == 56, encoded.n_frames
for i in range(56):
    encoded.seek(i)
    # WebP normalizes RGB under alpha=0; visible pixels must be lossless.
    rgba = encoded.convert('RGBA')
    for a, b in zip(rgba.getdata(), frames[i].getdata()):
        assert a == b or (a[3] == b[3] == 0)
report = dict(frames=56, fps=20, duration_ms=2800, loop=0, size=[128, 128],
              transparent=True, lossless=True, first_and_last_match_original=True,
              static_pixels_verified=True, source_sha256=hashlib.sha256(original.tobytes()).hexdigest(),
              animated_webp_bytes=(OUT / 'solder-loop.webp').stat().st_size)
(OUT / 'manifest.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
