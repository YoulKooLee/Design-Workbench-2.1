# Netflix Hybrid Top-Level View (Page 35)

## Overview
This build engineers a complex structural juncture combining a `1x3` CSS Grid schema ("My List" vertical nodes) dropping directly into a `100% width` Landscape array ("Popular on Netflix"), all executing synchronously beneath the global transparent Navigation Bar overlay.

## Technical Milestones

### 1. `VerticalCard` Framework Architecture
Deployed a new `<VerticalCard>` functional component targeting `aspect-[2/3]` strictly obeying a modular API standard `(<VerticalCard imgSrc, title, netflixBadge, specialBadge />)`. The internal styling features a double-stacked text gradient (`mix-blend-multiply` bottom array overlaid with a straight `<black/20>` alpha channel) locking down maximum contrast for heavy typographic injection regardless of graphic luminance. 

### 2. Micro-Interaction Badge Mapping
Designed the highly unique `<InteractiveBadge />` attached directly to the `'BLACK MIRROR BANDERSNATCH'` vector node.
- Generated purely in SVG, utilizing a heavily structured `path` mapping a custom banner chevron.
- Embedded a highly accurate `stroke-white stroke-[2.5px]` 8-pointed asterisk inside the bounds simulating Netflix's exact diegetic 'Bandersnatch Interactive Branch' user prompt UI. 

### 3. Absolute Top Flow Logic
Mapped the main overarching Application Tab controller (`Series | Films | My List`), ensuring the exact optical balance utilizing the custom-calculated `scale-y-[1.25] scale-x-[0.85]` red `N` token without introducing any external typography lag or bounding-box clipping anomalies.
