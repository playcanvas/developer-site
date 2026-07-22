---
title: Screen and World Coordinates
description: Convert between 2D screen positions and 3D world positions with screenToWorld and worldToScreen for picking, placement, and UI.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Convert between 2D screen positions and 3D world positions with screenToWorld and worldToScreen for picking, placement, and UI; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Screen and World Coordinates so the result satisfies this requirement: convert between 2D screen positions and 3D world positions with screenToWorld and worldToScreen for picking, placement, and UI; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

A camera defines the mapping between the 3D world and the 2D screen, and the [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) exposes that mapping in both directions. This is the foundation for mouse picking, placing objects under the cursor, and anchoring 2D UI to 3D objects. The same code works in every workflow — these are runtime API calls made from your scripts.

## Screen to World {#screen-to-world}

[`screenToWorld(x, y, z)`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld) converts a 2D screen position into a 3D world position. Since a single screen point corresponds to an entire ray of world positions, you also pass `z` — the distance from the camera at which you want the point.

A common pattern is casting a ray from the mouse cursor into the scene, for example to intersect with physics or geometry:

```javascript
const from = camera.camera.screenToWorld(event.x, event.y, camera.camera.nearClip);
const to = camera.camera.screenToWorld(event.x, event.y, camera.camera.farClip);

// e.g. raycast against the physics world
const result = app.systems.rigidbody.raycastFirst(from, to);
if (result) {
    console.log(`Hit: ${result.entity.name}`);
}
```

Or placing an object at a fixed distance under the cursor:

```javascript
const pos = camera.camera.screenToWorld(event.x, event.y, 10); // 10 units from the camera
entity.setPosition(pos);
```

## World to Screen {#world-to-screen}

[`worldToScreen(worldCoord)`](https://api.playcanvas.com/engine/classes/CameraComponent.html#worldtoscreen) does the reverse: it projects a 3D world position to 2D screen coordinates. This is useful for positioning HTML elements or 2D UI over objects in the scene — name tags, health bars, waypoint markers:

```javascript
const screenPos = camera.camera.worldToScreen(entity.getPosition());

// Position an absolutely-positioned HTML element over the entity,
// accounting for the device pixel ratio
const dpr = window.devicePixelRatio;
htmlElement.style.left = `${screenPos.x / dpr}px`;
htmlElement.style.top = `${screenPos.y / dpr}px`;
```

The returned `z` component holds the depth of the point. For perspective cameras, a negative `z` means the point is behind the camera — check it before showing the element.

## Picking Objects {#picking}

For selecting the exact mesh under the cursor, a ray cast is not always enough — it requires physics colliders and ignores per-pixel detail. The engine's [Picker](https://api.playcanvas.com/engine/classes/Picker.html) renders the scene to determine precisely which mesh instance occupies a screen coordinate. See [Scene Picker](scene-picker.md).
