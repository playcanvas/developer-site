---
title: PlayCanvas Editor
---

The PlayCanvas Editor is a powerful, browser-based development environment for creating stunning 3D applications. No downloads, no installations—just open your browser and start building.

![PlayCanvas Editor Interface](/img/user-manual/editor/interface/editor-interface.png)

## Why Choose the PlayCanvas Editor?

### 🌐 Accessible Anywhere

The entire Editor runs in your web browser. Whether you're at your desk, on a laptop, or borrowing a friend's computer, your projects are just a login away. Your work is automatically saved to the cloud, so you never lose progress.

### 👁️ What You See Is What You Get

The Editor uses the same [PlayCanvas Engine](../engine) that powers your published applications. Every material, every light, every shadow you see in the Editor is exactly what your users will experience. No surprises at runtime.

### ⚡ Instant Iteration

Make a change, see it instantly. With [live editing](scripting/hot-reloading), you can tweak materials, adjust positions, and even modify scripts while your application runs. Hit the [Launch](interface/launch-page) button and your project opens in a new tab, ready to test. The feedback loop between idea and implementation has never been shorter.

<!-- TODO: Capture a GIF showing the Launch button being clicked and the project opening -->
<!-- Suggested image: /img/user-manual/editor/editor-launch-workflow.gif -->

## Built for Teams

### Real-time Collaboration

![Collaboration in the Viewport](/img/user-manual/editor/realtime-collaboration/viewport-cameras.webp)

Work together with your team in real-time. See where others are looking, what they're selecting, and chat directly within the Editor. Multiple developers, artists, and designers can build the same scene simultaneously—no merge conflicts, no stepping on each other's toes. [Learn more about collaboration →](realtime-collaboration)

### Professional Version Control

![Version Control Graph](/img/user-manual/editor/version-control/graph-view/overview.png)

PlayCanvas includes a complete [version control system](version-control) designed specifically for 3D projects:

- **Checkpoints** — Snapshot your project at any point and roll back if needed
- **Branches** — Develop features in isolation without affecting the main project
- **Merging** — Combine work from multiple branches with visual conflict resolution
- **History** — Track every change to every asset and entity over time

## Complete Development Toolkit

### Visual Scene Building

Construct your 3D worlds using intuitive [transform gizmos](interface/viewport), a hierarchical [entity tree](interface/hierarchy), and a comprehensive [property inspector](interface/inspector). Drag and drop assets directly into your scene, parent entities with a click, and fine-tune every detail.

### Integrated Code Editor

Write scripts without leaving your browser. The built-in [code editor](scripting/code-editor) features syntax highlighting, intelligent autocomplete, and real-time error checking. For larger projects, use the [VS Code extension](scripting/vscode-extension) and develop locally with full IDE power.

### Powerful Asset Pipeline

Import models, textures, audio, and more with a streamlined [asset pipeline](assets/import-pipeline). The Editor automatically optimizes your assets and handles format conversions. Organize everything in the [Assets Panel](assets/asset-panel) with folders, search, and filtering.

<!-- TODO: Capture screenshot of Assets panel with various asset types -->
<!-- Suggested image: /img/user-manual/editor/assets-panel-overview.png -->

### Component-Based Architecture

Build complex behaviors by combining [components](scenes/components)—camera, light, physics, audio, scripts, and more. This modular approach keeps your project organized and your code reusable.

## Publish Everywhere

When you're ready to share your creation, PlayCanvas has you covered:

| Platform | Description |
|----------|-------------|
| [Web](publishing/web) | Deploy to PlayCanvas hosting or self-host anywhere |
| [Mobile](publishing/mobile) | Package as native iOS and Android apps |
| [Desktop](publishing/desktop) | Build standalone applications for Windows, macOS, and Linux |
| [Playable Ads](publishing/playable-ads) | Export optimized builds for Facebook, Snapchat, and more |

## Getting Started

Ready to dive in? Here's your path forward:

1. **[Create Your First App](getting-started/your-first-app)** — Build a simple 3D scene in minutes
2. **[Explore the Interface](interface)** — Master the Editor's tools and panels
3. **[Learn Scripting](scripting)** — Add interactivity with JavaScript
4. **[Publish Your Project](publishing)** — Share your creation with the world

## Extend and Customize

For advanced workflows, the [Editor API](editor-api) lets you build custom tools, automate repetitive tasks, and integrate with external systems. If you can imagine it, you can build it.

---

:::info[Engine Compatibility]

The Editor evolves alongside the PlayCanvas Engine. If you're upgrading an older project or experiencing issues, check the [engine compatibility](engine-compatibility) guide or visit [troubleshooting](troubleshooting) for solutions.

:::
