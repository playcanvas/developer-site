# Materials

Materials are a fundamental part of 3D graphics. They define the appearance and properties of 3D objects when lit.

You work with materials in React using the [`useMaterial`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-material.md) hook which returns a [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) instance. You can then apply it to a [`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md) component.

```jsx copy filename="use-material.jsx"
import { useMaterial } from '@playcanvas/react/hooks'

export const RedBox = () => {
  const material = useMaterial({ diffuse: 'red' });
  return (
    <Entity>
      <Render type="box" material={material} />
    </Entity>
  )
}
```

In the example below, we're using the `useMaterial` hook to create a material and applying it to a `Render` component. We also add a `onClick` event to the `Entity` to change the material properties when the cube is clicked.

**Click the cube to change the materials properties**

```jsx title="materials.jsx"
import { useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';

const orange = {
    diffuse: 'orange',
    emissive: 'black'
};

const red = {
    diffuse: 'red',
    emissive: 'gray'
};

const powderblue = {
    diffuse: 'powderblue',
    emissive: 'orange'
};

const materials = [orange, red, powderblue];

export const Materials = () => {

  const [materialProps, setMaterialProps] = useState(orange);
  const material = useMaterial(materialProps);

  const onRequestRandomColor = () => {
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
    setMaterialProps(randomMaterial);
  };

  return (
    <Entity onClick={onRequestRandomColor} >
      <Render type="box" material={material} />
    </Entity>
  );
};
```

### Basic Properties

The hook accepts an object of properties that closely match those of the [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) class. It will return a [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) instance which can be applied to a [`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md) component.

```jsx copy
import { useMaterial } from '@playcanvas/react/hooks'

function BasicMaterialExample() {
  const material = useMaterial({
    diffuse: 'blue',       // Base color
    opacity: 0.7,          // Transparency (0-1)
    metalness: 0.8,        // Metallic property (0-1)
    roughness: 0.2,        // Surface roughness (0-1)
    emissive: 'green',     // Emissive color
    emissiveIntensity: 0.5 // Emissive strength
  })
  
  return <Render type="box" material={material} />
}
```

### Textures

You can also use textures with the material by loading them with the [`useTexture`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture) hook. Try switching between different texture sets and adjusting the material properties:

```jsx copy
import { useMaterial } from '@playcanvas/react/hooks'
import { useTexture } from '@playcanvas/react/hooks'

function TexturedMaterialExample() {
  const { asset: diffuseMap } = useTexture('diffuse.jpg')
  const material = useMaterial({ diffuseMap })

  return <Render type="box" material={material} />
}
```

**Switch between different material sets**

```jsx title="material-textures.jsx"
import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useMaterial, useTexture } from '@playcanvas/react/hooks';
import { useControls } from 'leva';

const textures = {
    'Granite': {
        diffuse: '/assets/materials/granite/albedo.png',
        normal: '/assets/materials/granite/normal.png',
        roughness: '/assets/materials/granite/roughness.png',
        ao: '/assets/materials/granite/ao.png'
    },
    'Paint': {
        diffuse: '/assets/materials/paint/albedo.png',
        normal: '/assets/materials/paint/normal.png',
        roughness: '/assets/materials/paint/roughness.png',
        ao: '/assets/materials/paint/ao.png'
    },
    'Concrete': {
        diffuse: '/assets/materials/concrete/albedo.png',
        normal: '/assets/materials/concrete/normal.png',
        roughness: '/assets/materials/concrete/roughness.png',
        ao: '/assets/materials/concrete/ao.png'
    }
};

const vars = {
    diffuse: { value: '#ffffff' },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    materialSet: {
        options: textures,
        value: textures['Concrete']
    },
};

// ↑ imports hidden
export const MaterialTextures = () => {
    const { materialSet, roughness, ...materialProps } = useControls(vars);

    // Load Textures
    const { asset: diffuseMap } = useTexture(materialSet.diffuse);
    const { asset: normalMap } = useTexture(materialSet.normal);
    const { asset: roughnessMap } = useTexture(materialSet.roughness);
    const { asset: aoMap } = useTexture(materialSet.ao);
    
    const material = useMaterial({
        diffuseMap: diffuseMap?.resource, 
        normalMap: normalMap?.resource, 
        roughnessMap: roughnessMap?.resource, 
        aoMap: aoMap?.resource,
        useMetalness: true,
        glossInvert: true,
        gloss: roughness,
        ...materialProps
    });
    
    return <Entity>
        <Render type="sphere" material={material} />
    </Entity>
};
```

## Related

- [useMaterial](https://developer.playcanvas.com/user-manual/react/api/hooks/use-material.md)
- [useTexture](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture)
- [Light](https://developer.playcanvas.com/user-manual/react/api/light.md)
- [Render](https://developer.playcanvas.com/user-manual/react/api/render.md)
