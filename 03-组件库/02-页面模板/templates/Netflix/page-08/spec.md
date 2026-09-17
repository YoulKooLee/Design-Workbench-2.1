# Netflix Downloads Normal View (Page 08)

## Overview
Replication of the primary Netflix "Downloads" module tab in its natural, non-editing state. Compared to `page-05`, this captures standard list rendering and the concept of an asynchronous downloaded "Queued" row.

## Technical Details

### 1. Header Infrastructure
- Employs the identical upper structure as the edit mode, but toggles the primary interactive control from the explicit `"Done"` string to an iconic `<Pencil>` SVG to denote an available entry into Edit Mode.

### 2. State Mapping (Queued vs Completed)
- **Queued State (Black Mirror)**: Demonstrates handling of a multi-line asynchronous state. The secondary subtext displays `Queued` in bright Netflix Blue (`#4686EB`) while suppressing file size footprint data since the asset isn't fully localized yet.
- **Completed Object (Bodyguard)**: Static standard size marker (`177.6 MB`) returns to grey standard.

### 3. Hollow Badge Notification
- The bottom navigation dynamically mirrors the top list state. When items are queued (but not actively downloading at high velocity as seen in `page-06`), the `Downloads` tab notification badge shifts from a solid/conic pie representation to a hollow outlined ring (`border-[1.5px] border-[#4686EB]`) nesting cleanly inside a background-clip matte.
