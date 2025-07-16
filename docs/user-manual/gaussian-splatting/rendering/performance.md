---
title: Performance
sidebar_position: 5
---

Rendering splats can be expensive on both the CPU and GPU. Here are some strategies to achieve good performance:

## Limit Gaussian Count

Be mindful of the number of Gaussians in your scene since every Gaussian is sorted on camera depth every frame. You can check the number contained within a particular GSplat asset by using the [Inspector](../../assets/types/gsplat.md#asset-inspector). Use SuperSplat to trim unwanted Gaussians from your PLY files.

## Configure Scene Settings

- Disable `Anti-Alias`. Anti-aliasing is GPU intensive and offers little benefit for rendering splats.
- Disable `Device Pixel Ratio`. This will reduce the overall number of pixels that the GPU has to process.
