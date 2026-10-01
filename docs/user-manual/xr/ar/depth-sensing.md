---
title: Depth Sensing
description: "WebXR depth sensing in PlayCanvas: requesting depth, CPU and GPU paths and data formats, measuring the distance to the real world at a point in the view, the depth texture with its UV matrix and scale, and a shader that reads it for mono and stereo views."
---

Depth sensing measures how far away the real world is, at every pixel of the view. Devices estimate it with depth sensors or from their cameras. Use it to place objects on any surface the user looks at, to hide virtual objects behind real ones, or for effects such as virtual light spilling over the room.

<EngineExample id="xr/ar-camera-depth" title="AR Camera Depth" />

## Requesting Depth Sensing {#requesting-depth-sensing}

Ask for depth sensing when you start an AR session, with your preferences for how the data is delivered:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    depthSensing: {
        usagePreference: pc.XRDEPTHSENSINGUSAGE_CPU,
        dataFormatPreference: pc.XRDEPTHSENSINGFORMAT_F32
    }
});
```

The device picks what it supports, trying your preferences first:

| Preference | Values |
| --- | --- |
| `usagePreference` | `pc.XRDEPTHSENSINGUSAGE_CPU`: the data is on the CPU, so you can read distances in JavaScript, and the engine uploads it to a texture every frame. `pc.XRDEPTHSENSINGUSAGE_GPU`: the data is a texture on the GPU, for shaders only, which is faster |
| `dataFormatPreference` | `pc.XRDEPTHSENSINGFORMAT_F32`: 32-bit floats. `pc.XRDEPTHSENSINGFORMAT_L8A8`: 16-bit integers packed into two 8-bit channels, which every device supports. `pc.XRDEPTHSENSINGFORMAT_R16U`: 16-bit integers |

Once the session has started, `app.xr.views` reports what it got:

| Property | Description |
| --- | --- |
| `supportedDepth` | Whether the browser implements depth sensing |
| `availableDepth` | Whether the session has it |
| `depthGpuOptimized` | `true` on the GPU path, and `false` on the CPU path |
| `depthPixelFormat` | The format of the depth texture: `pc.PIXELFORMAT_LA8` or `pc.PIXELFORMAT_R32F`, or `pc.PIXELFORMAT_DEPTH` for 16-bit integers |

Devices differ in what they offer, and some offer only one path, so support both where you can.

## Measuring Distance {#measuring-distance}

On the CPU path, a view's `getDepth(x, y)` returns the distance to the real world in meters, at a point in the view, or `null` where the device has no estimate. The point is given from 0 to 1 across and down the view, from its top-left corner:

```javascript
app.on('update', () => {
    // A phone's only view, or a headset's left eye
    const view = app.xr.views.list[0];
    const distance = view?.getDepth(0.5, 0.5);
    if (distance) {
        console.log(`The center of the view is ${distance.toFixed(2)} m away`);
    }
});
```

`getDepth()` returns `null` on the GPU path. Distances are measured straight ahead, from the plane of the camera, rather than along the line to the point, so the two agree only at the center of the view. To place an object at a point, cast a ray from the camera through the same point of the view, and move along it until it is that far in front of the camera.

## The Depth Texture {#the-depth-texture}

Each view's `textureDepth` is a texture of its depth data, updated every frame, for use in shaders. With more than one view, as on a headset, it is an array texture with a layer for each view. Two more properties of the view are needed to read it:

- `depthUvMatrix` turns a position in the view, from 0 to 1, into a position in the depth texture, which the device can store rotated or flipped. It changes when the texture is resized, and the view fires `depth:resize` when it is.
- `depthValueToMeters` multiplies a value read from the texture into meters.

For `pc.PIXELFORMAT_LA8`, a value is 16 bits in two channels, with the least significant byte in the luminance channel.

This GLSL shader draws the depth as shades of gray, darker for nearer surfaces. Defines choose between one view and an array of views, and between the `pc.PIXELFORMAT_LA8` and `pc.PIXELFORMAT_R32F` formats. It doesn't read `pc.PIXELFORMAT_DEPTH` textures:

```glsl
uniform vec4 render_size;
uniform mat4 matrix_depth_uv;
uniform float depth_raw_to_meters;

