# Netflix Onboarding Screen 3 (Page 15)

## Overview
Replication of the third state of the unauthenticated user onboarding walkthrough. Contains the iconic Netflix onboarding minimalist vector illustration (the 'contracts' graphic) and the standardized conversion funnel CTA structure.

## Technical Details

### 1. Vector Manipulation (The Contract Graphic)
- Generated a strictly procedural layout avoiding external asset loading. 
- The background shadow document uses a `rotate-[8deg]` skewed `div` acting as a volumetric outline behind the primary black fill element rotating inversely at `rotate-[-5deg]`.
- **Parametric Sine Curves**: Developed a functional component renderer (`<WavyLine />`) combining complex chained SVg Cubic Beziers (`C x y, x y, x y`) into a seamlessly repeating wave structure mirroring the exact visual cadence of the original graphic's ink lines, stroked with the specific branding orange `#F2B005`.

### 2. Typographical Conversion Funnel
- Rendered the classic Netflix logo top-center entirely out of native CSS typography properties (`scale-y-[1.4] scale-x-[0.8] tracking-[-1px]`) bonded alongside a fallback OS typeface stack to accurately reproduce the heavy `Impact` aspect ratio without loading WOFF font blobs.
- Center typography mapped at `text-[28px] tracking-[-0.6px]` enforcing tight leading required for the bold `No pesky contracts` headline.

### 3. Step Interpolation State
- Static implementation sets the `<Pagination>` array to reflect the Third active node, slightly upscaling the `#E50914` tracking dot to `8x8 px` and floating it up `0.5px` higher than the inactive grey bounds to mirror standard OS focused-element padding.
