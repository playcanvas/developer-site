---
title: VS Code Extension
---

The PlayCanvas VS Code Extension provides a powerful, real-time editing environment for working with text-based assets from the PlayCanvas Editor. Designed for developers who prefer modern tooling such as IntelliSense, source control, GitHub Copilot, and AI-enabled workflows, the extension integrates VS Code directly with your PlayCanvas projects.

![VS Code Extension Demo](/img/user-manual/scripting/vscode-demo.webp)

The extension is fully [open-source on GitHub](https://github.com/playcanvas/vscode-extension) and licensed under MIT.

## Features

* **Realtime Asset Syncing**  
  Changes made in VS Code are instantly reflected in the PlayCanvas Editor, without needing manual file uploads or page refreshes.

* **Live File Collaboration**  
  See other collaborators who are editing the same file to avoid conflicts and improve team coordination.

* **Full Script Type Checking**  
  Enjoy robust TypeScript-powered type checking, IntelliSense, and autocomplete for PlayCanvas script types.

* **Disk-Mapped File System**  
  Your PlayCanvas project structure is mirrored locally, enabling deep integration with external tools, including AI-assisted development workflows.

* **Enhanced Developer Experience**  
  Integrates tightly with VS Code’s full feature set: refactoring tools, Git integration, snippets, and extensions.

## Installation

1. Install [Visual Studio Code](https://code.visualstudio.com/download).  
2. Install the [PlayCanvas VS Code Extension](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas) from the VS Code Marketplace.  
3. Sign in with your PlayCanvas account when prompted.  
4. Open the Command Palette (`Ctrl`/`Cmd` + `P`) and run **“PlayCanvas: Open Project”** to link a PlayCanvas project.

### Supported Editors

| Editor  | Supported |
| ------- | --------- |
| VS Code | ✅        |
| Cursor  | ✅        |

## Using the Extension

* **Open Project**  
  Use the Command Palette and run **PlayCanvas: Open Project** to begin editing your project locally.

* **Edit**  
  Modify scripts, shaders, and other text assets using the complete set of VS Code editing capabilities.

* **Sync**  
  All saved changes automatically sync to your PlayCanvas project in real time.

* **Collaboration**  
  View other users editing the same file and pull the latest changes when needed.

Integrating VS Code with PlayCanvas provides a sophisticated environment tailored for advanced development workflows, giving developers the flexibility and tools needed to build complex and high-performance web-based applications.