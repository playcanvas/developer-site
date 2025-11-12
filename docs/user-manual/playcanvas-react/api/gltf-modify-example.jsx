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


