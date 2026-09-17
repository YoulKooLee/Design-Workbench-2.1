# Netflix App Settings (Page 03)

## Overview
Replication of the Netflix "App Settings" screen, accessible from the trailing "More" navigation tab. It implements standard iOS-style list grouping atop a custom dark Netflix material base.

## Technical Details

### 1. Structure
- Adheres to standard nested flexbox scroll containers with a locked header and a locked floating bottom navigation bar (`<Tabs>`).
- Sub-components are structured vertically via `flex-col`, and rows encapsulate title/value pairings.

### 2. Form & List System
- Identical simulation of iOS `Grouped` list mode logic inside dark mode (`#121212` backgrounds mapping over `#000000` base).
- Section Titles are uppercase `#8C8C8C` spanning across the full width, whereas list items feature inner top/bottom structural dividing lines (`border-[#2B2B2B]`).
- The switch component manually emulates the native iOS Toggle structure using `bg-[#34C759]` for the tracked success state.

### 3. Data Visualization (Storage Stack Bar)
- Visualizes the internal storage usage state in an absolute bar chart format.
- Leverages precise `%` widths across Flex sub-containers (Used `#404040`, Netflix `#4686EB`, Free Space `#EAEAEA`). Ensure responsive layout constraints apply natively to the width calculation mechanism.
