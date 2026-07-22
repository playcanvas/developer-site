---
title: GSplat
description: PlayCanvas GSplat component renders a 3D Gaussian splat asset from the entity and chooses which render layers the splat appears on.
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Add or remove GSplat Components, configure their properties on entities, and launch or capture the scene to verify them.

:::

The GSplat Component enables an entity to render a 3D Gaussian Splat.

![GSplat Component](/img/user-manual/editor/scenes/components/component-gsplat.png)

## Properties

| Property | Description |
|----------|-------------|
| Asset    | The GSplat asset to be rendered by this GSplat Component. Only a single GSplat asset can be assigned to a GSplat Component. |
| Cast Shadows | When enabled, the splat casts shadows for lights that have shadow casting enabled. |
| LOD Base Distance | The distance of the first LOD transition (from LOD 0 to LOD 1). Splats closer than this distance use the highest quality LOD, and each subsequent LOD level transitions at a progressively larger distance (scaled by LOD Multiplier). Defaults to 5. |
| LOD Multiplier | The geometric multiplier between successive LOD distance thresholds. Lower values keep higher quality at greater distances; higher values switch to coarser LODs sooner. Defaults to 3. |
| Layers   | The [layers](/user-manual/graphics/layers) to render this element into. |

## See Also

- [Gaussian Splatting](/user-manual/gaussian-splatting) - Learn more about 3D Gaussian Splats

## Scripting Interface

You can control a GSplat Component's properties using a [Script Component](script.md). The GSplat Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/GSplatComponent.html).
