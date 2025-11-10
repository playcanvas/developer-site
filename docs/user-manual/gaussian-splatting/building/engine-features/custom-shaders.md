---
title: Custom Shaders
---

The PlayCanvas Engine supports custom shaders for Gaussian Splats, allowing you to create advanced visual effects and customize the rendering behavior beyond the standard implementation.

## Introduction

There are two ways to customize Gaussian Splat rendering with shaders:

1. **Shader Chunk Customization (Recommended)** - Override the `gsplatCustomizeVS` shader chunk to customize splat position, size, and color. This allows you to override only the relevant parts of the shader while leaving the core shader functionality intact.

2. **Full Shader Replacement** - Replace the entire vertex and fragment shaders for complete control. This provides maximum flexibility but requires understanding the full shader implementation.

Most use cases can be accomplished with shader chunk customization, which is covered in detail below.

**[View Live Example](https://playcanvas.vercel.app/#/gaussian-splatting/multi-splat)** - See shader chunk customization in action with animated splats.

## API Reference

The `gsplatCustomizeVS` shader chunk allows you to override three functions that customize how splats are rendered:

### modifyCenter

Transform the position of splat centers in model space.

**GLSL:**

```glsl
void modifyCenter(inout vec3 center)
```

**WGSL:**

```wgsl
fn modifyCenter(center: ptr<function, vec3f>)
```

**Parameters:**

- `center` - The splat center position in model space

**Example:**

```glsl
// Offset all splats up by 1 unit
void modifyCenter(inout vec3 center) {
    center.y += 1.0;
}
```

### modifyCovariance

Modify the splat size and shape by adjusting covariance values.

**GLSL:**

```glsl
void modifyCovariance(vec3 originalCenter, vec3 modifiedCenter, inout vec3 covA, inout vec3 covB)
```

**WGSL:**

```wgsl
fn modifyCovariance(originalCenter: vec3f, modifiedCenter: vec3f, covA: ptr<function, vec3f>, covB: ptr<function, vec3f>)
```

**Parameters:**

- `originalCenter` - The original splat center position before modification
- `modifiedCenter` - The splat center position after `modifyCenter()` was applied
- `covA`, `covB` - Covariance values that define splat size and orientation

**Example:**

```glsl
// Scale all splats by 2x
void modifyCovariance(vec3 originalCenter, vec3 modifiedCenter, inout vec3 covA, inout vec3 covB) {
    gsplatApplyUniformScale(covA, covB, 2.0);
}
```

### modifyColor

Transform splat colors and opacity.

**GLSL:**

```glsl
void modifyColor(vec3 center, inout vec4 color)
```

**WGSL:**

```wgsl
fn modifyColor(center: vec3f, color: ptr<function, vec4f>)
```

**Parameters:**

- `center` - The splat center position (after `modifyCenter()` was applied)
- `color` - The splat color (RGBA)

**Example:**

```glsl
// Darken all splats by 50%
void modifyColor(vec3 center, inout vec4 color) {
    color.rgb *= 0.5;
}
```

## Usage Examples

### Basic Setup

To apply a custom shader chunk to a Gaussian Splat material:

```javascript
// Get the shader language for the current device
const shaderLanguage = device.isWebGPU ? 'wgsl' : 'glsl';

// Define your custom shader code
const customShader = `
    // Your shader functions here
`;

// Set the custom shader chunk override on the gsplat material
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatCustomizeVS', customShader);

// Update the material to recompile with the new shader
gsplatMaterial.update();
```

### GLSL Example: Position and Color Animation

```javascript
const customShader = `
uniform float uTime;

void modifyCenter(inout vec3 center) {
    // Create a wave effect based on height
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifyCovariance(vec3 originalCenter, vec3 modifiedCenter, inout vec3 covA, inout vec3 covB) {
    // No modification to size
}

void modifyColor(vec3 center, inout vec4 color) {
    // Add a golden tint to the wave peaks
    float sineValue = abs(sin(uTime * 5.0 + center.y));
    vec3 gold = vec3(1.0, 0.85, 0.0);
    float blend = smoothstep(0.9, 1.0, sineValue);
    color.rgb = mix(color.rgb, gold, blend);
}
`;

// Set the custom shader chunk override on the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatCustomizeVS', customShader);
gsplatMaterial.update();

// Update the uniform each frame
const uTime = app.graphicsDevice.scope.resolve('uTime');
let time = 0;
app.on('update', (dt) => {
    time += dt;
    uTime.setValue(time);
});
```

### WGSL Example: Position and Color Animation

```javascript
const customShader = `
uniform uTime: f32;

fn modifyCenter(center: ptr<function, vec3f>) {
    // Create a wave effect based on height
    let heightIntensity = (*center).y * 0.2;
    (*center).x += sin(uniform.uTime * 5.0 + (*center).y) * 0.3 * heightIntensity;
}

fn modifyCovariance(originalCenter: vec3f, modifiedCenter: vec3f, covA: ptr<function, vec3f>, covB: ptr<function, vec3f>) {
    // No modification to size
}

fn modifyColor(center: vec3f, color: ptr<function, vec4f>) {
    // Add a golden tint to the wave peaks
    let sineValue = abs(sin(uniform.uTime * 5.0 + center.y));
    let gold = vec3f(1.0, 0.85, 0.0);
    let blend = smoothstep(0.9, 1.0, sineValue);
    (*color) = vec4f(mix((*color).rgb, gold, blend), (*color).a);
}
`;

// Set the custom shader chunk override on the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatCustomizeVS', customShader);
gsplatMaterial.update();
```

### Removing Custom Shaders

To remove a custom shader and revert to default rendering:

```javascript
// Remove the custom shader chunk override from the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).delete('gsplatCustomizeVS');
gsplatMaterial.update();
```

## Helper Functions

The following helper functions are available in `modifyCovariance()` for manipulating splat size and shape:

### gsplatApplyUniformScale

Scale splats uniformly by a factor.

**GLSL:**

```glsl
void gsplatApplyUniformScale(inout vec3 covA, inout vec3 covB, float scale)
```

**WGSL:**

```wgsl
fn gsplatApplyUniformScale(covA: ptr<function, vec3f>, covB: ptr<function, vec3f>, scale: f32)
```

**Example:**

```glsl
// Double the size of all splats
gsplatApplyUniformScale(covA, covB, 2.0);
```

### gsplatExtractSize

Extract the current size of a splat.

**GLSL:**

```glsl
float gsplatExtractSize(vec3 covA, vec3 covB)
```

**WGSL:**

```wgsl
fn gsplatExtractSize(covA: vec3f, covB: vec3f) -> f32
```

**Example:**

```glsl
// Clamp splat size to a specific range
float size = gsplatExtractSize(covA, covB);
float newSize = clamp(size, 0.01, 0.5);
gsplatApplyUniformScale(covA, covB, newSize / size);
```

### gsplatMakeRound

Make splats round/spherical with a specific radius.

**GLSL:**

```glsl
void gsplatMakeRound(inout vec3 covA, inout vec3 covB, float radius)
```

**WGSL:**

```wgsl
fn gsplatMakeRound(covA: ptr<function, vec3f>, covB: ptr<function, vec3f>, radius: f32)
```

**Example:**

```glsl
// Make all splats perfectly round with uniform size
float size = gsplatExtractSize(covA, covB);
gsplatMakeRound(covA, covB, size * 0.5);

// Or hide a splat by setting radius to 0
gsplatMakeRound(covA, covB, 0.0);
```

## Examples

Here are some examples demonstrating different custom shader techniques:

### Animation Effects

[**Simple Sinusoidal Animation**](https://playcanvas.github.io/#/gaussian-splatting/multi-splat) - **Uses Shader Chunk Customization** - Applies a simple shader to animate Gaussian color and position using a sine wave. This example demonstrates how to create dynamic, procedural motion effects by modifying splat properties in real-time.

### Transition Effects

[**3D Gaussian Splat Statues**](https://playcanvas.com/project/1224723/overview/3d-gaussian-splat-statues) - **Uses Full Shader Replacement** - Uses custom shaders to transition splats on and off screen via a hot, plasma-type effect. This showcases how custom shaders can create dramatic visual transitions and material effects.

### Lighting and Relighting

[**3DGS with Physics and Relighting**](https://playcanvas.com/project/1358087/overview/3dgs-with-physics-and-relighting) - **Uses Full Shader Replacement** - Uses custom shaders to relight a splat to implement a night mode with multiple moving point light sources. This example demonstrates advanced lighting techniques and how to dynamically modify splat appearance based on scene lighting conditions.
