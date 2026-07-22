import React from 'react';
import Types from '@theme-original/Admonition/Types';
import Info from '@theme/Admonition/Type/Info';

export default {
  ...Types,
  ai: (props) => <Info {...props} className="theme-admonition-ai" icon={<span aria-hidden="true">✦</span>} title={props.title ?? 'AI'} />,
};
