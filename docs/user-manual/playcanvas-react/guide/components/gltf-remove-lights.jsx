import { useModel } from '@playcanvas/react/hooks';
import { Gltf, Modify } from '@playcanvas/react';

export const GltfRemoveLights = () => {
  const { asset, error } = useModel('/assets/statue.glb');

  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  if (!asset) return null;

  return (
    <Gltf asset={asset} key={asset.id}>
      <Modify.Node path="**[light]">
        <Modify.Light remove />
      </Modify.Node>
    </Gltf>
  );
};

