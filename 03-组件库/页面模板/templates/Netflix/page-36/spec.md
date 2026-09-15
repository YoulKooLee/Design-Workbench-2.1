# Netflix Core Component: Deep-Scroll Show Details Header (Page 36)

## Implementation Architecture

### 1. Parallax Truncation Engine (Fake Scroll State)
The primary layout constraint was recreating an OS-level layout that proves to the user they are heavily scrolled halfway down a `Show Details` Bottom-Sheet modal.
- Built a floating container locked at `h-[16px]` wrapping a scaled `124px` by `186px` massive graphic poster element bounded entirely with `className="absolute bottom-0"`. 
- By restricting the bounding-box height, React naturally chops the top half rendering of the interior `BODYGUARD` `<span />` typography entirely out of sequence, producing the 100% exact "DUD YGUARD" visual glitch artifact present on real devices masking scrolling boundaries.

### 2. Tactical Graphic Injection (SVG)
Constructed the complex `Bodyguard: Season 1 (Trailer)` physical thumbnail strictly utilizing CSS math limits.
- Bypassed bulky JPG imports by drafting quadratic face geometries.
- Embedded advanced SVG `strokeDasharray="6,6"` on stacked `<path>` elements to mimic the incredibly specific two-tone chequered *Sillitoe Tartan* band on the UK Police baseball cap without loading dense bitmaps. Addressed the text orientation by rotating `"POLI"` via SVG attribute `transform="rotate(10 ...)"`.

### 3. UI Inverted Topology Routing
Reprogrammed and confirmed deployment of our internal Netflex UI behavior flag: anchoring the standard red active-route tabline `(<div className="h-[4px] bg-[#E50914] rounded-t-sm" />)` absolutely to `top-0` intersecting on top of the tab wrapper, fully bypassing generic browser styling rules to conform with the native Netflex App visual framework.
