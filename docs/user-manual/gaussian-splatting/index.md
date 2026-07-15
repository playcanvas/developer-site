---
title: Gaussian Splatting
description: "Overview of 3D Gaussian Splatting in PlayCanvas: capture, viewing, editing, and building web apps with photorealistic splat scenes."
---

3D Gaussian Splatting is a revolutionary technique for capturing, representing, and rendering photorealistic 3D scenes. Unlike traditional polygonal meshes, Gaussian Splatting uses millions of small, semi-transparent elliptical splats to reconstruct detailed environments with exceptional visual fidelity.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cLkf99ZV/" title="360 lookaround camera" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## What Makes Gaussian Splatting Special?

Gaussian Splatting excels at capturing real-world environments through photogrammetry, making it incredibly quick and affordable to generate high-quality 3D content. The technique is particularly powerful for:

- **Photorealistic environments** - Capture real locations with stunning visual detail
- **Rapid content creation** - Generate complex 3D scenes from simple photo/video capture
- **Volumetric representation** - Handle translucent materials, fine details, and complex lighting naturally
- **Real-time rendering** - Optimized for interactive frame rates in web browsers

## 3DGS in the Real World

Developers are using PlayCanvas to deliver Gaussian Splat experiences across a growing range of industries:

- **Retail and e-commerce** - Interactive product visualization for [2nd Swing](https://www.2ndswing.com/golf-clubs/drivers/ping-g440-max-driver/g440-max-dvr) and [Nood](https://nood.co.nz/pages/interactive-lounge), plus Shopify-ready product capture with [Doly](https://www.animl.ai/)
- **Property and virtual tours** - Real estate showcases from [Mind Studio](https://studio.adnfamily.com/maquette-immersive) and video-to-3D tours from [SplatTour](https://splattour.com/)
- **Culture and heritage** - Digital access to significant places through [CyArk](https://www.cyark.org/projects/civita-antigravity/overview) and the [Montreal Museum of Fine Arts](https://labs.dpt.co/article-3dgs.html)
- **Film and content production** - Virtual scouting with [Prewatch](https://www.prewatch.io/) and reusable digital twins from [Solaya](https://solaya.ai/)
- **Geospatial and environmental documentation** - Satellite-derived urban scenes from [Skyfall-GS](https://skyfall-gs.jayinnn.dev/) and coral reef scanning by [Wildflow](https://wildflow.ai/)
- **Social experiences and storytelling** - Shared 3D memories with [Braintrance](https://www.braintrance.net/) and interactive narratives from [StorySplat](https://storysplat.com/)

Explore many more projects in the [3D Gaussian Splatting section of Awesome PlayCanvas](https://github.com/playcanvas/awesome-playcanvas#3d-gaussian-splatting).

## PlayCanvas Gaussian Splatting Workflow

PlayCanvas provides a complete ecosystem for working with Gaussian Splats:

1. **[Creating Splats](creating)** - Methods for creating your own splat data
2. **[Viewing Splats](viewing)** - Preview and evaluate splats using the PlayCanvas Model Viewer
3. **[Editing and Publishing Splats](editing)** - Clean up, optimize, publish, and curate splats on the [SuperSplat](/user-manual/supersplat/) platform (Editor, Studio, Viewer, Convert) or via the [splat-transform CLI](/user-manual/splat-transform/)
4. **[Building Splat-based Apps](building)** - Integrate splats into your PlayCanvas projects
