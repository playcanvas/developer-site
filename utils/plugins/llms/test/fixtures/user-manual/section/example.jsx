import { Entity } from '@playcanvas/react';
import { Camera } from '@playcanvas/react/components';

// ↑ imports hidden

export const Example = () => (
    <Entity name="camera" position={[0, 0, 3]}>
        <Camera clearColor="#090707" />
    </Entity>
);
