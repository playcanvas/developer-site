---
title: AI Development
description: Choose AI tools for PlayCanvas Engine code, project files, or direct Editor automation.
---

AI coding assistants can work with PlayCanvas through project files or directly through the Editor. Choose the integration that matches the task.

## Develop with the Engine

Use [Developing with the Engine](./developing-with-engine.md) when an AI assistant is working in a standalone PlayCanvas Engine repository. It covers recommended command-line and visual clients, project context, browser verification, plugins, and official AI tool documentation.

This workflow is best for:

- Building applications that use the Engine from npm or a CDN
- Editing and testing a local JavaScript or TypeScript codebase
- Giving an assistant access to current Engine documentation and browser tooling

## Work with Project Files

Use the [VS Code Extension](./vscode-extension.md) when an AI coding assistant needs to edit scripts, shaders, or other text assets. Pull/Push mode keeps the assistant's changes local until you review and push them to the PlayCanvas project.

This workflow is best for:

- Editing several project files together
- Using project-wide search, type checking, and source control
- Reviewing changes before they reach collaborators

## Automate the Editor

Use the [Editor MCP Server](./editor-mcp-server.md) when an AI assistant needs to work with the Editor's entities, assets, scenes, viewport, running application, or version control.

This workflow is best for:

- Building and modifying scenes
- Inspecting the viewport and running application
- Testing changes through screenshots, runtime state, input, and console logs
- Creating checkpoints before an assistant changes the project
