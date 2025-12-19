---
title: Compute Shaders
---

Compute shaders are programs that run general-purpose computations on the GPU, independent of the rendering pipeline. Unlike vertex and fragment shaders, compute shaders are not tied to geometry or pixels—they operate on arbitrary data, making them ideal for tasks such as particle simulation, image processing, physics calculations, and procedural content generation.

:::warning

Compute shaders are only supported on the **WebGPU** platform. They are not available when using WebGL.

:::

## Checking for Support

Before using compute shaders, verify that the device supports them:

```javascript
if (device.supportsCompute) {
    // Compute shaders are available
}
```

## Creating a Compute Shader

A compute shader is created using the `Shader` class with WGSL code. The shader definition includes the compute shader source (`cshader`), bind group format, and optionally uniform buffer formats.

### Basic Shader Definition

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        @compute @workgroup_size(1, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            // Compute shader logic here
        }
    `,
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        // Resource bindings go here
    ])
});
```

By default, the engine expects the entry point function to be named `main`. You can use `computeEntryPoint` to specify a different function name, which also allows a single shader source to contain multiple entry points:

```javascript
const shaderSource = `
    @compute @workgroup_size(64, 1, 1)
    fn initParticles(@builtin(global_invocation_id) global_id: vec3u) {
        // Initialize particles
    }

    @compute @workgroup_size(64, 1, 1)
    fn updateParticles(@builtin(global_invocation_id) global_id: vec3u) {
        // Update particles
    }
`;

// Create separate shaders from the same source, each using a different entry point
const initShader = new pc.Shader(device, {
    name: 'InitParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'initParticles',
    // ...
});

const updateShader = new pc.Shader(device, {
    name: 'UpdateParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'updateParticles',
    // ...
});
```

### Bind Group Format

The `computeBindGroupFormat` defines what resources are available to the compute shader. You can bind various types of resources:

#### Storage Buffers

Storage buffers allow read/write access to large amounts of data:

```javascript
// Read-write storage buffer
new pc.BindStorageBufferFormat('particles', pc.SHADERSTAGE_COMPUTE)

// Read-only storage buffer
new pc.BindStorageBufferFormat('spheres', pc.SHADERSTAGE_COMPUTE, true)
```

In WGSL, access storage buffers like this:

```wgsl
@group(0) @binding(0) var<storage, read_write> particles: array<f32>;
@group(0) @binding(1) var<storage, read> spheres: array<vec4f>;
```

#### Storage Textures

Storage textures allow the compute shader to write directly to a texture:

```javascript
new pc.BindStorageTextureFormat('outTexture', pc.PIXELFORMAT_RGBA8, pc.TEXTUREDIMENSION_2D)
```

In WGSL:

```wgsl
@group(0) @binding(0) var outputTexture: texture_storage_2d<rgba8unorm, write>;

// Writing to the texture
textureStore(outputTexture, vec2i(global_id.xy), color);
```

#### Input Textures

Input textures provide read-only texture data. The last parameter controls whether a sampler is included:

```javascript
// Texture without sampler (for textureLoad)
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, false)

// Texture with sampler (for textureSampleLevel)
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, true)
```

In WGSL, when a sampler is included, it uses the texture name with a `_sampler` suffix:

```wgsl
// Without sampler - use textureLoad for direct texel access
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
let color = textureLoad(inputTexture, position, 0);

// With sampler - use textureSampleLevel for filtered sampling
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputTexture_sampler: sampler;
let color = textureSampleLevel(inputTexture, inputTexture_sampler, uv, 0.0);
```

:::note

In compute shaders, use `textureSampleLevel` instead of `textureSample` because you must explicitly specify the mip level (LOD).

:::

#### Uniform Buffers

For passing uniform data to compute shaders, first define the uniform buffer format:

```javascript
const uniformBufferFormat = new pc.UniformBufferFormat(device, [
    new pc.UniformFormat('tint', pc.UNIFORMTYPE_VEC4),
    new pc.UniformFormat('time', pc.UNIFORMTYPE_FLOAT),
    new pc.UniformFormat('count', pc.UNIFORMTYPE_UINT)
]);
```

Then include it in the shader definition along with the bind group:

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,

    // Assign the uniform buffer format
    computeUniformBufferFormats: {
        ub: uniformBufferFormat
    },

    // Include uniform buffer in bind group
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        new pc.BindUniformBufferFormat('ub', pc.SHADERSTAGE_COMPUTE),
        // ... other bindings
    ])
});
```

In WGSL:

```wgsl
struct ub_compute {
    tint: vec4f,
    time: f32,
    count: u32
}

@group(0) @binding(0) var<uniform> ubCompute: ub_compute;

