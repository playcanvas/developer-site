---
title: Account Settings
---

Your account settings page provides access to all your personal account configuration options, from basic profile information to billing and security settings. To view your user account settings, navigate to [https://playcanvas.com/account](https://playcanvas.com/account). You should see something like this:

![Account Settings](/img/user-manual/account-management/user-accounts/account-settings.png)

## Profile Picture

Upload and manage your profile picture that appears across PlayCanvas. Click on your current profile picture to upload a new image.

## Account Info

### Username

Your unique PlayCanvas username that appears in URLs and identifies you across the platform. You can change your username, providing that username has not already been taken. If it has, you will see the message **Already used**.

### Your Full Name

The display name shown on your profile and in collaborations. You can edit this whenever you choose.

### Email Address

Your primary email address for account notifications and login. Click "Edit" to change your email address. If you sign in with username+password, you'll need to verify the new email address before the change takes effect.

## Password

Update your account password for security:

- **Current Password** - Enter your existing password
- **New Password** - Choose a new password of at least 8 characters
- **Confirm Password** - Re-enter your new password to confirm

:::tip

Use a strong password with a mix of uppercase, lowercase, numbers, and special characters for better security. Consider using a password manager to make this process easier.

:::

## Skills

Tag yourself with the skills that best match your experience:

- **Coder** - Programming and scripting
- **Artist** - 3D modeling, texturing, animation
- **Designer** - UI/UX and game design
- **Musician** - Audio and music composition

These skills are displayed in your public profile header.

## Current Plan

View your current subscription plan.

For free accounts, this shows "Free $0 / month" with basic plan limitations.

For accounts on the Personal plan, this shows "Personal $15 / month".

:::tip

To cancel your Personal plan, click the **Cancel** link and confirm. Your account will drop back to the free tier and the end of your current billing cycle.

:::

## Billing Info

Users on the Free plan will see "No credit card stored in your account" until a paid plan is purchased.

Users on the Personal plan with see something of the form "Card ending in - 0000". Click **Edit** to update billing info:

- Card details
- Billing address
- VAT number (if supported in your country)

## Invoices

Access your billing history and download invoices. By default, your 3 latest invoices are displayed. Keep clicking **Load More...** to load the next 10 invoices.

## Seats

View and manage team members across your projects:

- Lists all users who are team members on projects you own
- Shows which specific projects each user has access to

:::tip

Click the `x` icon to the right of a listed user to remove them from all of your projects that they are on the team of.

:::

## Usage

This section tracks your account resource consumption. The usage meter shows current consumption against your plan limits.

### Storage Breakdown

- **Public Projects** - Number created vs. limit
- **Private Projects** - Number created vs. limit (plan-dependent)
- **Assets** - Storage used for 3D models, textures, audio
- **Apps** - Published application data
- **Code** - Script and code storage
- **Checkpoints** - Version history storage
- **Splats** - Gaussian splat data (uploaded from SuperSplat)

## API Tokens

Manage programmatic access to your PlayCanvas account:

- Generate new API tokens
- View existing token permissions
- Revoke access for unused tokens

See the [API Documentation](/user-manual/api/) for details on using API tokens.

## Email Preferences

Configure which notifications you receive:

- **My Projects** - Updates about your own projects
- **Watched Projects** - Notifications from projects you follow
- **New Comments** - Comments on your projects or posts
- **New Stars** - When users star your projects
- **My Organizations** - Organization-related updates
- **Exciting PlayCanvas Stuff** - Platform news and updates

Uncheck any categories you don't want to receive emails about.

## Organizations

### Convert Account to Organization {#convert-account-to-organization}

Transform your personal account into an [organization](../organizations/index.md) account:

- Allows team collaboration
- Enables advanced permission management
- Requires designating a new owner

:::warning

Converting to an organization means you can no longer log in with this account. Make sure you have another account ready to become the organization owner.

:::

:::tip

You cannot convert a user account into an organization if it currently manages other organizations. Transfer those organizations to be owned by another user account first.

:::

## Delete Account

Permanently remove your PlayCanvas account:

- All projects and data will be deleted
- This action cannot be undone
- Consider downloading important projects first

:::danger

Account deletion is permanent and irreversible. Make sure to backup any important work before proceeding.

:::

:::tip

You can't delete a user account if it currently manages any organizations. Please delete the organizations first or transfer their ownership to another user account.

:::

---

For billing-specific questions and detailed subscription management, see [Billing](../billing.md).
