# Netflix Global Navigation Modal (Page 21)

## Overview
Replication of the immersive fullscreen navigational overlay. This modal intercepts the Z-axis when a user triggers the global header category dropdown (e.g., `Series ▼`), blanketing the current screen context under an intense optical blur.

## Technical Details

### 1. Advanced Mesh Gradient Engine (Synthetic Blur)
- Rather than rendering an actual poster element and running expensive DOM-level CSS backdrop filters on it, I engineered a highly performant CSS **Mesh Gradient** approximation matching the precise atmospheric light bleed of the previous *Bird Box* hero screen (`020`).
- This was achieved by strategically placing 4 absolute div primitives (`bg-[#1A4557]`, `bg-[#3B2A1C]`, etc.) equipped with intense internal filters (`blur-[100px]`) and scaled `opacity`.
- The final mesh is trapped under an `absolute inset-0 backdrop-blur-[55px] bg-black/10` sealing layer to unify the light paths, perfectly recreating the highly dispersed, soft iOS translucent menu feel.

### 2. Vertical Wheel Menu Spacing
- Mapped the typography and scaling to match Netflix's active-state focal logic.
- `Series` acts as the active node anchored with `text-[28px] font-[800]`.
- Secondary nodes step down sharply in visual hierarchy to `text-[20px] font-[500]` adopting a precise muted teal-grey `#98A3A8` to mimic ambient color absorption from the background.
- Massive physical line-gaps applied (`space-y-[46px]`) to maximize tap targets.

### 3. Action Layering
- The white CTA close terminal is suspended cleanly at `bottom-[108px]`, integrating a hard structural drop shadow mapping to separate it optically from the heavy gradient environment.
