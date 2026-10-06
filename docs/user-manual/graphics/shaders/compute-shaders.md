---
title: Compute Shaders
description: "WebGPU-only compute shaders: device checks, simplified WGSL resource declarations, dispatch, and general-purpose GPU work."
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

## WGSL language extensions

When the browser exposes optional WGSL features (for example [linear workgroup / invocation indexing](https://developer.chrome.com/blog/new-in-webgpu-147-148#wgsl_linear_indexing_extension), subgroups, or half-float), the engine sets the matching `device.supports*` flags and `CAPS_*` preprocessor defines. For a full list and usage notes, see [WGSL language extensions](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions).

## Creating a Compute Shader

A compute shader is created using the `Shader` class with a WGSL `cshader` source. Declare the resources it uses — uniforms, storage buffers, textures, and storage textures — with the simplified WGSL syntax (no `@group`/`@binding`), and the engine reflects them from the source and builds the bind group automatically. See [WGSL Reflection](/user-manual/graphics/shaders/wgsl-reflection) for the full resource declaration syntax.

### Basic Shader Definition

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        // resources declared with the simplified syntax are reflected automatically -
        // no computeBindGroupFormat required
        uniform count: u32;
        var<storage, read_write> data: array<f32>;

        @compute @workgroup_size(64, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            let i = global_id.x;
            if (i >= uniform.count) { return; }
            data[i] = data[i] * 2.0;
        }
    `
});
```

:::note

If you need explicit control over bind groups — a hand-authored `computeBindGroupFormat`, explicit `@group`/`@binding` indices, or mixing manually-bound resources with reflected ones — see [Compute Shaders Advanced](/user-manual/graphics/shaders/compute-shaders-advanced).

:::

### Entry Points

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
    computeEntryPoint: 'initParticles'
});

const updateShader = new pc.Shader(device, {
    name: 'UpdateParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'updateParticles'
});
```

## Creating a Compute Instance

The `Compute` class represents an executable instance of a compute shader with its associated parameters:

```javascript
const compute = new pc.Compute(device, shader, 'MyComputeInstance');
```

## Setting Parameters

Use `setParameter` to bind resources and set uniform values. Resources are matched to the shader declarations by name:

```javascript
// Bind a storage buffer
compute.setParameter('data', storageBuffer);

// Bind a texture
compute.setParameter('inputTexture', texture);

// Set uniform values
compute.setParameter('count', 1024);
compute.setParameter('tint', [1.0, 0.5, 0.0, 1.0]);
```

Every uniform and resource the compute shader declares has to be given a value on the compute instance. In Engine 2.24 and later, compute shaders do not use values set globally on the scope of the graphics device, and debug builds report a declared uniform or resource that has no value.

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

:::note

`device.computeDispatch` records into the current frame's command encoder, so it must be called **within the render frame** — typically from an `app.on('update', ...)` handler. Calling it from a bare `setTimeout` or a detached promise outside the frame is unreliable and may silently skip the dispatch.

:::

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

## Indirect Dispatch

Indirect dispatch allows one compute shader to generate dispatch parameters for another compute shader, enabling fully GPU-driven workloads without CPU readback. This is useful for:

- Variable workload sizes determined on the GPU
- Tile-based processing where tile counts are computed dynamically
- GPU culling followed by processing only visible elements

### Reserving Dispatch Slots

The device provides a built-in buffer for indirect dispatch parameters. Reserve slots each frame:

```javascript
const slot = device.getIndirectDispatchSlot();
```

Each slot holds three 32-bit unsigned integers representing the x, y, and z workgroup counts. The maximum number of slots is controlled by `device.maxIndirectDispatchCount` (default: 256).

### Writing Dispatch Parameters

Declare the indirect buffer in your compute shader (reflected automatically) and write the dispatch parameters into the reserved slot:

```wgsl
struct DispatchIndirectArgs {
    x: u32,
    y: u32,
    z: u32
};

var<storage, read_write> indirectBuffer: array<DispatchIndirectArgs>;
uniform slot: u32; // slot index to write into

