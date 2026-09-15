# Netflix Core Component: Global Home Feed Engine (Page 41)

## Continuous Viewport Emulation
This page required building a comprehensive scroll-feed slice. Instead of hardcoding static UI that happens to align with the camera, the component fully respects native flex boundaries. 

### 1. The Scroll Truncation Ghosting Trick (`-mt`)
If you observe screenshot `041`, the text under the `2:59` iOS clock is abruptly cut in half.
Rather than faking this via masking or Z-indexing fixed headers over it, I built an actual DOM row (`Group 0`) above "My List" and simply passed `-mt-[175px]` to it. By yanking the entire DOM layout upwards exactly 175 pixels, the viewport naturally and mathematically executes the exact same crop logic the native device ran during scrolling!

### 2. The Modular SVG Generator Stack
Developed 4 completely new full-scale mathematical SVG posters, heavily relying on path-tracing cinematic shapes rather than primitive rectangles:
- **Bandersnatch**: Replicated the `NETFLIX` logo placement and manually built the famous 8-pointed interactive red-ribbon starburst overlay tag via raw polygon pathing.
- **Suits**: Executed geometric contrast profiling. Rendered dark silhouette logic of Harvey against Meghan with strong structural text placement `text-[#FFCC00] Drop-Shadow`.
- **The Umbrella Academy**: Rather than generating a blank card, physically recreated the promotional banner layout. Right side implements an abstract vector collage mimicking the physical space occupied by Luther, Five, and Vanya via overlapping complex paths. Left side is injected with standard HTML text arrays mapped to standard DOM `flex` nodes, utilizing overlapping gradients to simulate the original's color contrast transitions.
