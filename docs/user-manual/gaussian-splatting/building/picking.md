---
title: Picking
---

The PlayCanvas Engine provides a [Picker API](https://api.playcanvas.com/engine/classes/Picker.html) which can query the object rendered at a specified pixel. The picker works with splats in the same way that it does for meshes.

**[View Live Example](https://playcanvas.github.io/#/gaussian-splatting/picking)** - See splat picking in action with interactive selection and world position detection.

## Unified vs Non-Unified Mode

GSplat components can operate in unified or non-unified rendering mode (see [Unified Splat Rendering](./unified-rendering/) for details). The picking behavior differs between these modes:

- **Unified mode**: Picking returns the `GSplatComponent` directly.
- **Non-unified mode**: Picking returns a mesh instance, which you then match to find the owning entity.

## Setting Up the Picker

To pick splats, create a Picker instance with depth enabled (third parameter set to `true`):

```javascript
// Create a picker with depth buffer support for world position detection
const picker = new pc.Picker(app, 1, 1, true);
```

The depth buffer is required if you want to retrieve the 3D world position of the picked point, not just identify which object was clicked.

### Unified Mode Setup

When using unified mode, you must enable ID tracking on the scene's gsplat manager. This should be done before rendering any splats:

```javascript
// Enable gsplat ID for unified picking
app.scene.gsplat.enableIds = true;
```

And ensure your gsplat components are created with `unified: true`:

```javascript
entity.addComponent('gsplat', {
    asset: splatAsset,
    unified: true
});
```

## Preparing for Picking

Before querying the picker, you must render the ID texture by calling `prepare()`:

```javascript
// Get the layer containing your splats
const worldLayer = app.scene.layers.getLayerByName('World');

// Render the picking buffer
picker.prepare(camera.camera, app.scene, [worldLayer]);
```

For better performance, you can resize the picker to use a lower resolution:

```javascript
// Use quarter resolution for faster picking
const pickerScale = 0.25;
picker.resize(canvas.clientWidth * pickerScale, canvas.clientHeight * pickerScale);

// Scale the pick coordinates accordingly
const scaledX = mouseX * pickerScale;
const scaledY = mouseY * pickerScale;
```

## Identifying Picked Objects

Use `getSelectionAsync()` to get the picked objects at a screen position. The return value differs based on the rendering mode.

### Unified Mode

In unified mode, the picker returns the `GSplatComponent` directly:

```javascript
const selection = await picker.getSelectionAsync(x, y, 1, 1);
if (selection.length > 0) {
    // In unified mode, selection contains GSplatComponent instances
    const gsplatComponent = selection[0];
    // Find the entity that owns this component
    const entity = entities.find(e => e.gsplat === gsplatComponent);
}
```

### Non-Unified Mode

In non-unified mode, the picker returns mesh instances:

```javascript
const meshInstances = await picker.getSelectionAsync(x, y, 1, 1);
if (meshInstances.length > 0) {
    const meshInstance = meshInstances[0];
    // Find entity with matching mesh instance
    const entity = entities.find(e => e.gsplat.instance.meshInstance === meshInstance);
}
```

## Getting World Position

Use `getWorldPointAsync()` to get the 3D world position of a picked point. This works the same for both modes:

```javascript
const worldPoint = await picker.getWorldPointAsync(x, y);
if (worldPoint) {
    // worldPoint is a Vec3 containing the 3D position
    console.log('Picked position:', worldPoint.x, worldPoint.y, worldPoint.z);
}
```

## Complete Example (Unified Mode)

Here's a typical picking workflow for unified mode:

```javascript
// Enable ID tracking for unified picking
app.scene.gsplat.enableIds = true;

// Create splat entities with unified mode
const splat = new pc.Entity('splat');
splat.addComponent('gsplat', {
    asset: splatAsset,
    unified: true
});
app.root.addChild(splat);

// Create picker with depth support
const picker = new pc.Picker(app, 1, 1, true);

const handlePick = async (mouseX, mouseY) => {
    // Use lower resolution for performance
    const pickerScale = 0.25;
    picker.resize(canvas.clientWidth * pickerScale, canvas.clientHeight * pickerScale);

    // Prepare the picker
    const worldLayer = app.scene.layers.getLayerByName('World');
    picker.prepare(camera.camera, app.scene, [worldLayer]);

    const x = mouseX * pickerScale;
    const y = mouseY * pickerScale;

    // Get the world position
    const worldPoint = await picker.getWorldPointAsync(x, y);
    if (!worldPoint) return;

    // Get the picked object
    const selection = await picker.getSelectionAsync(x, y, 1, 1);
    if (selection.length === 0) return;

    // In unified mode, selection contains the GSplatComponent directly
    const gsplatComponent = selection[0];

    // Find the entity that owns this component
    const entity = splatEntities.find(e => e.gsplat === gsplatComponent);

    if (entity) {
        // Convert world position to entity's local space if needed
        const localPos = entity.getWorldTransform()
            .clone()
            .invert()
            .transformPoint(worldPoint);

        console.log('Picked entity:', entity.name);
        console.log('Local position:', localPos);
    }
};

// Handle mouse clicks
app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
    handlePick(event.x, event.y);
});

// Handle touch events
app.touch.on(pc.EVENT_TOUCHSTART, (event) => {
    const touch = event.touches[0];
    handlePick(touch.x, touch.y);
});
```

## Complete Example (Non-Unified Mode)

Here's a typical picking workflow for non-unified mode:

```javascript
// Create splat entities (non-unified is the default)
const splat = new pc.Entity('splat');
splat.addComponent('gsplat', {
    asset: splatAsset
});
app.root.addChild(splat);

// Create picker with depth support
const picker = new pc.Picker(app, 1, 1, true);

const handlePick = async (mouseX, mouseY) => {
    // Use lower resolution for performance
    const pickerScale = 0.25;
    picker.resize(canvas.clientWidth * pickerScale, canvas.clientHeight * pickerScale);

    // Prepare the picker
    const worldLayer = app.scene.layers.getLayerByName('World');
    picker.prepare(camera.camera, app.scene, [worldLayer]);

    const x = mouseX * pickerScale;
    const y = mouseY * pickerScale;

    // Get the world position
    const worldPoint = await picker.getWorldPointAsync(x, y);
    if (!worldPoint) return;

    // Get the picked object
    const meshInstances = await picker.getSelectionAsync(x, y, 1, 1);
    if (meshInstances.length === 0) return;

    const meshInstance = meshInstances[0];

    // Find the gsplat entity that owns this mesh instance
    const entity = splatEntities.find(
        e => e.gsplat.instance.meshInstance === meshInstance
    );

    if (entity) {
        // Convert world position to entity's local space if needed
        const localPos = entity.getWorldTransform()
            .clone()
            .invert()
            .transformPoint(worldPoint);

        console.log('Picked entity:', entity.name);
        console.log('Local position:', localPos);
    }
};

// Handle mouse clicks
app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
    handlePick(event.x, event.y);
});

// Handle touch events
app.touch.on(pc.EVENT_TOUCHSTART, (event) => {
    const touch = event.touches[0];
    handlePick(touch.x, touch.y);
});
```

## Debugging

The picker exposes its internal buffers which can be useful for debugging:

```javascript
// Display the color buffer (object IDs)
if (picker.colorBuffer) {
    app.drawTexture(0.55, -0.77, 0.2, 0.2, picker.colorBuffer);
}

// Display the depth buffer
if (picker.depthBuffer) {
    app.drawTexture(0.77, -0.77, 0.2, 0.2, picker.depthBuffer);
}
```
