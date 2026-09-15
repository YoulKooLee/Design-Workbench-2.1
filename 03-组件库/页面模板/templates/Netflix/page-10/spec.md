# Netflix Settings/FAQ Screen (Page 10)

## Overview
Replication of a purely textual system settings/FAQ page, triggered from the root "Smart Downloads" interface header. Focuses inherently on typographic spacing and custom HTML form controls (the active Toggle).

## Technical Details

### 1. Header Infrastructure
- Employs the `border-b border-[#262626]` boundary line unlike previous unbounded headers.
- **Toggle Simulation**: Removed default browser radio inputs and fully simulated the animated iOS-style toggle. Built natively via Tailwind `<w-50px h-30px bg-[#4686EB]>` containing a nested `26x26` absolute white right-aligned circle.

### 2. Typographic Stack
- **Headers (`<h2/>`)**: Extensively bolded `font-[800]` at `19px`. Implemented `tracking-[-0.2px]` micro-adjustments to pull the heavy characters closer together matching modern iOS typography.
- **Body (`<p/>`)**: Tuned `leading-[1.35]` across `#999999` font colors to enforce a highly legible block layout.
- **Ordered List Matrix**: 
   - Handled paragraph numbering manually using a flex grid (`flex gap-4`) holding a rigid-width `w-4` shrink-prevented numeral core to force correct paragraph hanging indents on the second lines.

### 3. Layout Control
- Applied `<overflow-y-auto pb-28>` to ensure the heavy textual footprint can scroll completely clear of the absolute positioned bottom Tab Bar navigation interface without collapsing.
