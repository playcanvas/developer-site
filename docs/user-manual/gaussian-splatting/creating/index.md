---
title: Creating Splats
---

Gaussian Splats are 3D scenes that have been reconstructed from photogrammetry. This photogrammetry can be photographs or individual frames extracted from video. It can also be 'synthetic', where images are rendered by 3D packages such as [Blender](https://www.blender.org/), for example.

Once you have captured your photogrammetry, you are in a position to convert it into a 3D Gaussian Splat. This process can be broken down into two main steps:

1. **Structure from Motion (SfM):** Input images are analyzed to estimate original camera poses and create an initial 3D point cloud, identifying key points in the scene.
2. **Training:** The algorithm performs the following over many thousands of iterations:
    - **Adds splats** in areas that need more detail
    - **Removes splats** that don't contribute significantly
    - **Adjusts splat parameters** to better match the input images
