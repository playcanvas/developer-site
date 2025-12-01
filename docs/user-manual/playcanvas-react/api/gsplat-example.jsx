import { Entity } from '@playcanvas/react';
import { GSplat, Camera } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';

export const GSplatExample = () => {
    // Load the Gaussian Splat asset
    const { asset } = useSplat('/assets/toy-cat.sog');

    // If the asset is not loaded, return null
    if (!asset) return null;

    // Return the GSplat component
    return (
        <Entity rotation={[180, 180, 0]} position={[0, -0.7, 0]} >
            <GSplat asset={asset} />
        </Entity>
    );
};

