---
title: What is Gaussian Splatting?
---

3D Gaussian Splatting is a novel approach to representing and rendering 3D scenes that has revolutionized photorealistic reconstruction. Instead of using traditional geometric representations like meshes or voxels, Gaussian Splatting represents scenes as collections of 3D Gaussian functions (or "splats") that can be efficiently rendered to produce highly detailed, photorealistic images.

## The Fundamentals

### What is a Gaussian Splat?

A Gaussian splat is a 3D ellipsoid defined by:

- **Position (x, y, z)** - The center point of the splat in 3D space
- **Covariance matrix** - Defines the size, orientation, and shape of the ellipsoid
- **Color (RGB)** - The color contribution of the splat
- **Opacity (α)** - How transparent or opaque the splat is

Each splat can be thought of as a small, semi-transparent cloud of color that contributes to the final rendered image. When millions of these splats are combined, they create detailed 3D scenes.

### Why Gaussian Functions?

Gaussian functions are chosen because they have several advantageous properties:

1. **Smooth falloff** - They fade smoothly from the center to the edges
2. **Differentiable** - Essential for optimization during training
3. **Efficient rendering** - Can be rasterized quickly on modern GPUs
4. **Compact representation** - Each splat requires only a small amount of data

## Applications and Use Cases

### Ideal Scenarios

Gaussian Splatting excels in:

- **Real-world scene capture** - Museums, historical sites, architectural spaces
- **Product visualization** - Detailed object representation for e-commerce
- **Game environments** - Photorealistic backgrounds and static geometry
- **Virtual tourism** - Immersive exploration of real locations
- **Film and media** - Digital set extensions and virtual production

### Limitations

Gaussian Splatting is less suitable for:

- **Animated content** - Each frame would require separate training
- **Procedural geometry** - Traditional meshes are more flexible for generated content
- **Interactive objects** - Editing and deformation are challenging

Understanding these fundamentals will help you make informed decisions about when and how to use Gaussian Splatting in your PlayCanvas projects. Next, let's explore how to [create your own splat data](creating/index.md).
