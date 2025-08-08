---
title: ハードウェアインスタンシング
---

ハードウェアインスタンシング (Hardware instancing) は、GPUに複数の同一のメッシュを少数のドローコールでレンダリングする技術です。メッシュの各インスタンスは、異なる限定的な状態（例えば、位置や色）を持つことができます。木や弾丸などのオブジェクトを描画するのに適した技術です。

For its support on a device, check `pc.GraphicsDevice.supportsInstancing`. In general, it is supported on all WebGL2 devices and also on the majority of WebGL1 devices using the `ANGLE_instanced_arrays` extension.

また、すべてのインスタンスがレンダリング用にGPUに送信され、カメラフラスタムカリングは行われないことに注意してください。

## インスタンシングの使い方

頂点バッファにインスタンスごとの行列を埋め込んで、レンダリングのためのワールド行列を提供します。

```javascript
// store matrices for individual instances into array
const matrices = new Float32Array(instanceCount * 16);
const matrix = new pc.Mat4();
let matrixIndex = 0;
for (let i = 0; i < instanceCount; i++) {
    matrix.setTRS(pos, pc.Quat.IDENTITY, pc.Vec3.ONE);

    // copy matrix elements into array of floats
    for (let m = 0; m < 16; m++)
        matrices[matrixIndex++] = matrix.data[m];
}
```

Create a VertexBuffer which stores per-instance state and initialize it with the matrices. In the following example, we use [`pc.VertexFormat.getDefaultInstancingFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html#getdefaultinstancingformat) which allows us to store a per-instance Mat4 matrix. Then we enable instancing on a MeshInstance, which contains the mesh geometry we want to instance.

```javascript
const instanceCount = 10;
const vertexBuffer = new pc.VertexBuffer(
    this.app.graphicsDevice,
    pc.VertexFormat.getDefaultInstancingFormat(this.app.graphicsDevice),
    instanceCount,
    pc.BUFFER_STATIC,
    matrices
);
meshInst.setInstancing(vertexBuffer);
```

Note, that you can create a dynamic vertex buffer using `pc.BUFFER_DYNAMIC`, and update the contents of it per-frame like this:

```javascript
vertexBuffer.setData(matrices);
```

## カスタムシェーダー

インスタンス化を使用するカスタムシェーダーを書く際には、頂点属性からインスタンスごとの状態を読み取り、使用する必要があります。以下の例では、頂点属性を使用してmat4を読み取ります。

```glsl
attribute vec4 instance_line1;
attribute vec4 instance_line2;
attribute vec4 instance_line3;
attribute vec4 instance_line4;

mat4 getModelMatrix() {
    return mat4(instance_line1, instance_line2, instance_line3, instance_line4);
}
```
