# `<Camera/>`

Without a camera in your scene, nothing will be rendered. The `<Camera/>` component enables an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) to render a scene from its perspective. Set the entity's position and rotation to control the camera's viewpoint.

## Usage

Attach a `<Camera/>` to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) and it will render the scene from the entity's position and rotation.

```tsx
<Entity>
  <Camera clearColor="red" />
</Entity>
```

In this example, we're switching between 2 different cameras in the scene, each with its own properties.

**Switch between camera types**

```jsx title="camera-example.jsx"
import { useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Camera, Render } from '@playcanvas/react/components';

// ↑ imports hidden
export const CameraExample = () => {
  const [isOrthographic, setIsOrthographic] = useState(false);

  return (<>
    {/* Perspective Camera */}
    {!isOrthographic && (
    <Entity name="perspective-camera" position={[2, 1, 2]} rotation={[-20, 45, 0]}>
        <Camera 
        clearColor="#1a1a1a" 
        fov={60} projection="perspective"
        />
    </Entity>
    )}

    {/* Orthographic Camera */}
    {isOrthographic && (
    <Entity name="orthographic-camera" position={[0, 0, 5]}>
        <Camera 
        clearColor="#9a9a9a" 
        projection="orthographic"
        orthoHeight={3}
        />
    </Entity>
    )}

    {/* Scene objects to view */}
    <Entity >
    <Render type="box" />
    </Entity>

    {/* UI Overlay with buttons */}
    <div className="overlay">
    <button data-selected={!isOrthographic} onClick={() => setIsOrthographic(false)}   >   
        Perspective Camera
    </button>
    <button data-selected={isOrthographic} onClick={() => setIsOrthographic(true)} >
        Orthographic Camera
    </button>
    </div>
  </>);
};
```

