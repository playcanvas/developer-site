---
title: Depth Sensing
---

In the MR context, immersion is achieved by visual and logical interaction of virtual objects with the real world. This is achieved by many techniques including Depth Occlusion, particles interacting with the world, 3D scanning and more.

Depth sensing provides access to depth estimation of real-world objects in real-time. Underlying systems might have different methods of estimation such as Lidar hardware or Computer Vision, which provide various levels of quality and reliability.

WebXR Depth Sensing provides access to depth information for each view and matches the color information. Various browsers might implement two paths: CPU and GPU, with various performance impacts depending on the path. PlayCanvas integrates an API abstracting away the differences as much as possible, e.g. texture is available for both CPU and GPU paths.

Platforms might implement either path: CPU or GPU, or even both.

To request access to camera depth, the session should be started as follows:

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    depthSensing: { // request access to camera depth
        usagePreference: pc.XRDEPTHSENSINGUSAGE_GPU, // prefer GPU implementation
        dataFormatPreference: pc.XRDEPTHSENSINGFORMAT_F32 // prefer data as Float 32 array/texture
    }
});
```

## Support

You can check if camera depth is supported by the system:

```javascript
if (app.xr.views.supportedDepth) {
    // camera depth access is supported
}

app.xr.on('start', () => {
    if (app.xr.views.availableDepth) {
        // camera depth information is available

        if (app.xr.views.depthGpuOptimized) {
            // GPU path
        } else {
            // CPU path
        }
    }
});
```

## Distance Measurements

Depth estimation and availability of the data is subject to the reliability of the underlying AR system, so depth information might not be always available.

WebXR supports it only for the CPU-path. Using Depth Sensing, you can measure the distance by providing U and V, which are 0 to 1 coordinates of a screen (left-right and top-bottom).

```javascript
// get monoscope view (mobile screens)
const view = app.xr.views.get(pc.XREYE_NONE);
if (view) {
    // get distance from the middle of a screen
    const distance = view.getDepth(0.5, 0.5);

    if (distance !== null) {
        // distance is in meters
    }
}
```

## Texture

You can access a texture of the depth. PlayCanvas augments the different CPU/GPU paths and provides one texture that can be an array texture in the case of stereoscopic screens (e.g. HMDs).

Accessing the texture:

```javascript
const view = app.xr.views.list[0];
if (view) {
    const texture = view.textureDepth;

    if (texture) {
        // get global uniform
        const scopeDepthMap = app.graphicsDevice.scope.resolve('depthMap');
        // set uniform
        scopeDepthMap.setValue(texture);
    }
}
```

### Stereo Views

When using the depth texture in the shader, depending on a monoscope or stereoscope scenario, a different approach should be used. This can be implemented by a `#define` in the shader:

```javascript
const view = app.xr.views.list[0];
if (view && view.eye !== pc.XREYE_NONE) {
    // add define for stereo views
    fragShader = '#define XRDEPTH_ARRAY\n' + fragShader;
}
```

### Data Format

WebXR can provide depth sensing data in two formats: F32 (array of 32-bit floats) and packed as LA8 (flat array of pairs of 8-bit values). They do provide slightly different precision: 32 vs 16 bits for depth, but even 16 bits is plenty for close-proximity use.

We can use shader branching to unpack depth values from a texture depending on the format:

```javascript
if (app.xr.views.depthPixelFormat === pc.PIXELFORMAT_R32F) {
    fragShader = '#define XRDEPTH_FLOAT\n' + fragShader;
}
```

### UV Normalization

WebXR might provide the texture rotated and flipped in any combination, so normalization should be implemented using the provided matrix. We can set this matrix like so:

```javascript
// get a global uniform scope
const scopeDepthUvMatrix = app.graphicsDevice.scope.resolve('matrix_depth_uv');
// set UV normalization matrix
scopeDepthUvMatrix.setValue(view.depthUvMatrix.data);
```

## Shader

With all the preparation we can cover mono/stereo scenarios and different texture formats in a single shader:

```glsl
uniform vec4 uScreenSize; // provided by the engine
uniform mat4 matrix_depth_uv;

#ifdef XRDEPTH_ARRAY
    uniform int view_index; // provided by the engine
    uniform highp sampler2DArray depthMap;
#else
    uniform sampler2D depthMap;
#endif

void main (void) {
    // construct UV for screen-space
    vec2 uvScreen = gl_FragCoord.xy * uScreenSize.zw;

    #ifdef XRDEPTH_ARRAY
        // stereo
        // modify screen-space based on view_index (left/right eye)
        uvScreen = uvScreen * vec2(2.0, 1.0) - vec2(view_index, 0.0);
        // normalize UV using provided matrix
        vec2 uvNormalized = (matrix_depth_uv * vec4(uvScreen.xy, 0.0, 1.0)).xy;
        // use view_index for array-texture index
        vec3 uv = vec3(uvNormalized, view_index);
    #else
        // mono
        // flip it vertically and normalize
        vec2 uv = (matrix_depth_uv * vec4(uvScreen.x, 1.0 - uvScreen.y, 0.0, 1.0)).xy;
    #endif

    #ifdef XRDEPTH_FLOAT
        // F32
        float depth = texture2D(depthMap, uv).r;
    #else
        // LA8
        vec2 packedDepth = texture2D(depthMap, uv).ra;
        // unpack from AlphaLuminance (2 floats) to a single float
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0));
    #endif

    // normalize to meters
    depth *= depth_raw_to_meters;

    // render as greyscale, darker - closer, lighter - further
    gl_FragColor = vec4(depth, depth, depth, 1.0);
}
```

## Example

You can check out [this example][1] that renders a quad in front of a camera with depth sensing applied with a similar shader as described above.

[1]: https://playcanvas.github.io/#/xr/ar-camera-depth
