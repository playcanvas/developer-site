---
title: Scene Picker
---

The Picker class provides a way to select mesh instances from screen coordinates by clicking or touching the screen. It works by rendering the scene from a camera's viewpoint to an offscreen buffer with unique ID colors, allowing efficient identification of clicked objects. The picker supports both regular meshes and Gaussian Splats, and works across WebGL2 and WebGPU backends.

## Basic Usage

To create a picker, instantiate it with your application, desired resolution, and optionally enable depth picking:

```javascript
const picker = new pc.Picker(app, width, height, depth);
```

The basic workflow involves three steps:

1. **Prepare** - Render the pick buffer by calling [`prepare(camera, scene, layers)`](https://api.playcanvas.com/engine/classes/Picker.html#prepare) once per frame (or only when the camera or scene changes)
2. **Resize** - Adjust picker resolution if needed using [`resize(width, height)`](https://api.playcanvas.com/engine/classes/Picker.html#resize)
3. **Query** - Get picked mesh instances asynchronously using [`getSelectionAsync(x, y, width, height)`](https://api.playcanvas.com/engine/classes/Picker.html#getSelectionAsync)

The picker uses an asynchronous API to read pixel data without blocking the rendering thread, ensuring smooth frame rates even when picking. When you're done with the picker, call [`destroy()`](https://api.playcanvas.com/engine/classes/Picker.html#destroy) to clean up GPU resources.

For complete API documentation, see the [Picker API reference](https://api.playcanvas.com/engine/classes/Picker.html).

## Depth Support

By default, the picker only captures mesh instance IDs. However, you can enable depth picking by passing `true` as the fourth constructor parameter:

```javascript
const picker = new pc.Picker(app, width, height, true);
```

When depth picking is enabled, the picker captures depth values along with mesh IDs. This additional information enables calculating the exact 3D world position of clicked points on object surfaces, which is useful for placing objects, measuring distances, or creating editor tools.

## World Position Picking

When depth picking is enabled, you can use [`getWorldPointAsync(x, y)`](https://api.playcanvas.com/engine/classes/Picker.html#getWorldPointAsync) to get the 3D world position at screen coordinates:

```javascript
picker.getWorldPointAsync(x, y).then((worldPoint) => {
    if (worldPoint) {
        // worldPoint is a Vec3 in world space
        console.log('Clicked at:', worldPoint);
    } else {
        // No object was clicked (background)
        console.log('Clicked on empty space');
    }
});
```

The method returns a promise that resolves to a `Vec3` containing the world position, or `null` if no object was clicked. This works correctly with both perspective and orthographic cameras.

## Performance Considerations

The picker's performance can be optimized in several ways:

**Lower Resolution**: Rendering the pick buffer at a fraction of the screen resolution significantly improves performance. For example, using 0.25x screen resolution:

```javascript
const pickerScale = 0.25;
const picker = new pc.Picker(
    app,
    canvas.width * pickerScale,
    canvas.height * pickerScale,
    true
);
```

The trade-off is reduced precision - very small objects may be missed at lower resolutions.

**Asynchronous Reads**: The picker's async API prevents blocking the main thread while reading pixel data from the GPU, maintaining smooth frame rates.

**Selective Updates**: Call `prepare()` only when needed. If your camera and objects are static, you can reuse the previously rendered pick buffer without calling `prepare()` again.

## Gaussian Splatting Support

The picker fully supports Gaussian Splat instances with the same API as regular meshes. You can pick splat instances by their mesh instance ID and, with depth enabled, determine exact 3D positions on splat surfaces.

This enables interactive applications like placing markers on splats, measuring distances, or selecting individual splat entities in complex scenes. See the [Gaussian Splatting Picking example](https://playcanvas.github.io/#gaussian-splatting/picking) for a complete demonstration.

## Examples

These engine examples demonstrate the picker in action:

- [**Area Picker**](https://playcanvas.github.io/#/graphics/area-picker) - Shows how to pick mesh instances in rectangular screen regions with visual feedback
- [**Gaussian Splatting Picking**](https://playcanvas.github.io/#gaussian-splatting/picking) - Demonstrates picking splat instances and using world position picking to place markers on splat surfaces