@compute @workgroup_size(1)
fn main() {
    // Compute workload size dynamically
    let workloadSize = calculateWorkload();

    // Write dispatch parameters to the slot
    indirectBuffer[uniform.slot].x = workloadSize;
    indirectBuffer[uniform.slot].y = 1u;
    indirectBuffer[uniform.slot].z = 1u;
}
```

### Using Indirect Dispatch

Configure the second compute shader to read dispatch parameters from the buffer using `setupIndirectDispatch`:

```javascript
// Reserve a slot for this frame
const slot = device.getIndirectDispatchSlot();

// First pass: compute shader writes dispatch parameters
prepareCompute.setParameter('indirectBuffer', device.indirectDispatchBuffer);
prepareCompute.setParameter('slot', slot);
prepareCompute.setupDispatch(1, 1, 1);
device.computeDispatch([prepareCompute]);

// Second pass: dispatch using parameters from the buffer
processCompute.setupIndirectDispatch(slot);
device.computeDispatch([processCompute]);
```

:::note

When using the device's built-in indirect buffer, `setupIndirectDispatch` must be called each frame because slots are only valid for the current frame.

:::

### Custom Indirect Buffers

For advanced use cases like complex scheduling outside of rendering frames, you can provide your own storage buffer:

```javascript
// Create a custom buffer for indirect dispatch
const customBuffer = new pc.StorageBuffer(device, 3 * 4, pc.BUFFERUSAGE_INDIRECT);

// Use custom buffer for indirect dispatch
compute.setupIndirectDispatch(0, customBuffer);
```

When using a custom buffer, you manage its lifetime and contents—no frame validation is performed.

In Engine 2.23 and later, compute resources are recreated during device recovery, but storage-buffer contents must be written again or regenerated. See [Device Loss and Recovery](../advanced-rendering/device-loss.md) for interrupted reads and explicit resource cleanup.

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

## Scene Depth and Color Maps

In Engine 2.24 and later, a compute shader can read the depth and color maps a camera renders of the scene, for example to implement screen-space effects or to analyze the rendered image.

The camera renders the maps when they are requested on its camera component:

```javascript
cameraEntity.camera.requestSceneDepthMap(true);
cameraEntity.camera.requestSceneColorMap(true);
```

A camera rendering with [CameraFrame](/user-manual/graphics/posteffects/cameraframe/) renders them when it is configured to:

```javascript
cameraFrame.rendering.sceneDepthMap = true;
cameraFrame.rendering.sceneColorMap = true;
cameraFrame.update();
```

Attach the maps of the camera to the compute instance:

```javascript
compute.setSceneDepthMap(cameraEntity.camera.sceneDepthMapHandle);
compute.setSceneColorMap(cameraEntity.camera.sceneColorMapHandle);
```

The maps only need to be attached once. Each dispatch uses the maps the camera rendered most recently, so a compute dispatched before the camera renders, for example from an `update` event, uses the maps of the previous frame. Pass `null` to detach a map when the compute no longer uses it, and before the camera is destroyed.

The compute shader accesses the maps using the functions of the `sceneDepthCS` and `sceneColorCS` includes:

```wgsl
#include "sceneDepthCS"
#include "sceneColorCS"

