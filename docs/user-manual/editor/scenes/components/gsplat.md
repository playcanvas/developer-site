---
title: GSplat
description: PlayCanvas GSplat component renders a 3D Gaussian splat asset from the entity and chooses which render layers the splat appears on.
---

The GSplat Component enables an entity to render a 3D Gaussian Splat.

![The GSplat component in the Inspector, with its Asset, Cast Shadows, LOD and Layers fields](/img/user-manual/editor/scenes/components/component-gsplat.webp)

## Properties

| Property | Description |
|----------|-------------|
| Asset    | The [GSplat asset](/user-manual/editor/assets/inspectors/gsplat/) to be rendered by this GSplat Component. Only a single GSplat asset can be assigned to a GSplat Component. |
| Cast Shadows | When enabled, the splat casts shadows for lights that have shadow casting enabled. |
| LOD Range Min | Lowest LOD level used when rendering this Gaussian splat. Integer, minimum 0. |
| LOD Range Max | Highest LOD level used when rendering this Gaussian splat. Integer, minimum 0. |
| LOD Base Distance | The distance from the camera, in world units, at which the splat switches from LOD 0 to LOD 1. Closer than this, it renders at full detail. Minimum 0.1, default 5. |
| LOD Multiplier | How much farther each LOD switch is than the one before. LOD *n* begins at the base distance times the multiplier to the power *n* − 1. Higher values keep finer detail farther from the camera, at a higher memory cost. Minimum 1.2, default 3. |
| Layers   | The [layers](/user-manual/graphics/layers) to render this element into. |

The LOD distances are compensated for the camera's field of view: with a wider field of view, the splat looks smaller on screen, so it switches to coarser levels sooner.

:::note

**The LOD fields only have an effect on streamed SOG octrees.** The LOD level is clamped to the number of levels the asset actually has, and a single `.sog` or `.ply` file is a single level — the fields are still shown, but changing them does nothing.

:::

<video autoPlay muted loop controls src='/video/editor-gsplat-lod-launch.mp4' style={{width: '100%', height: 'auto'}} />

*Splat scene: Trogir, Croatia by tosolini, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*

Scene-wide Gaussian splat behaviour, including the global splat budget these LOD settings work within, is configured in [Rendering Settings](/user-manual/editor/interface/settings/rendering#gaussian-splatting). Its **Splat Budget Mode** sets what the LOD distances do:

- **Target**, the default: detail rises until the splat budget is used up, wherever the camera is. The LOD distances only shape how detail falls off with distance and how it divides between splats.
- **Limit**: the LOD distances decide the detail, and the budget only lowers it to fit.

## See Also

- [GSplat Asset](/user-manual/editor/assets/inspectors/gsplat/) - The splat data the component renders, and the file formats you can import
- [Gaussian Splatting](/user-manual/gaussian-splatting) - Learn more about 3D Gaussian Splats
- [Rendering Settings](/user-manual/editor/interface/settings/rendering#gaussian-splatting) - Scene-wide Gaussian splat settings

## Scripting Interface

You can control a GSplat Component's properties using a [Script Component](script.md). The GSplat Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/GSplatComponent.html).
