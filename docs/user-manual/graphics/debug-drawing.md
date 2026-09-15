---
title: Debug Drawing
description: Draw wireframe shapes and preview textures or scene depth with WireRenderer and TextureRenderer.
---

Some things are hard to debug by reading numbers: whether a bounding box is where you think it is, which way a spline is heading, what a second camera can actually see. Debug drawing lets you display shapes and texture previews on screen so you can inspect them.

`WireRenderer` and `TextureRenderer` draw for a single frame. To keep a shape or preview visible, submit it again every frame from an update handler.

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

## TextureRenderer

[`TextureRenderer`](https://api.playcanvas.com/engine/classes/TextureRenderer.html) displays textures on screen for debugging. Create one and submit the previews you want to see each frame:

```javascript
import { TextureRenderer } from 'playcanvas';

const textures = new TextureRenderer(app);

app.on('update', () => {
    textures.draw(texture, 0.7, 0.7, 0.25, 0.25);
});
```

The arguments to `draw` are the texture, left edge, top edge, width and height. Coordinates are relative to the rendering camera's viewport: `(0, 0)` is top-left, `(1, 1)` is bottom-right, and a width or height of `1` spans the viewport. Negative sizes flip the preview about its starting edge.

### Preview settings

Like `WireRenderer`, settings apply to subsequent draw calls:

| Property | Meaning |
| --- | --- |
| `layer` | Destination layer, or `null` for the application's default debug drawing layer, normally Immediate. |
| `channels` | Three characters from `r`, `g`, `b` and `a`. Defaults to `'rgb'`, which displays decoded color. |

Previews are opaque and do not test or write depth. Use a layer rendered after the scene and skybox so later drawing does not cover them. The displaying camera must include that layer. When previewing a render target, exclude the preview layer from the camera producing the texture to avoid reading and writing the same texture at once.

For render-target textures, use [`RENDERTARGET_ORIGIN_TOP`](./advanced-rendering/render-targets.md#orientation) on the render target for consistent orientation across WebGL2 and WebGPU.

### Inspecting channels

With `'rgb'`, the renderer automatically decodes the texture's color encoding. Other selections show stored channel values without color decoding, with values from `0` to `1` mapping directly from black to white. For example, `'rrr'` shows red as grayscale, `'aaa'` shows alpha, and `'bgr'` swaps red and blue. The preview itself remains opaque, including when inspecting alpha.

You can display the same texture in multiple ways during one update:

```javascript
textures.channels = 'rgb';
textures.draw(texture, 0.05, 0.05, 0.25, 0.25);
textures.channels = 'aaa';
textures.draw(texture, 0.35, 0.05, 0.25, 0.25);
```

Channel selection is captured by each draw call and remains set until you change it. Set it back to `'rgb'` when you want decoded color again. Depth textures and `sceneDepth` ignore channel selection and always display grayscale.

### Scene depth

`sceneDepth` displays the rendering camera's depth, linearized and normalized by its far clip distance. Enable [scene depth capture](./cameras/depth-layer.md) on the camera and render the preview layer after the capture:

```javascript
import { TextureRenderer } from 'playcanvas';

// camera is an entity with a camera component.
camera.camera.requestSceneDepthMap(true);
const textures = new TextureRenderer(app);

app.on('update', () => {
    textures.sceneDepth(0.7, 0.7, 0.25, 0.25);
});
```

Passing a depth texture to `draw` instead shows its raw depth values without camera-dependent linearization.

### Supported textures

- **2D color:** normalized, floating-point and device-supported compressed formats. The default `'rgb'` selection handles linear, sRGB, RGBM, RGBE and RGBP color automatically.
- **2D depth:** `PIXELFORMAT_DEPTH`, `PIXELFORMAT_DEPTH16` and `PIXELFORMAT_DEPTHSTENCIL`.

Textures must belong to the same graphics device as the application. Cube, volume, array, integer and multisampled textures are not supported.

On WebGL2, raw depth textures must have comparison sampling disabled. Raw depth and non-filterable float textures also require nearest minification and magnification filters. WebGPU can display these textures regardless of their filtering and comparison sampler settings.

### Cleanup

Stop submitting a preview to hide it on the next frame. Call `textures.destroy()` when you no longer need the renderer; it also releases its resources automatically when the application is destroyed. The textures you pass remain yours to manage and are never destroyed by the renderer.

## Thick lines

`WireRenderer` draws single pixel lines, which is what you want for a debugging overlay. For lines that are part of the rendered scene — a highlighted path, a road network, an annotation — use [`WideLineRenderer`](./wide-lines.md) instead. It supports width in screen pixels or world units, caps, joins, dashes and gradients, and it is retained rather than immediate: you add a line once and it stays until you remove it.

## Performance counters

Debug drawing shows you *where* things are. To see how long they take, use [MiniStats](/user-manual/optimization/mini-stats).

## Examples

<EngineExample id="debug/texture-renderer" title="Texture Renderer" />

- [Wire Shapes](https://playcanvas.github.io/#/debug/wire-shapes) — every shape, animated
- [Frustum Culling](https://playcanvas.github.io/#/debug/frustum-culling) — a camera's view volume, and bounds colored by whether it contains them
- [Lines](https://playcanvas.github.io/#/debug/lines) — all of the line functions at once
