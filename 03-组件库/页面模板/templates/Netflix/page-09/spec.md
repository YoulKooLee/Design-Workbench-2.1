# Netflix Episode Synopsis View (Page 09)

## Overview
Replication of an expanded-detail episode row view. When users dig down into specific serialized downloads (e.g. "Bodyguard Season 1"), individual tracks load descriptive payloads alongside inline actionable playback triggers.

## Technical Details

### 1. Expanded Component Topology
- Migrated from a strict single Flex-row component (`page-06`) to an encompassing `flex-col` wrapper wrapping the thumbnail sector and a newly introduced text-wrapping block underneath.
- **Text Block (`leading-[1.4]`)**: Formatted using the exact `#A3A3A3` grey footprint to detach the dense synopsis prose from the stark white `<h>` level primary headers, maintaining scannability.

### 2. Thumbnail Play Override
- The thumbnail overlay features a standard contextual action loop—an absolute-centered opaque `w-42px` disc rendering `<bg-black/40 backdrop-blur>`. 
- Nested an inline optimized white SVG triangle path (`strokeLinejoin="round"`) simulating the native play toggle. 

### 3. Checkbox State
- Implemented the explicit "Downloaded & Confirmed" marker: A 20x20 bounding square traced with `#4686EB` containing a heavy-stroke `3.5` `<Check>` mark precisely mimicking the Netflix specific native library marker logic.

### 4. Normalized Universal Bottom Navigation
- Unlike the preceding list grids, this specific leaf node assumes a stabilized state. The "Downloads" tab tabulator active flag is completely clean (`100%` White Opacity without hollow squares or conic notification progress spinners), assuming static payload completion.
