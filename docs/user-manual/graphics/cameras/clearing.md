---
title: Clearing
description: Control how a camera clears its render target — set the background color, make the canvas transparent, or disable clearing entirely.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Control how a camera clears its render target — set the background color, make the canvas transparent, or disable clearing entirely; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Clearing so the result satisfies this requirement: control how a camera clears its render target — set the background color, make the canvas transparent, or disable clearing entirely; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

Before a camera renders the scene, it clears its render target — the screen, unless a [render target](multiple-cameras.md#render-targets) is assigned. You can control what gets cleared and to what color:

```javascript
camera.camera.clearColor = new pc.Color(0, 0, 0);

camera.camera.clearColorBuffer = true;   // clear the color buffer (default: true)
camera.camera.clearDepthBuffer = true;   // clear the depth buffer (default: true)
camera.camera.clearStencilBuffer = true; // clear the stencil buffer (default: true)
```

The clear color is effectively the background color of your scene — though if your scene has a skybox, it covers the clear color entirely.

## Transparent Backgrounds {#transparent-backgrounds}

The clear color has an alpha channel, and the application's canvas supports transparency by default. This means a single camera can render the scene over the surrounding web page — useful for 3D product views, headers, and other embedded content:

```javascript
// The web page shows through wherever nothing is drawn
camera.camera.clearColor = new pc.Color(0, 0, 0, 0);
```

## Disabling Clearing {#disabling-clearing}

Disabling the clear flags keeps the existing contents of the render target, which is the building block for compositing several cameras into one image — see [Camera Stacking](multiple-cameras.md#camera-stacking).
