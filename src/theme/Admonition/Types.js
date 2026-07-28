import React from 'react';
import Types from '@theme-original/Admonition/Types';
import Info from '@theme/Admonition/Type/Info';

export default {
  ...Types,
  ai: (props) => <Info {...props} className="theme-admonition-ai" icon={<svg aria-hidden="true" viewBox="0 0 14 14"><path d="m7 0 1.9 5.1L14 7 8.9 8.9 7 14 5.1 8.9 0 7l5.1-1.9L7 0Z" /></svg>} title={props.title ?? 'AI'} />,
};
