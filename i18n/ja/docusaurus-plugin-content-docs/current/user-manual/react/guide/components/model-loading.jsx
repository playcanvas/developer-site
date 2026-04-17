import { Entity } from '@playcanvas/react';
import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react';

export const ModelLoading = () => {
  // Load the selected model
  const { asset, error } = useModel('/assets/statue.glb');

  // If there is an error, log it
  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  // If the asset is not loaded, return null
  if (!asset) return null;

  // Match the original example framing so the shared staging camera starts outside the model.
  return (
    <Entity position={[0, -0.5, 0]} scale={[0.1, 0.1, 0.1]}>
      <Gltf asset={asset} key={asset.id} />
    </Entity>
  );
};
