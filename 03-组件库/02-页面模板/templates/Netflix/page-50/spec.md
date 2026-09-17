# Netflix Core Component: Native Parental PIN Restrictor (Page 50)

## Departure from Cartesian Transmutations
Unlike the previous batches (045-049) which demanded an intensive Landscape CSS Matrix calculation to deal with tilted physical devices, image `050.png` reverts to a perfectly vertical **Portrait User Experience**. 
This is a standard Native OS integration layer triggered by the Netflix application when accessing locked or mature content streams (Parental Control restriction).

## Simulated Apple Human Interface Vectors
We accomplished a 1:1 reproduction of the iOS UIAlertController framework combined with the Dark Mode Numpad without utilizing a single external image map:

1. **The Modal Wrapper (`UIAlertController`)**:
   - `w-[270px]` perfectly centered mathematically in the *available* offset screen space (the void above the extended keyboard footprint).
   - Accurate standard `#D1D1D6` light-mode system prompt background.
   - Built an animated `<div className="w-[2px] h-[24px] bg-[#007AFF] animate-pulse" />` vector block to precisely mimic the iOS text cursor resting in the active array target.
   - Distinct semantic font mappings for modal triggers: `Forgot PIN?` (regular font-weight 400), `Cancel` (bold font-weight 600 - Destructive OS default).

2. **The Numeric Keyboard UI (Dark System OS)**:
   - Accurately placed the 4x3 standard Telephone block with pure flex alignments `gap-[6px]`.
   - Mapped `P Q R S` and `W X Y Z` with tighter tracking constraints (spacing down to `-0.05em`) to allow the longer 4-character strings to align flush with standard 3-character combos like `A B C`.
   - Used raw SVG geometric pentagon strokes to flawlessly reproduce the native backspace glyph in the lower-right sector.
