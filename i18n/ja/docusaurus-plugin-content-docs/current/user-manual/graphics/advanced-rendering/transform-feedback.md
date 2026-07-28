---
title: Transform Feedback
description: 頂点シェーダーの出力をGPU上の頂点バッファにキャプチャします。単一のインターリーブバッファ、またはvaryingごとに1つのバッファを使用します。
---

Transform feedback runs a vertex shader and captures its output into vertex buffers instead of rasterizing it. The result stays on the GPU, so simulation state never travels back to the CPU, and the buffers it writes can be fed straight into a subsequent render pass.

This makes it a good fit for simulations where every item is processed independently, and where the output is geometry the GPU is about to draw anyway.

## Platform Support

Transform feedback is a **WebGL2 only** feature. Check for it before setting anything up:

```javascript
if (app.graphicsDevice.isWebGL2) {
    // set up transform feedback
}
```

There is no WebGPU equivalent. On WebGPU the same workloads are expressed with [compute shaders](/user-manual/graphics/shaders/compute-shaders) writing to storage buffers, so code targeting both APIs needs both paths.

## Use Cases

- **GPU particles** - integrate position and velocity for large particle counts without CPU involvement
- **Flocking and crowds** - per-agent steering, with the resulting transforms feeding instanced rendering
- **Cloth and soft bodies** - Verlet-style integration over a vertex grid
- **Trails and ribbons** - advance a history of positions each frame

## Live Examples

- Transform Feedback - a particle cloud simulated in a single interleaved buffer

<EngineExample id="graphics/transform-feedback" title="Transform Feedback" />

- Transform Feedback Separate - a GPU flock using one buffer per captured varying, feeding instanced cones

<EngineExample id="graphics/transform-feedback-separate" title="Transform Feedback Separate" />

## A Single Interleaved Buffer

By default all captured varyings are packed into one buffer. This is the simplest form and suits a simulation whose state is a single struct per item.

### Step 1: Write the Simulation Shader

The shader reads the current state as vertex attributes and writes the new state to varyings. Varyings whose names begin with `out_` are captured automatically:

```glsl
attribute vec4 vertex_position;   // xyz = position, w = lifetime

varying vec4 out_vertex_position;

uniform float deltaTime;

void main(void) {
    vec3 pos = vertex_position.xyz;
    float life = vertex_position.w - deltaTime;

    pos.y += deltaTime;

    out_vertex_position = vec4(pos, life);
}
```

Note the state is packed into a single `vec4` because interleaved capture writes everything to one buffer, so the render pass reads the same layout and has to skip over the parts it does not need.

### Step 2: Create the Shader and the Helper

```javascript
const shader = pc.TransformFeedback.createShader(device, vertexCode, 'moveParticles');

// creates a matching output buffer internally
const tf = new pc.TransformFeedback(mesh.vertexBuffer);
```

The input buffer should be created with `BUFFER_GPUDYNAMIC` usage, which signals that the GPU writes it repeatedly. If it was created with another usage, the helper reallocates it.

### Step 3: Run It Each Frame

```javascript
app.on('update', (dt) => {
    deltaTimeUniform.setValue(dt);
    tf.process(shader);
});
```

`process()` runs the shader with rasterization disabled, then swaps the input and output buffers. The swap exchanges the underlying GPU buffers rather than the `VertexBuffer` objects, so **the reference you passed in always holds the freshest data**. A mesh rendering from that buffer needs no updating — it picks up the new contents automatically.

## One Buffer Per Varying

Passing `TRANSFORM_FEEDBACK_SEPARATE` when creating the shader writes each captured varying into its own buffer:

```javascript
const shader = pc.TransformFeedback.createShader(
    device, vertexCode, 'flockSim',
    ['out_position', 'out_velocity', 'out_instance'],   // order matches the output buffers
    pc.TRANSFORM_FEEDBACK_SEPARATE
);
```

The mode has to be given here rather than derived, because it is fixed when the shader program is linked — and three varyings are equally valid packed into one buffer or written to three.

Separating them lets each buffer take the role it actually needs, rather than every piece of state sharing one layout.

### Buffer Roles

Describe each buffer with an entry in an array. An entry may specify an `input`, an `output`, or both:

```javascript
const tf = new pc.TransformFeedback([
    { input: positions, output: positionsOut },   // read and written, swapped each step
    { input: velocities, output: velocitiesOut }, // read and written, swapped each step
    { input: constants },                         // read only, never modified
    { output: instances }                         // written only, for the render pass
]);
```

