# Netflix Active Search State (Page 13)

## Overview
Replication of a highly dynamic intermediate state: the moment a user performs a partial string search inquiry (`the end of`). The view combines an active fixed Search Header overlaying partially scrolled suggestions, matched categorical grid results, and a trailing contextual semantic linker loop.

## Technical Details

### 1. Optical Scrolling Offset
- The most visually challenging element is the "cut-off" row immediately below the search bar (`Bojack Horseman`, `OITNB`).
- Executed by generating a strictly `72px`-tall `overflow-hidden` container grid displaying fully scaled synthetic vector assets positioned along the absolute logical bottoms (`items-end`). This perfectly mimics a flex-box row that has `translate-Y` scrolled halfway under a solid sticky header.

### 2. Multi-Class Type System Integration
- Overrode the standardized `<Poster>` component to tolerate extreme font combinations mirroring actual cinematic title treatments:
  - **Reversed Text Glyphs**: `<ELITE>` deploys `scaleX(-1)` inline transforms to backward-flip the terminal `E`.
  - **Inline Text Stroking**: `EVERYTHING SUCKS` maps explicit inline `-webkit-text-stroke` to pop thick black bounds around pure white fat fonts over chaotic backgrounds.
  - **Neon Lighting**: `BABY` incorporates `drop-shadow-[0_0_10px_rgba(231,11,143,0.5)]` simulating electric pink script fluorescence.

### 3. Layer Separation Mapping
- The layout is aggressively `z-indexed` to recreate vertical depth. The fixed Black search header sits at `z-40`, casting a hard `from-black/80` pointer-event-free gradient shadow downward into the scrollable body, cementing the overlap illusion.
