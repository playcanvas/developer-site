---
title: File Handling
sidebar_position: 5
---

Shader Editor is a browser-based tool. However the graphs, materials and textures created are stored locally on the user's machine.

This section describes the various Shader Editor files.

### Project Files

When working in Shader Editor, the graphs, materials, textures and preview assets created are grouped together into a set of project files. Project files are written to the browser's local IndexDB database.

This means that a project will remain consistent across page refreshes. Note that storing projects in the browser data also means that two different browsers on a local machine have different projects.

Projects can be saved to the local hard drive and loaded at a later time. For more information on this, see [Inspector Pane](/shader-editor/window-layout/inspector-pane) documentation.

### Shader Packs

In order to use the materials created in Shader Editor, projects must be exported to Shader Packs.

Shader packs don't contain the graphs and nodes from the project. Instead they contain the generated shader code and parameter values required for rendering the effects at runtime.

For more information on how to accomplish this, see [Inspector Pane](/shader-editor/window-layout/inspector-pane) documentation.
