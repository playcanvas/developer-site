---
title: Ownership and Transfers
---

Project ownership determines who has ultimate control over a PlayCanvas project, including the ability to delete it, transfer ownership and control access. This section covers transferring ownership between users and organizations.

## Owner Responsibilities

Project owners have the following abilities (over and above what Admins are able to do):

- **Project Deletion**: Can permanently delete the project
- **Team Management**: Can add/remove any team member (including Admins)
- **Transfer Rights**: Can transfer ownership to others

## Initiating Ownership Transfers {#initiating-ownership-transfers}

### From the Projects List

![Transfer Ownership Menu](/img/user-manual/editor/projects/transfer-ownership.png)

To transfer ownership of a project:

1. When logged in, go to your [User Page](https://playcanvas.com/)
2. Find the project you want to transfer
3. Click the arrow next to the project name
4. Select **"Transfer Ownership"** from the dropdown menu

### Transfer Dialog

![Transfer Ownership Dialog](/img/user-manual/editor/projects/transfer-ownership-dialog.png)

In the transfer dialog:

1. **Enter the recipient's username** or organization name
2. Click **FIND** or press Enter to verify the recipient
3. Review the transfer details carefully
4. Click **TRANSFER** to send the transfer request

### Supported Recipients

You can transfer ownership to:

- **Individual Users**: Any PlayCanvas user account
- **Organizations**: PlayCanvas organization accounts

## The Transfer Process

### 1. Transfer Request

When you initiate a transfer:

- A transfer request is sent to the recipient
- The original owner retains control until accepted
- The request appears in the recipient's project list
- No changes occur until the transfer is accepted

### 2. Recipient Acceptance

![Transfer Ownership Accept](/img/user-manual/editor/projects/accept-transfer.png)

The recipient will see:

- Transfer request at the top of their project list
- Details about the project being transferred
- Options to **Accept** or **Decline** the transfer

### 3. Transfer Completion

Once accepted:

- **Ownership transfers immediately** to the new owner
- **All team members are removed** except the new owner
- **Original owner loses all access** unless re-added by new owner
- **Transfer cannot be reversed** without initiating a new transfer

:::warning

Transfer completion removes all existing team members from the project. The new owner must manually re-add team members if needed.

:::
