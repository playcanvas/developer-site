---
title: Linear Workflow
---

In modern rendering engines, a linear workflow is essential for achieving physically accurate lighting and color representation. This approach ensures that all calculations, from shading to post-processing, occur in a linear color space, preventing errors introduced by gamma-compressed textures or incorrect blending. By working in linear space and applying gamma correction only at the final output stage, we maintain consistency across lighting, textures, and effects, resulting in more realistic and predictable visuals.

In engine v1, linear workflow was limited to `StandardMaterial`, but in engine v2, it is fully integrated across all shaders and rendering stages (including `ShaderMaterial`, UI rendering, particles, and every other element) ensuring consistent, physically accurate color processing throughout.

## Shader Input and Output Handling

A proper linear workflow ensures that all color calculations in the shader occur in a physically correct manner. This requires careful handling of both inputs and outputs to maintain accuracy throughout the rendering pipeline.  

### **Shader Inputs: Ensuring Linear Data**  

Shaders require all input values to be in linear space to avoid incorrect lighting results. This affects both textures and uniform color values:  

- **Textures** that store color data (such as albedo maps) should be marked as **sRGB**. When a texture is sampled, the GPU automatically converts sRGB-encoded values into linear space, ensuring correct color calculations.  
- **Color uniforms** are automatically converted from gamma space to linear space for `StandardMaterial`, particle rendering, and other built-in rendering systems. However, when setting uniforms manually using `Material.setParameter` or `MeshInstance.setParameter`, it is the caller's responsibility to ensure the values are provided in linear space. This is especially critical for `ShaderMaterial`, where all parameters must be explicitly defined using `setParameter`. To assist with this, the `Color` class provides the `Color.linear()` function, which converts gamma-space colors to linear space.  

Once all inputs are in linear space, the shader performs lighting calculations with physically accurate results.  

### **Shader Output: Managing Gamma Correction**  

When writing the final color output, the handling of gamma correction depends on whether the rendering is LDR (Low Dynamic Range) or HDR (High Dynamic Range):  

- **LDR Rendering**: Colors are gamma corrected immediately in the shader before being written to the render target, ensuring they are displayed correctly on standard monitors.  
- **HDR Rendering**: Colors remain in linear space when written to the render target, typically requiring a **floating-point format** (e.g., `RGBA16F` or `RGBA32F`) to preserve precision and avoid banding. Gamma correction is then applied later, usually at the final tone-mapping or post-processing stage, allowing effects such as bloom and color grading to work with high-precision linear HDR colors.  

This structured approach ensures that lighting, blending, and post-processing operate consistently, leading to more realistic and predictable rendering results.