Learn more about the [Camera Component](https://api.playcanvas.com/engine/classes/CameraComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `framePasses?` | `FramePass[]` | - | Sets the frame passes the camera uses for rendering, instead of its default rendering. They execute in the order of the array, and a RenderPassForward among them renders layers of the scene with the camera, see its example. Set this to null to return to the default behavior. The camera does not destroy the passes: whoever adds a pass removes it from the list, and destroys it. Gets the frame passes the camera uses for rendering, instead of its default rendering. |
| `gammaCorrection?` | `number` | - | Sets the gamma correction to apply when rendering the scene. Can be: - GAMMA_SRGB: Output is gamma-encoded for standard sRGB displays. This is the default and recommended setting for all normal rendering. - GAMMA_NONE: Output remains in linear space. This is only intended for advanced HDR pipelines where the output is rendered to an intermediate HDR texture that will be tonemapped and gamma-corrected in a subsequent pass. **Warning**: Setting `GAMMA_NONE` will cause the entire scene (including UI) to appear too dark on standard displays, as linear values are written directly without gamma encoding. For HDR rendering with post-processing, use CameraFrame which handles this automatically. Defaults to GAMMA_SRGB. Gets the gamma correction used when rendering the scene. |
| `toneMapping?` | `number` | - | Sets the tonemapping transform to apply to the rendered color buffer. Can be: - TONEMAP_LINEAR - TONEMAP_FILMIC - TONEMAP_HEJL - TONEMAP_ACES - TONEMAP_ACES2 - TONEMAP_NEUTRAL - TONEMAP_AGX - TONEMAP_AGX_PUNCHY Defaults to TONEMAP_LINEAR. Gets the tonemapping transform applied to the rendered color buffer. |
| `fog?` | `FogParams \| null` | - | Sets the fog parameters. If this is not null, the camera will use these fog parameters instead of those specified on the Scene#fog . Gets a FogParams that defines fog parameters, or null if those are not set. |
| `clippingPlanes?` | `Plane[]` | - | Sets the planes that clip what the camera renders, in world space. The parts of the meshes behind any of the planes - on the side opposite to the plane normal - are not rendered, which cuts the scene open along the planes, as a section view does. Use clipIntersection to clip only the parts behind all of the planes instead. Up to 8 planes are supported, and any more are ignored. Defaults to an empty array. The planes clip the meshes the camera renders with a StandardMaterial, or with a ShaderMaterial that supports clipping, see MeshInstance#clippingPlanes . They apply to all passes of the camera, including picking with a Picker, but not to shadows, which the meshes cast whole, nor to screen space elements. Physics and other queries on the CPU are not clipped. To clip only some meshes, or their shadows too, use RenderComponent#clippingPlanes . A mesh with planes of its own is clipped by both sets: each clips with its own clipIntersection, and a part that either set clips is not rendered. The planes are copied, so changing a plane after the assignment has no effect until the array is assigned again. Giving the camera its first plane compiles new variants of the shaders it renders - moving the planes or changing their number does not. Gets the planes that clip what the camera renders, in world space. These are copies of the assigned planes, and changing them has no effect until the array is assigned again. |
| `clipIntersection?` | `boolean` | - | Sets whether only the parts behind all of the clippingPlanes are clipped, instead of the parts behind any of them. With two planes this cuts a wedge out of the scene, and with three a corner. Defaults to false. Gets whether only the parts behind all of the clippingPlanes are clipped. |
| `aperture?` | `number` | - | Sets the camera aperture in f-stops. Default is 16. Higher value means less exposure. Used if Scene#physicalUnits  is true. Gets the camera aperture in f-stops. |
| `aspectRatio?` | `number` | - | Sets the aspect ratio (width divided by height) of the camera. If aspectRatioMode is ASPECT_AUTO, then this value will be automatically calculated every frame, and you can only read it. If it's ASPECT_MANUAL, you can set the value. Gets the aspect ratio (width divided by height) of the camera. |
| `aspectRatioMode?` | `number` | - | Sets the aspect ratio mode of the camera. Can be: - ASPECT_AUTO: aspect ratio will be calculated from the current render target's width divided by height. - ASPECT_MANUAL: use the aspectRatio value. Defaults to ASPECT_AUTO. Gets the aspect ratio mode of the camera. |
| `calculateProjection?` | `CalculateMatrixCallback \| null` | - | Sets the custom function to calculate the camera projection matrix manually. Can be used for complex effects like doing oblique projection. Function is called using component's scope. Arguments: - Mat4 transformMatrix: output of the function - view: Type of view. Can be VIEW_CENTER, VIEW_LEFT or VIEW_RIGHT. Left and right are only used in stereo rendering. Gets the custom function to calculate the camera projection matrix manually. |
| `calculateTransform?` | `CalculateMatrixCallback \| null` | - | Sets the custom function to calculate the camera transformation matrix manually. Can be used for complex effects like reflections. Function is called using component's scope. Arguments: - Mat4 transformMatrix: output of the function. - view: Type of view. Can be VIEW_CENTER, VIEW_LEFT or VIEW_RIGHT. Left and right are only used in stereo rendering. Gets the custom function to calculate the camera transformation matrix manually. |
| `clearColor?` | `string` | - | Sets the camera component's clear color. Defaults to `[0.75, 0.75, 0.75, 1]`. When the camera renders to a RenderTarget with multiple color buffers, this is the clear color of the color attachment 0, and also of the other attachments unless they are given their own using CameraComponent#setClearColor . Gets the camera component's clear color. |
| `clearColorBuffer?` | `boolean` | - | Sets whether the camera will automatically clear the color buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the color buffer before rendering. |
| `clearDepth?` | `number` | - | Sets the depth value to clear the depth buffer to. Defaults to 1. Gets the depth value to clear the depth buffer to. |
| `clearDepthBuffer?` | `boolean` | - | Sets whether the camera will automatically clear the depth buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the depth buffer before rendering. |
| `clearStencilBuffer?` | `boolean` | - | Sets whether the camera will automatically clear the stencil buffer before rendering. Defaults to true. Gets whether the camera will automatically clear the stencil buffer before rendering. |
| `cullFaces?` | `boolean` | - | Sets whether the camera will cull triangle faces. If true, the camera will take Material#cull  into account. Otherwise both front and back faces will be rendered. Defaults to true. Gets whether the camera will cull triangle faces. |
| `farClip?` | `number` | - | Sets the distance from the camera after which no rendering will take place. Defaults to 1000. Gets the distance from the camera after which no rendering will take place. |
| `flipFaces?` | `boolean` | - | Sets whether the camera will flip the face direction of triangles. If set to true, the camera will invert front and back faces. Can be useful for reflection rendering. Defaults to false. Gets whether the camera will flip the face direction of triangles. |
| `fov?` | `number` | - | Sets the field of view of the camera in degrees. Usually this is the Y-axis field of view (see horizontalFov). Used for PROJECTION_PERSPECTIVE cameras only. Defaults to 45. Gets the field of view of the camera in degrees. |
| `frustumCulling?` | `boolean` | - | Sets whether frustum culling is enabled. This controls the culling of MeshInstances against the camera frustum, i.e. if objects outside of the camera's frustum should be omitted from rendering. If false, all mesh instances in the scene are rendered by the camera, regardless of visibility. Defaults to false. Gets whether frustum culling is enabled. |
| `horizontalFov?` | `boolean` | - | Sets whether the camera's field of view (fov) is horizontal or vertical. Defaults to false (meaning it is vertical by default). Gets whether the camera's field of view (fov) is horizontal or vertical. |
| `layers?` | `readonly number[]` | - | Sets the array of layer IDs (Layer#id ) to which this camera should belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Defaults to [LAYERID_WORLD, LAYERID_DEPTH, LAYERID_SKYBOX, LAYERID_UI, LAYERID_IMMEDIATE]. Gets the array of layer IDs (Layer#id ) to which this camera belongs. |
| `jitter?` | `number` | - | Sets the jitter intensity applied in the projection matrix. Used for jittered sampling by TAA. A value of 1 represents a jitter in the range of `[-1, 1]` of a pixel. Smaller values result in a crisper yet more aliased outcome, whereas increased values produce a smoother but blurred result. Defaults to 0, representing no jitter. Gets the jitter intensity applied in the projection matrix. |
| `nearClip?` | `number` | - | Sets the distance from the camera before which no rendering will take place. Defaults to 0.1. Gets the distance from the camera before which no rendering will take place. |
| `orthoHeight?` | `number` | - | Sets the half-height of the orthographic view window (in the Y-axis). Used for PROJECTION_ORTHOGRAPHIC cameras only. Defaults to 10. Gets the half-height of the orthographic view window (in the Y-axis). |
| `priority?` | `number` | - | Sets the priority to control the render order of this camera. Cameras with a smaller priority value are rendered first. Defaults to 0. Gets the priority to control the render order of this camera. |
| `projection?` | `number` | - | Sets the type of projection used to render the camera. Can be: - PROJECTION_PERSPECTIVE: A perspective projection. The camera frustum resembles a truncated pyramid. - PROJECTION_ORTHOGRAPHIC: An orthographic projection. The camera frustum is a cuboid. Defaults to PROJECTION_PERSPECTIVE. Gets the type of projection used to render the camera. |
| `projectionOffset?` | `[number, number]` | - | Sets the offset of the projection window from the view direction, creating an off-center (asymmetric) projection. The offset is expressed in half-frustum units - an offset of `(0, 1)` moves the projection window up by half of the frustum height. Applies to both perspective and orthographic projections and is ignored in XR, where the projection is supplied by the XR system. Defaults to `(0, 0)`. A typical use case is perspective correction (shift lens): keep the camera level and use a vertical offset to frame a tall object, so its vertical lines stay parallel: Gets the offset of the projection window. |
| `rect?` | `[number, number, number, number]` | - | Sets the rendering rectangle for the camera. This controls where on the screen the camera will render in normalized screen coordinates. Defaults to `[0, 0, 1, 1]`. The rectangle can extend past the render target bounds, for example `[-0.5, 0, 1.5, 1]`, with only its overlapping part being rendered. This is supported on WebGL2, and on WebGPU on platforms that allow viewports extending past the render target bounds. Gets the rendering rectangle for the camera. |
| `renderSceneColorMap?` | `boolean` | - |  |
| `renderSceneDepthMap?` | `boolean` | - |  |
| `sceneColorMapMipmaps?` | `boolean` | - | Sets whether the scene color map of this camera has mipmaps. Rough refractive materials sample its small mip levels, which blur what is behind them. Without mipmaps, they sample the full resolution map, and refract sharply. This saves generating the mipmaps each frame, and the memory of about a third of the map, where only sharp refraction is needed, such as of clear glass or a heat haze. Defaults to true. Gets whether the scene color map of this camera has mipmaps. |
| `sceneColorMapMipmapFilter?` | `string` | - | Sets the filter used to generate the mipmaps of the scene color map of this camera, when it has them, see CameraComponent#sceneColorMapMipmaps . Can be: - MIPMAPFILTER_BOX: averages each block of 2x2 texels of the previous mip level. - MIPMAPFILTER_GAUSSIAN: a wider, smooth filter, which avoids the blocks and the flickering of the box filter in the blurred refraction, at a higher cost of generating the mipmaps. Defaults to MIPMAPFILTER_BOX. See Texture#mipmapFilter . Gets the filter used to generate the mipmaps of the scene color map of this camera. |
| `renderTarget?` | `RenderTarget \| null` | - | Sets the render target to which rendering of the camera is performed. If not set, it will render simply to the screen. Gets the render target to which rendering of the camera is performed. |
| `scissorRect?` | `[number, number, number, number]` | - | Sets the scissor rectangle for the camera. This clips all pixels which are not in the rectangle. The order of the values is `[x, y, width, height]`. Defaults to `[0, 0, 1, 1]`. Gets the scissor rectangle for the camera. |
| `sensitivity?` | `number` | - | Sets the camera sensitivity in ISO. Defaults to 1000. Higher value means more exposure. Used if Scene#physicalUnits  is true. Gets the camera sensitivity in ISO. |
| `shutter?` | `number` | - | Sets the camera shutter speed in seconds. Defaults to 1/1000s. Longer shutter means more exposure. Used if Scene#physicalUnits  is true. Gets the camera shutter speed in seconds. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
