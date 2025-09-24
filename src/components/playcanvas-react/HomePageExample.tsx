"use client";
import React from 'react';
import { Entity } from '@playcanvas/react';
import { Camera, Environment, Script, Render } from '@playcanvas/react/components';
import { useEnvAtlas, useModel } from '@playcanvas/react/hooks';

import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Vec2 } from 'playcanvas';
import Grid from './Grid';
import StaticPostEffects from './PostEffects';
import ShadowCatcher from './ShadowCatcher';

const OrbitControls = ({ zoomRange = [1, 10], pitchRange = [-90, -5], ...props }) => {
    return <Script script={CameraControls} enableFly={false} zoomRange={new Vec2(zoomRange[0], zoomRange[1])} pitchRange={new Vec2(pitchRange[0], pitchRange[1])} {...props} />
};

const HomePageExample = () => {
    const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
    const { asset: model } = useModel('/assets/lambo.glb');

    if (!model || !envAtlas) return null;

    return (
        <Entity>
            <Environment envAtlas={envAtlas} showSkybox={false} skyboxIntensity={2}/>
            <Grid />
            <ShadowCatcher width={5} depth={5} />
            <Entity name='camera' position={[4, 1, 4]}>
                <Camera clearColor='#090707' fov={28} renderSceneColorMap={true} />
                <OrbitControls inertiaFactor={0.07} zoomRange={[6, 10]} pitchRange={[-90, -5]}/>
                <StaticPostEffects />
            </Entity>
            <Entity>
                <Render type='asset' asset={model}/>
            </Entity>
        </Entity>
    )
}

export default HomePageExample;
