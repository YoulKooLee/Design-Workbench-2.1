# Netflix "More" Drawer Menu (Page 04)

## Overview
Replication of the Netflix "More" (Hamburger) navigation root screen. Captures the primary profile switching component along with structural textual settings routes.

## Technical Details

### 1. Viewport Structure 
- Dual-color layout base. The header context (housing avatars) embraces deep `<bg-black>` while the lower list items sink into `<bg-[#121212]>`.
- Standard absolute iOS status bar overlaying the black root header.

### 2. Avatar Components
- Rather than rendering `.png` image external blobs, avatars are simulated natively within SVG:
  - **Red Angry Face**: Mapped accurately utilizing path clipping intersecting a yellow base background (`#FFC80A`).
  - **Green Ninja Face**: Layered utilizing `#EBEBEB` and `#2BAC76` slit lines.
- **Selection State**: The active profile translates optically up via margins with an injected structural bounding border (`border-[2px] border-white`).

### 3. List Item Modifiers
- The `My List` segment receives localized architectural prominence via a nested top border and distinct padding, separating it from the global settings link tree below using a unique bottom chunking margin (via deep `#000000` thick bottom border representation).
