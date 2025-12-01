---
title: Graphics
---

PlayCanvas incorporates an advanced graphics engine that delivers high-performance 3D rendering on the web. The engine provides both [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) and [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) support, ensuring compatibility across all modern browsers while offering cutting-edge graphics capabilities.

## Graphics Engine Backends

The PlayCanvas engine supports multiple graphics backends:

* **WebGPU (Beta)** - Next-generation graphics API with reduced driver overhead and compute shader support
* **WebGL 2.0** - Mature and [widely supported](https://caniuse.com/webgl2) across all browsers and devices
* **Null** - For running the engine in headless environments such as Node.

:::note[Automatic fallback]

The engine will seamlessly fall back from WebGPU to WebGL based on browser support.

:::

## Key Rendering Features

### Physically Based Rendering (PBR)

* Comprehensive PBR support via metallic/roughness and specular/glossiness workflows
* Energy conservation and physically accurate lighting models
* Support for clearcoat, anisotropy, sheen, and transmission materials

### Advanced Lighting

* **Clustered lighting system** - Efficient handling of hundreds of dynamic lights
* **Directional, point, and spot lights** with configurable shadows and cookies
* **Area lights** - Rectangle, disk, and sphere-shaped light sources for realistic lighting
* **Image-based lighting (IBL)** with HDR environment maps
* **Runtime lightmap generation** for static lighting optimization

### High Dynamic Range (HDR) Rendering

* **Linear workflow** with automatic gamma correction
* **HDR display output** support on compatible devices
* **Advanced tone mapping** operators including ACES, Neutral, and Linear
* **CameraFrame system** for comprehensive post-processing pipeline

### Modern Rendering Pipeline

* **Render passes architecture** enabling advanced effects
* **Multiple render targets (MRT)** support
* **Depth pre-pass** and **temporal anti-aliasing (TAA)**
* **Hardware instancing** for efficient rendering of repeated geometry
* **Static and dynamic batching** to reduce draw calls

### Post-Processing Effects

The CameraFrame system provides a full suite of post-processing effects:

* **HDR Bloom** with physically accurate light bleeding
* **Screen Space Ambient Occlusion (SSAO)**
* **Depth of Field (DoF)** with bokeh effects
* **Temporal Anti-Aliasing (TAA)** for smooth edges
* **Vignette, sepia, brightness/contrast** and color grading

### Advanced Rendering Techniques

* **3D Gaussian Splatting** for photorealistic scene reconstruction
* **Hardware-accelerated particles** for special effects
* **Mesh skinning and morphing** for character animation
* **Procedural geometry generation** with optimized primitives
* **Texture compression** courtesy of Basis Universal

### Custom Shaders

* **Flexible shader system** supporting both GLSL (WebGL) and WGSL (WebGPU)
* **Automatic shader generation** with chunk-based composition
* **Preprocessor support** for shader variants and includes
* **WebGPU compute shaders** for GPU-accelerated computation

The graphics engine is continuously updated to leverage the latest web standards and hardware capabilities, ensuring PlayCanvas applications deliver exceptional visual quality and performance across all platforms.
