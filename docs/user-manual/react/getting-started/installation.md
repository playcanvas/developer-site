---
title: Installation
description: Install PlayCanvas React with npm create playcanvas, TypeScript template notes, and manual setup steps for npm packages and Vite.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The recommended way to get started is to use the official [`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/) scaffolding tool and choose the React format:

```bash
npm create playcanvas@latest my-app -- -f react
```

Choose one of the 12 runnable starters when prompted. The generated TypeScript project includes Vite, development and production scripts, and [PlayCanvas Skills](/user-manual/getting-started/use-playcanvas-skills/) for compatible AI coding agents.

We recommend following [this guide](../../building-a-scene) to start building your first project.

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

Once installed, you can start using it in your project. As the next step, we recommend following the [building a scene guide](../../building-a-scene) to create your first project.

### Starter Templates

Explore the complete [starter catalogue](/user-manual/getting-started/start-with-create-playcanvas/#choose-a-starter), or quickly spin up a project from the [StackBlitz template](https://stackblitz.com/edit/playcanvas-react-template?file=src%2FScene.tsx).
