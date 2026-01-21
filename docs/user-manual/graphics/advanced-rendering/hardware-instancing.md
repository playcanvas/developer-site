---
title: Hardware Instancing
---

Hardware instancing is a rendering technique which allows the GPU to render multiple identical meshes in a small number of draw calls. Each instance of the mesh can have a different limited amount of state (for example, position, rotation, scale, or color). It's a technique suitable for drawing objects such as trees, bullets, particles, or any repeated geometry.

Instancing is supported on all devices since PlayCanvas requires WebGL2 minimum, where instancing is a core feature.

Note that all instances are submitted for rendering by the GPU with no camera frustum culling taking place.

## Live Examples

- [Basic Instancing](https://playcanvas.vercel.app/#/graphics/instancing-basic) - Demonstrates default Mat4 instancing format with StandardMaterial
- [Custom Instancing](https://playcanvas.vercel.app/#/graphics/instancing-custom) - Shows custom vertex format with shader chunks override
- [GLB Instancing](https://playcanvas.vercel.app/#/graphics/instancing-glb) - Uses EXT_mesh_gpu_instancing extension in GLB files
- [Gooch Instancing](https://playcanvas.vercel.app/#/graphics/instancing-gooch) - Full custom ShaderMaterial with instancing support

## Basic Instancing with Default Format

The simplest way to use instancing is with the default instancing format, which stores a Mat4 world matrix per instance.

### Step 1: Prepare Instance Matrices

Store matrices for individual instances into a Float32Array:

```javascript
// store matrices for individual instances into array
const instanceCount = 1000;
const matrices = new Float32Array(instanceCount * 16);
const matrix = new pc.Mat4();
const pos = new pc.Vec3();
const rot = new pc.Quat();
const scl = new pc.Vec3();

for (let i = 0; i < instanceCount; i++) {
    // set up position, rotation, scale for each instance
    pos.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
    rot.setFromEulerAngles(i * 30, i * 50, i * 70);
    scl.set(0.1, 0.1, 0.1);
    matrix.setTRS(pos, rot, scl);

    // copy matrix elements into array of floats
    for (let m = 0; m < 16; m++) {
        matrices[i * 16 + m] = matrix.data[m];
    }
}
```

### Step 2: Create Vertex Buffer and Enable Instancing

Create a VertexBuffer using [`pc.VertexFormat.getDefaultInstancingFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html#getdefaultinstancingformat) and enable instancing on a MeshInstance:

```javascript
const vbFormat = pc.VertexFormat.getDefaultInstancingFormat(app.graphicsDevice);
const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    data: matrices
});

// enable instancing on the mesh instance
const meshInst = entity.render.meshInstances[0];
meshInst.setInstancing(vertexBuffer);
```

### Dynamic Updates

For dynamic instancing where positions change each frame, create a dynamic vertex buffer and update it:

```javascript
// create dynamic vertex buffer (no initial data)
const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    usage: pc.BUFFER_DYNAMIC
});

// update per frame
vertexBuffer.setData(matrices);
```

## Custom Vertex Format

For more efficient instancing or custom per-instance data, you can define a custom vertex format instead of using the default Mat4 format.

### Example: Position and Scale Format

This format stores only position (3 floats) and uniform scale (1 float) per instance, reducing memory from 64 bytes to 16 bytes per instance:

```javascript
const vbFormat = new pc.VertexFormat(app.graphicsDevice, [
    { semantic: pc.SEMANTIC_ATTR12, components: 3, type: pc.TYPE_FLOAT32 }, // position
    { semantic: pc.SEMANTIC_ATTR13, components: 1, type: pc.TYPE_FLOAT32 }  // scale
]);

// store data for individual instances, 4 floats each
const instanceCount = 3000;
const data = new Float32Array(instanceCount * 4);

for (let i = 0; i < instanceCount; i++) {
    const offset = i * 4;
    data[offset + 0] = Math.random() * 10 - 5; // x
    data[offset + 1] = Math.random() * 10 - 5; // y
    data[offset + 2] = Math.random() * 10 - 5; // z
    data[offset + 3] = 0.1 + Math.random() * 0.1; // scale
}

const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    data: data
});
```

When using a custom format, you must also provide a custom shader or shader chunk to interpret the data (see sections below).

## StandardMaterial Shader Chunks

When using StandardMaterial with a custom instancing format, you can override the instancing shader chunk to define how the model matrix is computed from your custom attributes.

### Step 1: Set Up Material Attributes

Tell the material which semantics map to which attribute names:

```javascript
const material = new pc.StandardMaterial();
material.setAttribute('aInstPosition', pc.SEMANTIC_ATTR12);
material.setAttribute('aInstScale', pc.SEMANTIC_ATTR13);
```

### Step 2: Override the Instancing Shader Chunk

Provide custom shader code for both GLSL (WebGL) and WGSL (WebGPU):

```javascript
material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('transformInstancingVS', `
    attribute vec3 aInstPosition;
    attribute float aInstScale;

    mat4 getModelMatrix() {
        return mat4(
            vec4(aInstScale, 0.0, 0.0, 0.0),
            vec4(0.0, aInstScale, 0.0, 0.0),
            vec4(0.0, 0.0, aInstScale, 0.0),
            vec4(aInstPosition, 1.0)
        );
    }
`);

