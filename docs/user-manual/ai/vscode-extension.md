---
title: VS Code Extension
description: Use AI coding assistants with PlayCanvas project files through the VS Code Extension's Pull/Push mode.
---

The PlayCanvas VS Code Extension exposes project text assets as local files, allowing AI coding assistants in VS Code, Cursor, or a terminal to inspect and edit them.

<!-- screenshot: vs code extension pull/push setup -->

This guide uses Pull/Push mode so an assistant can edit any mapped text asset while you control when those edits reach the PlayCanvas project. Complete the [VS Code Extension setup](/user-manual/editor/scripting/vscode-extension/) before continuing.

## Prepare the Workspace

Pull/Push is available in the desktop extension for VS Code and Cursor.

1. Open the PlayCanvas project with **PlayCanvas: Open Project**.
2. Set **PlayCanvas: Sync Mode** to **Pull/Push** in Settings.
3. Reload the window.
4. Open Source Control, select the **PlayCanvas** repository, and run **Pull**.
5. Confirm that **Incoming Changes**, **Changes**, and **Merge Changes** are empty before starting.

:::caution

Do not use realtime mode for an external assistant. Realtime mode ignores changes made to closed files by other applications so that stale files cannot overwrite collaborative work.

:::

## Give the Assistant a Bounded Task

Start the assistant in the mapped project directory. PlayCanvas text assets appear as normal files, so the assistant can search references, edit several scripts together, and run local checks.

State the files or behavior in scope, the result you expect, and how to verify it. For example:

```text
Inspect the player movement scripts and make keyboard movement frame-rate independent.
Keep the current controls and public script attributes unchanged.
After editing, check the Problems panel or run the available type check, then summarize
the files changed. Do not modify unrelated assets.
```

The assistant's edits remain local. They do not affect the PlayCanvas project until you Push.

## Review the Result

1. Open Source Control and select each file under **Changes** to inspect its diff.
2. Check the Problems panel for new TypeScript or JavaScript diagnostics.
3. Run any project-specific checks available in the workspace.
4. Confirm that the assistant changed only the requested files and behavior.

Use the discard action on a file to restore its last synchronized version. The extension asks for confirmation before discarding it.

<!-- screenshot: vs code extension diff and conflict review -->

## Synchronize with PlayCanvas

1. Run **Pull** again to include changes made by collaborators while the assistant was working.
2. If files appear under **Merge Changes**, resolve them with the merge editor, save the result, and recheck the diff.
3. Run **Push**.
4. Open the project in the PlayCanvas Editor and launch it to verify the behavior in its real scene.

Push is fast-forward only. If the server changes after your final Pull, Push stops instead of overwriting it; Pull and resolve again.

## When to Use the MCP Server Instead

The VS Code Extension exposes text-based assets. Use the [Editor MCP Server](./editor-mcp-server.md) when the assistant needs to create entities, configure components, manage non-text assets, operate the viewport, or test a running scene directly.

## Troubleshooting

### The Assistant's Files Do Not Appear Under Changes

Confirm that the assistant edited the mapped PlayCanvas project directory, saved the files, and did not write to a separate clone or generated output directory.

### External Edits Produce a Warning

The workspace is still in realtime mode. Set `playcanvas.syncMode` to `pullpush`, reload the window, and Pull before trying again.

### Push Is Blocked

Pull the latest server state, resolve every file under **Merge Changes**, and Push again. See [Resolve a Pull/Push Conflict](/user-manual/editor/scripting/vscode-extension/#resolve-a-pullpush-conflict) for the complete workflow.

Return to the [AI Development overview](./index.md) to compare the available PlayCanvas AI integrations.
