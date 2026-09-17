# Component Architecture: Ext App Start Screen (Page 68)

## 0-Asset Graphic Synthesis: The "Entale" Identity
With absolute zero-asset rules enforced, I could not utilize any PNG/SVG file dumps. I fully reverse-engineered the central "folded S" application logo into pure SVG DOM math:
- Used `viewBox="0 0 100 100"` and a precisely offset `stroke-[13px]`.
- Mapped the exact U-turn curvatures via `<path d="M 75 30 L 35 30 A 10 10 0 0 0 35 50..."/>` enabling raw browser-level vector sharp rendering that surpasses even high-res static images.

## Organic Sub-Canvas Architecture
The background of this splash screen is highly nuanced, containing both large sweeping intersection curves and a cinematic noise filter.
1. **The Ambient Wave Canvas**: Instead of complex bezier meshes, I achieved the fluid intersection bounds via `<div className="w-[150vw] rounded-full">` nodes positioned at absolute corners. Masking black and white overlapping ellipses with `opacity-[0.05]` flawlessly emulates the organic lighting tonality present in the screenshot.
2. **SVG Fractal Engine**: I layered a `<filter id="noiseFilter"><feTurbulence/></filter>` spanning the `w-full h-full` fixed viewport, locking the mix-blend mode to overlay. The resulting visual noise gives the pure HTML/CSS canvas a completely premium, physical material texture.
