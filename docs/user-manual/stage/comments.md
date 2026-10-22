---
title: Comments
description: Comment on an entity or an area of a PlayCanvas app in Stage, send the thread to your coding agent, and follow it until the agent replies.
---

Comments are for changes you'd rather describe than drag: a new color, a missing object, a behavior that's wrong. You point at what you mean, and the agent gets enough context to know exactly which thing that is.

## Leave a Comment

Press <kbd>C</kbd> or the **Comment** button to enter comment mode. A playing app pauses. Then:

- click an entity to comment on it, or drag across an area, empty space included
- <kbd>Shift</kbd>+click adds another object to the open comment, and <kbd>Shift</kbd>+drag adds everything an area covers
- outside the canvas, any element of the page takes a comment, and a drag that starts on text quotes it

A comment is pinned to the 3D point you placed it at and follows the camera. With it, the agent gets the entity's path, that point and a capture of what you saw.

<video autoPlay muted loop controls src='/video/stage-comment.mp4' style={{width: '100%', height: 'auto'}} />

The comment box opens where you clicked. <kbd>Enter</kbd> posts and <kbd>Shift</kbd>+<kbd>Enter</kbd> adds a line. It has two buttons:

- **Comment** posts the comment.
- **Send to Agent** posts it and hands the thread to the agent, which reads it, does the work and replies in the thread without you typing anything in the session. Writing `@agent` in the text does the same.

Comment mode stays on until **Done commenting**, <kbd>C</kbd>, or a second <kbd>Esc</kbd>. The first <kbd>Esc</kbd> closes an open draft.

:::tip Show, don't tell

A comment or reply can carry up to 4 reference images. Paste them into its box, drop them onto it, or pick them with its image button. The agent reads them with the thread.

:::

## Follow a Thread

A thread sent to the agent shows where it is:

| Status | Meaning |
| --- | --- |
| **Queued for an agent session** | No session has picked it up yet |
| **Working on it…** | The agent has received it |
| **Hasn't replied yet** | No reply within 10 minutes |

The sidebar lists every thread. Drag its left edge to resize it, or double-click the edge to reset it.

:::caution Withdrawing a request

Deleting a thread while it is **Working on it…** or **Hasn't replied yet** withdraws it: the agent is told to drop the request, revert the changes it made for it, and not reply. A thread deleted while it is still queued never reaches the agent.

:::

## Who Is Watching

Comments reach only the sessions linked to the stage: a session that opened the stage, or one you paste the stage's URL into. The circle at the right of the header shows who is there:

| Circle | Meaning |
| --- | --- |
| Green, **Agent is watching** | Comments reach the agent straight away |
| Amber | A linked session is open but not watching; comments arrive with your next message there |
| Hollow, **No agent session** | Comments you send wait until a session links the stage |

How a session hears about new comments depends on the agent. See [Claude Code and Codex](configuration.md#claude-code-and-codex).
