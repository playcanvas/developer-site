---
title: Projects
sidebar_position: 2
---

The Projects tab lists all the projects you have created or have been granted access to.

![projects_page](/img/user-manual/profile/profile.png "Projects")

## New Project {#new-project}

Click on the NEW button on the top right to create a new project.

## Delete Project {#delete-project}

Click on the arrow next to a project and select Delete to permanently delete it from your account.

## Unlock Project {#unlock-project}

Click on the arrow next to a project and select Unlock to unlock a *locked* project. Unlocking a project depends on the project owner's subscription type. If the owner has a Personal plan then Unlocking means removing any Free users from the project (because Personal plans require all users to have a subscription). Otherwise unlocking a project means making it Public.

If you have an Organization account another way to unlock projects is by purchasing more seats until you are no longer hitting your seats limit.

## Transfer Project Ownership {#transfer-project-ownership}

If you wish to transfer the ownership of a project to another user click on the arrow next to a project and then click Transfer Ownership.

![transfer-ownership-menu](/img/user-manual/profile/projects/transfer-ownership-menu.png)

A pop up will appear asking you to enter the username of the user or organization you wish to transfer ownership to.

![transfer-ownership-dialog](/img/user-manual/profile/projects/transfer-ownership-dialog.png)

Enter the username and click FIND or press Enter. Then click TRANSFER.

The other user will need to accept your request to transfer the Project. The transfer request will appear on the top of the other user's project list.

![transfer-ownership-accept](/img/user-manual/profile/projects/transfer-ownership-accept.png)

If the user accepts the request then the transfer will be completed and all team members apart from the new owner will be removed from the Project.

## Backing Up and Restoring Projects {#backing-up-and-restoring-projects}

We recommend that users create periodic backups of projects to protect against accidental deletion or malicious team members. There are several ways to do this listed below.

### Forking a Project {#forking-a-project}

The simplest way to create a backup of a project is to fork it. This creates a new project that is a copy of what is on the 'main' branch in the project. No version control history is preserved in the newly created fork.

You can find this option on the [project dashboard][7].

### Backing Up a Project to an Archive File {#backing-up-a-project-to-an-archive-file}

An archive file will contain all the data of the current project state in a branch. However, it does not contain any version control history.

There are two methods to create an offline backup archive of a project:

#### From the Projects List {#from-the-projects-list}

![export-archive](/img/user-manual/profile/projects/export-archive-button.jpg)

You can export a .zip archive of your project to keep an offline backup. You can later choose to import that .zip archive as a new project.

To export a project, click on the arrow next to a project and select 'Export Project'.

:::danger

Exported projects only preserve the `main` branch. All other branches are lost.

:::

#### Using the REST API {#using-the-rest-api}

Exporting an archive file can also be done with the [REST API][8] and can be automated with continuous integration systems for automatic, periodic backups.

It also allows you to choose which branch to export via the parameters.

We've written a [Node-based open source tool][9] to make this process easier for users.

### Restoring a Project from an Archive File {#restoring-a-project-from-an-archive-file}

![import-archive](/img/user-manual/profile/projects/import-archive-button.jpg)

With an archive zip file created from one of the methods in '[Backing Up a Project to an Archive File](#backing-up-a-project-to-an-archive-file)', you can import it as a new project on PlayCanvas.

Click on 'Import Project' on the left hand side of the Projects page and select the zip file to import it.

[7]: /user-manual/dashboard/header/
[8]: /user-manual/api/project-archive/
[9]: https://github.com/playcanvas/playcanvas-rest-api-tools#archiving-a-project
