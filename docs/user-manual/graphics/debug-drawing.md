---
title: Debug Drawing
description: Draw wireframe shapes and lines for a single frame with WireRenderer, to visualize what your scene is doing.
---

Some things are hard to debug by reading numbers: whether a bounding box is where you think it is, which way a spline is heading, what a second camera can actually see. Debug drawing lets you put that geometry on screen for a frame so you can look at it.

Everything on this page is **immediate mode**: geometry lasts one frame and is discarded once that frame has been rendered. To keep something visible, issue it again every frame from an update handler.

## WireRenderer

`WireRenderer` draws wireframe shapes. Create one and keep it around:

```javascript
import { Color, Vec3, WireRenderer } from 'playcanvas';

const wire = new WireRenderer(app);

app.on('update', (dt) => {
    wire.color = Color.RED;
    wire.sphere(new Vec3(0, 1, 0), 2);
});
```

### State lives on the renderer

Rather than passing options to every call, the renderer holds the state its shapes use:

| Property | Meaning |
| --- | --- |
| `color` | The color shapes are drawn in. Alpha is respected. |
| `layer` | The layer to draw into, or `null` for the immediate layer. |
| `depthTest` | Whether shapes are hidden by geometry in front of them. |
| `segments` | How many line segments approximate a full circle. |
| `transform` | A matrix applied to every point, or `null`. |

Set it once and draw as much as you like — drawing many shapes with the same state allocates nothing:

```javascript
wire.color = Color.GREEN;

for (const item of items) {
    wire.sphere(item.getPosition(), item.radius);
}
```

A second set of state is simply a second renderer. Instances hold no GPU resources, and instances sharing a layer and depth test mode are drawn together, so using several costs nothing extra:

```javascript
const solid = new WireRenderer(app);

const xray = new WireRenderer(app);
xray.depthTest = false;   // drawn on top of everything
```

`transform` is useful for drawing a group of shapes in some other space. Set it, draw, and every point is transformed on the way out:

```javascript
wire.transform = entity.getWorldTransform();
wire.boxMinMax(localMin, localMax);   // drawn in the entity's space
wire.transform = null;
```

### Shapes

```javascript
wire.line(start, end);
wire.lines(positions, colors);          // Vec3[] pairs, optional Color[] per point
wire.linesPacked(positions, colors);    // packed xyz / rgba numbers, the fastest form
wire.polyline(positions, colors);       // an open strip
wire.loop(positions, colors);           // a closed strip

wire.box(box);                          // BoundingBox or OrientedBox
wire.boxMinMax(min, max);
wire.sphere(center, radius);
wire.circle(center, normal, radius);
wire.cylinder(start, end, radius);
wire.capsule(start, end, radius);
wire.cone(apex, direction, angle, length);
wire.plane(center, normal, size);
wire.point(position, size);
wire.arrow(from, to);
wire.axes(matrix, size);                // red, green and blue for x, y and z
wire.frustum(source);                   // a camera, or a view-projection matrix
wire.light(lightComponent);             // the light's shape and extent, in its own color
```

For the line functions, `colors` is optional. Omit it and the renderer's `color` is used for everything; supply one color per point and each segment fades between its ends.

`linesPacked` takes plain arrays or `Float32Array`s of numbers rather than `Vec3` and `Color` instances, which makes it the cheapest way to submit a lot of geometry. Note that leaving `colors` off is a larger saving than the choice of array type — a uniform color avoids writing a color per vertex entirely.

### Visualizing a camera

`wire.frustum()` draws the volume a camera can see. It works on a camera that is not currently rendering, which is the interesting case — you can fly one camera around while looking through another:

```javascript
wire.color = Color.YELLOW;
wire.frustum(observerEntity.camera);
```

Combined with `Frustum#containsAabb` this makes culling visible:

```javascript
const viewProjection = new Mat4().mul2(observer.camera.projectionMatrix, viewMatrix);
frustum.setFromMat4(viewProjection);

for (const meshInstance of meshInstances) {
    const inside = frustum.containsAabb(meshInstance.aabb);
    (inside ? greenWire : redWire).box(meshInstance.aabb);
}
```

### A note on `plane`

The rotation of the square within its plane is derived from the normal you pass, and no such derivation is continuous over every direction. An animated normal will therefore make the square appear to jump as it passes the direction where that derivation switches. To rotate a square smoothly, pass a fixed normal and drive `transform` instead.

This does not affect `circle`, `cylinder`, `capsule` or `cone`, whose rings are symmetric about their axis.

## Thick lines

Everything above draws single pixel lines, which is what you want for a debugging overlay. For lines that are part of the rendered scene — a highlighted path, a road network, an annotation — use [`WideLineRenderer`](./wide-lines.md) instead. It supports width in screen pixels or world units, caps, joins, dashes and gradients, and it is retained rather than immediate: you add a line once and it stays until you remove it.

## Performance counters

Debug drawing shows you *where* things are. To see how long they take, use [MiniStats](/user-manual/optimization/mini-stats).

## Examples

- [Wire Shapes](https://playcanvas.github.io/#/debug/wire-shapes) — every shape, animated
- [Frustum Culling](https://playcanvas.github.io/#/debug/frustum-culling) — a camera's view volume, and bounds colored by whether it contains them
- [Lines](https://playcanvas.github.io/#/debug/lines) — all of the line functions at once
