---
title: Configuration
description: How PlayCanvas Stage works with Claude Code and Codex, its environment settings, how to stop its local server, and what data and network access it uses.
---

## Claude Code and Codex

Both agents share one local Stage server and the same set of stages. They differ in how a session hears about comments you send:

- **Claude Code:** the plugin's comment monitor starts the first time the agent loads Stage's `stage-design` skill in a session. It checks for new comments every 2 seconds and wakes an idle session. Without it, as in non-interactive sessions, your next message there carries the comments.
- **Codex:** on your first message in a session, the plugin starts a watcher that hands each comment you send to `codex queue`, which makes the idle session take a turn. The watcher exits when that Codex process does.

:::caution Codex comment delivery

`codex queue` is experimental in Codex itself, so comment delivery in Codex may change as Codex does.

:::

Codex doesn't tell plugins which folder a session works in, so pass absolute file paths there. Relative paths are refused with an error that says so.

## Settings

Set these environment variables before starting your agent:

| Variable | Default | Effect |
| --- | --- | --- |
| `STAGE_PORT` | `47318` | Viewer and API port |
| `STAGE_DIR` | `~/.playcanvas-stage` | State directory |
| `STAGE_AUTO_OPEN` | on | `0` stops opening new stages in the browser |
| `CHROME_PATH` | auto | Chrome binary for headless previews |

## Stopping the Server

The Stage server starts on the first Stage tool call and keeps running after the session ends, so your stages stay open. Stop it with:

```bash
kill $(jq .pid ~/.playcanvas-stage/server.json)
```

## Data and Network Use

:::info

Stage has no telemetry and makes no outbound requests of its own. Scaffolding a new project runs `npx create-playcanvas@latest` from npm, and any other traffic is only what your app and its pages load.

:::

- **Local only.** The server binds to `127.0.0.1` and accepts only `localhost` addresses.
- **State.** Stages, comments, edits and diagnostics are kept in `~/.playcanvas-stage`.
- **Access.** The agent's API needs a token kept in `~/.playcanvas-stage/server.json`, readable only by you. Comments can only be written from the viewer.
- **Dev server.** Only the agent can point a stage at a dev server, and only at `http` on `localhost`, `127.0.0.1` or `[::1]`.

:::warning Keep the token private

`~/.playcanvas-stage/server.json` holds the token that lets an agent read and write your stages. Don't share it or commit it.

:::

The [plugin reference](https://github.com/playcanvas/stage/blob/main/plugins/playcanvas-stage/README.md) on GitHub has every key, tool and trust boundary in full.
