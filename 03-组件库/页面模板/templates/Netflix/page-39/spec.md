# Netflix Core Component: Deep-Scroll Episodes Array (Page 39)

## Tab Router Transition Visual Mock
This specific frame captures a critical UX milestone: scrolling directly to the boundary where the Global Route Navigation Tabs lie exactly underneath the static Modal Header.

### 1. Depth Mask Truncation (`Ghost Row`)
In the original OS runtime, dragging the screen upwards forces the Action Bar (`My List`, `Rate`, `Share`) underneath the blurred `backdrop-blur-md` top header. To recreate this 1:1 state statically without enforcing heavy viewport JS calculations, I engineered a highly-specific "Ghost Row" layout pattern:
- Formed the `text-[#3A3A3A]` strings mimicking the bottom halves of the Action components.
- The severe dark contrast combined with clipping logic forces the brain to interpret physical layering (the visual queue that the icons have scrolled entirely out of view underneath the black header shield).

### 2. Tab Navigation Anchor Alignment 
Restored the red `#E50914` internal App Router flag.
Configured it strictly to ride the top bound (`absolute top-0 inset-x-[0px]`) overlapping the native `<div className="absolute top-[0px] w-full h-[1px] bg-[#333333]"></div>` border, matching 100% with the frame's pixel structure. 

### 3. Reset Global Network States
Wiped all temporary downloading props mapping (`isDownloading`, `progress()`).
- All `Download` components inside `<EpisodeRow />` reverted to standard `stroke-[#C0C0C0]` vector line rendering.
- Re-initialized the `Downloads` generic bottom tab by detaching the internal `<div className="bg-[#0A84FF]">` background task monitoring badge, cleaning the global UI layer completely.
