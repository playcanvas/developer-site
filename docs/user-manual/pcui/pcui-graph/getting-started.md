---
title: Getting Started
---

## Installing from NPM

PCUI Graph is available as a package on [NPM](https://www.npmjs.com/package/@playcanvas/pcui-graph). You can install it as follows:

```bash
npm install @playcanvas/pcui-graph --save-dev
```

:::note

It is assumed you already have the `@playcanvas/pcui` package installed in your project.

:::

## Importing the Graph Component

You can import the `Graph` component as follows:

```javascript
import { Graph } from '@playcanvas/pcui-graph';
```

## Creating a Graph

Options can be passed to the `Graph` constructor as a JSON object which change the default behavior of the graph. You can do so as follows:

```javascript
const graph = new Graph(schema, {
    readOnly: true,
    initialData: { ... }
});
```

You can see a full list of options [here](https://api.playcanvas.com/pcui-graph/classes/Graph.html#constructor).

## Examples

Examples of PCUI Graph usage can be found in this [Storybook](https://playcanvas.github.io/pcui-graph/storybook/).
