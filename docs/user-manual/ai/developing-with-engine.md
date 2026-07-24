---
title: Engine Development
id: engine-development
slug: developing-with-engine
description: Use AI coding assistants, documentation, and browser tools to build and verify standalone PlayCanvas Engine applications.
---

PlayCanvas Engine applications are regular JavaScript or TypeScript projects, so any coding assistant that can read files, edit code, and run commands can work with them. Give the assistant the same Engine references and verification steps that a human contributor would use.

<!-- screenshot: ai client editing a playcanvas engine project -->

If your code is stored in a PlayCanvas Editor project, use the [VS Code Extension](./vscode-extension.md) instead. Use the [Editor MCP Server](./editor-mcp-server.md) when the assistant also needs to modify scenes, entities, assets, or project settings.

## Choose an AI Client

| Client | Interface | Recommended for |
| --- | --- | --- |
| [Cursor](https://cursor.com/docs) | Code editor | Inline changes, visual diff review, and an editor-first agent workflow |
| [Claude Code](https://code.claude.com/docs/en/overview) | Terminal and IDE integrations | Repository-wide changes driven from a command line |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli) | CLI, IDE extension, and desktop app | Local implementation, review, and command execution from your preferred surface |

The clients have different plans and supported platforms. Use their official documentation for current installation and availability details.

## Provide Project Context

Start the assistant in the repository root and install the project dependencies first. This gives it access to the PlayCanvas package, TypeScript declarations, scripts, and existing code patterns.

Add the project's real development commands and conventions to the client's repository instructions, such as [`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [`CLAUDE.md`](https://code.claude.com/docs/en/memory), or [Cursor Rules](https://cursor.com/docs/rules). Keep the instructions short and include:

- The development, lint, test, and build commands
- The source and generated directories
- Browser support and performance constraints
- The observable result required before a task is complete

Keep shared guidance in `AGENTS.md` where possible. Claude Code can reuse it through a `CLAUDE.md` containing only:

```md
@AGENTS.md
```

Keep separate client files only for instructions that are genuinely client-specific.

Point the assistant to these PlayCanvas sources instead of asking it to recall APIs from memory:

- [Engine User Manual](/user-manual/engine/)
- [Engine API Reference](https://api.playcanvas.com/engine/)
- [Engine Examples](https://playcanvas.github.io/)
- [Engine source](https://github.com/playcanvas/engine)
- [AI-readable documentation index](https://developer.playcanvas.com/llms.txt)
- [Complete AI-readable documentation](https://developer.playcanvas.com/llms-full.txt)

## Reuse Engine Code Before Writing It

Before writing camera controls, character controllers, tweens, water, sky, post effects, or XR code, check the production [Engine scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm) available through `playcanvas/scripts/*`.

For an unfamiliar Engine feature, find a matching [Engine Example](https://playcanvas.github.io/) and adapt its Engine setup and update logic. Treat examples as recipes to read and port, not modules to import.

## Describe the Outcome and Its Proof

Ask for one observable result, the constraints to preserve, and the checks that prove the result. For example:

```text
Inspect this PlayCanvas Engine project before editing. Reuse its existing patterns and
check the installed PlayCanvas types or official API reference instead of guessing APIs.

Implement [outcome] without changing [constraints]. Run [test/build command], launch
the app, exercise [interaction], check the browser console, and summarize the diff and
the evidence that the result works.
```

## Recommended Plugins and MCP Servers

Start with only the integrations needed for the task. In particular, choose one browser tool and add another only when it provides a missing capability.

- **[Context7 MCP](https://github.com/upstash/context7):** Retrieve its indexed [PlayCanvas Engine documentation](https://context7.com/playcanvas/engine) when the client benefits from MCP-based lookup. Prefer the official AI-readable documentation above for authoritative content.
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp):** Launch and operate the application in a browser, exercise user flows, and capture screenshots.
- **[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp):** Use instead of Playwright when console, network, or performance diagnosis is the main task.
- **[PlayCanvas Editor MCP Server](./editor-mcp-server.md):** Add direct Editor, scene, asset, and runtime access when the application also uses an Editor project.
- **[PlayCanvas VS Code Extension](./vscode-extension.md):** Expose Editor-managed text assets as local files for Cursor and other coding assistants.

## Verify Every Change

Source inspection is not proof of interactive behavior. Before accepting the result:

1. Review the complete diff and reject unrelated changes.
2. Run the project's focused tests, lint, and production build where available.
3. Launch the application and check the browser console for new errors or warnings.
4. Exercise the changed interaction with real browser input. Use screenshots for appearance and runtime queries for state, counts, positions, and other behavior; do not mutate state to manufacture evidence.
5. For complex state, consider a development-only `window.snapshot()` that returns JSON-serializable data without exposing mutation methods.
6. Fix and re-verify failed checks, test affected browsers or devices, and report anything that was not verified.

<!-- screenshot: browser runtime verification -->

## Official AI Tool Documentation

### OpenAI

- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [Custom instructions with `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Plugins](https://learn.chatgpt.com/docs/plugins)

### Anthropic

- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Claude Code IDE integrations](https://code.claude.com/docs/en/ide-integrations)
- [Claude Code on desktop](https://code.claude.com/docs/en/desktop)
- [Claude Code MCP](https://code.claude.com/docs/en/mcp)
- [Claude Code plugins](https://code.claude.com/docs/en/plugins)
- [Claude Code memory and `CLAUDE.md`](https://code.claude.com/docs/en/memory)

### Cursor

- [Cursor documentation](https://cursor.com/docs)
- [Cursor Rules](https://cursor.com/docs/rules)
