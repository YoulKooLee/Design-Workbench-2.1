# Netflix Core Component: Vertically Scaled Hero Profile (Page 54)

## Structural Departure from Horizontal Standard
Unlike `page-52` where the central metadata anchor was driven by a compact horizontal `170px * 60px` logo box, screenshot `054.png` fundamentally re-architects the top-of-funnel viewing experience by utilizing a **Massive Vertical Movie Poster**.

This architectural mutation ripples downward, forcing a significant layout realignment:
1. **Header Collapse**: The top title string (`Black Mirror...`) was entirely wiped from the navigation layer. To prevent unused negative spatial trapping, the `CloseIcon (X)` button was untethered from a standard flex-nav container and explicitly wrapped in an `<div className="absolute top-[52px] right-[18px]...">` node. This clears the sky for the poster to ascend dramatically, almost kissing the status bar drop shadows.
2. **Procedural Will Poulter Geometry**: Since no raw `img` src was available, I mapped the `w-[190px] h-[280px]` poster block using a highly elaborate pseudo-render payload. Skin-tone bulbs (`#D1BEA5`) combined with heavy multi-layer gaussian blurs (`blur-[25px]`) dynamically synthesize the blonde hair / blue jacket Colin Ritman aesthetic.
3. **Interactive Starburst Ribbon**: The hallmark Netflix "Interactive content" flag on the top right was cloned utilizing CSS Polygon mathematics `clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)'`. This exact 82% chevron inversion algorithm perfectly aligns with the Netflix brand geometry surrounding the custom SVG 8-point `<InteractionStar />`.
