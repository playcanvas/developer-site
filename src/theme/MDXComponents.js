// src/theme/MDXComponents.js
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import EngineExample from '@site/src/components/EngineExample';
import RenderApiDocs from '@site/src/components/playcanvas-react/RenderApiDocs';

export default {
  ...MDXComponents,
  EngineExample,
  RenderApiDocs,
};
