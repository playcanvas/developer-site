---
title: Post Effects
description: "Apply sharpness, bloom, color grading, vignette, fringing, tonemapping, and high-precision rendering to a published splat in SuperSplat Studio."
---

The **Post Effects** panel in [Studio](/user-manual/supersplat/studio/) controls the look of your scene after the splat is rendered. Effects are evaluated per-frame in the viewer; each section has an enable toggle plus its own parameters.

The panel also contains two related global controls: a **Tonemapping** dropdown that shapes how high-dynamic-range output maps to display intensity, and a **High Precision Rendering** toggle that switches the viewer to a more accurate (but more expensive) rendering pipeline.

{/* TODO: media — /img/user-manual/supersplat/studio/post-effects-panel.png — the Post Effects panel expanded */}

## Effect sections

### Sharpness

| Field | Description |
|-------|-------------|
| **Enabled** | Master toggle. |
| **Amount** | Strength of the sharpening filter. |

Good for recovering perceived detail on dense splat captures.

### Bloom

| Field | Description |
|-------|-------------|
| **Enabled** | Master toggle. |
| **Intensity** | How strong the bloom glow appears. |
| **Blur level** | Size of the bloom kernel — larger values produce a softer, broader glow. |

Adds a glow to bright regions of the scene.

### Grading

Color grading applies a global transform to the image.

| Field | Description |
|-------|-------------|
| **Enabled** | Master toggle. |
| **Brightness** | Overall brightness lift. |
| **Contrast** | Tone separation between dark and light. |
| **Saturation** | Color intensity (`0` is grayscale). |
| **Tint** | An RGB color blended into the image — useful for warm/cool grades. |

### Vignette

| Field | Description |
|-------|-------------|
| **Enabled** | Master toggle. |
| **Intensity** | Strength of the corner darkening. |
| **Inner** | Radius at which the vignette starts. |
| **Outer** | Radius at which the vignette reaches full strength. |
| **Curvature** | Shape of the vignette falloff. |

### Fringing

| Field | Description |
|-------|-------------|
| **Enabled** | Master toggle. |
| **Intensity** | Strength of the chromatic aberration effect at frame edges. |

## Tonemapping

A dropdown that picks how the renderer maps HDR output to the display:

| Value | Notes |
|-------|-------|
| `linear` (default) | No tonemapping curve — output is linear. |
| `none` | Pass-through with no scaling. |
| `filmic` | Classic film-emulating curve. |
| `hejl` | Hejl-Burgess-Dawson curve. |
| `aces` | ACES filmic curve. |
| `aces2` | ACES variant with rolled-off highlights. |
| `neutral` | Khronos Neutral tonemap. |

## High Precision Rendering

A toggle (default **off**) that enables a more accurate rendering path. Useful when bright highlights, fine color grading, or post-effects show banding in the default path — at the cost of more GPU work per frame.

## See also

- [Skybox](/user-manual/supersplat/studio/skybox) — background color and skybox image
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores post-effect settings
