---
title: VS Code Extension
description: Install the PlayCanvas VS Code Extension, choose a sync mode, manage project files, and resolve synchronization problems.
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Use **Pull/Push** mode for AI coding assistants that edit project files outside VS Code, keeping changes local until you review and push them.

:::

The PlayCanvas VS Code Extension maps text-based assets from a PlayCanvas project into a local workspace. You can edit scripts and shaders with VS Code or Cursor while the extension handles authentication, branches, type information, and synchronization with the Editor.

![VS Code Extension Demo](/img/user-manual/scripting/vscode-demo.webp)

The extension is [open source on GitHub](https://github.com/playcanvas/vscode-extension) and licensed under MIT. For a workflow designed for external coding agents, see [Using AI with the VS Code Extension](/user-manual/ai/vscode-extension/).

## Install and Open a Project

1. Install [Visual Studio Code](https://code.visualstudio.com/download) or [Cursor](https://cursor.com/downloads).
2. Install the PlayCanvas extension from the marketplace used by your editor:
    - VS Code: [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas)
    - Cursor: [Open VSX](https://open-vsx.org/extension/playcanvas/playcanvas)
3. Select the sign-in notification and authenticate with your PlayCanvas account.
4. Open the Command Palette with `Ctrl`/`Cmd` + `Shift` + `P`.
5. Run **PlayCanvas: Open Project** and follow the prompts to choose a project and branch.

The Explorer shows the project's text assets. Open a script to use PlayCanvas-aware type checking, autocomplete, and inline API information. The **Collaborators** view shows who else is working in the project.

## Choose a Sync Mode

Set **PlayCanvas: Sync Mode** (`playcanvas.syncMode`) in Settings, then reload the window after changing it.

| | Realtime | Pull/Push (Preview) |
| --- | --- | --- |
| Best for | Live collaborative editing | External tools and reviewed batches of changes |
| Synchronization | As you type | Explicit Pull and Push |
| Conflicts | Merged automatically | Resolved with a three-way merge |
| Availability | Desktop and web | Desktop only |

### Realtime Mode

Realtime is the default mode.

- Changes to open files synchronize as you type.
- Changes from collaborators appear in your open files automatically.
- `Ctrl`/`Cmd` + `S` saves the asset in the PlayCanvas Editor.
- Creating, deleting, renaming, or moving files in the Explorer updates the project.
- `Ctrl`/`Cmd` + `Z` and `Ctrl`/`Cmd` + `Shift` + `Z` undo or redo only your own changes.

Opening a file refreshes it from the server. If another application changes a closed file on disk, realtime mode leaves the local edit on disk but does not submit it. The extension shows a warning directing you to Pull/Push mode.

### Pull/Push Mode

Pull/Push keeps filesystem edits local until you choose to synchronize them. This is the correct mode for formatters, compilers, scripts, and AI coding assistants that may edit closed files.

1. Set **PlayCanvas: Sync Mode** to **Pull/Push** and reload the window.
2. Open Source Control and select the **PlayCanvas** repository.
3. Select **Pull** to establish the latest server state.
4. Edit and save files normally. Local edits appear under **Changes**.
5. Review the diffs, then select **Push**.

The PlayCanvas status-bar item shows incoming, outgoing, and conflicted file counts. You can also run **PlayCanvas: Pull** or **PlayCanvas: Push** from the Command Palette.

- Pull: `Ctrl`/`Cmd` + `Alt` + `Down`
- Push: `Ctrl`/`Cmd` + `Alt` + `Up`

Push is fast-forward only. If the server changed since your last Pull, Push stops without overwriting it. Pull first, resolve any conflicts, and then Push again.

### Resolve a Pull/Push Conflict

Conflicted files appear under **Merge Changes**.

1. Open the conflicted file.
2. Use the merge editor or edit the `<<<<<<<`, `=======`, and `>>>>>>>` sections directly.
3. Keep the intended result, remove all conflict markers, and save the file.
4. Check that the file moved back to **Changes**, then Push.

To abandon a local edit instead, select its discard action in Source Control. Discard restores the last synchronized version and asks for confirmation first.

## Switch Branches

Synchronize or discard your current work before switching branches. Run **PlayCanvas: Switch Branch** from the Command Palette and select the target branch. The workspace then represents that project branch.

## Ignore Files

Create `.pcignore` in the project root to exclude matching paths from the workspace. Its syntax follows `.gitignore`, including globs such as `*.ts` or `generated/**`.

The extension re-reads `.pcignore` when it changes. Reload the project to refresh the files on disk after changing its rules.

## Troubleshooting

### External Changes Do Not Synchronize

Pull/Push is available only in the desktop extension. Confirm that `playcanvas.syncMode` is `pullpush`, reload the window, and run Pull before editing with an external tool.

### Push Is Blocked

The remote project has changed. Run Pull, resolve any files under **Merge Changes**, and Push again.

### Files Have Conflicting Paths

Run **PlayCanvas: Show Path Collisions**. Rename the listed assets in the Editor so each asset maps to a unique filesystem path, then reload the project.

### The Workspace Looks Stale

Run **PlayCanvas: Reload Project**. If the problem continues, run **PlayCanvas: Report Issue** and include the steps that produced it.
