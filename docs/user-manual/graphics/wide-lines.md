---
title: Wide Lines
description: Render thick lines with caps, joins, dashes and gradients using WideLineRenderer, for paths, annotations and other line geometry that is part of your scene.
---

WebGL and WebGPU can only draw lines one pixel wide. `WideLineRenderer` works around that by rendering each segment as camera-facing geometry, giving you lines with real thickness, rounded ends, mitred corners, dashes and colour gradients.

Use it for line geometry that is part of the rendered scene — a highlighted route, a road network, a measurement annotation, a trajectory. For single pixel wireframes used to inspect a scene while developing, see [Debug Drawing](./debug-drawing.md) instead.

## Lines and renderers

There are two pieces. A `WideLine` holds the point data for one line. A `WideLineRenderer` owns a set of lines and draws them:

```javascript
import { LINECAP_ROUND, LINEJOIN_ROUND, WideLine, WideLineRenderer } from 'playcanvas';

const renderer = new WideLineRenderer(app);
const line = new WideLine();

line.set(
    new Float32Array([-2, 0, 0, 0, 1, 0, 2, 0, 0]),   // three points, packed xyz
    new Float32Array([1, 0, 0, 1, 1, 0, 0, 1, 1]),    // a colour per point, packed rgb
    new Float32Array([4, 12, 4])                       // a width per point
);
line.cap = LINECAP_ROUND;
line.join = LINEJOIN_ROUND;

renderer.add(line);

app.on('destroy', () => renderer.destroy());
```

Unlike debug drawing, this is **retained**: add a line once and it stays until you `remove()` it. There is no need to reissue it every frame.

Colours and widths can each be given per point, or as a single value used by every point.

## Styling a line

These are properties of the `WideLine`, so each line in a renderer can look different:

| Property | Purpose |
| --- | --- |
| `cap` | How the ends are finished — `LINECAP_BUTT`, `LINECAP_ROUND` or `LINECAP_SQUARE`. |
| `join` | How corners are joined — `LINEJOIN_MITER`, `LINEJOIN_BEVEL` or `LINEJOIN_ROUND`. |
| `closed` | Joins the last point back to the first. |
| `dashLength`, `gapLength` | Dash pattern. Leave `dashLength` at zero for a solid line. |
| `dashOffset` | Shifts the dash pattern along the line, for marching-ants effects. |

## Updating point data

`setPositions`, `setColors` and `setWidths` each replace their data while keeping the point count, reusing the line's existing storage:

```javascript
line.setPositions(updatedPositions);
```

Use `set()` when the number of points itself needs to change.

## Renderer settings

| Property | Purpose |
| --- | --- |
| `widthUnits` | `LINEWIDTH_SCREEN` (default) measures width in screen pixels, so lines keep their thickness at any distance. `LINEWIDTH_WORLD` measures in world units, so they shrink with distance like geometry. |
| `layer` | The layer to render into. Defaults to the Immediate layer. |
| `depthTest`, `depthWrite` | Interaction with the depth buffer. Both default to true. |
| `enabled` | Turns the whole renderer off. |
| `capacity` | Instance buffer size, measured in segments. |

## Performance

Every segment owned by a renderer is drawn as one GPU instance, and all of them are submitted together — so adding more `WideLine` objects does not add draw calls. A renderer with visible segments costs one draw call per camera that renders its layer.

The trade-off is that **changing any line rebuilds the instance data for every line that renderer owns.** So mixing rarely-changing and frequently-changing lines in one renderer makes the static data rebuild needlessly. There is no static/dynamic flag; you separate them with two renderers:

```javascript
const staticLines = new WideLineRenderer(app);
const dynamicLines = new WideLineRenderer(app);

staticLines.add(roadNetwork);       // built and uploaded once
dynamicLines.add(projectilePath);   // updated every frame
```

`capacity` grows automatically, but setting it up front avoids GPU buffer reallocations when you know the maximum segment count. `clear()` removes the lines while keeping the capacity for reuse.

The batch is not frustum culled, so set `enabled` to `false` when none of its lines need drawing.

## Limitations

- **Rendering is opaque.** Colours are rgb; the alpha component of a `Color` is ignored and transparent lines are not supported.
- Call `destroy()` to release the mesh, material and instance buffer. Lines detached this way remain usable and can be added to another renderer.

## Examples

- [Wide Line](https://playcanvas.github.io/#/graphics/wide-line)
- [Wide Lines Styles](https://playcanvas.github.io/#/graphics/wide-lines-styles) — caps, joins, dashes and gradients side by side
- [Wide Lines Dynamic](https://playcanvas.github.io/#/graphics/wide-lines-dynamic) — updating point data every frame
