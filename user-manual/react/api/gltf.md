# `<Gltf/>`

The `<Gltf/>` component loads and instantiates a GLB scene so you can work with its hierarchy from React. It renders the model by default, builds a cache of every entity in the file, and coordinates `<Modify.*>` rules so you can declaratively adjust the imported content.

Learn the bigger picture in the [Modifying GLB Models guide](https://developer.playcanvas.com/user-manual/react/guide/modifying-glb-models.md).

## Usage

Load a GLB with [`useModel`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md) and pass the asset into `<Gltf/>`. The component handles instantiation for you:

```tsx copy
import { useModel } from '@playcanvas/react/hooks';
import { Entity, Gltf } from '@playcanvas/react';

export function Statue() {
  const { asset } = useModel('/assets/statue.glb');
  if (!asset) return null;

  return (
    <Entity name="Statue">
      <Gltf asset={asset} key={asset.id} />
    </Entity>
  );
}
```

### Live example

This demo adds a control to change the render style of the model. It targets all nodes with a render component and changes the render style reactively.

**Control GLB rendering and render components**

```jsx title="gltf-modify-example.jsx"
import { useState } from 'react';
import { Entity, Gltf, Modify } from '@playcanvas/react';
import { useModel, useMaterial } from '@playcanvas/react/hooks';
import { useControls as useLevaControls } from 'leva';

const vars = {
  renderStyle: {
    options: {
      Wireframe: 1, 
      Shaded: 0
    },
    value: 1
  }
}

const useControls = () => useLevaControls(vars);
// ↑ imports hidden

export const GltfModifyExample = () => {
  const { asset } = useModel('/assets/statue.glb');
  const { renderStyle } = useControls()

  if (!asset) return null;

  return (
    <Gltf asset={asset} >
      <Modify.Node path="**[render]" >
        <Modify.Render renderStyle={renderStyle} />
      </Modify.Node>
    </Gltf>
  );
};
```

### Data-only instantiation

Set `render={false}` when you only need the scene hierarchy—for example when generating colliders or running queries. `<Gltf/>` still instantiates the GLB as long as you include at least one `<Modify.Node>` child.

```tsx copy
<Gltf asset={asset} key={asset.id} render={false}>
  <Modify.Node path="**">
    <Collision type="mesh" />
  </Modify.Node>
</Gltf>
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | `Asset` | - | The GLTF asset loaded via useModel |
| `render?` | `boolean` | `true` | Whether to render the GLTF scene visuals |
| `children?` | `ReactNode` | - | Children should contain <Modify.Node> components |