@compute @workgroup_size(1, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let t = ubCompute.time;
    let c = ubCompute.count;
}
```

## Creating a Compute Instance

The `Compute` class represents an executable instance of a compute shader with its associated parameters:

```javascript
const compute = new pc.Compute(device, shader, 'MyComputeInstance');
```

## Setting Parameters

Use `setParameter` to bind resources and set uniform values:

```javascript
// Bind a storage buffer
compute.setParameter('particles', storageBuffer);

// Bind a texture
compute.setParameter('inputTexture', texture);

// Set uniform values
compute.setParameter('time', 1.5);
compute.setParameter('count', 1024);
compute.setParameter('tint', [1.0, 0.5, 0.0, 1.0]);
```

## Creating Storage Buffers

Storage buffers hold data that compute shaders can read from and write to:

```javascript
const storageBuffer = new pc.StorageBuffer(
    device,
    bufferSizeInBytes,
    pc.BUFFERUSAGE_COPY_SRC |  // Enable reading back to CPU
    pc.BUFFERUSAGE_COPY_DST    // Enable writing from CPU
);

// Write initial data
const data = new Float32Array([...]);
storageBuffer.write(0, data);

// Clear the buffer
storageBuffer.clear();
```

## Creating Storage Textures

Storage textures are created with the `storage: true` option:

```javascript
const storageTexture = new pc.Texture(device, {
    name: 'StorageTexture',
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    storage: true  // Enable as storage texture
});
```

## Dispatching Compute Shaders

To execute a compute shader, first set up the dispatch dimensions, then dispatch:

```javascript
// Set up dispatch dimensions (number of workgroups in X, Y, Z)
compute.setupDispatch(width, height, 1);

// Dispatch the compute shader
device.computeDispatch([compute], 'MyDispatch');
```

Multiple compute shaders can be dispatched together in a single compute pass:

```javascript
compute1.setupDispatch(64, 64);
compute2.setupDispatch(128, 128);
device.computeDispatch([compute1, compute2], 'BatchedDispatch');
```

### Workgroup Size

The total number of invocations is `dispatchSize × workgroupSize`. For example, if you dispatch with `(width, height)` and your shader has `@workgroup_size(1, 1, 1)`, you get `width × height` invocations.

For better performance with large datasets, use larger workgroup sizes:

```wgsl
@compute @workgroup_size(64, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    // Process element at global_id.x
}
```

Then dispatch accordingly:

```javascript
const numElements = 1024 * 1024;
const workgroupSize = 64;
compute.setupDispatch(numElements / workgroupSize);
```

## Reading Data Back to CPU

To read results from a storage buffer back to the CPU:

```javascript
const resultData = new Float32Array(numElements);
storageBuffer.read(0, undefined, resultData).then((data) => {
    // Process the data
    console.log('First value:', data[0]);
});
```

Note that `read()` returns a Promise because GPU operations are asynchronous. The data will be available after the GPU finishes executing the compute shader, which may be several frames later.

For time-critical reads, you can pass `immediate: true` as the fourth parameter:

```javascript
storageBuffer.read(0, undefined, resultData, true).then((data) => {
    // Data available sooner, but with performance cost
});
```

By default (`immediate: false`), the read is deferred to the next event handling cycle when the GPU command buffer is naturally submitted. With `immediate: true`, the command buffer is submitted immediately and the read executes right away.

:::warning

Using `immediate: true` has a performance impact as it forces an early command buffer submission. Only use it when low-latency reads are essential.

:::

## Preprocessor

Compute shaders support the same [shader preprocessor](/user-manual/graphics/shaders/preprocessor) as vertex and fragment shaders, including `#define`, `#ifdef`, `#if`, `#include`, and more.

### Defines and Includes

Use `cdefines` to pass defines and `cincludes` to provide include content:

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        #include "myHelper"

        @compute @workgroup_size({WORKGROUP_SIZE}, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            var<workgroup> sharedData: array<f32, {WORKGROUP_SIZE}>;
            // ...
        }
    `,
    cdefines: new Map([
        ['{WORKGROUP_SIZE}', '64']
    ]),
    cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL),
    // ...
});
```

The `{WORKGROUP_SIZE}` placeholders are replaced with `64` before compilation. See the [preprocessor documentation](/user-manual/graphics/shaders/preprocessor) for details on regular defines vs injection defines.

## Examples

Explore these live examples demonstrating various compute shader use cases:

- [Histogram](https://playcanvas.github.io/#/compute/histogram) - Compute image histogram using atomic operations
- [Texture Generation](https://playcanvas.github.io/#/compute/texture-gen) - Generate and modify textures with compute shaders
- [Particles](https://playcanvas.github.io/#/compute/particles) - GPU-based particle simulation with collision detection
- [Vertex Update](https://playcanvas.github.io/#/compute/vertex-update) - Modify mesh vertex buffers in real-time
- [Edge Detect](https://playcanvas.github.io/#/compute/edge-detect) - Image processing with edge detection
- [Indirect Draw](https://playcanvas.github.io/#/compute/indirect-draw) - GPU-driven rendering with indirect draw calls
