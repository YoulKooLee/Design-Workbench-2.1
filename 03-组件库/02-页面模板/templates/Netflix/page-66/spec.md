# Component Architecture: Ext App Override (Page 66)

## "The Scissors Split" Effect
This UI leverages a highly specific illustrative storytelling illusion: demonstrating separation by cutting a unified green bar timeline. To recreate this visual logic identically and responsively without absolute pixel chaos, I deployed the **Geometric DOM Fissure** logic:
- Inside the `bg-[#4EC7A7]` matrix, instead of spacing `1 2 3 4` fully evenly, I explicitly severed the DOM via flex-widths: `<div className="w-[73%]">` housing `[1, 2, 3]` and `<div className="w-[27%]">` isolating `[4]`.
- I then dropped the physical `border-dashed` line absolutely at `<div className="right-[27%]">`, forcing the stroke perfectly symmetrically over the fracture vertex. This achieves bulletproof alignment scaling.

## Zero-Asset Scissors Assembly
Synthesized the physical object array drawing pure SVG circles and dual angular overlapping `<path>` nodes into a `<ScissorsGraphic>`. This avoids external generic webfont assets.
1. The **Primary Tool** is tethered at the tail of the dashed border via Flex column tracking, rotated `rotate-[-90deg]` upwards.
2. The **Animation Ghost** frame (representing pre-cut action blur) is projected over the top edge with `opacity-[0.25] blur-[1px]` invoking authentic UI transition residue.
