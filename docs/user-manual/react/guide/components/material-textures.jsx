import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useMaterial, useTexture } from '@playcanvas/react/hooks';
import { useControls } from 'leva';

const textures = {
    'Granite': {
        diffuse: '/assets/materials/granite/albedo.webp',
        normal: '/assets/materials/granite/normal.webp',
        roughness: '/assets/materials/granite/roughness.webp',
        ao: '/assets/materials/granite/ao.webp'
    },
    'Paint': {
        diffuse: '/assets/materials/paint/albedo.webp',
        normal: '/assets/materials/paint/normal.webp',
        roughness: '/assets/materials/paint/roughness.webp',
        ao: '/assets/materials/paint/ao.webp'
    },
    'Concrete': {
        diffuse: '/assets/materials/concrete/albedo.webp',
        normal: '/assets/materials/concrete/normal.webp',
        roughness: '/assets/materials/concrete/roughness.webp',
        ao: '/assets/materials/concrete/ao.webp'
    }
};

const vars = {
    diffuse: { value: '#ffffff' },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    materialSet: {
        options: textures,
        value: textures['Concrete']
    },
};

// ↑ imports hidden
export const MaterialTextures = () => {
    const { materialSet, roughness, ...materialProps } = useControls(vars);

    // Load Textures
    const { asset: diffuseMap } = useTexture(materialSet.diffuse);
    const { asset: normalMap } = useTexture(materialSet.normal);
    const { asset: roughnessMap } = useTexture(materialSet.roughness);
    const { asset: aoMap } = useTexture(materialSet.ao);
    
    const material = useMaterial({
        diffuseMap: diffuseMap?.resource, 
        normalMap: normalMap?.resource, 
        roughnessMap: roughnessMap?.resource, 
        aoMap: aoMap?.resource,
        useMetalness: true,
        glossInvert: true,
        gloss: roughness,
        ...materialProps
    });
    
    return <Entity>
        <Render type="sphere" material={material} />
    </Entity>
};

