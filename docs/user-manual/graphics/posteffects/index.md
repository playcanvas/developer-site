---
title: Post Effects
---

PlayCanvas supports adding post-processing effects to your projects. Post effects modify the final rendered image and provide an easy way to add visual flair to your application.

PlayCanvas offers two approaches to post-processing:

## Modern Post Processing

The modern approach provides advanced, performant post-processing with HDR support and extensibility. The primary method uses the `CameraFrame` class with built-in effects, but you can also create fully custom render passes for complete control.

**Key features include:**
- HDR physically based bloom
- Screen Space Ambient Occlusion (SSAO)
- Depth of Field (DoF)
- Temporal Anti-Aliasing (TAA)
- Color grading and LUT support
- Vignette and fringing effects
- And more...

The system is highly extensible, allowing you to customize the compose shader, add custom render passes, or build a complete custom pipeline.

[Learn more about Modern Post Processing →](cameraframe)

## Legacy Post Effects (Script-Based)

The legacy approach uses script-based post effects that can be attached to camera entities. While older, these effects are still fully supported and functional. They provide a simpler setup for basic post-processing needs.

**Available effects:**
- Bloom
- Brightness-Contrast
- Hue-Saturation
- FXAA
- Sepia
- Vignette

[Learn more about Legacy Post Effects →](legacy)