| Role | Behavior | Suits |
|------|----------|-------|
| `input` and `output` | Read by the shader, written by transform feedback, and the pair is swapped after each step | Simulation state that evolves — position, velocity |
| `input` only | Read by the shader, never written | Per-item constants — a random seed, a mass, a maximum speed. Without this role such data has to be copied through transform feedback every step and double-buffered for no reason |
| `output` only | Written every step, never read back by the shader | Data only a later pass consumes — a tightly packed stream feeding instanced rendering |

Entries with an `output` are assigned transform feedback buffer indices in the order they appear, skipping entries without one. That order must match the list of captured varyings.

### Feeding Instanced Rendering

The write-only role exists for a specific reason. `instancing` is a property of a [`VertexFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html), so marking a buffer for instancing applies the per-instance attribute divisor to *every* use of that buffer. A single buffer therefore cannot be both a per-vertex simulation stream and a per-instance render stream.

Writing the render data to its own buffer, which the simulation never reads back, avoids the conflict entirely:

```javascript
// written by transform feedback, consumed only by the instanced draw
material.setAttribute('aInstPosition', pc.SEMANTIC_ATTR12);
meshInstance.setInstancing(instances);
```

The simulation buffers are never bound in the render pass, and the instancing buffer holds exactly the position and heading the render pass needs.

## Input Attribute Semantics

Attributes are extracted from the shader source and assigned `ATTR0`, `ATTR1`, `ATTR2` and so on **in declaration order**. Each input buffer's vertex format must use the matching semantic:

```glsl
attribute vec4 aPosition;    // ATTR0
attribute vec4 aVelocity;    // ATTR1
attribute vec4 aConstants;   // ATTR2
```

```javascript
const format = semantic => new pc.VertexFormat(device, [
    { semantic: semantic, components: 4, type: pc.TYPE_FLOAT32 }
]);

const positions = new pc.VertexBuffer(device, format(pc.SEMANTIC_ATTR0), count, options);
const velocities = new pc.VertexBuffer(device, format(pc.SEMANTIC_ATTR1), count, options);
const constants = new pc.VertexBuffer(device, format(pc.SEMANTIC_ATTR2), count, options);
```

:::warning
Do not mix standard attribute names with custom ones in the same transform feedback shader. A name such as `vertex_position` maps to `SEMANTIC_POSITION`, which is location 0 — and the first custom name is assigned `ATTR0`, which is also location 0. Use custom names throughout.
:::

## Limitations

- **WebGL2 only.** There is no WebGPU path; use compute shaders there.
- **Vertex formats must be interleaved**, or contain a single element.
- **Separate mode limits each varying to 4 components** on baseline WebGL2 (`MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS` is only guaranteed to be 4), so plan what each buffer carries. Wider state needs more varyings, and therefore more buffers.
- **A buffer written only by the GPU still needs initial data**, so that its storage is allocated before transform feedback writes to it:

  ```javascript
  const instances = new pc.VertexBuffer(device, format, count, {
      usage: pc.BUFFER_GPUDYNAMIC,
      data: new Float32Array(count * 4)   // required, even though the GPU fills it
  });
  ```

## API Reference

- [`TransformFeedback`](https://api.playcanvas.com/engine/classes/TransformFeedback.html) - the helper managing the buffers and the pass
- [`TransformFeedback.createShader`](https://api.playcanvas.com/engine/classes/TransformFeedback.html#createshader) - builds a capture-ready vertex shader
- [`TransformFeedback#process`](https://api.playcanvas.com/engine/classes/TransformFeedback.html#process) - runs one step, optionally swapping buffers
- [`TRANSFORM_FEEDBACK_INTERLEAVED`](https://api.playcanvas.com/engine/variables/TRANSFORM_FEEDBACK_INTERLEAVED.html) - capture all varyings into one buffer, the default
- [`TRANSFORM_FEEDBACK_SEPARATE`](https://api.playcanvas.com/engine/variables/TRANSFORM_FEEDBACK_SEPARATE.html) - capture each varying into its own buffer

## Related

- [Hardware Instancing](/user-manual/graphics/advanced-rendering/hardware-instancing) - rendering many copies of a mesh, which transform feedback can drive directly
- [Compute Shaders](/user-manual/graphics/shaders/compute-shaders) - the WebGPU approach to the same class of problem
