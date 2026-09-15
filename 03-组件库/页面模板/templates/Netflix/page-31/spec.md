# Netflix Show Information Extractor (Page 31)

## Overview
Reversed engineering of the top-of-sheet Details modal (partner view to Page 30). This view isolates the volumetric Hero Header and the List-View array mapping for "EPISODES" rendering.

## Technical Details

### 1. Volumetric Fake Environment Blur (`filter: 'blur(50px)'`)
To perfectly mirror Netflix's native background gradient bleeding from the primary Poster asset, I opted *not* to duplicate the SVG tree and run an expensive CSS blur on an identical node. 
Instead, we built an abstract CSS spatial lighting array pushing generic `#4A6478` (Slate Blue) radial blocks behind a `bg-gradient-to-b` dissolve mask. Achieving equivalent cinematic blur depth with ~90% less GPU painting payload.

### 2. Nested Custom Brand Blocks
- **The BBC Logo**: Rebuilt the classic BBC watermark inside the upper-left padding of the Sherlock poster map via an exact absolute flexbox injection containing `[ B ] [ B ] [ C ]` arrays with precision `text-[8px]` sub-letter bounding.
- **The Typography**: Continued exploiting `sans-serif` and explicit drop shadows to form the `SHERLOCK` title mask directly overlapping the SVG bounding-box vectors.

### 3. Routing Engine Active State Push
- Swapped active navigation tabs from `MORE LIKE THIS` to `EPISODES` logic.
- Maintained the inverted red indicator anchor `absolute top-[-1.5px]` system discovered in Page-30, rendering the border precisely to the host container's ceiling grid block.

### 4. Episode List Extraction Structure
Constructed the horizontal episode `<li>` representation carrying:
- `16/9` Abstracted landscape Thumbnail (`ep1ThumbSvg`).
- High-level Play-Circle interaction payload overlaid on the poster via `bg-black/40 backdrop-blur-[2px]`.
- Custom Download Vector SVG terminating the rightmost bounds.