#ifdef XRDEPTH_ARRAY
    uniform int view_index;
    uniform highp sampler2DArray depthMap;
#else
    uniform sampler2D depthMap;
#endif

void main(void) {
    // The position of this pixel in the view, from 0 to 1
    vec2 uvScreen = gl_FragCoord.xy * render_size.zw;

    #ifdef XRDEPTH_ARRAY
        // Side-by-side views: take the half of the screen of this view
        uvScreen = uvScreen * vec2(2.0, 1.0) - vec2(view_index, 0.0);
        vec3 uv = vec3((matrix_depth_uv * vec4(uvScreen, 0.0, 1.0)).xy, view_index);
    #else
        // The view's Y runs down, the screen's up
        vec2 uv = (matrix_depth_uv * vec4(uvScreen.x, 1.0 - uvScreen.y, 0.0, 1.0)).xy;
    #endif

    #ifdef XRDEPTH_FLOAT
        float depth = texture2D(depthMap, uv).r;
    #else
        // Unpack 16 bits from the luminance and alpha channels
        vec2 packedDepth = texture2D(depthMap, uv).ra;
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0));
    #endif

    // Meters, shown as gray from black at 0 m to white at 5 m
    float meters = depth * depth_raw_to_meters;
    gl_FragColor = vec4(vec3(clamp(meters / 5.0, 0.0, 1.0)), 1.0);
}
```

Use it in a [`ShaderMaterial`](/user-manual/graphics/shaders/), with a vertex shader that places the mesh, such as a plane in front of the camera. The number of views and the format are known once the views arrive, so set the defines then, and the depth parameters every frame:

```javascript
const material = new pc.ShaderMaterial({
    uniqueName: 'depth-view',
    vertexGLSL: /* glsl */ `
        attribute vec3 aPosition;
        uniform mat4 matrix_model;
        uniform mat4 matrix_viewProjection;
        void main(void) {
            gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
        }
    `,
    fragmentGLSL: depthFragmentShader, // the shader above
    attributes: { aPosition: pc.SEMANTIC_POSITION }
});

app.xr.views.on('add', () => {
    material.setDefine('XRDEPTH_ARRAY', app.xr.views.list.length > 1);
    material.setDefine('XRDEPTH_FLOAT', app.xr.views.depthPixelFormat === pc.PIXELFORMAT_R32F);
    material.update();
});

app.on('update', () => {
    const view = app.xr.views.list[0];
    if (!view?.textureDepth) return;

    // The size of the session's framebuffer, and its reciprocal
    const { width, height } = app.graphicsDevice;
    material.setParameter('render_size', [width, height, 1 / width, 1 / height]);
    material.setParameter('depthMap', view.textureDepth);
    material.setParameter('matrix_depth_uv', view.depthUvMatrix.data);
    material.setParameter('depth_raw_to_meters', view.depthValueToMeters);
});
```

The engine provides `view_index`, the index of the view being rendered. During a session, the graphics device's size is the size of the session's framebuffer, which holds the views side by side. To hide virtual objects behind real ones, compare the real distance with each fragment's depth in front of the camera, in view space, in your materials, and discard fragments that are further away. The shader above is GLSL, so it runs on WebGL 2. For WebGPU, write the same in WGSL.

## See Also

- [Mesh Detection](/user-manual/xr/ar/mesh-detection/) - Coarser occlusion and physics from room meshes
- [Shaders](/user-manual/graphics/shaders/) - Writing shaders for your materials
- [XrViews](https://api.playcanvas.com/engine/classes/XrViews.html) and [XrView](https://api.playcanvas.com/engine/classes/XrView.html) - The API reference for views and their depth
