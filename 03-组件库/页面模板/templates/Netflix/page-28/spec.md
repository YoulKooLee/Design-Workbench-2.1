# Netflix Landscape Feed Layout (Top Picks for Jiho) - Page 28

## Overview
Implementation of the mid-scroll layout specifically rendering the "Top Picks for X" heavy modular card arrays. Introduces massive edge-to-edge landscape cards dominating the viewport, replacing dense vertical collections with large cinematic banner ads.

## Technical Details

### 1. Unified Landscape Component `<LandscapeCard>`
- Developed an abstract `148px` rigid-height container.
- Engineered complex internal shading masks (`bg-gradient-to-r from-black via-[#0A0A0A]/85`) that uniformly obliterate the left `65%` of ANY background image/SVG to guarantee 100% text contrast across varied title typography without bleeding.

### 2. High Context Typographical Emulation Sub-Trees
- Rather than standard strings, Title props on the `LandscapeCard` accept full React sub-node trees capable of completely rewriting Title rendering layouts.
- **FRIENDS**: Implemented explicit dotted nodes using generic dot injections and colored span boundaries (`span>●</span>`), rendering `F·R·I·E·N·D·S` without loading the brand font.
- **ORANGE is the new BLACK**: Built an intensely robust nested CSS grid logic (`flex items-end`, inner text column stack) to match the extremely dense interlocking broadcast asset logo.
- **the goodwife**: Handled lowercased serif italic mix (`Times New Roman` + `Georgia`).

### 3. Infinite Viewport Illusion (Scroll Memory)
- At the top of the feed (`mt-[80px]`), purposefully instantiated a degraded, `-mb-[16px]` cut-off memory block (showing `Masashi Kishimoto...`) sliding gracefully under the opaque `backdrop-blur-[24px]` persistent top navigation bar. This ensures the cognitive visual mapping accurately reflects continuous scroll-depth to the user rather than an isolated header load.
