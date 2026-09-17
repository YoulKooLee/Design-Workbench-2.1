# Netflix Downloads Editor (Page 05)

## Overview
Replication of the Netflix "Downloads" module specifically during a live "Edit" configuration state. Captures horizontal swipe-to-delete interactions statically materialized, alongside structural thumbnail processing.

## Technical Details

### 1. Header Infrastructure
- Employs a complex upper flex topography where `<Info>` and `Smart Downloads ON` sit independently. The `ON` indicator locks tightly to `#4686EB` blue.
- Followed by a specific filter row (Jiho) utilizing a mini `28x28px` procedural SVG copy of the primary avater bounded inside `#1A1A1A`.

### 2. Active Swipe-to-Delete Emulation (Flex Row)
- The downloaded movie rows are structured to demonstrate an "always active" iOS left-swipe delete reveal.
- **Flex Mechanics**: The structural parent container maps `flex` horizontally. The image is a strict unshrinking `#150px` block (`shrink-0`), forcing the core metadata (Title, Sizes) to squeeze inside standard `flex-1`.
- The extreme right houses the `88px` wide `#E50914` destructive action block containing an `<X>` icon. It sits inline natively pushing against the chevron, perfectly simulating the open physical bounds.

### 3. Procedural Poster Stubs
- Emulated missing source bitmap assets via multi-layer `linearGradient` SVGs.
- Utilized overlapping text overlays (`MIRROR`, `RD`) matching partial poster framing. Contains pseudo-geometry circles for face framing, rendered using native low-opacity fills to trick optical scanning.

### 4. Global State Nav changes
- The global bottom navigation accurately transitions its high-opacity state from "More" to "Downloads" featuring the `strokeWidth=2.5` filled-weight representation.
