# Netflix Home Screen (All Genres Filter) - Page 20

## Overview
Replication of the primary vertical landing state pivoted to `Films -> All Genres`. This view incorporates a deeply saturated `<Hero>` section featuring Sandra Bullock's *BIRD BOX*, introducing a centralized vertical carousel array mechanism for `My List`.

## Technical Details

### 1. The Typographic Distress Mask 
- Recreated the iconic *Bird Box* scratched/distressed title effect using inline generative SVG backgrounds mapped via `bg-clip-text`.
- Instead of using large network-heavy web fonts, I deployed a lightweight `Impact` array (`['Impact','Arial_Black']`), scaled its Y-axis `scale-y-[1.1]`, compressed its track spacing, and layered a custom SVG containing procedurally generated vertical slash marks (`stroke-width="0.8" opacity="0.7"`). When clipped masking is calculated, this acts as a perfect alpha-channel distress generator completely client-side.

### 2. Deep Scene Extraction 
- Modeled the entire dark-water river scene utilizing `<path>` commands mapped to `fill="#1C2D38"` over a base `#344654`. 
- Intricately folded blindfold layers leveraging absolute SVG rotational transforms `transform="rotate(-15 65 90)"` ensuring accurate narrative representation.
- Injected `mix-blend-overlay` combined with high-frequency SVG noise for authentic color degradation.

### 3. Vertical Carousel Carousel Mount
- Implemented `<VerticalPoster>`, an inversion of the `<HorizontalCard>`, utilizing a strictly bound `aspect-[2/2.95]` canvas box to recreate the classic movie poster shape.
- Deployed a horizontal flex track `flex overflow-x-auto` masking overflow with `.hide-scrollbar` to accept incoming `VerticalPoster` children, currently populated by the detailed rendering of *Black Mirror: Bandersnatch* equipped with its pure CSS drop-shadow interactive marker.
