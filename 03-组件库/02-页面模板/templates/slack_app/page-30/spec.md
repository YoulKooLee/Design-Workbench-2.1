# Margin Link Prompt View (page-30)

## Component Technical Outline
Complete 1:1 teardown of the Slack onboarding "Magic Sign-in Prompt" phase.

- **Background & Ambient Context**: Fixed onto `#7C63C4` utilizing standard dispatch onboarding ambient tones. Features inverted `Cross (X)` standard navigation headers.
- **Graphic Reproduction Architecture**:
  - `Shadow Floor Mapping`: Handled using SVG `<ellipse>` embedded within the raw layout canvas. Implemented universal darkness offset via `rgba(0,0,0,0.18)` rather than pure colors to safely blend under variable CSS tokens.
  - `Vector Envelope Box`: Bypassed bitmap representations entirely in favor of an explicit closed-loop multi-step `<path>` vector structure simulating the inner and outer folding boundaries. Drawn explicitly utilizing topological overlap to safely force real geometry line crossings (preventing intersecting translucent strokes).
  - `Magic Prop & Emitter`: Re-constructed the wand layout as a `translate() scale()` primitive nested layer mapping dynamic rotation metrics. Star bursts mapped procedurally via independent React elements.
- **Button Mapping**:
  - Solid inversions vs Hollow borders (1px) perfectly mapping to standard Webkit sizing parameters mapping iOS safe distances (`44px` clearance threshold + Home Indicator).
