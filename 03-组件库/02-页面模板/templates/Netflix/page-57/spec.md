# Netflix Core Component: Profile Selection Gateway (Page 57)

## Algorithmic Auto-Layout Topology
Screenshot `057.png` isolates the absolute foundational UX gatekeeper: `Who's Watching?`. 

We rejected a hard-coded absolute `row` map in favor of a robust React/Tailwind `<div className="flex flex-wrap max-w-[320px]">` grid architecture.
By limiting the container width forcing only two `110px` avatars per line, the "Add Profile" node elegantly triggers a line break, mathematically seating itself dead-center in the second row via the parent's `justify-center` directive. This provides a resilient framework identical to Netflix production code which seamlessly updates regardless of 1, 3, or 5 user instances.

## Procedural Avatar Engine (Zero-Asset Strategy)
To completely bypass graphic dependencies, the specific Netflix profile headshots were encoded directly into executable mathematical SVGs:
1. **`<JihoAvatarSVG/>`**: The Angry Red mask. 
   - Constructed by sandwiching an `#EFC71C` rectangular skin block against a core `#E50914` background. 
   - Executed angular eye cutouts utilizing `polygon points="12,46 42,52..."` bounding logic, with a downward-slicing central 'V' mask vector.
2. **`<MobbinAvatarSVG/>`**: The Green Mummy/Ninja.
   - Deployed `<path d="... Q50,62 -5,42">` curved bezier splines to cast overlapping white bandages across the `#3B9E73` skin tone.
   - We engineered the pupil logic perfectly by anchoring pure black half-circles (`<path d="M 28 62 A 3.5 3.5 0 0 0... Z">`) directly onto the eyelid crease coordinates, synthesizing the lazy/bored facial expression flawlessly.
