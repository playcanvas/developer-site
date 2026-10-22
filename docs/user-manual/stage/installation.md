---
title: Installation
description: Install the PlayCanvas Stage plugin for Claude Code or Codex, then open a new scene or an existing PlayCanvas app in Stage.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Stage is a plugin for your coding agent. Install it once, then ask the agent to open a scene or an app in Stage.

## Requirements

- [Node.js](https://nodejs.org/) 22.18 or later
- Chrome or Chromium
- An app on PlayCanvas Engine 2.23 or later
- Claude Code 2.1.275 or later, or Codex

## Install the Plugin

<Tabs defaultValue="claude" groupId='stage-agent'>
<TabItem value="claude" label="Claude Code">

```bash
claude plugin marketplace add playcanvas/stage
claude plugin install playcanvas-stage@stage
```

Or, in a session, run `/plugin install playcanvas-stage --marketplace playcanvas/stage`, then `/reload`.

</TabItem>
<TabItem value="codex" label="Codex">

```bash
codex plugin marketplace add playcanvas/stage
codex plugin add playcanvas-stage@stage
```

Codex asks before each Stage tool call unless you approve the server's tools.

</TabItem>
</Tabs>

Start a new session after installing so the agent picks up the plugin.

## Start from a New Scene

Ask your agent for a scene, for example "build my desk in 3D at real scale" or "block out a riverside plaza with a fountain and benches". The agent scaffolds a project with [`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/) in your working directory, starts its dev server, attaches Stage to it and opens it in your browser.

:::tip

Projects created with `create-playcanvas` include the [PlayCanvas Skills](/user-manual/getting-started/use-playcanvas-skills/), so the agent has PlayCanvas-specific context from the first prompt.

:::

## Attach an Existing App

Start your app's dev server as usual, then ask the agent to open the app in Stage. Stage proxies the dev server and adds its tools when the page loads, so:

- it works whatever the app is built with, through the Engine's devtools hook
- the app's own hot reload keeps working, websockets included
- a server without hot reload, such as static files or a plain Express server, gets a reload of the view when a file in the project changes
- nothing is added to your source except the edits the agent writes

:::note Engine bundled into your code?

An app that bundles the Engine into its own code needs one extra line before Stage can find it. The viewer shows you the line to add.

:::

Stage never starts, restarts or stops your dev server. While it isn't answering, the viewer shows a waiting banner and attaches when it comes back.

## Open the Viewer

The first time the agent attaches Stage, it opens the stage in your browser. Every stage is listed in the gallery at `http://localhost:47318/stages`.

:::warning Use Chrome or Firefox

Each stage runs on its own `*.localhost` address, which Safari may not resolve. Open the viewer in Chrome, Chromium or Firefox.

:::

## Next Steps

- [Editing Scenes](editing.md): pause, select and move entities, then Apply the edits
- [Comments](comments.md): point at what you mean and let the agent do the work
- [Devices and Inspector](viewer-tools.md): preview on phones and lenses, and inspect the running app
