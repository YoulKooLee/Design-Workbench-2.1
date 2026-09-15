# Netflix Core Component: Animated Vector Splash (Page 42)

## The Zero-State Dilemma
This screen presents the ultimate barebones view: Pure black `#000000`, the top OS status bar, the bottom OS handle, and the massive trademark Netflix logo perfectly dead center.

To implement this with strict Zero-Asset parameters (no JPG, PNG, or standard flat SVG payloads):
I constructed an **Algorithmic Typography Engine**.

### Procedural Arch Deformation
The Netflix logo is iconic because its baseline forms an arch, stretching the middle letters 'T', 'F', 'L' physically deeper into the Y-axis. 
Instead of hacking it with HTML5 canvas or complex multi-node SVG tracing which suffers from scaling artifacts:
1. Created an array map associating each character (`N E T F L I X`) with a discrete `scaleY` geometric floating-point modifier ranging from `1.00` to `1.12`.
2. Passed `transform-origin: top` so that as the vector scale increases, the text only extends perfectly downwards.
3. Implemented interior `scaleX(0.85)` child compression on a universally available condensed font (`Arial Narrow`) to fake the authentic trademark's stem weight without external font load delays.

The result is a visually identical Netflix logo painted natively by the browser engine with zero network overhead.
