# Netflix Core Component: Interactive Playback Architecture (Page 45)

## Rotational Cartesian Translation (The Viewport Paradigm)
Screenshot 045 presented an extraordinary technical engineering challenge: It is an iOS Portrait (vertical) screenshot capturing a Native App rendering a Landscape (horizontal) hardware AVPlayer session.

To recreate this perfectly:
Instead of trying to draw the `Vintage TV` using warped vertical layouts, I instantiated a `w-[950px] h-[650px]` Landscape Cinematic Container and developed the TV model right-side up. I then executed a mathematically absolute `transform: rotate(90deg)` to inject it into the `max-w-md` portrait window. 

The optical result is a `1:1` match of the rotation matrices performed by natively locked iOS mobile players when forcing landscape playback.

## Deep Procedural Vector Generation (The Bandersnatch TV Box)
Zero external graphical assets were relied upon.
The British-era CRT monitor was meticulously handcrafted block-by-block using atomic CSS properties:
- **Cathode Curvature**: `shadow-[inset_0_0_90px_rgba(0,0,0,0.95)]` mapping for the internal rounded glass depth combined with a white reflective glare node.
- **Hardware Deck Box**: The bottom console houses an interlocking flex-container representing the acoustic speaker grill (`8` black linear arrays), functional analog turning knobs (`radial-gradients`), and a glowing sequentially lit push-button array specifically mapped lighting up `Channel 3` in blood-red - a classic hallmark of early analog video game interfacing perfectly matching the Bandersnatch lore.

## Interactive Branch Prompt HUD
The Choice Selection array (`YES` | `NO` and the shrinking decision timer) acts natively on top of the DOM. Plotted utilizing inverted `-90` relative anchors to account for the physical user tilt space layout.
