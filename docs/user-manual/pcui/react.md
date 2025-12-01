---
title: React
---

PCUI components can be used directly in React applications. Import the components from the React package and use them in your `.jsx` files as follows:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { TextInput } from '@playcanvas/pcui/react';
import '@playcanvas/pcui/styles';

ReactDOM.render(
    <TextInput />,
    document.body
);
```

This example renders a basic text input component. You can see it in action below:

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=components-textinput--main&viewMode=story"></iframe>
</div>

For more complex implementations, check out the [examples](../examples) section.

## Storybook

The [PCUI Storybook](https://playcanvas.github.io/pcui/storybook/) provides an interactive showcase of all available components. You can:

- Explore each component's properties and behavior
- Test different configurations in real-time
- View component documentation
- Copy example code
