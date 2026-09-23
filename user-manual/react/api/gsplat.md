# `<GSplat/>`

The `<GSplat>` component is used to render [Gaussian Splats](https://api.playcanvas.com/engine/classes/GSplatComponent.html). Gaussian Splats are a new way of capturing and rendering high quality 3D content. They capture the shape and lighting of a scene in a way that produces incredibly high quality results.

The `useSplat` hooks accepts ply or sog files or any other files that can be loaded by the engine.

## Usage

You can load a Gaussian Splat asset with the [`useSplat`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usesplat) hook and then use the `<GSplat>` component to render it.

```tsx
const { asset } = useSplat('/assets/toy-cat.sog');
<GSplat asset={asset} />
```

**Load and render a Gaussian Splat**

```jsx title="gsplat-example.jsx"
import { Entity } from '@playcanvas/react';
import { GSplat, Camera } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';

export const GSplatExample = () => {
    // Load the Gaussian Splat asset
    const { asset } = useSplat('/assets/toy-cat.sog');

    // If the asset is not loaded, return null
    if (!asset) return null;

    // Return the GSplat component
    return (
        <Entity rotation={[180, 180, 0]} position={[0, -0.7, 0]} >
            <GSplat asset={asset} />
        </Entity>
    );
};
```

Learn more about the [GSplat Component](https://api.playcanvas.com/engine/classes/GSplatComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `customAabb?` | `BoundingBox \| null` | - | Sets a custom object space bounding box for visibility culling of the attached gsplat. Gets the custom object space bounding box for visibility culling of the attached gsplat. Returns the custom AABB if set, otherwise falls back to the resource's AABB. |
| `material?` | `ShaderMaterial` | - |  |
| `castShadows?` | `boolean` | - | Sets whether gsplat will cast shadows for lights that have shadow casting enabled. Defaults to false. Gets whether gsplat will cast shadows for lights that have shadow casting enabled. |
| `lodFalloff?` | `number` | - | Sets how quickly this splat's level of detail drops with distance from the camera. The default of 1 gives a balanced falloff. Higher values concentrate detail near the camera at the cost of the far field, while values towards 0 spread it evenly across the scene regardless of the view. This primarily redistributes the detail this splat receives from the global GSplatParams#splatBudget  between its near and far field, though it can also shift how the budget divides between splats. Clamped to [0, 8]. Gets how quickly this splat's level of detail drops with distance from the camera. |
| `lodRangeMin?` | `number` | - | Sets the minimum allowed LOD index (inclusive) for this splat. The optimal LOD selected by distance is clamped so it never goes finer (lower index) than this value. The value is further clamped to the asset's valid LOD range `[0, octree.lodLevels - 1]` at use. Setting a higher minimum prevents downloading the highest quality (largest) LOD files. Defaults to 0. Gets the minimum allowed LOD index. |
| `lodRangeMax?` | `number` | - | Sets the maximum allowed LOD index (inclusive) for this splat. The optimal LOD selected by distance is clamped so it never goes coarser (higher index) than this value. The value is clamped to the asset's valid LOD range `[0, octree.lodLevels - 1]` at use, so the default of 99 effectively means "no cap". Defaults to 99. Gets the maximum allowed LOD index. |
| `workBufferUpdate?` | `number` | - | Sets the work buffer update mode. Splat data is rendered to a work buffer only when needed (e.g., when transforms change). Can be: - WORKBUFFER_UPDATE_AUTO: Update only when needed (default). - WORKBUFFER_UPDATE_ONCE: Force update this frame, then switch to AUTO. - WORKBUFFER_UPDATE_ALWAYS: Update every frame. This is typically useful when using custom shader code via setWorkBufferModifier that depends on external factors like time or animated uniforms. Note: WORKBUFFER_UPDATE_ALWAYS has a performance impact as it re-renders all splat data to the work buffer every frame. Where possible, consider using shader customization on the gsplat material (`app.scene.gsplat.material`) which is applied during final rendering without re-rendering the work buffer. Gets the work buffer update mode. |
| `layers?` | `number[]` | - | Sets an array of layer IDs (Layer#id ) to which this gsplat should belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Gets the array of layer IDs (Layer#id ) to which this gsplat belongs. |
| `asset?` | `number \| Asset` | - | Sets the gsplat asset for this gsplat component. Can also be an asset id. Gets the gsplat asset id for this gsplat component. |
| `resource?` | `GSplatResourceBase \| null` | - | Sets a GSplat resource directly (for procedural/container splats). When set, this takes precedence over the asset property. Gets the GSplat resource. Returns the directly set resource if available, otherwise returns the resource from the assigned asset. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
