---
title: Custom Shaders
---

The PlayCanvas Engine supports custom shaders for Gaussian Splats, allowing you to create advanced visual effects and customize the rendering behavior beyond the standard implementation.

## Introduction

There are two ways to customize Gaussian Splat rendering with shaders:

1. **Shader Chunk Customization (Recommended)** - Override the `gsplatModifyVS` shader chunk to customize splat position, size, and color. This allows you to override only the relevant parts of the shader while leaving the core shader functionality intact.

2. **Full Shader Replacement** - Replace the entire vertex and fragment shaders for complete control. This provides maximum flexibility but requires understanding the full shader implementation.

Most use cases can be accomplished with shader chunk customization, which is covered in detail below.

**[View Live Example](https://playcanvas.vercel.app/#/gaussian-splatting/multi-splat)** - See shader chunk customization in action with animated splats.

## API Reference

The `gsplatModifyVS` shader chunk allows you to override three functions that customize how splats are rendered:

### modifySplatCenter

Transform the position of splat centers in model space.

**GLSL:**

```glsl
void modifySplatCenter(inout vec3 center)
```

**WGSL:**

```wgsl
fn modifySplatCenter(center: ptr<function, vec3f>)
```

**Parameters:**

- `center` - The splat center position in model space

**Example:**

```glsl
// Offset all splats up by 1 unit
void modifySplatCenter(inout vec3 center) {
    center.y += 1.0;
}
```

### modifySplatRotationScale

Modify the splat size and shape by adjusting the rotation quaternion and scale vector. This is more efficient than working with covariance matrices directly.

**GLSL:**

```glsl
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale)
```

**WGSL:**

```wgsl
fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>)
```

**Parameters:**

- `originalCenter` - The original splat center position before modification
- `modifiedCenter` - The splat center position after `modifySplatCenter()` was applied
- `rotation` - Quaternion (x, y, z, w) representing the splat's rotation
- `scale` - Scale vector representing the splat's size in each axis

**Example:**

```glsl
// Scale all splats by 2x
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    scale *= 2.0;
}
```

### modifySplatColor

Transform splat colors and opacity.

**GLSL:**

```glsl
void modifySplatColor(vec3 center, inout vec4 color)
```

**WGSL:**

```wgsl
fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>)
```

**Parameters:**

- `center` - The splat center position (after `modifySplatCenter()` was applied)
- `color` - The splat color (RGBA)

**Example:**

```glsl
// Darken all splats by 50%
void modifySplatColor(vec3 center, inout vec4 color) {
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
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);

// Update the material to recompile with the new shader
gsplatMaterial.update();
```

### GLSL Example: Position and Color Animation

```javascript
const customShader = `
uniform float uTime;

void modifySplatCenter(inout vec3 center) {
    // Create a wave effect based on height
    float heightIntensity = center.y * 0.2;
    center.x += sin(uTime * 5.0 + center.y) * 0.3 * heightIntensity;
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // No modification to size
}

void modifySplatColor(vec3 center, inout vec4 color) {
    // Add a golden tint to the wave peaks
    float sineValue = abs(sin(uTime * 5.0 + center.y));
    vec3 gold = vec3(1.0, 0.85, 0.0);
    float blend = smoothstep(0.9, 1.0, sineValue);
    color.rgb = mix(color.rgb, gold, blend);
}
`;

// Set the custom shader chunk override on the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);
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

fn modifySplatCenter(center: ptr<function, vec3f>) {
    // Create a wave effect based on height
    let heightIntensity = (*center).y * 0.2;
    (*center).x += sin(uniform.uTime * 5.0 + (*center).y) * 0.3 * heightIntensity;
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    // No modification to size
}

fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    // Add a golden tint to the wave peaks
    let sineValue = abs(sin(uniform.uTime * 5.0 + center.y));
    let gold = vec3f(1.0, 0.85, 0.0);
    let blend = smoothstep(0.9, 1.0, sineValue);
    (*color) = vec4f(mix((*color).rgb, gold, blend), (*color).a);
}
`;

// Set the custom shader chunk override on the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).set('gsplatModifyVS', customShader);
gsplatMaterial.update();
```

### Removing Custom Shaders

To remove a custom shader and revert to default rendering:

```javascript
// Remove the custom shader chunk override from the gsplat material
const shaderLanguage = app.graphicsDevice.isWebGPU ? 'wgsl' : 'glsl';
gsplatMaterial.getShaderChunks(shaderLanguage).delete('gsplatModifyVS');
gsplatMaterial.update();
```

## Helper Functions

The following helper functions are available in `modifySplatRotationScale()` for manipulating splat size and shape:

### gsplatGetSizeFromScale

Extract the current size of a splat from its scale vector.

**GLSL:**

```glsl
float gsplatGetSizeFromScale(vec3 scale)
```

**WGSL:**

```wgsl
fn gsplatGetSizeFromScale(scale: vec3f) -> f32
```

**Example:**

```glsl
// Clamp splat size to a specific range
float size = gsplatGetSizeFromScale(scale);
float newSize = clamp(size, 0.01, 0.5);
scale *= newSize / size;
```

### gsplatMakeSpherical

Make splats spherical with a specific radius.

**GLSL:**

```glsl
void gsplatMakeSpherical(inout vec3 scale, float radius)
```

**WGSL:**

```wgsl
fn gsplatMakeSpherical(scale: ptr<function, vec3f>, radius: f32)
```

**Example:**

```glsl
// Make all splats perfectly spherical with uniform size
float size = gsplatGetSizeFromScale(scale);
gsplatMakeSpherical(scale, size * 0.5);

// Or hide a splat by setting scale to zero
scale = vec3(0.0);
```

### Direct Scale Manipulation

Since the new API provides direct access to the scale vector, you can easily modify splat sizes:

```glsl
// Double the size of all splats
scale *= 2.0;

// Scale non-uniformly
scale.x *= 2.0;  // Stretch horizontally

// Hide a splat
scale = vec3(0.0);
```

## Examples

Here are some examples demonstrating different custom shader techniques:

### Animation Effects

[**Simple Sinusoidal Animation**](https://playcanvas.github.io/#/gaussian-splatting/multi-splat) - **Uses Shader Chunk Customization** - Applies a simple shader to animate Gaussian color and position using a sine wave. This example demonstrates how to create dynamic, procedural motion effects by modifying splat properties in real-time.

### Transition Effects

[**3D Gaussian Splat Statues**](https://playcanvas.com/project/1224723/overview/3d-gaussian-splat-statues) - **Uses Full Shader Replacement** - Uses custom shaders to transition splats on and off screen via a hot, plasma-type effect. This showcases how custom shaders can create dramatic visual transitions and material effects.

### Lighting and Relighting

[**3DGS with Physics and Relighting**](https://playcanvas.com/project/1358087/overview/3dgs-with-physics-and-relighting) - **Uses Full Shader Replacement** - Uses custom shaders to relight a splat to implement a night mode with multiple moving point light sources. This example demonstrates advanced lighting techniques and how to dynamically modify splat appearance based on scene lighting conditions.
