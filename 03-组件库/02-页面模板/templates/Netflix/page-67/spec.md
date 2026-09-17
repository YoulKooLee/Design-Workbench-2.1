# Component Architecture: Ext App Audio Scrubber (Page 67)

## The "Tape Measure" Playhead Illusion
Screenshots often expose highly stylized UX elements that violate native OS behavior. Screenshot `067.png` presents an incredible audio scrubber configuration:
- Standard HTML5 / iOS sliders generate a "played" tracking line to the *left* of the thumb knob, and an "unplayed" line to the right. 
- **Entale Custom Geometry**: Here, the space left of the thumb `[0% to 18%]` is completely EMPTY (revealing only the base `#4EC7A7` widget card). The track `[bg-[#3E9F88]]` ONLY extends from the `[18%]` thumb node to the right bounds `[100%]`.

## Thumb Composition 
To seal this visual effect, the UI scrubber knob in `067.png` is not a perfect circle. It has a tiny white rectangular block jutting out to its left (`Tape Connector Hook`). This generates the psychological effect of "dragging" a physical measuring tape.
- I rebuilt this seamlessly utilizing relative flex layering:
```tsx
<div className="w-[12px] h-[14px] bg-[#FFFFFF] rounded-l-[1px] translate-x-[6px] relative z-[5]"></div>
<div className="w-[28px] h-[28px] bg-[#FFFFFF] rounded-full shadow-[...] relative z-[10]"></div>
```
The `translate-x-[6px]` ensures the rectangle embeds perfectly inside the shadow bounds of the circle, preventing any sub-pixel rendering cracks during animations while yielding pixel-perfect OS scale fidelity.
