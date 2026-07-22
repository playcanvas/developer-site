import React from 'react';
import { translate } from '@docusaurus/Translate';
import Types from '@theme-original/Admonition/Types';
import Info from '@theme/Admonition/Type/Info';

export default {
  ...Types,
  ai: (props) => <Info {...props} className="theme-admonition-ai" icon={<span aria-hidden="true">✦</span>} title={props.title ?? translate({ id: 'theme.admonition.ai', message: 'Ask your agent' })} />,
};
