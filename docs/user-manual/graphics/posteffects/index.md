---
title: Post Effects
description: Add HDR post-processing with CameraFrame, and migrate deprecated legacy script effects to it.
---

PlayCanvas supports adding post-processing effects to your projects. Post effects modify the final rendered image and provide an easy way to add visual flair to your application.

PlayCanvas offers two approaches to post-processing. Use `CameraFrame` for all new work. The legacy script-based post effects are deprecated.

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

## Legacy Post Effects (Deprecated)

The legacy approach uses script-based post effects that are attached to camera entities and added to the camera's `postEffects` queue. This approach is deprecated. The effects still work, but adding one logs a deprecation warning in the debug build of the engine, and they will be removed in a future major version. Replace them with the equivalent `CameraFrame` effects, as listed in [Migrating to CameraFrame](legacy#migrating-to-cameraframe).

**Legacy effects:**

- Bloom
- Brightness-Contrast
- Hue-Saturation
- FXAA
- Sepia
- Vignette

[Learn more about Legacy Post Effects →](legacy)
