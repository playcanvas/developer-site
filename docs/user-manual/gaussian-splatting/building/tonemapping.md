---
title: Tonemapping and Exposure
description: "How the camera tone curve, scene exposure and fog affect Gaussian splats, and how to opt splats out with Scene.gsplat.useTonemap and Scene.gsplat.useFog."
---

Gaussian splats store their color per Gaussian, and that color is used as-is: splats are unlit, so lights, ambient light and the environment map have no effect on them.

Their **output** color is still processed like any other object though. Before a splat pixel reaches the framebuffer it goes through the camera's tone curve, the scene exposure and, when enabled, fog. This means that changing [`Scene.exposure`](https://api.playcanvas.com/engine/classes/Scene.html#exposure) or the camera's [`toneMapping`](https://api.playcanvas.com/engine/classes/CameraComponent.html#tonemapping) to grade the lit content of your scene also changes how the splats look.

If your capture is already graded at its final brightness, you can take the splats out of that pipeline.

## Disabling Tonemapping and Exposure

Set [`Scene.gsplat.useTonemap`](https://api.playcanvas.com/engine/classes/GSplatParams.html#usetonemap) to `false`:

```javascript
// splats keep their stored colors, regardless of camera tonemapping and scene exposure
app.scene.gsplat.useTonemap = false;
```

This skips both the tone curve and the exposure multiplier for splats only. Every other object in the scene keeps using them, so you can keep grading your meshes, lights and sky while the splats stay fixed.

Some uses:

- **Pre-graded captures**: the capture was already color-graded to its final look and should not be re-tonemapped.
- **Exposure animation**: you want to brighten or darken the lit content — a day/night cycle, an exposure ramp — without the splats drifting with it.
- **Matching a reference**: comparing a render against the source capture or another viewer, where any tone curve is an unwanted difference.

:::warning

With tonemapping disabled, splats no longer share the tone response of the rest of the scene. Bright values are no longer rolled off by the tone curve, so they clip rather than compress, and splats sitting next to tonemapped meshes can look inconsistent. In scenes that mix splats with lit geometry, it is usually better to leave this enabled and adjust the capture instead.

:::

## Disabling Fog

Fog has its own switch, [`Scene.gsplat.useFog`](https://api.playcanvas.com/engine/classes/GSplatParams.html#usefog):

```javascript
// splats ignore scene and camera fog settings
app.scene.gsplat.useFog = false;
```

The two switches are independent. With `useTonemap` set to `false` and fog left enabled, splats are still fogged — fog is applied in linear space and the result is encoded back to the output color space, just without the tone curve and exposure.

## What Affects Splat Color

| Setting | Applies to splats | How to opt out |
| --- | --- | --- |
| [`Scene.exposure`](https://api.playcanvas.com/engine/classes/Scene.html#exposure) | Yes | `Scene.gsplat.useTonemap = false` |
| [`CameraComponent.toneMapping`](https://api.playcanvas.com/engine/classes/CameraComponent.html#tonemapping) | Yes | `Scene.gsplat.useTonemap = false` |
| Scene or camera fog | Yes | `Scene.gsplat.useFog = false` |
| Output color space (gamma encoding) | Yes | Not optional — determined by the render target |
| Lights, ambient light, environment map | No | Splats are unlit; see [Relighting](/user-manual/gaussian-splatting/building/relighting) |

:::note

Both flags live on [`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat), so they apply to every splat in the scene. To change the color of individual splats or of one GSplat component, use [Custom Shaders](/user-manual/gaussian-splatting/building/custom-shaders) instead.

:::

## See Also

- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [GSplatParams API](https://api.playcanvas.com/engine/classes/GSplatParams.html)
- [Relighting](/user-manual/gaussian-splatting/building/relighting)
- [Custom Shaders](/user-manual/gaussian-splatting/building/custom-shaders)
