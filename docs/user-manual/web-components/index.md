---
title: PlayCanvas Web Components
---

PlayCanvas Web Components are a powerful set of custom HTML elements that make it incredibly easy to embed interactive 3D content directly into your web pages. Built on modern web standards, these components bridge the gap between traditional web development and 3D graphics, allowing you to create immersive experiences with simple HTML markup.

## What Are Web Components?

[Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) are reusable custom HTML elements that encapsulate complex functionality behind a simple, declarative interface. PlayCanvas Web Components wrap the full power of the [PlayCanvas Engine](../engine/index.md) in easy-to-use HTML tags, making 3D development accessible to web developers of all skill levels.

```html
<!-- Create a 3D scene with just HTML -->
<pc-app>
  <pc-scene>
    <pc-entity name="camera" position="0 0 3">
      <pc-camera></pc-camera>
    </pc-entity>
    <pc-entity name="light" rotation="45 45 0">
      <pc-light></pc-light>
    </pc-entity>
    <pc-entity name="ball">
      <pc-render type="sphere"></pc-render>
    </pc-entity>
  </pc-scene>
</pc-app>
```

## Why Use PlayCanvas Web Components?

### 🚀 Zero JavaScript Required

Create interactive 3D scenes using only HTML markup - no complex JavaScript setup or engine initialization needed.

### 🔧 Highly Customizable

Full access to PlayCanvas Engine features through intuitive HTML attributes.

### ⚡ Performance Optimized

Leverages the same high-performance PlayCanvas Engine used by thousands of web applications.

## Perfect For

- **Content creators** who want to add 3D elements to websites without learning complex 3D programming
- **Web developers** looking to integrate 3D graphics into existing HTML/CSS workflows  
- **Educators** teaching 3D concepts through familiar web technologies
- **Rapid prototyping** of 3D ideas and concepts
- **Marketing teams** creating interactive product showcases and demos

## Key Features

- **Declarative 3D scenes** defined entirely in HTML
- **Component-based architecture** mirroring the PlayCanvas Editor
- **Real-time updates** through reactive attribute binding
- **WebGL and WebGPU support** with automatic fallbacks
- **Mobile-optimized** touch controls and responsive layouts

## Browser Support

PlayCanvas Web Components work in all modern browsers that support:

- WebGL 2.0 and/or WebGPU
- ES6 Modules
- Custom Elements v1

## Open Source & MIT Licensed

The Web Components are completely open source and available on [GitHub](https://github.com/playcanvas/web-components) under the MIT license. This means you can use them freely in both personal and commercial projects, modify them to suit your needs, and contribute back to the community.

## Ready to Get Started?

Jump right in with our [Getting Started Guide](getting-started.md) or explore the complete [Tag Reference](./tags/index.md) to see everything that's possible with PlayCanvas Web Components.
