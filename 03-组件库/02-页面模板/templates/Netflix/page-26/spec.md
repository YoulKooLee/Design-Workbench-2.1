# Netflix Master Filter Sequence ("All Genres" Initialization) - Page 26

## Overview
Replication of the primary `All Genres` dropdown view representing scroll offset `y=0`. This is the top-most boundary of the immersive blur module (continuing the system laid out in Page 25 and Page 21).

## Technical Details

### 1. Volumetric Blur Map Configuration
- Re-adjusted the underlying `<MeshGradient>` background color coordinates.
- Pushed `#3D201A` (warm dark red) to the top left offset against a dominant `<div bg-[#1A2E48]>` Navy blue node sitting on the upper right side.
- Set global iOS emulation to `backdrop-blur-[64px]` overlaid with black opacity logic `@ 65%` and a multiply layer to preserve the extreme contrast in typographic legibility over the colored voids.

### 2. Active Routing State (List Array Focus)
- The targeted layout item `All Genres` is physically segregated from the mapping Array.
- Modified its font weights to strict uppercase geometry (actually pure `font-[700] text-[23.5px]`) scaling slightly higher `scale-[1.02]` than standard passive listing segments (`#9E9E9E font-[500]`).
- Guaranteed its baseline starts completely underneath the `bg-gradient-to-b` Top shadow mask so it is perceived optimally by the user without occlusion when scrolling resets to `0`.

### 3. Edge Matrix Obfuscation Extent
- The bottom occlusion box was extended (`h-[240px]`) and reinforced with `via-black/85` heavily burning the bottom boundary to ensure the last visible list items like *Horror* and *Dramas* perfectly merge into the `#FFFFFF` action terminal circle as they translate under the Z-axis.
