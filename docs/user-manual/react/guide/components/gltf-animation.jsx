import { useModel } from '@playcanvas/react/hooks';
import { Gltf, Modify } from '@playcanvas/react';
import { Anim } from '@playcanvas/react/components';

export const GltfAnimation = () => {
  const { asset, error } = useModel('/assets/statue.glb');

  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  if (!asset) return null;

  // Find the root skeleton node and attach the animation component
  // Note: The actual path depends on your GLB structure
  // Common patterns: 'Root', 'Scene', or the name of your skeleton root
  return (
    <Gltf asset={asset} key={asset.id}>
      <Modify.Node path="Root">
        <Anim asset={asset} clip="Walk" loop />
      </Modify.Node>
    </Gltf>
  );
};

