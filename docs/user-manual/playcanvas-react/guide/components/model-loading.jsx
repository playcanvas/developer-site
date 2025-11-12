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

  // If the asset is loaded, render it with Gltf
  return <Gltf asset={asset} key={asset.id} />;
};

