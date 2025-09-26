import React from 'react';

// Engine Scripts
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { ShadowCatcher as ShadowCatcherScript } from 'playcanvas/scripts/esm/shadow-catcher.mjs';
import { Grid as GridScript } from 'playcanvas/scripts/esm/grid.mjs';

// PlayCanvas React
import * as PlayCanvasReact from '@playcanvas/react';
import * as PlayCanvasReactComponents from '@playcanvas/react/components';
import * as PlayCanvasReactScripts from '@playcanvas/react/scripts';
import * as PlayCanvasReactHooks from '@playcanvas/react/hooks';

// Custom Components
import Grid from '../../components/playcanvas-react/Grid';
import ShadowCatcher from '../../components/playcanvas-react/ShadowCatcher';
import StaticPostEffects from '../../components/playcanvas-react/PostEffects';
import AutoRotate from '../../components/playcanvas-react/AutoRotate';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  ...PlayCanvasReact,
  ...PlayCanvasReactComponents,
  ...PlayCanvasReactScripts,
  ...PlayCanvasReactHooks,
  Grid,
  ShadowCatcher,
  GridScript,
  ShadowCatcherScript,
  StaticPostEffects,
  AutoRotate,
  CameraControls,
};

export default ReactLiveScope;
