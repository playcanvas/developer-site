---
title: Project Dashboard
description: Find, create, fork and manage projects and organizations from the Project Dashboard at playcanvas.com/editor, including project settings, dev logs and teams.
---

The Project Dashboard is where you find, create and manage your projects and organizations. Open it at [playcanvas.com/editor](https://playcanvas.com/editor). From Editor 2.35 the dashboard is part of the Editor and replaces the dashboard pages on playcanvas.com.

![Dashboard](/img/user-manual/editor/projects/project-dashboard.png)

The dashboard runs in its own browser tab and doesn't load the Editor itself, so it opens quickly. It never opens a project inside itself: **Open editor** switches to the project's own tab, opening it only if it isn't already open. **All Projects** in the Editor's logo menu, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd> and the **Projects** breadcrumb in the viewport switch back to the dashboard, and the Editor keeps its scene.

## Layout

The sidebar on the left can be resized by dragging its edge. It holds:

- **New project** and **Import project**.
- **Recents** - the projects you opened most recently.
- **Organizations** - the organizations you belong to. Select one to see its projects. The **+** button creates a new organization.
- **Storage** - how much of your plan's storage is used. Select it for a breakdown by project.
- Your account, with the **MCP server** button for connecting an AI assistant (see [MCP Server](/user-manual/editor/mcp-server/#connect-from-the-project-dashboard)).

![Dashboard Header](/img/user-manual/editor/projects/dashboard-header.png)

The main panel opens with **Continue editing**, which shows the project you edited last with **Open editor** and **Play** buttons, followed by your projects.

## Find a Project

Type in the search box to find projects by name, owner or description. Search tolerates typos. Press <kbd>/</kbd> to jump to it, unless a dialog or menu is open.

Narrow a search with these filters:

| Filter | Shows |
| --- | --- |
| `name:` | Projects whose name matches |
| `owner:` | Projects owned by that user or organization |
| `desc:` | Projects whose description matches |
| `is:private` | Private projects |
| `is:public` | Public projects |
| `is:starred` | Projects you have starred |
| `is:locked` | Projects locked because their owner is over the storage limit |

Use quotes for spaces, for example `name:"orbit arena"`.

![Search Filters](/img/user-manual/editor/projects/project-dashboard-search.png)

<video autoPlay muted loop controls src='/video/editor-project-dashboard-search-star.mp4' style={{width: '100%', height: 'auto'}} />

The tabs above the projects filter them further: **All**, **Mine**, **Shared with me**, **Private** and **Starred**.

**Sort by** orders the projects by **Last edited**, **Created**, **Name**, **Most played** or **Size**, **Descending** or **Ascending**.

## Cards and List View

The buttons next to **Sort by** switch between **Cards** and **List**. Cards show each project's thumbnail, owner and members, the time since it was edited and its size, with its views, plays and stars along the bottom. Projects without a thumbnail show a placeholder. The list view has a row per project with **Forks**, **Views**, **Plays**, **Stars**, **Size** and **Edited** columns.

![List View](/img/user-manual/editor/projects/project-dashboard-list-view.png)

A project can carry one of these badges:

| Badge | Meaning |
| --- | --- |
| **Private** | Only its team can see it |
| **Read only** | It is shared with you, but you can't edit it |
| **Locked** | Its owner is over the storage limit |
| **No access** | You can see it in a list, but you don't have access to it |
| **Disabled** | It has been disabled by support |

Select the star on a card or row to star the project, or select it again to remove the star. Stars show appreciation for a project and count towards its popularity, and **Starred** and `is:starred` list the projects you have starred.

## The Project Menu

The **⋮** button on a card, a list row or the Continue editing panel opens the project menu:

- **Open editor** and **Play**
- **Project settings** and **Copy link**
- **Watch**, **Fork** and **Export**
- **Transfer ownership** and **Delete project**

![Project Menu](/img/user-manual/editor/projects/fork-project-button.png)

**Play** runs the project's primary build in a new tab. **Watch** shows the project's dev log updates in the [Global Feed](https://playcanvas.com/feed) when its **Watching** filter is enabled, and changes to **Stop watching** once you watch a project. Items you don't have permission for are hidden. **Transfer ownership** looks up the username as you type and sends the new owner a request to accept. Projects offered to you show **Accept** and **Decline** on their card, and transfers you sent show **Cancel transfer**. See [Ownership and Transfers](/user-manual/editor/projects/ownership-transfers/).

## Fork a Project

Select **Fork** in the project menu to open the fork dialog. It shows the project you are forking from, with its name and description filled in, and an owner picker. Change anything you need and select **Fork project**.

![Fork Project Dialog](/img/user-manual/editor/projects/project-dashboard-fork.png)

<video autoPlay muted loop controls src='/video/editor-project-dashboard-fork.mp4' style={{width: '100%', height: 'auto'}} />

When the fork is ready, select **Open project** to open it in its own tab, or **Not now** to stay on the dashboard, where the fork has a new card. See [Creating Projects](/user-manual/editor/projects/creating/#fork-an-existing-project) for what a fork copies and when forking is not possible.

## Project Settings, Dev Log and Team

Select a project's card, or **Project settings** in its menu, to open its settings. The panels on the left switch between **Project settings**, **Dev log** and **Team**, and **Open editor**, **Play** and **Delete Project** sit underneath.

![Project Settings](/img/user-manual/editor/projects/project-settings.png)

- **Project settings** shows the name, description and visibility, a **Forked From** link for forks, an **Activity** strip covering the last 28 days, and **Private Source Assets** when the project already uses it. The footer has **Copy link**, **Fork Project** and **Export Project**. See [Project Settings](/user-manual/editor/projects/settings/).
- **Dev log** lists the project's posts, and lets you write, edit and delete them. See [Dev Logs](/user-manual/editor/projects/dev-logs/#write-a-post-from-the-project-dashboard).
- **Team** lists the people on the project and their access. See [Team Management](/user-manual/editor/projects/team-management/).

A locked project shows only **Project settings**. If you are an admin of an organization but not a member of one of its projects, that project shows only **Team**, where you can assign yourself as an admin.

## Create a Project

Select **New project** to choose a starter kit. **Empty Project** creates a project with nothing in it. **Blank Project**, the default, starts with a skybox, a cube and a plane. The kits after them are provided by PlayCanvas.

![New Project Dialog](/img/user-manual/editor/projects/new-project-dialog.png)

<video autoPlay muted loop controls src='/video/editor-project-dashboard-new-project.mp4' style={{width: '100%', height: 'auto'}} />

Set the name, description and owner, choose whether the project is private, and select **Create project**. When it is ready, the dialog says "Your new project is ready. It opens in a new tab." Select **Open project** to open it. See [Creating Projects](/user-manual/editor/projects/creating/#create-a-project-from-the-project-dashboard).

## Organizations

Select **+** next to **Organizations** to create one. Enter its **Name**, its **URL** on playcanvas.com and a **Billing email**, then select **Create organization**. The new organization appears in the sidebar.

![New Organization](/img/user-manual/editor/projects/project-dashboard-new-organization.png)

<video autoPlay muted loop controls src='/video/editor-project-dashboard-organizations.mp4' style={{width: '100%', height: 'auto'}} />

Select an organization in the sidebar to see its projects. Its **⋮** menu has **Organization details**, which opens its account page on playcanvas.com, and **Delete organization**. Deleting asks you to type the organization's name to confirm. If the organization has projects, they are transferred to your account.

## Connect an AI Assistant {#connect-an-ai-assistant}

The **MCP server** button next to your account connects the Project Dashboard to the [Editor MCP Server](/user-manual/editor/mcp-server/), so an AI assistant can list, create, update and open your projects before any project is open. See [Connect from the Project Dashboard](/user-manual/editor/mcp-server/#connect-from-the-project-dashboard).

![MCP Server](/img/user-manual/editor/projects/project-dashboard-mcp.png)
