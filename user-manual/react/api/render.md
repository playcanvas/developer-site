# `<Render/>`

The `<Render/>` component allows an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) to display a 3D asset or primitive shape. Adding the `<Render/>` component to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) will add a `RenderComponent` to the entity. The `type` prop allows you to select the primitive shape to render.

**Render a primitive shape**

```jsx title="render-box.jsx"
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useState } from 'react';

export const RenderBox = () => {

  const [shape, setShape] = useState('box');

  const onSphereClick = () => setShape('sphere');
  const onBoxClick = () => setShape('box');

  return (<>
    <Entity position={[0, 0, 0]}>
      <Render type={shape} />
    </Entity>
    <div className="overlay">
      <button data-selected={shape === 'sphere'} onClick={onSphereClick}>Sphere</button>
      <button data-selected={shape === 'box'} onClick={onBoxClick}>Box</button>
    </div>
    </>
  )
}
```

## Rendering an Asset

To render a 3D model loaded from a URL, you can use the asset type and pass the asset directly to the `asset` prop. You can learn more about loading assets in the [loading assets guide](https://developer.playcanvas.com/user-manual/react/guide/loading-assets.md).

```jsx copy
import { Render } from '@playcanvas/react/components'
import { useModel } from '@playcanvas/react/hooks'

const RenderModel = () => {
  const { asset } = useModel('model.glb')

  if (!asset) return null

  return <Entity>
    <Render type="asset" asset={asset} />
  </Entity>
}
```

Learn more about the [Render Component](https://api.playcanvas.com/engine/classes/RenderComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"asset" \| "box" \| "capsule" \| "cone" \| "cylinder" \| "plane" \| "sphere" \| "torus"` | `"box"` | The type of primitive shape to render. |
| `asset?` | `Asset<string, unknown>` | - | The asset to render. |
| `children?` | `ReactNode` | - |  |
| `isStatic?` | `boolean` | - | Mark meshes as non-movable (optimization). |
| `renderStyle?` | `number` | - | Sets the render style of this component's MeshInstances. Can be: - RENDERSTYLE_SOLID - RENDERSTYLE_WIREFRAME - RENDERSTYLE_POINTS Defaults to RENDERSTYLE_SOLID. Gets the render style of this component's MeshInstances. |
| `customAabb?` | `BoundingBox \| null` | - | Sets the custom object space bounding box that is used for visibility culling of attached mesh instances. This is an optimization, allowing an oversized bounding box to be specified for skinned characters in order to avoid per frame bounding box computations based on bone positions. Gets the custom object space bounding box that is used for visibility culling of attached mesh instances. |
| `meshInstances?` | `readonly MeshInstance[]` | - | Sets the array of meshInstances contained in the component. Gets the array of meshInstances contained in the component. Use the setter to replace the array; do not mutate the returned array. |
| `lightmapped?` | `boolean` | - | Sets whether the component is affected by the runtime lightmapper. If true, the meshes will be lightmapped after using lightmapper.bake(). Gets whether the component is affected by the runtime lightmapper. |
| `castShadows?` | `boolean` | - | Sets whether attached meshes will cast shadows for lights that have shadow casting enabled. Gets whether attached meshes will cast shadows for lights that have shadow casting enabled. |
| `shadowCascadeMask?` | `number` | - | Sets a bitmask that controls which shadow cascades the attached meshes contribute to when rendered with a LIGHTTYPE_DIRECTIONAL light source. Combine the SHADOW_CASCADE_0 .. SHADOW_CASCADE_3 flags to select individual cascades. This is only effective when castShadows is enabled. Defaults to SHADOW_CASCADE_ALL, which contributes to all available cascades. Note that this filters the meshes per cascade at render time, it does not remove them from the shadow casters of the Layer - use castShadows to disable shadow casting completely. Gets the bitmask that controls which shadow cascades the attached meshes contribute to. |
| `receiveShadows?` | `boolean` | - | Sets whether shadows will be cast on attached meshes. Gets whether shadows will be cast on attached meshes. |
| `clippingPlanes?` | `Plane[]` | - | Sets the planes that clip the attached meshes, in world space. The parts of the meshes behind any of the planes - on the side opposite to the plane normal - are not rendered, which cuts the meshes open along the planes. Use clipIntersection to clip only the parts behind all of the planes instead. Up to 8 planes are supported, and any more are ignored. Defaults to an empty array. The planes are given to the mesh instances of the component together with clipIntersection, also to ones it gets later, and replace their own, even when the component has none. Planes assigned to a mesh instance directly last until the component next gives it its clipping. The planes are copied, so changing a plane after the assignment has no effect until the array is assigned again. To clip an entity together with its descendants, such as an entity instantiated from a ContainerResource, assign the planes to all of their render components. To clip everything a camera renders, see CameraComponent#clippingPlanes  instead. Meshes with clipping planes are excluded from batching. See MeshInstance#clippingPlanes  for more details. Gets the planes that clip the attached meshes, in world space. These are copies of the assigned planes, and changing them has no effect until the array is assigned again. |
| `clipIntersection?` | `boolean` | - | Sets whether only the parts of the attached meshes behind all of the clippingPlanes are clipped, instead of the parts behind any of them. With two planes this cuts a wedge out of the meshes, and with three a corner, as a cutaway does. As with clippingPlanes, the mesh instances are given the planes and the mode together. Defaults to false. Gets whether only the parts of the attached meshes behind all of the clippingPlanes are clipped. |
| `castShadowsLightmap?` | `boolean` | - | Sets whether meshes instances will cast shadows when rendering lightmaps. Gets whether meshes instances will cast shadows when rendering lightmaps. |
| `lightmapSizeMultiplier?` | `number` | - | Sets the lightmap resolution multiplier. Gets the lightmap resolution multiplier. |
| `layers?` | `readonly number[]` | - | Sets the array of layer IDs (Layer#id ) to which the mesh instances belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Gets the array of layer IDs (Layer#id ) to which the mesh instances belong. |
| `batchGroupId?` | `number` | - | Sets the batch group for the mesh instances in this component (see BatchGroup). Default is -1 (no group). Gets the batch group for the mesh instances in this component (see BatchGroup). |
| `material?` | `Material` | - | Sets the material Material that will be used to render the component. The material is ignored for renders of type 'asset' — which is the type every entity produced by `instantiateRenderEntity` carries, so this setter has no effect on models loaded from a container. For those, assign `material` on each entry of RenderComponent#meshInstances  instead. Gets the material Material that will be used to render the component. |
| `materialAssets?` | `Asset<string, unknown>[] \| number[]` | - | Sets the material assets that will be used to render the component. Each material corresponds to the respective mesh instance. Gets the material assets that will be used to render the component. |
| `rootBone?` | `Entity \| null` | - | Sets the root bone entity (or entity guid) for the render component. Gets the root bone entity for the render component. |
| `materialAsset?` | `any` | - |  |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
