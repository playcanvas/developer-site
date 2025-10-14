import { Entity } from '@playcanvas/react';
import { Environment, Render } from '@playcanvas/react/components';
import {  useTexture, useModel } from '@playcanvas/react/hooks';
import { useControls } from 'leva'

const vars = { 
    exposure: { value: 0.75, min: 0, max: 1 }, 
    environment: {
        options: {
        Street:'/assets/wide-street.hdr', 
        ['Aviation Museum']:'/assets/museum.hdr'
        },
        value: '/assets/wide-street.hdr'
    } 
}
// ↑ imports hidden

export const EnvironmentExample = () => {
    const { exposure, environment } = useControls(vars)
    
    // Load the assets
    const { asset: lambo } = useModel('/assets/lambo.glb');
    const { asset: skybox } = useTexture(environment);
    
    if (!lambo || !skybox) return null;

    return (<>
        {/* Environment with controllable settings */}
        <Environment 
            type="dome"
            skybox={skybox}
            exposure={exposure}
            scale={[15, 15, 15]} 
            center={[0.0, 0.09, 0.0]} 
            rotation={[0, 290, 0]}
            showSkybox={true}
        />

        {/* Render the model */}
        <Entity name='lambo'>
            <Render asset={lambo} />
        </Entity>
    </>);
}
