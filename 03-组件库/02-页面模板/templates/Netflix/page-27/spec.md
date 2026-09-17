# Netflix Home "My List" Carousel (Page 27)

## Overview
Implementation of the massive visual pivot towards the specific "My List" content categorization tier. The layout is structured as a vertical grid row replacing the landscape card format, featuring dense, portrait-oriented keyframes heavily customized for each IP.

## Technical Details

### 1. Extramural SVG Sub-Agent (Character Framing)
- **BODYGUARD Frame**: Rendered pure SVG representations of Richard Madden and Keeley Hawes utilizing distinct geometric clipping planes for shadowing. Inserted a massive custom-scaled typo node applying `scale-y-[1.65] scale-x-[0.8]` to crush standard `Arial` into a tall, menacing cinematic font weight matching British broadcasting graphics.
- **SUITS Module**: Injected a completely different poster logic layer, placing text (`SUITS` generated in high-luminosity `#FFE819` Yellow) floating in the upper Y-axis, overriding the bottom anchoring logic typical of Netflix Originals.

### 2. Custom Node Triggers (<VerticalPoster>) 
- Engineered a reusable functional Component `VerticalPoster` wrapper replacing `<HorizontalCard>`.
- Supports injecting absolute-positioned proprietary interactive metadata ribbons. e.g. the distinct `Bandersnatch` Branching Narrative asterisk/starburst icon `clipPath: 'polygon(...)` array anchored tightly to the top-right Z-index limit.
- Supports toggling the `isNetflixOriginal` miniature `#E50914` crest on demand via dynamic boolean mapping.

### 3. Navigation Header Filtering Mutator
- Flipped the active/inactive logic of the top brand bar. `All Genres` is now rendered inactive at `opacity-[0.85]`, and `Series` is fully saturated and locked denoting the current tree pathway `Home -> Series -> My List`.
- Modified the contextual `+ My List` button in the Hero to show a heavily stroked `✔ (Check)` bounding SVG path, informing the user of internal app memory state modifications visually.
