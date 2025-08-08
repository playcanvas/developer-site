---
title: Team Management
---

Effective team management is crucial for collaborative development in PlayCanvas. This section covers how to add team members, manage permissions, and coordinate with your development team.

## Adding Team Members

To add team members to your project:

1. Navigate to your Project Dashboard
2. Go to the **SETTINGS** section
3. Scroll to the **TEAM** section
4. In the edit box, enter the username or email of the person you want to add and click **SEND**

## User Permissions

PlayCanvas projects support three permission levels: **Read**, **Write** and **Admin**.

| Capability | Read Access | Write Access | Admin Access |
|------------| :---------: | :----------: | :----------: |
| **View scenes and assets** | ✅ | ✅ | ✅ |
| **View project settings** | ✅ | ✅ | ✅ |
| **Edit scenes and assets** | ❌ | ✅ | ✅ |
| **Publish builds** | ❌ | ✅ | ✅ |
| **Edit project settings** | ❌ | ❌ | ✅ |
| **Manage team members** | ❌ | ❌ | ✅ |
| **Delete project** | ❌ | ❌ | ✅ |
| **Transfer project ownership** | ❌ | ❌ | ✅ |
| **Best suited for** | Stakeholders, testers, observers | Developers, content creators | Project leads, owners |

### Changing Permissions

To modify a team member's permissions:

1. Go to Project **SETTINGS** > **Team**
2. Find the user in the team list
3. Click on their current permission level
4. Select the new permission level
5. Confirm the change by clicking **SAVE**

## Removing Team Members

To remove someone from your project:

1. Go to Project **SETTINGS** > **Team**
2. Find the user you want to remove
3. Mouse over the tick icon and it will switch to an **X** - click it
4. Confirm the removal by clicking **OK**

:::warning

When you remove a team member, they will lose all access to the project immediately. Make sure this is intentional before confirming.

:::

## Organization Team Management

### Organization Projects

If your project belongs to an organization, team management works slightly differently:

#### Organization Administrators

- Can add themselves to any organization project
- Can manage project teams across the organization
- Can access billing and seat management

#### Seat Management

For organization accounts with seat limits:

- Each team member on a private project occupies a seat
- Public projects don't require seats
- Organization owners can manage seat allocation
- Removing users from projects frees up seats

### Adding Organization Members

Organization administrators can add themselves to projects:

1. Go to the organization account page
2. Find the project in the projects list
3. Click the dropdown arrow
4. Select "Add me as admin"