material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('transformInstancingVS', `
    attribute aInstPosition: vec3f;
    attribute aInstScale: f32;

    fn getModelMatrix() -> mat4x4f {
        return mat4x4f(
            vec4f(aInstScale, 0.0, 0.0, 0.0),
            vec4f(0.0, aInstScale, 0.0, 0.0),
            vec4f(0.0, 0.0, aInstScale, 0.0),
            vec4f(aInstPosition, 1.0)
        );
    }
`);

material.update();
```

The instancing chunk must implement the `getModelMatrix()` function, which returns the world matrix for each instance.

## Custom Shader with Instancing

When writing a fully custom shader (using ShaderMaterial) that supports instancing, use the `INSTANCING` preprocessor define to conditionally include instancing code:

### GLSL Example

```glsl
#include "transformCoreVS"

#if INSTANCING
    attribute vec3 aInstPosition;
    attribute float aInstScale;

    mat4 getModelMatrix() {
        return mat4(
            vec4(aInstScale, 0.0, 0.0, 0.0),
            vec4(0.0, aInstScale, 0.0, 0.0),
            vec4(0.0, 0.0, aInstScale, 0.0),
            vec4(aInstPosition, 1.0)
        );
    }
#endif

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    vec3 localPos = getLocalPosition(vertex_position.xyz);
    vec4 worldPos = modelMatrix * vec4(localPos, 1.0);
    gl_Position = matrix_viewProjection * worldPos;
}
```

### WGSL Example

```wgsl
#include "transformCoreVS"

#if INSTANCING
    attribute aInstPosition: vec3f;
    attribute aInstScale: f32;

    fn getModelMatrix() -> mat4x4f {
        return mat4x4f(
            vec4f(aInstScale, 0.0, 0.0, 0.0),
            vec4f(0.0, aInstScale, 0.0, 0.0),
            vec4f(0.0, 0.0, aInstScale, 0.0),
            vec4f(aInstPosition, 1.0)
        );
    }
#endif

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    let modelMatrix: mat4x4f = getModelMatrix();
    let localPos: vec3f = getLocalPosition(input.vertex_position.xyz);
    let worldPos: vec4f = modelMatrix * vec4f(localPos, 1.0);
    output.position = uniform.matrix_viewProjection * worldPos;
    return output;
}
```

The `#if INSTANCING` guard allows the same shader to work for both instanced and non-instanced rendering. When instancing is not enabled, the engine provides a default `getModelMatrix()` implementation.

### Using Default Mat4 Format in Custom Shaders

If using the default instancing format (Mat4 per instance), read the matrix from the four `instance_line` attributes:

```glsl
attribute vec4 instance_line1;
attribute vec4 instance_line2;
attribute vec4 instance_line3;
attribute vec4 instance_line4;

mat4 getModelMatrix() {
    return mat4(instance_line1, instance_line2, instance_line3, instance_line4);
}
```

## GLB Instancing

GLB/glTF files can include instancing data via the [`EXT_mesh_gpu_instancing`](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md) extension. When loading such files, PlayCanvas automatically sets up the instancing:

```javascript
const entity = assets.glb.resource.instantiateRenderEntity({
    castShadows: true
});
app.root.addChild(entity);
```

This is useful for scenes authored in tools like Blender that support exporting instanced geometry.
