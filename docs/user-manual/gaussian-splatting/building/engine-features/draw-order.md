---
title: Draw Order and Sorting
---

## How Gaussians Are Sorted

Individual Gaussians within a GSplatComponent are sorted back to front based on camera depth. This sorting happens asynchronously in a Web Worker to avoid blocking the main thread. The calculated sort order is then passed back to the main thread and uploaded to the GPU for rendering.

:::note

Because the sorting occurs asynchronously, you may notice some visual lag if the camera transform changes significantly over a very short time period, as the Web Worker needs time to recalculate the new sort order.

:::

## Multiple GSplatComponents

GSplatComponents are rendered back to front based on their bounding boxes, and each component's Gaussians are sorted independently within that component.

:::info Global sorting

The PlayCanvas Engine does not currently support "global sorting" across multiple GSplatComponents (where all Gaussians from all components would be sorted together). Support for this is [currently in development](https://x.com/ValigurskyM/status/1940401991836131702). Subscribe to [this pull request](https://github.com/playcanvas/engine/pull/7825) to stay updated on progress.

:::

## Depth Buffer Considerations

GSplatComponents do not write to the depth buffer during rendering. This limitation means you cannot use functionality that relies on reading back or leveraging depth buffer data in your application. For example, a Depth of Field post effect, which typically required the depth buffer, would not generally be compatible with splat rendering.

As a workaround, you can generate a mesh-based approximation of your splat and render it to the depth buffer in a separate layer (without writing to the framebuffer). This technique allows depth-dependent effects while maintaining the visual quality of the Gaussian splat rendering.
