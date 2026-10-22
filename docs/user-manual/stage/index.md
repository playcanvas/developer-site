---
title: PlayCanvas Stage
description: Work on PlayCanvas apps together with your coding agent. Point at entities instead of describing them, move them with gizmos, and the agent writes your edits into the source.
---

[PlayCanvas Stage](https://github.com/playcanvas/stage) is an editor where you and your coding agent work on PlayCanvas apps together. Instead of describing where something is, you point at it: click an entity or drag across an area, and the agent gets its entity path, the 3D point and a capture of what you saw. Move objects with gizmos, press **Apply**, and the agent writes your edits into the source.

Stage attaches to any running PlayCanvas app, whatever its stack, and shows it in a viewer in your browser with play and pause, gizmos, comments and the [PlayCanvas Inspector](https://github.com/playcanvas/inspector) beside it. It works with Claude Code and Codex, and runs entirely on your machine.

![A cosy reading nook app paused in the Stage viewer: the armchair is selected with the move gizmo, and the comments panel shows the agent's reply](/img/user-manual/stage/stage.webp)

:::note Open Source

PlayCanvas Stage is [open-sourced under an MIT license on GitHub](https://github.com/playcanvas/stage). Version 0.1.0 is a prerelease, so expect changes between versions.

:::

## Requirements

- [Node.js](https://nodejs.org/) 22.18 or later
- Chrome or Chromium
- An app on PlayCanvas Engine 2.23 or later
- Claude Code 2.1.275 or later, or Codex

## Installation

Install Stage as a plugin in your coding agent.

### Claude Code

```bash
claude plugin marketplace add playcanvas/stage
claude plugin install playcanvas-stage@stage
```

Or, in a session, run `/plugin install playcanvas-stage --marketplace playcanvas/stage`, then `/reload`.

### Codex

```bash
codex plugin marketplace add playcanvas/stage
codex plugin add playcanvas-stage@stage
```

## Getting Started

Ask your agent for a scene ("build my desk in 3D at real scale"), or point it at an app you already have.

- **A new scene:** the agent scaffolds a project with [`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/), starts its dev server, attaches Stage to it and opens it in your browser.
- **An existing app:** the agent attaches Stage to the app's running dev server. Stage proxies the server and adds its tools when the page loads, so the app's own hot reload keeps working and nothing is added to your source except the edits the agent writes.

Stage finds the app through the Engine's devtools hook, so it works whatever the app is built with. An app that bundles the Engine into its own code needs one extra line, which the viewer shows you.

Every stage is listed in the gallery at `http://localhost:47318/stages`. Stage never starts or stops your dev server. While the server isn't answering, the viewer shows a waiting banner and attaches when it comes back.

## Play, Pause and Select

The toolbar above the app plays and pauses it with <kbd>⌘</kbd>+<kbd>P</kbd> (<kbd>Ctrl</kbd>+<kbd>P</kbd> on Windows and Linux). Pausing stops the app's updates, input and audio, and an editor camera takes over while the game camera stays where the app put it:

- drag to orbit, middle-drag or <kbd>Shift</kbd>+drag to pan, and scroll to zoom
- right-drag to look around and <kbd>W</kbd>/<kbd>A</kbd>/<kbd>S</kbd>/<kbd>D</kbd>/<kbd>Q</kbd>/<kbd>E</kbd> to fly
- <kbd>F</kbd> to frame the selection, or the whole scene, and orbit it
- <kbd>⌥</kbd>+<kbd>⌘</kbd>+<kbd>P</kbd> to step the app one frame

Paused, click an entity to select it.

<video autoPlay muted loop controls src='/video/stage-select-rotate.mp4' style={{width: '100%', height: 'auto'}} />

## Move, Rotate and Scale

With an entity selected, switch the gizmo with <kbd>1</kbd> (move), <kbd>2</kbd> (rotate) and <kbd>3</kbd> (scale). Every toolbar button shows what it does and its key on hover.

| Key | Action |
| --- | --- |
| <kbd>1</kbd> | **Move:** drag an arrow or plane of the gizmo |
| <kbd>2</kbd> | **Rotate:** drag a ring of the gizmo |
| <kbd>3</kbd> | **Scale:** drag a handle of the gizmo |
| <kbd>X</kbd> | Switch the gizmo between world and local axes |
| <kbd>Shift</kbd> | Hold while dragging to snap: move in 0.1 m, turn in 15° and scale in 0.1 steps |
| <kbd>G</kbd> | Show or hide the ground grid |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Z</kbd> | Undo |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo |

<video autoPlay muted loop controls src='/video/stage-move-scale-undo.mp4' style={{width: '100%', height: 'auto'}} />

The grid only shows to the editor camera. It never appears in comment captures and can't be selected.

## Apply Edits to the Source

Every edit is saved as you make it, shows in every open view of the stage and survives reloads. Nothing changes in your source until you decide:

- **Apply** sends the edits to the agent, to write into the source.
- **Discard** puts the edited entities back where the app placed them, and sends nothing. It can be undone.

<video autoPlay muted loop controls src='/video/stage-apply.mp4' style={{width: '100%', height: 'auto'}} />

## Comment on What You See

Press <kbd>C</kbd> or the **Comment** button to enter comment mode (a playing app pauses). Then:

- click an entity to comment on it, or drag across an area, empty space included
- <kbd>Shift</kbd>+click adds another object to the open comment, and <kbd>Shift</kbd>+drag adds everything an area covers
- outside the canvas, any element of the page takes a comment, and a drag that starts on text quotes it

A comment is pinned to the 3D point you placed it at, and the agent gets the entity's path, that point and a capture of what you saw. You can attach up to 4 reference images to a comment or reply by pasting, dropping or picking them.

The comment box has two buttons. **Comment** posts the comment. **Send to Agent** posts it and hands the thread to the agent, which reads it, does the work and replies in the thread without you typing anything in the session. Comment mode stays on until **Done commenting**, <kbd>C</kbd>, or a second <kbd>Esc</kbd>.

<video autoPlay muted loop controls src='/video/stage-comment.mp4' style={{width: '100%', height: 'auto'}} />

A thread sent to the agent shows where it is:

| Status | Meaning |
| --- | --- |
| **Queued for an agent session** | No session has picked it up yet |
| **Working on it…** | The agent has received it |
| **Hasn't replied yet** | No reply within 10 minutes |

Deleting a thread while the agent is working on it withdraws the request: the agent is told to drop it and revert the changes it made for it.

The circle at the right of the header shows whether a session is linked to the stage. **Agent is watching** means comments reach the agent straight away. **No agent session** means comments you send wait until a session links the stage; paste the stage's URL into a session to link it.

## Preview on Devices

The device menu shows the app at a phone or tablet viewport: **Snapchat Web Lens** (360×640, portrait only), iPhone, Android, iPad or Responsive.

<video autoPlay muted loop controls src='/video/stage-device.mp4' style={{width: '100%', height: 'auto'}} />

## Inspector and MiniStats

The **Inspector** button in the header opens the [PlayCanvas Inspector](https://github.com/playcanvas/inspector) beside the app, as a read-only view of its hierarchy, cameras, assets, materials, memory and more. Its selection is shared with the viewer, so selecting a row in the panel selects the entity in the view.

The **MiniStats** button shows the app's frame time, GPU and CPU timings, draw calls and memory over its canvas, and stays on across reloads until you turn it off.

<video autoPlay muted loop controls src='/video/stage-inspector-ministats.mp4' style={{width: '100%', height: 'auto'}} />

## Claude Code and Codex

Both agents share one local server and the same set of stages.

- **Claude Code:** the plugin's comment monitor wakes an idle session as soon as you send a comment or press **Apply**.
- **Codex:** Codex has no monitors, so the plugin starts a watcher on your first message in a session that hands each comment to `codex queue` (experimental in Codex). Codex asks before each Stage tool call unless you approve the server's tools.

## Settings

Set these environment variables before starting your agent:

| Variable | Default | Effect |
| --- | --- | --- |
| `STAGE_PORT` | `47318` | Viewer and API port |
| `STAGE_DIR` | `~/.playcanvas-stage` | State directory |
| `STAGE_AUTO_OPEN` | on | `0` stops opening new stages in the browser |
| `CHROME_PATH` | auto | Chrome binary for headless previews |

The local server starts on the first Stage tool call and keeps running after the session ends. Stop it with:

```bash
kill $(jq .pid ~/.playcanvas-stage/server.json)
```

## Data and Network Use

Stage has no telemetry and makes no outbound requests of its own. Its server binds to `127.0.0.1` only and keeps all state in `~/.playcanvas-stage`. Scaffolding a new project runs `npx create-playcanvas@latest` from npm. Any other traffic is only what your app loads.

## Known Limitations

- Safari may not resolve the `*.localhost` addresses each stage runs on, so open the viewer in Chrome.
- An app that bundles the Engine into its own code needs one extra line before Stage can find it. The viewer shows the line to add.

## Learn More

- [PlayCanvas Stage on GitHub](https://github.com/playcanvas/stage), with the full plugin reference
- [Developing with AI](/user-manual/engine/developing-with-ai/)
- [Report an issue](https://github.com/playcanvas/stage/issues)
