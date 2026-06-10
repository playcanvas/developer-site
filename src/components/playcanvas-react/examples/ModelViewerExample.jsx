import { Application, Entity } from '@playcanvas/react';
import { Camera, Environment, Render, Script } from '@playcanvas/react/components';
import { useEnvAtlas, useModel } from '@playcanvas/react/hooks';
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Vec2 } from 'playcanvas';
import AutoRotate from '../AutoRotate';
import Grid from '../Grid';
import StaticPostEffects from '../PostEffects';
import ShadowCatcher from '../ShadowCatcher';

const OrbitControls = ({ zoomRange = [1, 10], pitchRange = [-90, -5], ...props }) => (
  <Script
    script={CameraControls}
    enableFly={false}
    zoomRange={new Vec2(zoomRange[0], zoomRange[1])}
    pitchRange={new Vec2(pitchRange[0], pitchRange[1])}
    {...props}
  />
);

// ↑ imports hidden

const ModelViewerScene = () => {
  /**
   * A simple glb viewer with environment lighting, a shadow catcher
   * and auto-rotating orbit controls.
   */
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
  const { asset: model } = useModel('/assets/lambo.glb');

  if (!model || !envAtlas) {
    return null;
  }

  return (
    <Entity>
      {/* Create some environment lighting */}
      <Environment envAtlas={envAtlas} showSkybox={false} />

      {/* Render the background grid */}
      <Grid />

      {/* Add a shadow catcher to catch the shadows from the model */}
      <ShadowCatcher width={5} depth={5} />

      {/* Create a camera entity */}
      <Entity name="camera" position={[4, 1, 4]}>
        <Camera clearColor="#090707" fov={28} renderSceneColorMap={true} />
        <OrbitControls inertiaFactor={0.07} zoomRange={[6, 10]} pitchRange={[-90, -5]} />
        <StaticPostEffects />
        <AutoRotate />
      </Entity>

      {/* Render the model */}
      <Render type="asset" asset={model} />
    </Entity>
  );
};

const ModelViewerExample = () => (
  <Application>
    <ModelViewerScene />
  </Application>
);

export default ModelViewerExample;
