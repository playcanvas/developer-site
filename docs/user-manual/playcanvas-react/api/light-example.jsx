import { Entity } from '@playcanvas/react';
import { Light, Render } from '@playcanvas/react/components';
import { useControls } from 'leva';

const vars = {
    type: { 
        options: ['directional', 'point', 'spot'],
        value: 'directional'
    },
    color: { value: '#ffffff' },
    intensity: { value: 1, min: 0, max: 5, step: 0.1 },
    range: { value: 10, min: 1, max: 50, step: 1 },
    innerConeAngle: { value: 20, min: 0, max: 90, step: 1 },
    outerConeAngle: { value: 30, min: 0, max: 90, step: 1 }
};

// ↑ imports hidden
export const LightExample = () => {
    const lightingProps = useControls(vars);

    return (
        <>
            {/* Light entity */}
            <Entity name="light" 
                position={lightingProps.type === 'directional' ? [0, 5, 0] : [0, 2, 0]}
                rotation={lightingProps.type === 'directional' ? [45, 0, 0] : [0, 0, 0]}
            >
                <Light {...lightingProps} />
            </Entity>

            {/* Box to show lighting */}
            <Entity position={[0, 0, 0]}>
                <Render type="box" />
            </Entity>

            {/* Sphere to show lighting */}
            <Entity position={[2, 0, 0]}>
                <Render type="sphere" />
            </Entity>

            {/* Cylinder to show lighting */}
            <Entity position={[-2, 0, 0]}>
                <Render type="cylinder" />
            </Entity>
        </>
    );
};

