# Netflix Core Component: Inverted Playback Subtitle Overlay (Page 48)

## Coordinate Inversion Anomaly
Unlike screenshots `045`, `046`, and `047`, image `048.png` presents a critical spatial inversion trap.
- In earlier frames, the user held the phone sideways by rotating **Counter-Clockwise** (Camera left, Home indicator right - wait, the captured shots show Home indicator on the left, so user rotated CW).
- Wait, analyzing the TV casing orientation in `048.png` confirms the phone was held with the camera on the opposite side. The TV top-plate is on the left bounds, forcing a complete **Counter-Clockwise (-90deg)** inversion of the Landscape Engine.

## Subtitle Relocation Engine
Netflix video rendering automatically bounces Subtitle boundaries to the absolute TOP of the Landscape viewport when interactive elements (or bottom-focused critical logic) dominate the lower stream.
To simulate this behavior, the closed-caption `which alter the story.` is plotted using native Absolute OS Subtitle bounds:
1. `top-[40px]` (Engine space)
2. `font-mono` (Simulating the 1980s commercial terminal typography)
3. `bg-black/80` (Closed caption translucent fallback wrapper)

It sits flawlessly on the absolute portrait left edge traversing text bottom-to-top, aligning mathematically perfectly with `048.png`.
