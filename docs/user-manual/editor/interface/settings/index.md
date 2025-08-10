---
title: Scene Settings
---

This section documents all configurable settings panels in the PlayCanvas Editor. Each section describes the available options, their purpose, and practical usage notes.

## Opening Settings

Load the Settings into the [Inspector](../inspector) by clicking the 'cog' icon on the [Toolbar](../toolbar) or in the [Viewport](../viewport).

![Settings](/img/user-manual/editor/toolbar/settings.png)

## Contents

1. [Launch Page](launch-page.md) – Configure page launch options, including `SharedArrayBuffer` support.
2. [Batch Groups](batch-groups.md) – Manage and configure mesh batching to reduce draw calls.
3. [Layers & Render Order](layers.md) – Define rendering layers and control their draw order.
4. [Localization](localization.md) – Manage localization assets for multi-language support.
5. [Network](network.md) – Configure network retry behavior for asset loading.
6. [Input](input.md) – Enable or disable input device handling.
7. [Physics](physics.md) – Import and configure the physics engine and world gravity.
8. [Lightmapping](lightmapping.md) – Control baked lighting quality, filtering, and ambient occlusion.
9. [Rendering](rendering.md) – Adjust environment lighting, resolution, device capabilities, and render options.
10. [Asset Import](asset-import.md) – Set default import behaviors for textures, models, and animations.

### Usage Notes

- All settings are saved per project and affect the runtime behavior of published builds.
- Some features require importing external libraries (e.g., Physics, Basis, Draco).
- For optimal performance, balance visual quality settings with target device capabilities.
