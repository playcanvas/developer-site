---
title: Getting Started
---

Before you begin, make sure you have [Node.js](https://nodejs.org/) 18 or later installed.

## Installing from NPM

PCUI is available as a package on [NPM](https://www.npmjs.com/package/@playcanvas/pcui). You can install it as follows:

```bash
npm install @playcanvas/pcui --save-dev
```

This will include the entire PCUI library in your project. The various parts of the library will be available to import from that package at the following locations:

- Observers: `@playcanvas/observer`
- ES Module Components: `@playcanvas/pcui`
- React Components: `@playcanvas/pcui/react`

You can import the ES Module components into your own `.js` files and use them as follows:

```javascript
import { Button } from '@playcanvas/pcui';
import '@playcanvas/pcui/styles';

const button = new Button({
    text: 'Click Me'
});

document.body.appendChild(button.dom);
```

This will result in your first component being appended to your document body!

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=components-button--text&viewMode=story"></iframe>
</div>

## API Reference

The [API reference](https://api.playcanvas.com/pcui/) is a list of all of PCUI's class components and their properties. It is automatically generated from the source code.
