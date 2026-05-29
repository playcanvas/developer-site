---
title: Draw Order and Sorting
description: "How GSplat components sort splats, render multiple components, depth buffer limits, and global sorting across components."
---

## How Gaussians Are Sorted

Individual Gaussians within a GSplatComponent are sorted back to front based on camera depth. This sorting happens asynchronously in a Web Worker to avoid blocking the main thread. The calculated sort order is then passed back to the main thread and uploaded to the GPU for rendering.

:::note

Because the sorting occurs asynchronously, you may notice some visual lag if the camera transform changes significantly over a very short time period, as the Web Worker needs time to recalculate the new sort order.

:::

## Multiple GSplatComponents

When a scene contains multiple GSplatComponents, all of their Gaussians are sorted together in a single global sort, rather than each component being sorted independently and ordered by its bounding box. This global sorting produces correct depth ordering across components and eliminates visibility and popping artifacts when they overlap. See [Splat Rendering Architecture](/user-manual/gaussian-splatting/rendering-architecture) for details.

## Depth Buffer Considerations

GSplatComponents do not write to the depth buffer during rendering. This limitation means you cannot use functionality that relies on reading back or leveraging depth buffer data in your application. For example, a Depth of Field post effect, which typically requires the depth buffer, would not generally be compatible with splat rendering.

As a workaround, you can generate a mesh-based approximation of your splat and render it to the depth buffer in a separate layer (without writing to the framebuffer). This technique allows depth-dependent effects while maintaining the visual quality of the Gaussian splat rendering.
