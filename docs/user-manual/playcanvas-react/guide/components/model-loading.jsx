import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useModel } from '@playcanvas/react/hooks';

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

  // If the asset is loaded, render it
  return (
    <Entity position={[0, -0.5, 0]} scale={[0.1, 0.1, 0.1]}>
      <Render asset={asset} />
    </Entity>
  );
};

