# Netflix Core Component: Title Detail View (Page 64)

## Escaping Data Dependency through CSS Synthetic Art
This page demanded heavy graphical assets (a movie poster title logo + a complex 16:9 movie thumbnail). To adhere rigorously to the zero-asset policy, I constructed two major CSS Art assemblies:

1. **SyntheticTitleMark**: Built a `160x50` absolute block heavily exploiting typography (`font-[900]` with tight tracking) nested inside a `backdrop-blur` and pure `bg-[#121212]/90` block to simulate the highly contrasted logo stamp floating over the movie hero background.
2. **BandersnatchCSSThumbnailArt**: Created an incredibly layered `aspect-[16/9]` composition utilizing primitive geometry meshes. I orchestrated synthetic environmental lighting via heavy `blur-[50px] opacity-[0.25]` orange and yellow swatches simulating CRT light splash, built abstract desk furniture utilizing `skew-x`, and finally drew an entire programmer silhouette leveraging pure inline SVG `<path>` vectors representing the focal actor leaning over.

## Modal & Parallax Architecture Sync
- The global layout utilizes a persistent `PrimaryTabBar` component to mirror the app’s macro routing system.
- Above it, a `flex-1 overflow-y-auto` viewport is initiated.
- Within this viewport, I deployed an absolute spatial gradient: `<div className="absolute top-0 w-full h-[320px] bg-gradient-to-b from-[#2E2822] to-[#121212] z-0"></div>` simulating the classic Netflix dark wash fade without needing any underlying JPEG, perfectly shifting the UI into true black lower down the feed structure.
