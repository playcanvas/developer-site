---
title: Use PlayCanvas Skills
description: Use PlayCanvas-specific AI coding workflows to build and verify Engine, React, and Web Components applications.
---

[PlayCanvas Skills](https://github.com/playcanvas/skills) are portable instructions, references, and utilities for AI coding agents. They help an agent inspect the real project and installed packages, use the matching PlayCanvas authoring surface, and verify the result in a running application.

The skills support code-based applications built with the PlayCanvas Engine, React, and Web Components. They do not run in the application or add a runtime dependency.

## Start a New Project

The quickest way to start is with [`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/):

```sh
npm create playcanvas@latest
```

Every generated project includes the skills under `.claude/skills/` for Claude Code and `.agents/skills/` for Codex, Cursor, and other Agent Skills-compatible clients. Install the project dependencies, open the project root in your client, and start a new conversation so it discovers the skills.

## Add Skills to an Existing Project

Use the [Agent Skills](https://skills.sh/) installer from the project root:

```sh
npx skills add playcanvas/skills
```

Use `--all` to install every skill into all detected clients, or `-g` for a user-level installation.

## Install the Claude Code Plugin

PlayCanvas is listed in the Anthropic Directory for Claude Code. In Claude Code or the Code tab in Claude Desktop, run `/plugin`, open **Discover**, and search for `playcanvas`. In the desktop app's Code tab, installed plugins are available under **+ > Plugins**.

Use one installation route per client so the same skills are not exposed twice. For example, do not install both the Agent Skills package and the Claude Code plugin for Claude Code. The [PlayCanvas Skills repository](https://github.com/playcanvas/skills#native-plugins) also documents its marketplace installation for Claude Code, Codex, and Cursor.

After installing or updating the skills, start a new agent conversation so the client reloads their metadata.

## What the Skills Cover

The collection is organized around the work required to turn a project brief and source assets into a verified application:

| Workflow | Skills |
| --- | --- |
| Application setup and conventions | `build-app`, `apply-conventions` |
| Official examples and Engine features | `find-examples`, `reuse-scripts` |
| Assets, models, and animation | `load-assets`, `inspect-glb`, `calibrate-model`, `configure-animation` |
| Scene composition and runtime inspection | `assemble-scene`, `inspect-runtime` |
| Lighting and effects | `light-scene`, `bake-lighting`, `add-effects`, `override-shader-chunks` |
| Rendering verification and performance | `verify-pixels`, `reduce-draw-calls` |

The agent loads only the skills relevant to the current task. Each skill tells it which installed package declarations, Engine source, scripts, or official examples to inspect before choosing an API or implementation.

## Ask for an Outcome

Describe the result you want and the evidence required to accept it. You do not need to name every skill yourself. For example:

```text
Build a Direct Engine product viewer for these GLBs. Inspect and calibrate every model,
reuse the shipped camera controls, and verify grounding and framing in the browser.
```

```text
Polish this PlayCanvas React prototype with fewer draw calls, pooled effects, coherent lighting,
and screenshot checks.
```

The agent should inspect the project before editing, preserve the active Engine, React, or Web Components surface, run the project's checks, and verify interactive or visual behavior in the browser.

For broader guidance on project context, prompts, browser tools, and evidence, see [Developing with AI](/user-manual/engine/developing-with-ai/).

## Scope

PlayCanvas Skills target code-based Engine application workflows. They do not automate PlayCanvas Editor projects, publish applications, manage PlayCanvas services, or replace project-specific art direction and gameplay design. For AI-assisted Editor workflows, use the [Editor MCP Server](/user-manual/editor/mcp-server/) and [VS Code Extension](/user-manual/editor/scripting/vscode-extension/).

To report a repeatable problem or suggest an improvement, use the [skill feedback form](https://github.com/playcanvas/skills/issues/new?template=skill-feedback.yml).
