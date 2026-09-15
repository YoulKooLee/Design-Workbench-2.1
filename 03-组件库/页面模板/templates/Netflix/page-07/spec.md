# Netflix Welcome Splash (Page 07)

## Overview
Replication of the primary unauthenticated launch screen for the Netflix iOS application. It acts as the final page of a 4-step walkthrough carousel prompting the user to transition to authentication.

## Technical Details

### 1. Dynamic Texture (Masonry Grid Simulation)
- The entire background consists of a full-bleed `masonry`-style collage representing iconic Netflix show assets. 
- Due to the reliance on purely synthetic artifacts, I devised a `columns-3` layout generator feeding procedural `<svg>` elements that simulate the distinct ambient shadow drops and color footprints of the actual shows (e.g. Yellow/Black structure identifying "B99", Forest Green map for "Boss Baby").

### 2. Typographic Core
- Centers a massively weighted (`font-[900]`) hero pitch string (`Unlimited entertainment...`).
- Exact leading tracking (`leading-[1.05]`) handles the distinctly tight vertical stack behavior identical to Netflix brand language typography curves.

### 3. Layer Management
- Three explicit layer altitudes (Z-Indexes) manage depth bounds properly:
  - `z-10` : Grid structure.
  - `z-30 / Overlay` : Multi-stop dual `linearGradient` fades, obscuring the central optical quadrant toward `#000000` to establish absolute legibility contrast parameters.
  - `z-40` : Critical UI components (Carousal dots set to 4 / 4 active index, "SIGN IN" Call to Action with `.hover:scale` / `.active:bg-darkRed` color transitions).
