---
title: Recommended Tools
sidebar_position: 2
---

PlayCanvas does not itself provide a tool to convert photogrammetry into a Gaussian splat. But there is a healthy variety of third-party tools for you to choose from, each with their strengths and weaknesses.

## Easy/Consumer Tools

These tools are designed for users who want to create Gaussian splats quickly without technical expertise:

[**Polycam**](https://poly.cam/) (iOS, Android, Web)  
Commercial platform with user-friendly interface for creating Gaussian splats. Features include free tier with limitations, pro tiers for higher quality, support for up to 2000 images, built-in editing tools, and easy sharing and export.

:::important

Select **splat PLY** on export from Polycam.

:::

[**Luma AI**](https://lumalabs.ai/app) (iOS, Android, Web)  
AI-powered cloud service with mobile app for easy capture. Offers mobile app for capture, cloud processing, high-quality results, video input support, and game engine integration.

:::important

Select **Gaussian Splat** on export from Luma and extract the PLY file from the downloaded ZIP file.

:::

## Advanced/Pro Tools

These tools offer more control and customization but require technical knowledge:

[**RealityScan**](https://www.realityscan.com/) (Windows)  
Desktop application for camera alignment and sparse point cloud generation, which become the foundation for splat training in tools like PostShot. Requires a CUDA-enabled GPU.

[**Postshot**](https://www.jawset.com/) (Windows)  
Desktop application for creating Gaussian splats with advanced features. Provides on-device processing, quick results, user-friendly interface. Requires a CUDA-enabled GPU.

[**Brush**](https://github.com/ArthurBrussee/brush) (Windows, Linux, macOS, Android, Web)  
Open source, cross-platform engine with broad device compatibility. Uses WebGPU-based rendering, offers real-time training visualization, has no CUDA dependency, supports browsers, and works on mobile devices.

[**nerfstudio**](https://docs.nerf.studio/) (Windows, Linux, macOS)  
Open source research framework for training various splat models. Features command-line interface, multiple model types, highly customizable settings, research-oriented approach, and active development community.

[**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) (Windows, Linux)  
Original reference implementation from the 3D Gaussian Splatting paper. Provides research-grade quality, CUDA acceleration, full parameter control, though requires complex setup and is best used for experimentation.

## Outputting a PLY File

All of these tools can output trained Gaussian splat scenes in the PLY file format. The PLY format serves as the standard interchange format for 3D Gaussian Splats, making it possible to move your creations between different applications and workflows. To better understand what these tools are producing and how to work with the resulting files effectively, let's explore the [PLY format](ply-format.md) in detail.
