---
title: Cameras
description: Create cameras, control how they clear the screen, and explore projection, tone mapping, multi-camera rendering, and camera controls.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cameras render your scene to the screen. A camera is simply an entity with a [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) attached — the scene is drawn from the entity's position and orientation, so you aim a camera by moving and rotating its entity just like any other. Cameras look down their local negative Z axis.

You need at least one enabled camera in your scene to see anything. Beyond that single camera, there is a lot you can control: the [projection](projection.md) that maps the 3D scene to a 2D image, the [tone mapping](tone-mapping.md) that shapes the final colors, and how [multiple cameras](multiple-cameras.md) compose views for split-screen, overlays, and render-to-texture.

## Creating a Camera {#creating-a-camera}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Create an entity with a camera component
const camera = new pc.Entity('Camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.3, 0.3, 0.7)
});
app.root.addChild(camera);

// Aim the camera by transforming its entity
camera.setPosition(0, 5, 10);
camera.lookAt(0, 0, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

New scenes are automatically populated with a camera entity. To create another, use the Entity menu, which creates an entity with a [Camera Component](/user-manual/editor/scenes/components/camera) in a single step:

![Camera creation](/img/user-manual/graphics/cameras/camera-create.png)

All camera properties can then be edited in the Inspector.

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="camera" position={[0, 5, 10]}>
  <Camera clearColor="#4d4db3" />
</Entity>
```

See the [`<Camera/>` component reference](/user-manual/react/api/camera) for all available props.

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="camera" position="0 5 10">
  <pc-camera clear-color="0.3 0.3 0.7 1"></pc-camera>
</pc-entity>
```

See the [`<pc-camera>` tag reference](/user-manual/web-components/tags/pc-camera) for all available attributes.

</TabItem>
</Tabs>

## Clearing the Render Target {#clearing}

Before a camera renders the scene, it clears its render target. You can control what gets cleared and to what color:

```javascript
camera.camera.clearColor = new pc.Color(0, 0, 0);

camera.camera.clearColorBuffer = true;   // clear the color buffer (default: true)
camera.camera.clearDepthBuffer = true;   // clear the depth buffer (default: true)
camera.camera.clearStencilBuffer = true; // clear the stencil buffer (default: true)
```

If your scene has a skybox, it covers the clear color entirely. Disabling the clear flags becomes useful when stacking several cameras on top of each other — see [Multiple Cameras](multiple-cameras.md#camera-stacking).

## In This Section

* [Projection](projection.md) — perspective vs orthographic projection, field of view, clip planes and frustum culling.
* [Tone Mapping & Exposure](tone-mapping.md) — map HDR scene lighting to your display, with optional physical exposure controls.
* [Multiple Cameras](multiple-cameras.md) — compose views with priorities, viewports, layers and render targets.
* [Camera Controls](camera-controls.md) — add orbit, fly and first-person navigation with the engine's ready-made script.
* [Screen and World Coordinates](screen-and-world.md) — convert between 2D screen positions and 3D world positions.
* [Scene Picker](scene-picker.md) — accurately select the objects under a screen coordinate.
* [Depth Layer](depth-layer.md) — give shaders access to the scene's color and depth buffers.

## Going Further

* **Post-processing** — bloom, depth of field, SSAO, TAA, vignette and more are applied per camera. See [Post Effects](/user-manual/graphics/posteffects/).
* **AR and VR** — a camera can drive an immersive WebXR session via [`startXr()`](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr). See the [XR section](/user-manual/xr/).
* **Per-camera fog** — override the scene's fog settings on an individual camera with [`fog`](https://api.playcanvas.com/engine/classes/CameraComponent.html#fog).
* **Custom projections** — supply [`calculateProjection`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculateprojection) and [`calculateTransform`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculatetransform) callbacks for advanced effects such as oblique projections and planar reflections.
* **Tutorials** — try [Camera Following a Path](/tutorials/camera-following-a-path) and [Orbit Camera](/tutorials/orbit-camera).
