import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';
import { useControls } from 'leva';

const vars = {
    diffuse: { value: '#000000' },
    metalness: { value: 1, min: 0, max: 1, step: 0.01 },
    gloss: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // emissive: { value: '#000000' },
    // emissiveIntensity: { value: 0, min: 0, max: 2, step: 0.01 },
    // specular: { value: '#ffffff' },
    // shininess: { value: 30, min: 0, max: 100, step: 1 },
    // reflectivity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // clearCoat: { value: 0, min: 0, max: 1, step: 0.01 },
    // clearCoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 }
};

// ↑ imports hidden
export const MaterialExample = () => {
    const materialProps = useControls(vars);
    const material = useMaterial({ 
      useMetalness: true,
      glossInvert: true,
      ...materialProps 
    });


    return (
      <Entity>
          <Render type="box" material={material} />
      </Entity>
    );
};