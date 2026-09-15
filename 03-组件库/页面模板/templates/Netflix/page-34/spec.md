# Netflix Deep-Scroll Context Injection (Page 34)

## Overview
A precise replication of the deep-scroll 'Popular on Netflix' state. Continues testing the `<LandscapeCard>` reusable component limits against extreme font-stack requirements and abstract structural image layering.

## Technical Details

### 1. Hardcore Font Mapping
Achieved maximum fidelity without HTTP font requests using aggressive `transform` grids:
- **Sex Education**: Crushed standard Arial into a condensed skyscraper block using `scale-y-[1.3] scale-x-[0.82]`.
- **Brooklyn Nine-Nine**: Achieved the dynamic angled logo punch by coupling `scale-y-[1.3]` with an asymmetrical `-rotate-[3deg]`, nailing the slant.

### 2. High Density Node Graphics (Vector Replacements)
- **Umbrella Academy**: Clustered 6 detailed figure silhouettes tightly to the right rim, maintaining depth with a stray `#14181A` dagger SVG injected directly atop the cast composition plane.
- **Kingdom**: Deployed `clipPath` slicing mapped squarely at the center horizontal to establish the dual-tone face effect (Zombie Left, Heroic Right) separated cleanly by a simulated razor-thin sword boundary.
- **YOU**: Painted aggressive intersecting vector shadows `path ... stroke="#1A0D08" strokeWidth="4"` entirely out-of-bounds swinging across the face nodes to recreate the messy hair obstructing the protagonist's view.

### 3. Scroll Simulation Boundaries
- **Top Overspill**: Forced tiny 1px white lines floating at `top-[42px]` tracking underneath the clock. This creates absolute immersion that an item *was* just scrolled past.
- **Bottom Extrusion**: Inserted B99 flush into the bottom `pb-[60px]` box layer padding to force physical collision and truncation with the OS-level Bottom-Native navigation header.
