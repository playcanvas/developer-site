---
title: Version Control
---

Once you've moved beyond the simplest of projects, you will find that version control becomes an important part of your application development process. Version Control is a catch-all term for a system that performs the following functions

- Allows you to turn back time to a previous version of your code and assets
- Allows you to see changes that have been made to a project over time
- Allows you to trial new changes in a safe place, isolated from other developers, and merge changes when ready

PlayCanvas has version control tools built directly into the Editor which can be broken down into three main features. **Checkpoints** are a snapshot of your project at a single point in time, they form a timeline of changes to your project; **Branches** are a single line of development perhaps representing the changes required to create one feature or by one developer. Changes to assets in one branch will not affect changes in another branch; **Merging & Resolving conflicts**, merging is the process of combining one branch into another branch, conflicts occur when both branches edit the same data. After resolving conflicts the destination branch should contain the changes from both branches.

## Version Control in PlayCanvas

You may be familiar with other version control systems (VCS), if so this summary will help you get familiar with how PlayCanvas works relative to other version control systems.

You can think of a checkpoint like you would a **commit** in a VCS like Git or Mercurial. Each checkpoint is a point-in-time snapshot of project with an associated message that describes what changes were made in this checkpoint. While you are editing your project your current (un-checkpointed) changes are similar to the **working directory** i.e. you can think of these as your **local changes** (even though in PlayCanvas your local changes are shared with anyone else in the same branch as you).

You cannot delete a checkpoint, but you can restore a previous checkpoint. Restoring a checkpoint works a little like a `git checkout <commit>` or `hg update -r <commit>`. However, in PlayCanvas we don't allow branches unless they have been explicitly created (no detached heads or similar). When you restore a previous checkpoint future changes will be children of the latest checkpoint in the branch.

**Branches** in PlayCanvas work like branches in other systems. A branch forms an isolated line of development made up of checkpoints. All users who have set a branch as their current branch will see their changes in a real-time collaborative fashion. Branches cannot be deleted, but when you are finished working on a branch it can be *closed*.

Merging works in a similar way to other VCSs. However, in PlayCanvas it's important to note that merging occurs *between checkpoints* so any changes that you have not committed in a checkpoint will not be included in your merge. PlayCanvas automatically creates checkpoints in the destination branch of a merge to prevent you accidentally losing changes when merging.

More details can be found on the specific pages for [checkpoints][1], [branches][2], and [merging][3].

## How Version Control Affects Your Storage

Using Version Control will use more storage for checkpoints and branches.

Every checkpoint created only stores the changes from the previous checkpoint. The amount of data used is dependent on the changes such as new assets, texture changes etc.

Creating a branch from a checkpoint makes a copy of the project state at that checkpoint. This can increase storage usage significantly depending on the project.

Unfortunately, it is not possible to delete branches or checkpoints except in these specific cases:

- [Hard reset to a checkpoint][4]
- [Deleting a branch][5]

If you need more storage space, please email us at [support@playcanvas.com][6]. In most cases, we can increase your storage allowance with no extra charge.

[1]: /user-manual/editor/version-control/checkpoints
[2]: /user-manual/editor/version-control/branches
[3]: /user-manual/editor/version-control/merging
[4]: /user-manual/editor/version-control/checkpoints/#hard-reset-to-a-checkpoint
[5]: /user-manual/editor/version-control/branches/#deleting-a-branch
[6]: mailto:support@playcanvas.com
