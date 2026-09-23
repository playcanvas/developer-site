# Render on Demand

For scenes that are often static — a product viewer, a configurator, an inspection tool — you don't need to redraw every frame. PlayCanvas can render **on demand**: set [`app.autoRender`](https://api.playcanvas.com/engine/classes/AppBase.html#autorender) to `false` and only draw a frame when something actually changes, by setting [`app.renderNextFrame`](https://api.playcanvas.com/engine/classes/AppBase.html#rendernextframe). An idle scene then leaves the GPU idle. See [Render on Demand](https://developer.playcanvas.com/user-manual/optimization/guidelines.md) in the optimization guidelines for the general technique.

Gaussian splats add one wrinkle: a large [streamed scene](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md) keeps loading data and adjusting level of detail in the background. That work is **decoupled from rendering** — it runs every frame whether or not a frame is drawn — so the scene keeps streaming in while the app sits idle. The splat system tells you when that background work has produced something new worth drawing, via the `frame:request` event.

## The basic pattern

Disable automatic rendering and render whenever the splat system asks for it:

```javascript
app.autoRender = false;

app.systems.gsplat.on('frame:request', () => {
    app.renderNextFrame = true;
});
```

`frame:request` is fired once per frame, before rendering, whenever splat streaming has produced new data a render would show (newly streamed detail) or an asynchronous sort result is ready to be applied. Handling it keeps a streaming scene converging to full detail without rendering every frame in between.

## What raises `frame:request`, and what you render yourself

`frame:request` covers **changes to the splat data itself** — the engine raises it for you. Changes that only affect how the *current* scene is presented do not, so you request those renders yourself:

| Change | Raises `frame:request`? |
| --- | --- |
| Streaming progress (LOD detail loading in) | Yes — handled for you |
| Splat budget, LOD distances / range | Yes — handled for you |
| Camera movement | No — render it yourself |
| Canvas / viewport resize | No — render it yourself |
| Material parameters (e.g. alpha clipping) | No — render it yourself |
| Shader animation (e.g. an animated reveal effect) | No — render it yourself |
| Adding or removing a splat, camera, or layer | No — render it yourself |

For anything in the "render it yourself" rows, set `app.renderNextFrame = true` when you make the change. For example, to keep a fly/orbit camera interactive, render whenever it has moved:

```javascript
const lastPos = new pc.Vec3();
const lastRot = new pc.Quat();

app.on('update', () => {
    const pos = camera.getPosition();
    const rot = camera.getRotation();
    if (!pos.equals(lastPos) || !rot.equals(lastRot)) {
        app.renderNextFrame = true;
        lastPos.copy(pos);
        lastRot.copy(rot);
    }
});
```

:::note
Adding or removing cameras, layers, or gsplat components only registers on a **rendered** frame, so make sure at least one frame is rendered after such a change. This is why an app should keep rendering normally while the scene first loads (see below), and only switch to on-demand rendering once it is up and running.
:::

## Combining with fast time to first frame

On-demand rendering pairs naturally with the [fast time to first frame](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance.md#fast-time-to-first-frame) technique. While the scene is loading (and while any intro/reveal animation plays) you want to render every frame, then switch to on-demand once everything is in place:

1. Leave `app.autoRender = true` while the scene loads its first frames.
2. Wait for the splat system's `frame:ready` event to report that the scene is fully loaded, sorted and drawn.
3. Switch to `app.autoRender = false` and drive rendering from `frame:request` plus your own camera / resize / setting changes.

```javascript
const gsplatSystem = app.systems.gsplat;

const onFrameReady = (camera, layer, ready, loadingCount) => {
    if (ready && loadingCount === 0) {
        gsplatSystem.off('frame:ready', onFrameReady);

        // the scene is fully shown — switch to on-demand rendering from here
        app.autoRender = false;
    }
};
gsplatSystem.on('frame:ready', onFrameReady);

gsplatSystem.on('frame:request', () => {
    app.renderNextFrame = true;
});
```

`frame:ready` and `frame:request` are complementary: `frame:ready` tells you when a *rendered* frame is fully sorted and complete (useful for the initial display, and for capture workflows), while `frame:request` tells you when there is new streamed data worth drawing.

## Live example

This example renders a single (non-streamed) splat on demand: it stops drawing once the splat is shown and only renders again when the camera moves, the window resizes, or a setting changes.

[Live example: Simple (On Demand)](https://playcanvas.com/examples/#/gaussian-splatting/simple-on-demand) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/gaussian-splatting/simple-on-demand.example.mjs))

## See also

- [Render on Demand (general)](https://developer.playcanvas.com/user-manual/optimization/guidelines.md)
- [Performance](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance.md) and [Fast Time to First Frame](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/performance.md#fast-time-to-first-frame)
- [LOD Streaming](https://developer.playcanvas.com/user-manual/gaussian-splatting/building/lod-streaming.md)
- [GSplatComponentSystem API](https://api.playcanvas.com/engine/classes/GSplatComponentSystem.html)
