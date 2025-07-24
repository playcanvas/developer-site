---
title: Your First Splat App
sidebar_position: 1
---

Welcome to building your first Gaussian splat application! This section provides step-by-step tutorials to create an interactive 3D toy cat splat that users can orbit around, pan, and zoom.

## What You'll Build

All tutorials in this section create the same interactive splat application featuring:

- **3D Gaussian Splat**: A toy cat loaded from a PLY file
- **Camera Controls**: Mouse/touch interaction for orbit, pan, and zoom
- **Optimized Performance**: Settings tuned for splat rendering
- **Real-time Interaction**: Smooth 60fps experience

## Choose Your Path

We offer **four different approaches** to build the same app. Pick the one that matches your background and project needs:

### 🔧 [Using the Engine API](./engine)
**Best for:** Experienced JavaScript developers who want full control

- **What:** Direct PlayCanvas Engine API usage with ES6 modules
- **Files:** `index.html` + `main.js` 
- **Pros:** Maximum flexibility, full engine access, smallest footprint
- **Cons:** More code to write, requires engine knowledge

### 🌐 [Using Web Components](./web-components)
**Best for:** Web developers familiar with HTML and modern standards

- **What:** Declarative HTML using `<pc-app>`, `<pc-entity>`, `<pc-splat>` tags
- **Files:** Single HTML file
- **Pros:** No build tools needed, familiar HTML syntax, quick prototyping
- **Cons:** Limited to web component capabilities

### ⚛️ [Using PlayCanvas React](./react)
**Best for:** React developers and teams using React ecosystems

- **What:** JSX components that map to PlayCanvas entities and components
- **Files:** React component
- **Pros:** React integration, state management, TypeScript support, component composition
- **Cons:** Requires React knowledge and build setup

### 🎨 [Using the Editor](./editor)
**Best for:** Designers, artists, and visual learners

- **What:** Point-and-click interface with Asset Store integration
- **Files:** PlayCanvas project (cloud-based)
- **Pros:** No coding required, visual tools, team collaboration, publishing features
- **Cons:** Requires PlayCanvas account, less programmatic control

## Not Sure Which to Choose?

If you're new to PlayCanvas, we recommend starting with our [Getting Started guide](/user-manual/getting-started) to understand the platform basics first.

**Quick Decision Guide:**

- **Never used PlayCanvas?** → Start with [Web Components](./web-components) for simplicity
- **JavaScript developer?** → Try [Engine API](./engine) for full control
- **React developer?** → Go with [PlayCanvas React](./react) for familiar patterns  
- **Prefer visual tools?** → Use the [Editor](./editor) for point-and-click development
- **Building a team project?** → Consider the [Editor](./editor) for collaboration features

## Next Steps

1. **Choose your preferred approach** from the tutorials above
2. **Follow the step-by-step guide** to build your splat app
3. **Experiment and extend** the app with additional features
4. **Explore advanced topics** in our [Engine Features](../engine-features) section

Each tutorial builds to the same interactive result, so you can't go wrong with any choice!
