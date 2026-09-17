# Netflix Home/Hero Component Matrix (Page 19)

## Overview
Replication of the primary vertical landing state. This frame presents the massive top 'Hero' real-estate mapping (occupied by the critically acclaimed *Roma*) intersecting with the transparent category sorting navigational header, cascading down into the `HorizontalCard` row stack defined in `page-18`.

## Technical Details

### 1. Vector Hero Emulation
- Developed a massive `min-h-[460px]` container block to hold the simulated background hero asset.
- Simulated the distinct *Roma* black-and-white promotional imagery via layered SVG elements painted in grayscale (`#D3D3D3` to `#2E2E2E`) bound via `mix-blend-multiply` and a universal `<feTurbulence>` overlay to imitate high-contrast film grain. 
- Integrated an absolute synthetic light emission `filter="blur(15px)"` to recreate the lens flare hitting the left edge of the family portrait in the original frame.

### 2. Dual-Nav Overlay
- The top header leverages `absolute sticky` behaviors utilizing a dense blackout gradient cascade `bg-gradient-to-b from-black/80 via-black/30 to-transparent`.
- Restored the category filter toggle chips `Films ▼` and `Award-Winning ▼` adopting native dropdown styling with variable spacing/font weights representing active and cascaded sorting depths.

### 3. Re-instancing `HorizontalCard` Subcomponents
- Re-deployed the previously engineered Horizontal List matrix to rapidly generate the `Popular on Netflix` stack.
- The `Roma` card identity array maps identically to the Hero section (replicating its precise gold `#EBC43B` metadata divider dots `•`).
- The custom typography component `ROMA` scales vertically `scale-y-110` while tracking tightly `-2px` to recreate the elongated sophisticated original Roman typeface without referencing external font files.
