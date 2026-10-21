---
title: Recommended Tools
description: "Third-party tools to train and export Gaussian splats: comparison table, capture apps, and research pipelines PlayCanvas does not ship."
---

PlayCanvas does not itself provide a tool to turn photos or video into a Gaussian splat. But there is a healthy variety of third-party tools for you to choose from, each with its own strengths and weaknesses.

## Quick Comparison

| Tool | Difficulty | Platforms | Cost | Open Source | Primary Use | Requirements |
|------|------------|-----------|------| :-----: |-------------|--------------|
| [**Polycam**](https://poly.cam/) | Easy | iOS, Android, Web | Freemium | ❌ | Capture + Training | Mobile device |
| [**Scaniverse**](https://scaniverse.com/) | Easy | iOS, Android, Web | Freemium | ❌ | Capture + Training | Mobile device |
| [**RealityScan**](https://www.realityscan.com/) | Medium | Win | Free* | ❌ | Camera Poses | |
| [**Postshot**](https://www.jawset.com/) | Medium | Win | Freemium† | ❌ | Camera Poses + Training | CUDA GPU |
| [**LichtFeld Studio**](https://lichtfeld.io/) | Medium | Win, Linux | Free source / Paid installer | ✔️ | Training | CUDA GPU |
| [**Spirula Studio**](https://github.com/harry7557558/spirula-studio) | Medium | Win, Linux, macOS | Free | ✔️ | Camera Poses + Training | |
| [**Brush**](https://github.com/ArthurBrussee/brush) | Medium | Win, Linux, macOS, Android, Web | Free | ✔️ | Training | |
| [**COLMAP**](https://colmap.github.io/) | Advanced | Win, Linux, macOS | Free | ✔️ | Camera Poses | |
| [**nerfstudio**](https://docs.nerf.studio/) | Advanced | Linux, Win | Free | ✔️ | Research/Training | CUDA GPU |
| [**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) | Advanced | Win, Linux | Free (non-commercial) | ❌ | Research/Reference | CUDA GPU |

*_RealityScan is free for commercial use for individuals and companies with less than $1 million USD in annual gross revenue._

†_Postshot's free plan is for non-commercial use and cannot export splats._

## Easy/Consumer Tools

These tools are designed for users who want to create Gaussian splats quickly without technical expertise:

[**Polycam**](https://poly.cam/) (iOS, Android, Web)  
Commercial capture app and web platform for creating Gaussian splats from photos or video, with built-in editing tools and easy sharing. The number of images per capture depends on your plan, from 150 on the free tier up to 2,000 on Business.

:::important

Choose the **PLY** format when you download a splat capture from Polycam.

:::

[**Scaniverse**](https://scaniverse.com/) (iOS, Android, Web)  
Capture app from Niantic Spatial that trains Gaussian splats on the device itself, with unlimited on-device capture and processing on the free tier. Paid plans add cloud processing, including splats from 360° camera video. Exports PLY as well as the compressed [SPZ](../formats/spz.md) format, which PlayCanvas loads directly.

## Medium/Pro Tools

These tools offer more control and customization than consumer capture apps while keeping setup manageable for professional workflows:

[**RealityScan**](https://www.realityscan.com/) (Windows)  
Desktop application from Epic Games for camera alignment and sparse point cloud generation. It does not train splats itself, but its camera poses (exported in COLMAP format) are the foundation for splat training in tools like Postshot, LichtFeld Studio, and Brush. Alignment runs without a CUDA GPU; only RealityScan's meshing and texturing stages need a supported GPU.

[**Postshot**](https://www.jawset.com/) (Windows)  
Commercial desktop application that handles both camera tracking and splat training on-device, with quick results and a user-friendly interface. Exports PLY or the compressed SPZ format. The free plan is non-commercial and cannot export splats, so you need a paid plan to bring results into PlayCanvas. Requires an NVIDIA GPU with compute capability 7.5 or higher (RTX 2060 or newer).

[**LichtFeld Studio**](https://lichtfeld.io/) (Windows, Linux)  
Open-source desktop application to train, edit, and render 3D Gaussian Splats. Includes an editing suite with transform, crop, and selection tools. It trains from existing COLMAP datasets rather than computing camera poses itself, and exports PLY, SOG, and SPZ. The [SuperSplat plugin for LichtFeld Studio](https://github.com/playcanvas/supersplat-lichtfeld-plugin) publishes scenes straight to SuperSplat. Requires an NVIDIA GPU with CUDA 12.8+.

[**Spirula Studio**](https://github.com/harry7557558/spirula-studio) (Windows, Linux, macOS)  
Open source desktop application that goes from photos or video to a trained splat in one self-contained binary, with frame extraction, structure-from-motion, and AI masking built in. It runs on NVIDIA, AMD, Intel, and Apple Silicon GPUs via Vulkan, so it does not need CUDA, and handles fisheye and 360° cameras natively. It can also train from existing COLMAP, Nerfstudio, or Metashape datasets, and exports PLY.

[**Brush**](https://github.com/ArthurBrussee/brush) (Windows, Linux, macOS, Android, Web)  
Open source, cross-platform engine with broad device compatibility. Uses WebGPU-based rendering, offers real-time training visualization, has no CUDA dependency, supports browsers, and works on mobile devices. It expects existing camera poses from COLMAP or Nerfstudio-format datasets; it does not generate camera poses itself.

## Advanced/Technical Tools

These tools are flexible low-level or research-oriented workflows for users comfortable with more complex setup and command-line tools:

[**COLMAP**](https://colmap.github.io/) (Windows, Linux, macOS)  
Open source Structure-from-Motion (SfM) pipeline for camera alignment and sparse point cloud generation. Provides cross-platform compatibility, high-quality reconstruction, command-line and GUI interfaces, and serves as the foundation for splat training in many workflows. Particularly valuable for users on non-Windows systems.

[**nerfstudio**](https://docs.nerf.studio/) (Linux, Windows)  
Open source research framework for NeRF and Gaussian splat methods; its splat method is called Splatfacto. Command-line driven and highly configurable, it can compute camera poses with COLMAP during data processing and exports trained splats to PLY. Linux is the primary platform and Windows support is less tested. Requires a CUDA GPU.

[**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) (Windows, Linux)  
Original reference implementation from the 3D Gaussian Splatting paper. Depends on COLMAP for camera poses. Provides research-grade quality and full parameter control, but requires a complex setup and a CUDA GPU (24 GB of VRAM for paper-quality results), so it is best used for experimentation. The source code is public, but its license permits research and evaluation only, not commercial use.

## Outputting a PLY File

Every tool on this page that trains splats can export the result as a PLY file. COLMAP and RealityScan only produce the camera poses and point clouds that those trainers start from. PLY is the standard interchange format for 3D Gaussian Splats, so you can move your scenes between different applications and workflows. To learn what these files contain and how to work with them, see [PLY format](../formats/ply.md).
