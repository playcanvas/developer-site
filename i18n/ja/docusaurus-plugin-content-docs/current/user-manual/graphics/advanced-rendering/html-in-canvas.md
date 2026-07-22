---
title: HTML-in-Canvas
description: ライブのHTMLとCSSを3DシーンにGPUテクスチャとしてレンダリングし、スタイリング、ヒットテスト、アクセシビリティを完全サポートします。フォールバック戦略も解説します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「HTML-in-Canvas」について、次の要件を満たしてください: ライブのHTMLとCSSを3DシーンにGPUテクスチャとしてレンダリングし、スタイリング、ヒットテスト、アクセシビリティを完全サポートします。フォールバック戦略も解説すること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「HTML-in-Canvas」を実装し、次の要件を満たしてください: ライブのHTMLとCSSを3DシーンにGPUテクスチャとしてレンダリングし、スタイリング、ヒットテスト、アクセシビリティを完全サポートします。フォールバック戦略も解説すること。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「HTML-in-Canvas」を設定し、次の要件を満たしてください: ライブのHTMLとCSSを3DシーンにGPUテクスチャとしてレンダリングし、スタイリング、ヒットテスト、アクセシビリティを完全サポートします。フォールバック戦略も解説すること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

HTML-in-Canvas allows you to render live HTML and CSS content directly as WebGL textures. This enables styled text, interactive UI panels, forms, and other DOM content to appear on surfaces within a 3D scene — complete with accessibility, internationalization, and full CSS styling support.

:::note

HTML-in-Canvas is an experimental browser API currently available in [Chrome Canary](https://www.google.com/chrome/canary/) behind the `chrome://flags/#canvas-draw-element` flag. It is expected to ship in Chrome stable in the near future. See the [WICG explainer](https://github.com/WICG/html-in-canvas) for the full proposal.

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

Currently, PlayCanvas supports HTML-in-Canvas with the **WebGL** backend only. WebGPU support is pending the corresponding browser-level API becoming available.

## How It Works

The API introduces three main primitives:

1. **`layoutsubtree` attribute** — Setting this on a `<canvas>` element opts its child HTML elements into layout and hit testing. The children are laid out by the browser but not visually rendered until explicitly drawn into the canvas.

2. **`texElementImage2D`** — A WebGL extension that uploads an HTML element's rendered content as a texture. PlayCanvas handles this internally when you pass an HTML element to `Texture.setSource()`.

3. **`paint` event** — Fires on the canvas whenever a child element's visual content changes. Use this to re-upload the texture so it stays in sync with the DOM.

## Basic Usage — HTML as Texture

To render an HTML element as a texture on a 3D object:

```javascript
// 1. Enable HTML-in-Canvas on the application canvas
canvas.setAttribute('layoutsubtree', 'true');

// 2. Create and style an HTML element
const htmlElement = document.createElement('div');
htmlElement.style.width = '512px';
htmlElement.style.height = '512px';
htmlElement.innerHTML = '<h1>Hello 3D World</h1>';
canvas.appendChild(htmlElement);

// 3. Create a texture and bind the HTML element as its source
const texture = new pc.Texture(device, {
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8
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
const material = new pc.StandardMaterial();
material.diffuseMap = texture;
material.update();
```

The HTML element supports full CSS — animations, gradients, flexbox, `backdrop-filter`, and more — all rendered live into the texture each frame.

## Interactive Usage — Hit Testing

To make HTML content interactive (clickable, hoverable) when rendered on a 3D plane, you need to synchronize the element's CSS transform with its 3D projection so the browser can perform hit testing.

The `canvas.getElementTransform(element, drawTransform)` API registers an element for hit testing given a draw transform matrix. The configurator example includes a reusable `HtmlSync` class that handles the matrix math:

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
