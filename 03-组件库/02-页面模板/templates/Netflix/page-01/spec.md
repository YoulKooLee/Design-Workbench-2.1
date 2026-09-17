# Netflix Mobile Sign-In Page (01)

## Overview
Replication of the Netflix iOS mobile application login screen, specifically capturing the state where the user is entering their password with the numeric/symbol iOS keyboard active.

## Technical Details

### 1. Viewport Structure 
- Utilizes pure black `#000000` standard background out of respect to Netflix branding guidelines.
- Standard absolute iOS status bar placement.

### 2. Form Components
- Floating Label Pattern implemented accurately over inputs. Container is sized at `64px` with a dark `#333333` fill and `5px` corner radius.
- Includes a decorative iOS spellcheck "red squiggle" boundary beneath the email field.
- Custom cursor implemented inside the password frame (`animate-pulse`) to replicate the exact active state frame shown in the asset.

### 3. Keyboard Vector
- Procedurally generated numeric/symbol iOS Keyboard (`bg-[#D1D1D6]`).
- Specifically captures the "Passwords" keychain auto-fill banner attached above the character keys.
- Accurate SVG reconstruction of the iOS delete key variant.