var output: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    // process the texels of the viewport the camera rendered to
    let viewport = sceneDepthViewport();
    if (id.x >= viewport.z || id.y >= viewport.w) {
        return;
    }
    let texel = vec2i(viewport.xy + id.xy);

    // the depth of the surface in front of the camera, and the scene color converted to linear
    let depth = sceneDepthLinear(texel);
    let color = sceneColorToLinear(sceneColorLoad(texel, 0).rgb);

    // fade the scene to gray with distance
    let fogged = mix(color, vec3f(0.5), saturate(depth / 100.0));
    textureStore(output, texel, vec4f(fogged, 1.0));
}
```

The `sceneDepthCS` include provides:

| Function | Description |
|----------|-------------|
| `sceneDepthSize() -> vec2u` | The dimensions of the depth map. |
| `sceneDepthViewport() -> vec4u` | The viewport the camera rendered the depth map with, in texels: the x and y of its first texel, and its width and height. |
| `sceneDepthNearClip() -> f32` | The near clip plane the depth map was rendered with. |
| `sceneDepthFarClip() -> f32` | The far clip plane the depth map was rendered with. |
| `sceneDepthLinear(texel: vec2i) -> f32` | The linear depth of the surface at the texel, along the view direction of the camera, in world units. |
| `sceneDepthWorldPosition(texel: vec2i) -> vec3f` | The world position of the surface at the texel, which needs to be within the viewport. |

The `sceneColorCS` include provides:

| Function | Description |
|----------|-------------|
| `sceneColorSize(lod: i32) -> vec2u` | The dimensions of a mip level of the color map. |
| `sceneColorLoad(texel: vec2i, lod: i32) -> vec4f` | The color of a texel. |
| `sceneColorSample(uv: vec2f, lod: f32) -> vec4f` | The color sampled with filtering. When the format of the color map cannot be filtered on the device, the color of the nearest texel is returned. |
| `sceneColorToLinear(color: vec3f) -> vec3f` | Converts a color read from the color map to linear. |
| `sceneColorToDisplay(color: vec3f) -> vec3f` | Converts a color read from the color map to gamma encoded. |

The depth functions return the same values however the camera stored the depth. The colors are returned the way the camera stored them: linear when the camera renders with CameraFrame, and gamma encoded otherwise. When they are gamma encoded, `SCENE_COLORMAP_GAMMA` is defined in the compute shader. The two conversion functions take a color read from the color map, and return it unchanged when it is already in the requested space.

A camera rendering to only a part of its target, see [`rect`](https://api.playcanvas.com/engine/classes/CameraComponent.html#rect), covers only its viewport of the maps. The rest of the maps holds what the camera did not render, such as the views of other cameras rendering to the same target. To process only the view of the camera, map the invocations to the viewport as in the example above, and dispatch over the size of the viewport, which matches the camera rect multiplied by the size of the target.

## Preprocessor

Compute shaders support the same [shader preprocessor](/user-manual/graphics/shaders/preprocessor) as vertex and fragment shaders, including `#define`, `#ifdef`, `#if`, `#include`, and more.

### Built-in Includes

The engine provides built-in shader chunks that are automatically available in compute shaders:

| Include | Description |
|---------|-------------|
| `halfTypesCS` | Half-precision type aliases (`half`, `half2`, etc.) that resolve to f16 when supported, f32 otherwise. See [Half-Precision Types](/user-manual/graphics/shaders/wgsl-capabilities#half-precision-types). |
| `sceneDepthCS` | Access to the scene depth map of a camera. See [Scene Depth and Color Maps](#scene-depth-and-color-maps). |
| `sceneColorCS` | Access to the scene color map of a camera. See [Scene Depth and Color Maps](#scene-depth-and-color-maps). |

Example:

```wgsl
#include "halfTypesCS"

@compute @workgroup_size(64, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    // Use half types for calculations
    var color: half3 = half3(1.0, 0.5, 0.0);
    // ...
}
```

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
    cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL)
});
```

The `{WORKGROUP_SIZE}` placeholders are replaced with `64` before compilation. See the [preprocessor documentation](/user-manual/graphics/shaders/preprocessor) for details on regular defines vs injection defines.

## Examples

Explore these live examples demonstrating various compute shader use cases:

- Edge Detect - Image processing with edge detection

<EngineExample id="compute/edge-detect" title="Edge Detect" />

- Particles - GPU-based particle simulation with collision detection

<EngineExample id="compute/particles" title="Particles" />

- Histogram - Compute image histogram using atomic operations

<EngineExample id="compute/histogram" title="Histogram" />

- Texture Generation - Generate and modify textures with compute shaders

<EngineExample id="compute/texture-gen" title="Texture Generation" />

- Vertex Update - Modify mesh vertex buffers in real-time

<EngineExample id="compute/vertex-update" title="Vertex Update" />

- Indirect Draw - GPU-driven rendering with indirect draw calls

<EngineExample id="compute/indirect-draw" title="Indirect Draw" />

- Indirect Dispatch - GPU-driven compute dispatch with depth-based tile classification

<EngineExample id="compute/indirect-dispatch" title="Indirect Dispatch" />

- Scene Maps - A scanner pulse sweeping through the scene, using the scene depth and color maps

<EngineExample id="compute/scene-maps" title="Scene Maps" />
