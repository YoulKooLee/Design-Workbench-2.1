# Netflix Search Query Active Mode (Page 14)

## Overview
Replication of a highly specific active UX state: The user is in the middle of executing a query (`the end of`). The view combines the direct output grid along with a fully rendered native iOS dark mode software keyboard overlapping the bottom half of the UI.

## Technical Details

### 1. iOS Native Dark Keyboard Component
- Developed a complete simulation of the Apple default dark keyboard footprint.
- Built using a dedicated mapping function yielding `43px` tall keys colored `bg-[#616161]` sitting atop a semi-transparent `backdrop-blur-2xl bg-[#1A1A1A]/90` base.
- Includes standard OS glyphs (`Globe` & `Mic`) and the rigid spacing constraints of the control clusters (Delete, Shift, Numeric toggle).
- Keyboard covers and overlaps (`bottom-0 fixed z-50`) the actual Netflix grid beneath it seamlessly.

### 2. Search Toolbar Active State
- Integrated the distinct `"Cancel"` text action directly abutting the search input box.
- The `Films & TV` grouping header is statically anchored directly below the search bar to denote immediate real-time filtering (as opposed to being a scrolled section as seen in `page-13`).

### 3. Highly Specific Typography Masks
- Expanded the `<Poster>` renderer once more to accurately recreate extreme font variations without needing raw images:
  - **THE END OF THE F***ING WORLD**: Utilized absolute anchoring and dual rotational transformations (`-22deg` and `15deg`) to create chaotic typography scaling overlapping heads.
  - **DANGANRONPA 3**: Recreated the distinct Anime-style hot pink slash matrix combined with dense stretched black sans-serif font rendering.
