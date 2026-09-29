# Soldering idle animation

The final asset is built deterministically from `public/media/pixel-character.png`, following the user's approval to prioritize pixel stability over generative frame production. Run `python3 scripts/generate-solder-loop.py` with Pillow to reproduce the 56 transparent PNG frames, 8-by-7 sprite sheet and lossless animated WebP. The manifest records verification of static pixels, transparency, frame count and endpoint identity. The website uses the 20 fps WebP (2.8 seconds, infinite loop), with the original PNG for reduced motion.

The built-in ImageGen tool was tried first with the original PNG as the edit target and transparent background enabled. Its sheet was discarded because it changed the static character/table and did not supply the required grid. It is not used by the website.

Generation prompt: Create one 56-frame sprite sheet, 8 columns by 7 rows in chronological order, on a truly transparent background. Match the supplied isometric pixel-art man soldering at his wooden table. Keep face, glasses, hair, beard, clothes, chair, table, tools, camera, colors, scale and position identical. Animate only a one- or two-pixel soldering-hand/iron motion and tiny yellow/orange sparks drifting downward and fading near the feet. Make a seamless 2.8-second loop at 20 fps. No labels, grid lines, gaps, background, blur or stylistic redraw.
