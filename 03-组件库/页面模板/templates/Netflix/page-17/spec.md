# Netflix 'My List' Screen (Page 17)

## Overview
Replication of the personalized "My List" collection grid. Unlike endless search carousels or category queries, this presents a partially filled array representing specific user-bookmarked shows.

## Technical Details

### 1. The Interactive Ribbon Component
- Engineered a pure CSS/SVG interactive marker (The Bandersnatch top-right banner). 
- Implements a precise CSS `clip-path: polygon()` chevron bottom slice overlaying a procedural 4-point star SVG, accurately recreating Netflix's interactive branching narrative UI flag without images.

### 2. SVG Synthetic Artwork
- Rebuilt 5 distinct movie/series posters using layered vector primitives injected directly via the `<Poster>` generic component.
- Extensively utilized `mix-blend-luminosity`, nested circular lighting drops, and transparency clipping to create dynamic poster compositions. For example, `BODYGUARD` combines layered blood splatters (`#751313` with `opacity-0.85`), whilst `SUITS` synthesizes a rigid geometric vector suit juxtaposed against massive yellow overlay text.
- Reconstructed the `BBC` channel bug inside `SHERLOCK` using heavily condensed HTML nested bordered divs.
 
### 3. Route Context 
- Restored the active Tab focus to `Home` (`opacity-100` with `stroke-width=2.5`), recognizing that "My List" functionally operates within the localized Home router scope.
