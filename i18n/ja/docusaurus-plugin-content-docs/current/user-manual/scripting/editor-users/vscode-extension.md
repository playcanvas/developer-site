---
title: VS Code Extension
sidebar_position: 3
---

For developers seeking an enhanced code editing experience with features like source control, GitHub Copilot and a wide range of extensions, integrating Visual Studio Code (VS Code) with PlayCanvas offers a powerful alternative to the built-in Code Editor. To this end, we provide an [open-source](https://github.com/playcanvas/vscode-extension) VS Code Extension.

![Live Editing script assets with VS Code extension](/img/user-manual/scripting/vscode-extension.webp)

## Features

* **Real-Time Sync**: Any changes made in VS Code are automatically synced with your PlayCanvas project, ensuring that your team always has access to the latest updates.
* **Enhanced Code Editing**: Leverage the full power of VS Code's editing features, such as IntelliSense, code snippets, GitHub Copilot and advanced refactoring tools.
* **Source Control**: Switch branches to work in isolation.
* **Collaboration**: Collaborate on scripts and shaders with your team, with changes reflected immediately in the PlayCanvas editor. Use the `Pull Latest` command from the context menu to pull latest changes into your VS Code environment.  
* **Find In Files**: The extension supports searching in project files - use the `PlayCanvas: Search` command to search in a project or `PlayCanvas:Find In Folder` from the context menu to search in a folder.

## Installation

* **Install Visual Studio Code**: [Download  VS Code](https://code.visualstudio.com/download) and install it.
* **Install the PlayCanvas VS Code Extension**: Search for [the PlayCanvas extension](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas) in the VS Code Marketplace and install it. This extension connects VS Code to your PlayCanvas projects using the PlayCanvas [REST API](/user-manual/api/).

### Configuration

* [Generate a new API Key](/user-manual/api/#authorization) and copy it to the clipboard.
* Open your project in VS Code by opening the Command Palette (`CTRL`+`Shift`+`P`) and typing "PlayCanvas: Add Project".
* Paste your API token into the input box. This only needs to be done once.
* Toggle "PlayCanvas: Use Playcanvas Types" to enable or disable PlayCanvas Engine API types for enhanced IntelliSense support. It adds a virtual reference to the type definitions automatically at the top of the source file. The reference will not be uploaded when the script is updated.

## Using the Extension

* **Add Project**: Open your project in VS Code by opening the Command Pallette (`CTRL`+`Shift`+`P`) and typing "PlayCanvas: Add Project".
* **Edit**: Edit scripts, shaders and other text assets with rich editing support.
* **Sync**: Save your changes in VS Code; the PlayCanvas extension automatically syncs these changes to the cloud.
* **Preview and Debug**: Use the [Launch Page](/user-manual/editor/launch-page/) to preview and debug your application as you develop.

### Debugging

The VS Code extension for PlayCanvas does not directly support debugging of scripts running in the browser. However, you can [use browser developer tools](/user-manual/scripting/debugging/) to debug your PlayCanvas scripts in conjunction with VS Code for a powerful debugging experience.

Integrating VS Code with PlayCanvas provides a sophisticated environment tailored for advanced development workflows, giving developers the flexibility and tools needed to build complex and high-performance web-based applications.
