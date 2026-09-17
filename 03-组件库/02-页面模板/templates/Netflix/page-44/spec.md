# Netflix Core Component: Share Action Modal Matrix (Page 44)

## External Target Iconography Build-out
This UI required high-fidelity representations of 6 external third-party brands (WhatsApp, Apple Messages, Instagram, Messenger, Twitter, Copy System) to be perfectly mapped into standard iOS `38x38` squircles. 
As strict Zero-Asset parameters are in play, EVERY icon was manually forged using custom pure SVG node geometry:

1. **WhatsApp & Messenger**: Leveraged nested SVG `<path>` cutouts. For Messenger, a `white` square canvas receives an injected dynamic `<linearGradient>` map defining the exact `#00B2FF` to `#006AFF` flow, leaving the transparent lightning bolt to show the white parent div below it.
2. **Instagram**: Standardized linear gradients scaling `tr` alongside explicit `<rect>` borders to recreate the famous hollow multi-color neon box.
3. **Twitter (Classic)**: Mapped the standard vector curve array against a pure baseline `#1DA1F2` wrapper.

## Flex Matrix Alignment
A common pitfall with centered list modalities is text staggering. If you just `justify-center` a stack of items, their internal text runs loose left-and-right.
By calculating the exact string bounds of `Instagram Stories`, I containerized the entire inner stack to `w-[214px]` and locked it to `items-start`. This allows the parent layer to perfectly dead-center the massive matrix block over the background without sacrificing internal left-alignment rigor.

## Atmospheric Consistency
Inherits the identical `Procedural Cinematic Blur Engine` built during the `page-43` implementation to honor continuous flow state (this is the state directly preceding the page-43 Toast alert).
