import { useModel } from '@playcanvas/react/hooks';
import { Gltf, Entity } from '@playcanvas/react';

export const GltfBasic = () => {
  const { asset, error } = useModel('/assets/statue.glb');

  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  if (!asset) return null;

  return <Entity name='asset'>
    <Gltf asset={asset} key={asset.id} />
  </Entity>;
};

