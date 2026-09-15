# Netflix Search Grid (Page 12)

## Overview
Replication of the dense grid-view layout found in the Netflix "Search" tab when a user expands a specific category ("The End-of-the-World").

## Technical Details

### 1. Grid Implementation
- Handled via pure Tailwind CSS `<grid grid-cols-3 gap-[6px]>`. 
- Ensured absolute parity with Netflix's dense layout logic which enforces exactly `2/3` aspect ratios across the entire grid mapping, resulting in perfectly uniform, interlocked poster rows.

### 2. Procedural Typography Tracking
- The `<Poster>` generator component was supercharged to dynamically accept varying `alignment`, `fontClass`, and explicit `<br/>` spacing arrays to mimic exactly how distinct movie brands render their watermarks when bitmap assets are missing.
- For example, *BOKEH* sits perfectly vertically centered `<justify-center>` relying on wide tracking, while *EXTINCTION* is justified at the extreme horizontal edges.

### 3. State Migrations
- **Active Navigation Tab**: Repointed the Bottom Navigation tab's active index (`opacity-100`, `strokeWidth=2.5`) to the `<Search>` icon to map the current app context correctly.
- **Dismiss Control**: Header action uses a distinct close circle (`bg-[#262626] rounded-full`) instead of a traditional back chevron, identifying that the user has opened a modal overlay layer over their active search.
