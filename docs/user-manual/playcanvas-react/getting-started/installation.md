---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The recommended way to get started is to use the official PlayCanvas scaffolding tool, and follow the prompts.

```bash
npx create playcanvas@latest -t react-ts
```

This creates a new project with everything set up and ready to go. If you've followed the prompts, you'll have a new PlayCanvas react project running in your browser. 

We recommend following [this guide](../building-a-scene) to start building your first project.

:::note

We’re working on adding more React templates. Currently, only **TypeScript** is available.

:::

## Manual Installation

If you have an existing project, just install `@playcanvas/react` using your preferred package manager.

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @playcanvas/react playcanvas
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @playcanvas/react playcanvas
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @playcanvas/react playcanvas
```

</TabItem>
</Tabs>

Once installed, you can start using it in your project. As the next step, we recommend following the [building a scene guide](../building-a-scene) to create your first project.

### Starter Templates

Alternatively you can grab one of the [templates directly](https://github.com/playcanvas/create-playcanvas/tree/main/templates) or quickly spin a project up from our [StackBlitz template](https://stackblitz.com/edit/playcanvas-react-template?file=src%2FScene.tsx)
