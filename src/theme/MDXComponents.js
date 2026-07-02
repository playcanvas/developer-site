// src/theme/MDXComponents.js
import React from 'react';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme-original/MDXComponents';
import EngineExample from '@site/src/components/EngineExample';
import RenderApiDocs from '@site/src/components/playcanvas-react/RenderApiDocs';

// Shared static asset links are rewritten to pathname:// at compile time in
// localized builds (see utils/plugins/remark-root-static-urls.mjs). <Link>
// strips the prefix but would still prepend the locale baseUrl, so opt those
// links out of it to keep them pointing at the site root.
function A(props) {
  return <Link {...props} autoAddBaseUrl={!props.href?.startsWith('pathname://')} />;
}

export default {
  ...MDXComponents,
  a: A,
  EngineExample,
  RenderApiDocs,
};
