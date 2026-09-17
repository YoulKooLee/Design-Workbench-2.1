# Netflix Category Expansion (Page 18)

## Overview
Replication of the Horizontal List Card layout. This UX state appears when a user drills down into a specific genre collection (`Dramas based on a book`), pivoting away from the standard 2:3 vertical masonry layout into a 21:9 landscape stacking model.

## Technical Details

### 1. Complex `HorizontalCard` Subcomponent Layout
- Created a dense, data-rich reusable block.
- Implements dual-layered CSS linear gradients interpolating dynamically passed hex parameters `bgLeftColor`. The gradient fades aggressively from 50% opacity to `transparent` mapping seamlessly against the right positioned SVG.
- Encapsulates three levels of metadata reading paths: Title Typography -> Technical Ratings (`P18/M18` with `<span border>`) -> Semantic Categorization matching exact dot-separator colors per item (`dotColor` passing).
- Appended absolute-positioned white circular Play action triggers anchored rigidly to `bottom-3 right-3`.

### 2. Typographical Fusions
- Built non-image approximations of highly complex movie titles:
  - **THE TOWN**: Overlapped independent `<span/>` nodes dynamically applying `bg-clip-text` mapped to a dual-red gradient with `leading-[0.75]` line-height compression.
  - **the Help**: Mixed `font-serif italic` text for "the" offset slightly onto the massive `font-['Arial'] tracking-tighter` string "Help" wrapped in precise `#8B78A5` coloring.
- Rendered fully synthetic SVG interpretations of 5 Hollywood screenshots, maintaining composition ratios and dominant color weighting (`#C59682` desert maps for Nocturnal Animals; `#758B5D` grass plains for The Help).

### 3. Edge Bleed Illusions
- Hard-coded a pseudo-element representation of the upper iOS boundary dropdown handle `OWS ▼` simulating a partially scrolled DOM element blocked by the iOS fixed glass header.
