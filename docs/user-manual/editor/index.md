---
title: PlayCanvas Editor
description: "The browser-based visual editor for building PlayCanvas apps and games together: a game built in it, where to start, what it gives you, and a map of this section."
---

import Link from '@docusaurus/Link';

The PlayCanvas Editor is a visual editor for building 3D apps and games that run in a web browser, and it runs in your browser too. Build scenes with your team in real time, add behavior with JavaScript, test on any device and publish to the web with a link.

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/gLOk3TQH/" title="Can Knockdown, a small physics game built in the PlayCanvas Editor" loading="lazy" allow="fullscreen" allowFullScreen></iframe>
</div>

Click the game, then use the arrow keys to roll the ball into the cans. It was built in the Editor in about 15 minutes, and [Your First App](getting-started/your-first-app.md) shows you how to build it yourself.

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/editor/getting-started/your-first-app/">Build Your First App →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.com/editor">Open the Editor</Link>
    <Link className="button button--secondary button--lg" to="/tutorials/">Browse the Tutorials</Link>
</div>

## Where Do You Want to Start? {#where-do-you-want-to-start}

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/getting-started/your-first-app/">
      <div className="card__header"><h3>🚀 I'm new to the Editor</h3></div>
      <div className="card__body"><p>Build and publish a small physics game in about 15 minutes, and meet entities, materials, physics, scripts and publishing along the way.</p></div>
      <div className="card__footer">Your First App →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/getting-started/how-projects-work/">
      <div className="card__header"><h3>🧭 I want the big picture</h3></div>
      <div className="card__body"><p>See how scenes, entities, assets, scripts, branches and builds fit together in a project.</p></div>
      <div className="card__footer">How Editor Projects Work →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/getting-started/migrating-from-unity/">
      <div className="card__header"><h3>🎮 I'm coming from Unity</h3></div>
      <div className="card__body"><p>Map what you know about Unity's scenes, prefabs, components and C# scripts to the Editor and its JavaScript scripts.</p></div>
      <div className="card__footer">Migrating from Unity →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/assets/">
      <div className="card__header"><h3>📦 I have models and art</h3></div>
      <div className="card__body"><p>Upload models, textures and audio, and see what the Editor turns them into.</p></div>
      <div className="card__footer">Assets →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/scripting/">
      <div className="card__header"><h3>🧩 I want to write code</h3></div>
      <div className="card__body"><p>Create scripts, attach them to entities, and edit them in the built-in Code Editor or in Visual Studio Code.</p></div>
      <div className="card__footer">Scripting →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/mcp-server/">
      <div className="card__header"><h3>🤖 I work with an AI assistant</h3></div>
      <div className="card__body"><p>Connect Claude Code, Codex, Cursor or another assistant to your project with the Editor's Model Context Protocol (MCP) server.</p></div>
      <div className="card__footer">MCP Server →</div>
    </Link>
  </div>
</div>

## Why the PlayCanvas Editor? {#why-the-playcanvas-editor}

- **Nothing to install.** The Editor runs in the browser and your projects are stored online, so you can carry on from any computer.
- **Build together, live.** Everyone working on a scene sees each other's changes as they happen, with presence indicators and chat built in. See [Real-time Collaboration](realtime-collaboration.md).
- **Changes show up in the running app.** [Launch](interface/launch-page/index.md) your scene in another tab or on a phone, and edits in the Editor update it as you make them.
- **Version control built in.** Save [checkpoints](version-control/checkpoints.md), try ideas on [branches](version-control/branches.md) and [merge](version-control/merging.md) them back, comparing both versions of anything that conflicts.
- **Write code your way.** Use the built-in [Code Editor](scripting/code-editor.md), or [Visual Studio Code](scripting/vscode-extension.md) with your own tools and AI coding assistants.
- **Publish anywhere a browser runs.** [Host a build on playcanvas.com](publishing/web/playcanvas-hosting.md) at a link you can share, [download it](projects/downloading.md) to host yourself, or package it as a [playable ad](publishing/playable-ads/index.md) or a [mobile app](publishing/mobile/index.md).
- **The full Engine underneath.** Editor projects run on the open-source [PlayCanvas Engine](../engine/index.md), so everything in this manual about graphics, physics, animation and user interfaces applies to them.
- **Open source.** The Editor itself is developed in the open [on GitHub](https://github.com/playcanvas/editor) under the MIT license.

See what teams have built with it in [Made with PlayCanvas](/user-manual/getting-started/made-with-playcanvas/).

## In This Section {#in-this-section}

- [Getting Started](getting-started/index.md) — your first app, creating projects, how a project works and the interface.
- [Working with Scenes](scenes/index.md) — scenes, the Hierarchy, the Viewport, the Inspector and templates.
- [Assets](assets/index.md) — upload, organize and configure models, textures, audio and more.
- [Scripting](scripting/index.md) — create and manage scripts, edit them in the Code Editor or Visual Studio Code, and control how they load.
- [Testing and Debugging](interface/launch-page/index.md) — the Launch Page, custom engine builds, engine compatibility and troubleshooting.
- [Collaboration](realtime-collaboration.md) — work on a scene with others in real time, and manage your team.
- [Version Control](version-control/index.md) — checkpoints, branches and merging.
- [Publishing](publishing/index.md) — the web, mobile, desktop, playable ads and Snapchat.
- [Managing Projects](projects/index.md) — project settings, dev logs, backups and ownership.
- [Automation and AI](mcp-server.md) — the MCP Server, the [Editor API](editor-api.md) and the [REST API](/user-manual/api/).
- Reference — the [toolbar](interface/toolbar.md), [keyboard shortcuts](interface/keyboard-shortcuts.md), [settings](interface/settings/index.md), [components](scenes/components/index.md) and [asset inspectors](assets/inspectors/index.md).
- [Tutorials](/tutorials/) — complete Editor projects to learn from, filterable by topic.

## Stay in the Loop {#stay-in-the-loop}

- [GitHub](https://github.com/playcanvas/editor) for the Editor's source code and issues, and [release notes](https://github.com/playcanvas/editor/releases) for every version
- [The PlayCanvas blog](https://blog.playcanvas.com/) for news
- [Discord](https://discord.gg/RSaMRzg) and the [forum](https://forum.playcanvas.com/) for questions and sharing your work
- [The Editor's AI-readable documentation index](https://developer.playcanvas.com/user-manual/editor/llms.txt) for coding agents
