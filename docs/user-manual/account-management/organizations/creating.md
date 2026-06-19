---
title: Creating Organizations
description: How to create a PlayCanvas Organization from your profile, transfer existing projects into it, or convert a user account into an Organization.
---

There are two ways to create an Organization. Any Organizations you belong to appear next to your name on your profile:

![Profile Organizations](/img/user-manual/account-management/organizations/creating/organizations.jpg)

## Create a new Organization

Open the dropdown menu in the top-right corner and click **NEW ORGANIZATION**:

![Dropdown](/img/user-manual/account-management/organizations/creating/dropdown.png)

This opens the following dialog:

![New Organization](/img/user-manual/account-management/organizations/creating/new-organization.jpg)

Enter a **name** for the Organization and an **Organization ID** (a string containing only alphanumeric characters and dashes). The email address defaults to your own, but you can change it. Click **CREATE** to finish — you'll be taken to the Organization's profile page.

### Transfer existing projects into the Organization

If you already have projects — for example, private projects on a Personal plan — you can move them into the new Organization:

1. From your user account, [transfer ownership of the projects](/user-manual/editor/projects/ownership-transfers#initiating-ownership-transfers) to the Organization.
2. From the Organization account, accept the transfer.
3. If you're on a Personal plan, cancel it to downgrade to Free. This takes effect immediately, regardless of when you last paid.
4. [Add yourself to the projects as an administrator](/user-manual/account-management/organizations/managing/#projects) of the Organization.

Your projects are now owned by the Organization, with your user account as an administrator on each.

## Convert a user account into an Organization

Alternatively, you can convert an existing user account into an Organization. Click **CONVERT** on your [account settings](/user-manual/account-management/user-accounts/settings/#convert-account-to-organization) page:

![Convert Organization](/img/user-manual/account-management/organizations/creating/convert.png)

This opens the following dialog:

![Convert Popup](/img/user-manual/account-management/organizations/creating/convert-popup.png)

Because you can't log in *as* an Organization, converting an account means you'll no longer be able to log in with it. You must therefore nominate another user as the new **owner**.

:::warning

Make sure you can log in with the new owner's account before you convert.

:::

If the account is on a paid plan, that plan is cancelled unless you choose to subscribe to an Organization plan in the dialog. The number of seats to purchase is calculated automatically from the number of users across your existing private projects.

After converting, you'll be logged out. Log back in with the new owner's account to access the Organization and all its projects.
