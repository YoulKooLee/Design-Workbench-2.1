# Netflix Core Component: Manage Profiles View (Page 59)

## Modality Context
Screenshot `059.png` reveals the true Active Route for the "Edit Workspace" underlying the heavy input modal from the previous screen (`058.png`). 

1. **Information Density Erasure**: The enormous `Who's Watching?` header from `page-57` was deliberately ripped out in this view. This forces the flex-grid `<div className="flex flex-wrap">` to naturally slide up the Y-axis. We explicitly managed this positioning by tuning `pt-[130px]` to retain exactly mapped coordinates matching the layout shift.
2. **Global Navigation Absolute Centering**:
   - The `<div className="absolute inset-0 flex justify-center pointer-events-none">` paradigm was utilized to force `Manage Profiles` to stay mathematically in the absolute horizontal center of the viewport screen, regardless of the dynamic length of the `Done` button anchoring to the left edge. 

## The Edit Mask (High Order Component Wrapper)
To efficiently darken the avatars and stamp the Pencil vector over them, we engineered the `<EditActionNode>` Higher Order container.
- It intercepts any SVG graphic passed via `children`.
- It slams a `absolute inset-0 bg-[#000]/55` dimming box over the child.
- It dynamically draws the geometric outlined SVG Pencil centrally via flex alignment (`strokeLinecap="square"`).
- Crucially, we bypassed this wrapper for the **`Add Profile`** command circular button to guarantee it remains vividly rendered and operable, accurately reflecting Netflix's routing protocol.
