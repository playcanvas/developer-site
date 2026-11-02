---
title: HTML-in-Canvas
description: ライブのHTMLとCSSを3DシーンにGPUテクスチャとしてレンダリングし、スタイリング、ヒットテスト、アクセシビリティを完全サポートします。フォールバック戦略も解説します。
---

HTML-in-Canvas allows you to render live HTML and CSS content directly as GPU textures. This enables styled text, interactive UI panels, forms, and other DOM content to appear on surfaces within a 3D scene — complete with accessibility, internationalization, and full CSS styling support.

:::note

HTML-in-Canvas is enabled by default in Chrome 157 and later. Other browsers do not support it yet. See the [WICG explainer](https://github.com/WICG/html-in-canvas) for the full proposal.

:::

## Browser Support

Use `device.supportsHtmlTextures` to detect whether the current device supports HTML element textures:

```javascript
if (device.supportsHtmlTextures) {
    // HTML-in-Canvas is available
} else {
    // provide a fallback (e.g. DOM overlay or canvas rasterization)
}
```

This property returns `false` on all browsers that do not implement the HTML-in-Canvas API. Applications should always provide a fallback path.

PlayCanvas supports HTML-in-Canvas with both the **WebGL2** and **WebGPU** backends.

## How It Works

The API introduces four main primitives:

1. **`content="drawable"` attribute** — Setting this on a `<canvas>` element opts its child HTML elements into layout. The children are laid out by the browser but not visually rendered until explicitly drawn into the canvas.

2. **`drawable` attribute** — Marks a child element of the canvas that can be drawn into a texture.

3. **`texElementSubImage2D` and `drawElementImageToTexture`** — The WebGL and WebGPU methods that draw an element's rendered content into a texture. PlayCanvas calls them internally when you pass an HTML element to `Texture.setSource()`.

4. **`paint` event** — Fires on the canvas whenever a child element's visual content changes. Use this to re-upload the texture so it stays in sync with the DOM.

## Basic Usage — HTML as Texture

To render an HTML element as a texture on a 3D object:

```javascript
// 1. Enable HTML-in-Canvas on the application canvas
canvas.setAttribute('content', 'drawable');

// 2. Create and style an HTML element, and mark it as drawable
const htmlElement = document.createElement('div');
htmlElement.setAttribute('drawable', '');
htmlElement.style.width = '512px';
htmlElement.style.height = '512px';
htmlElement.innerHTML = '<h1>Hello 3D World</h1>';
canvas.appendChild(htmlElement);

// 3. Create a texture and bind the HTML element as its source
const texture = new Texture(device, {
    width: 512,
    height: 512,
    format: PIXELFORMAT_RGBA8
});

// Wait for the first paint, then set the HTML element as the texture source
canvas.addEventListener('paint', () => {
    texture.setSource(htmlElement);
}, { once: true });
canvas.requestPaint();

// Re-upload the texture whenever the HTML content changes
canvas.addEventListener('paint', () => {
    texture.upload();
});

// 4. Use the texture on a material
const material = new StandardMaterial();
material.diffuseMap = texture;
material.update();
```

The texture takes the size of the element's border box, in CSS pixels. Use an 8-bit RGBA format, such as `PIXELFORMAT_RGBA8` or `PIXELFORMAT_SRGBA8`, as WebGL can only draw an element into those.

The HTML element supports full CSS — animations, gradients, flexbox, and more — all rendered live into the texture each frame. Avoid `backdrop-filter` on the drawn element: there is nothing behind it to blur, and Chrome blurs the element's own content instead.

## Interactive Usage — Hit Testing

To make HTML content interactive (clickable, hoverable) when rendered on a 3D plane, you need to tell the browser where the element appears in the canvas, so it can perform hit testing.

The `canvas.updateElementGeometry(element, { canvasTransform })` API sets the transform from the element's border box to the canvas, in the canvas's CSS pixels, and the browser hit-tests the element there. The configurator example includes a reusable `HtmlSync` class that computes this transform from the camera and the plane entity:

```javascript
// Create the sync helper (once)
const sync = new HtmlSync(canvas, htmlElement, planeEntity, panelWidth, panelHeight);

// Update every frame to keep the DOM position in sync with the 3D projection
app.on('update', () => {
    sync.update(camera.camera);
});

// Clicks and hovers work via standard DOM events
htmlElement.addEventListener('click', (e) => {
    const button = e.target.closest('[data-action]');
    if (button) {
        // handle the click
    }
});
```

Because the browser handles hit testing natively, `:hover` CSS pseudo-classes, focus management, and accessibility features all work as expected.

## Fallback Strategies

When `device.supportsHtmlTextures` is `false`, consider these approaches:

- **DOM overlay** — Render the HTML panel as a fixed-position `<div>` on top of the canvas. Click handling works via standard DOM events. This is the approach used by the HTML Texture Configurator example.

<EngineExample id="misc/html-texture-configurator" title="HTML Texture Configurator" />

- **Canvas 2D rasterization** — Draw fallback content into a `<canvas>` element using the 2D context and use that as the texture source. This is the approach used by the HTML Texture example.

<EngineExample id="misc/html-texture" title="HTML Texture" />

## API Reference

- [GraphicsDevice.supportsHtmlTextures](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsHtmlTextures) — Detect HTML-in-Canvas support.
- [Texture.setSource()](https://api.playcanvas.com/engine/classes/Texture.html#setSource) — Set an HTML element as a texture source.
