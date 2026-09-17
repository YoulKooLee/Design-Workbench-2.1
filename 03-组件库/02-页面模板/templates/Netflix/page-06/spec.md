# Netflix Episode Downloads View (Page 06)

## Overview
Replication of a specific Series node detail layout (e.g. "Black Mirror"), nested deep inside the user's Downloads navigation tree.

## Technical Details

### 1. Viewport Structure 
- Utilizes `<bg-[#121212]>` as the global background color, adhering accurately to the slight lift from absolute black that Netflix uses for list hierarchy pages.
- Header incorporates a prominent `<Pencil>` contextual edit icon opposite the universal iOS `<ChevronLeft>`.

### 2. Season Chunking & Episode Render
- A rigid boundary marker (`<bg-[#181818]>`) signals the "Season 4" array.
- **Thumbnail Stubbing**:
  - Reconstructed an abstract homage to "USS Callister" via multi-path SVG rendering utilizing specific Red (`#D32F2F`), Gold (`#FFA000`), and Blue (`#1976D2`) color blocks overlaid over a Mars-dust `#8C4A3A` gradient base.
- **Downloaded State Action Box**:
  - Encapsulated the iconic `#4686EB` stroked outer boundary mapping an interior square (`<w-9px> <h-9px>`) signifying a successfully buffered/downloaded item context.

### 3. Dynamic Progress Tab Indicator
- Implemented a specialized badge attached `<absolute>` to the upper right quadrant of the active `Downloads` bucket tab icon.
- Synthesized an active data-fetching slice layout employing pure CSS `conic-gradient(#4686EB 60%, transparent 0)` nested within a `#121212` matte ring to simulate the native Netflix background-matching transparent cutout.
