import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react/gltf';

export const GltfBasic = () => {
  const { asset, error } = useModel('/assets/statue.glb');

  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  if (!asset) return null;

  return <Gltf asset={asset} key={asset.id} />;
};

