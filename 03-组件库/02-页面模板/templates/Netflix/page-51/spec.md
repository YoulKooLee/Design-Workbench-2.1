# Netflix Core Component: Native Engagement Overlay (Page 51)

## Photometric Layer Separation
Screenshot `051.png` fundamentally requires a 3D structural perspective to implement efficiently without copying raw image blobs. The view demonstrates standard iOS photometric dimming triggered by an interactive state overlay (the Rating system).

### Base Plane (Background Core)
Instead of extracting the dimming into the raw colors themselves, we procedurally generated the full-brightness Title Detail Page layout, complete with metadata tracking, solid red Red Play anchors, and cinematic procedural graphic silhouettes mimicking the visible trailer.

### Optical Z-Index Dimming (`bg-black/85`)
By overlaying a pure absolute viewport matrix mapped at `bg-[#000000]/85` inside `z-[100]`, the entire background core is flawlessly degraded into the pitch-black shadows captured in `051.png`. This inherently propagates native application structural fidelity. The upper OS Status Bar explicitly bypasses this dim layer at `z-[120]` ensuring correct optical boundaries.

### Interaction Payload (Rating Components)
Mounted at `z-[110]`, three highly stylized Hitbox wrappers are mathematically centered and offset vertically (`mt-[-170px]`) to flawlessly bind over the exact narrative synopsis lines mapped in the original file. The transparent OS-Blurs (`bg-[#3D3D3D]/60 backdrop-blur-xl`) simulate the glassy native modal feeling required from modern device specifications.
