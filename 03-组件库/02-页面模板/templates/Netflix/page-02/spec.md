# Netflix Mobile Sign-In Empty State (Page 02)

## Overview
Replication of the Netflix iOS mobile application login screen. This page represents the **Empty/Idle State** before user interaction with the inputs.

## Technical Details

### 1. Viewport Structure 
- Utilizes pure black `#000000` standard background out of respect to Netflix branding guidelines.
- Standard absolute iOS status bar placement.

### 2. Form Components (Empty State)
- The input containers are `64px` high with a `#333333` fill and `5px` corner radius.
- Unlike `page-01`, the typography inside the input is centered vertically at `16px` as a standard placeholder, utilizing the `#8C8C8C` color. It does NOT use the floating top-label pattern until text is actually entered.
- The "Sign In" primary action button defaults to a hollow outline style (`border border-white/20`) when disabled, rather than the iconic `#E50914` solid fill used during active input validation.

### 3. Layout Adjustments
- Because there is no active system keyboard occupying the lower hemisphere, the form organically sinks to visually center within the viewport (using `justify-center` with a slight `pb-[10vh]` optical baseline adjustment).
- Includes the `Recover Password` anchor text prominently beneath the submit action.
