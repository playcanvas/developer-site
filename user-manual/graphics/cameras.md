# Cameras

Cameras render your scene to the screen. A camera is simply an entity with a [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) attached — the scene is drawn from the entity's position and orientation, so you aim a camera by moving and rotating its entity just like any other. Cameras look down their local negative Z axis.

You need at least one enabled camera in your scene to see anything. Beyond that single camera, there is a lot you can control: the [projection](https://developer.playcanvas.com/user-manual/graphics/cameras/projection.md) that maps the 3D scene to a 2D image, the [tone mapping](https://developer.playcanvas.com/user-manual/graphics/cameras/tone-mapping.md) that shapes the final colors, and how [multiple cameras](https://developer.playcanvas.com/user-manual/graphics/cameras/multiple-cameras.md) compose views for split-screen, overlays, and render-to-texture.

## Creating a Camera

**Engine**

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

**Editor**

New scenes are automatically populated with a camera entity. To create another, use the Entity menu, which creates an entity with a [Camera Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/camera.md) in a single step:

[Image: Camera creation]

All camera properties can then be edited in the Inspector.

**React**

```jsx
<Entity name="camera" position={[0, 5, 10]}>
  <Camera clearColor="#4d4db3" />
</Entity>
```

See the [`<Camera/>` component reference](https://developer.playcanvas.com/user-manual/react/api/camera.md) for all available props.

**Web Components**

```html
<pc-entity name="camera" position="0 5 10">
  <pc-camera clear-color="0.3 0.3 0.7 1"></pc-camera>
</pc-entity>
```

See the [`<pc-camera>` tag reference](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) for all available attributes.

## In This Section

* [Projection](https://developer.playcanvas.com/user-manual/graphics/cameras/projection.md) — perspective vs orthographic projection, field of view, clip planes and frustum culling.
* [Clearing](https://developer.playcanvas.com/user-manual/graphics/cameras/clearing.md) — set the background color, make the canvas transparent, or disable clearing.
* [Tone Mapping & Exposure](https://developer.playcanvas.com/user-manual/graphics/cameras/tone-mapping.md) — map HDR scene lighting to your display, with optional physical exposure controls.
* [Multiple Cameras](https://developer.playcanvas.com/user-manual/graphics/cameras/multiple-cameras.md) — compose views with priorities, viewports, layers and render targets.
* [Camera Controls](https://developer.playcanvas.com/user-manual/graphics/cameras/camera-controls.md) — add orbit, fly and first-person navigation with the engine's ready-made script.
* [Screen and World Coordinates](https://developer.playcanvas.com/user-manual/graphics/cameras/screen-and-world.md) — convert between 2D screen positions and 3D world positions.
* [Scene Picker](https://developer.playcanvas.com/user-manual/graphics/cameras/scene-picker.md) — accurately select the objects under a screen coordinate.
* [Depth Layer](https://developer.playcanvas.com/user-manual/graphics/cameras/depth-layer.md) — give shaders access to the scene's color and depth buffers.

## Going Further

* **Post-processing** — bloom, depth of field, SSAO, TAA, vignette and more are applied per camera. See [Post Effects](https://developer.playcanvas.com/user-manual/graphics/posteffects.md).
* **AR and VR** — a camera can drive an immersive WebXR session via [`startXr()`](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr). See the [XR section](https://developer.playcanvas.com/user-manual/xr.md).
* **Per-camera fog** — override the scene's fog settings on an individual camera with [`fog`](https://api.playcanvas.com/engine/classes/CameraComponent.html#fog).
* **Custom projections** — supply [`calculateProjection`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculateprojection) and [`calculateTransform`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculatetransform) callbacks for advanced effects such as oblique projections and planar reflections.
* **Tutorials** — try [Camera Following a Path](https://developer.playcanvas.com/tutorials/camera-following-a-path) and [Orbit Camera](https://developer.playcanvas.com/tutorials/orbit-camera).
