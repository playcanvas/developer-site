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
