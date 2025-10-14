import { Entity } from '@playcanvas/react';
import { GSplat, Camera } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';
// ↑ imports hidden
export const GSplatExample = () => {    
    const { asset } = useSplat('/assets/toy-cat.sog');

    if (!asset) return null;

    return (
        <Entity position={[0, 0, 0]} >
            <GSplat asset={asset} />
        </Entity>
    );
};

