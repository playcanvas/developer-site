---
title: Editor MCP Server
description: Connect AI assistants to the PlayCanvas Editor to modify and verify projects through MCP tools.
---

The [PlayCanvas Editor MCP Server](https://github.com/playcanvas/editor-mcp-server) connects AI assistants to an open PlayCanvas Editor session. It can modify project data and verify the result through the viewport or a running application.

<div
  role="img"
  aria-label="Connected Editor MCP Server screenshot placeholder"
  style={{
    alignItems: 'center',
    aspectRatio: '16 / 9',
    background: 'var(--ifm-color-emphasis-100)',
    border: '2px dashed var(--ifm-color-emphasis-300)',
    borderRadius: 'var(--ifm-global-radius)',
    color: 'var(--ifm-color-emphasis-600)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  }}
>
  Connected Editor MCP Server screenshot
</div>

Your MCP client starts the local server, and the Editor connects to it. Every tool acts on the project currently open in that Editor; the server does not choose or administer PlayCanvas projects.

## Install the Server Once

Install [Node.js 22.18 or later](https://nodejs.org/) before configuring your MCP client. The commands use the published [`@playcanvas/editor-mcp-server`](https://www.npmjs.com/package/@playcanvas/editor-mcp-server) package through `npx`.

### Claude Code

```bash
claude mcp add playcanvas -- npx -y @playcanvas/editor-mcp-server
```

### Codex

```bash
codex mcp add playcanvas -- npx -y @playcanvas/editor-mcp-server
```

On Windows, run:

```bash
codex mcp add playcanvas -- cmd /c npx -y @playcanvas/editor-mcp-server
```

### Cursor and Claude Desktop

Add this server to the client's MCP configuration:

```json
{
  "mcpServers": {
    "playcanvas": {
      "command": "npx",
      "args": ["-y", "@playcanvas/editor-mcp-server"]
    }
  }
}
```

In Cursor, open **Settings > Cursor Settings > MCP**. In Claude Desktop, open **Settings > Developer > Edit Config**. Restart the client after changing its configuration.

:::note Windows

For JSON-based clients on Windows, use `"command": "cmd"` and prepend `"/c"` to the `args` array.

:::

## Connect the Project

1. Open a project in the PlayCanvas Editor.
2. Select the **MCP** button at the bottom of the Editor toolbar.
3. Check that the port is `52000` and select **Connect**.

Keep the MCP client running while you use the connection. Only one Editor instance can connect to the server at a time, so disconnect another Editor before changing projects or browser tabs.

To use another port, append `--port <number>` to the server arguments and enter the same port in the Editor.

## Check the Connection Without Editing

Begin with a read-only request. This confirms that the assistant can see the intended Editor and gives it context before any mutation.

```text
Inspect the project currently connected through PlayCanvas MCP. Report the loaded scene,
current selection, and version-control status. Do not change anything.
```

If the assistant reports the wrong scene or project, connect the correct Editor tab before continuing.

## Create a Recovery Point

MCP operations change the Editor project directly; there is no local Push step. Create a checkpoint before a substantial task.

```text
Check the current version-control status. If the project is ready for changes, create a
checkpoint named "Before lighting update". Do not switch branches, reset state, or modify
the scene yet.
```

If other collaborators have unsaved work or the project is not in the expected state, resolve that before asking the assistant to continue.

## Describe the Change and Its Proof

Give the assistant one observable result rather than a list of tool calls. Include the scene or assets in scope, constraints it must preserve, and how it should prove completion.

```text
In the loaded scene, improve the lighting around the vehicle display without moving the
vehicle or camera. Reuse the existing lights where possible. When finished, capture the
Editor viewport, launch the scene, capture the running result, and report any console errors.
```

The assistant can inspect and edit entities, components, scripts, assets, scenes, project settings, templates, animation data, builds, and version-control state. Let it select the tools needed for the requested outcome.

## Verify the Running Result

For scene or behavior changes, source inspection is not enough. Ask the assistant to:

1. Capture the Editor viewport to check composition and selected objects.
2. Start a Launch instance.
3. Capture the running application.
4. Read runtime logs and query relevant entity state.
5. Inject keyboard, mouse, or touch input when interaction is part of the task.
6. Stop the Launch instance when verification is complete.

Allow pop-ups for the PlayCanvas Editor origin so the server can open the Launch window. It uses your existing PlayCanvas login session.

<div
  role="img"
  aria-label="Editor viewport and launched application verification screenshot placeholder"
  style={{
    alignItems: 'center',
    aspectRatio: '16 / 9',
    background: 'var(--ifm-color-emphasis-100)',
    border: '2px dashed var(--ifm-color-emphasis-300)',
    borderRadius: 'var(--ifm-global-radius)',
    color: 'var(--ifm-color-emphasis-600)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  }}
>
  Viewport and Launch verification screenshot
</div>

## Review or Recover

Ask the assistant to summarize what it changed and the evidence it observed. Inspect the scene yourself before accepting the result.

- Use Editor undo/redo for a recent isolated edit.
- Restore the checkpoint when the entire task should be abandoned.
- Create a new checkpoint after accepting a substantial result.

Do not ask the assistant to hard-reset, delete a branch, restore a checkpoint, or delete project data unless you intend that destructive operation.

## When to Use the VS Code Extension Instead

Use the [VS Code Extension workflow](./vscode-extension.md) when the assistant only needs to edit text-based assets and you want to review filesystem diffs before pushing anything to PlayCanvas. Use MCP when the task needs direct Editor, scene, asset, viewport, or runtime access.

## Troubleshooting

### The Editor Does Not Connect

Confirm that the MCP client is running the server, the client and Editor both use the same port, and no other Editor is connected. Restart the MCP client after changing its configuration.

### The First Connection Times Out

The first `npx` run may need time to download the package. Start the client again after the download finishes. Codex users can also increase `startup_timeout_sec` under `[mcp_servers.playcanvas]` in `~/.codex/config.toml`.

### Launch Does Not Open

Allow pop-ups for the Editor origin, close an existing Launch window, and ask the assistant to start the Launch instance again.

### The Assistant Is Operating on the Wrong Project

MCP tools always target the project open in the connected Editor. Disconnect, open the intended project, and reconnect before making more changes.

:::caution

The server acts through your current Editor session and can perform destructive operations such as deleting entities, assets, builds, or branches and resetting project state. Review these operations before allowing them and create a checkpoint before substantial changes.

:::

Return to the [AI Development overview](./index.md) to compare the available PlayCanvas AI integrations, or see the [PlayCanvas Editor guide](/user-manual/editor/) for the wider Editor workflow.
