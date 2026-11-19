# Team Management

Effective team management is crucial for collaborative development in PlayCanvas. This section covers how to add team members, manage permissions, and coordinate with your development team.

## Adding Team Members

To add team members to your project:

1. On the [Project Dashboard](https://developer.playcanvas.com/user-manual/editor/projects/dashboard.md), select the project's card to open its settings
2. Select **Team** in the panel on the left
3. Enter the username or email address of the person you want to add and select **Invite**

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

1. Open the project's **Team** panel on the Project Dashboard
2. Find the user in the team list
3. Select their current access level
4. Select **Read Only**, **Read & Write** or **Admin**. The change applies straight away

## Removing Team Members

To remove someone from your project:

1. Open the project's **Team** panel on the Project Dashboard
2. Find the user you want to remove
3. Select the remove button on their row

:::warning

When you remove a team member, they will lose all access to the project immediately. Make sure this is intentional before confirming.

:::

## Organization Projects

If a project belongs to an [Organization](https://developer.playcanvas.com/user-manual/account-management/organizations.md), the Organization's owner and administrators can manage it too, and the people on its private projects take the Organization's seats.

### Organization Administrators

The Organization's owner and administrators can:

- Add themselves as an admin to any of the Organization's projects. See [Adding Yourself to an Organization Project](https://developer.playcanvas.com/user-manual/editor/projects/team-management.md#adding-organization-members).
- Manage the team of any project they're an admin of, as described above.
- Add and remove the Organization's administrators, and see who takes a seat, on the **People** tab of its account settings. See [Managing Organizations](https://developer.playcanvas.com/user-manual/account-management/organizations/managing.md#people).

Only the owner can see the Organization's billing, change its plan or change its number of seats.

### Seat Management

On the Organization plan:

- Each person on one of the Organization's private projects takes a seat. One seat covers them on all of its projects.
- Public projects don't need seats.
- The owner doesn't need a seat if they aren't working on the projects.
- Removing someone from all of the Organization's private projects frees their seat. To do it in one step, select **Remove** next to them under **Seats** on the Organization's **People** tab.
- The owner changes the number of seats from the Organization's **Billing** tab. See [Adding and Removing Seats](https://developer.playcanvas.com/user-manual/account-management/organizations/managing.md#adding-and-removing-seats).

See [Seats](https://developer.playcanvas.com/user-manual/account-management/organizations/managing.md#seats) for more.

### Adding Yourself to an Organization Project

Organization administrators add themselves to projects from the Project Dashboard:

1. On the [Project Dashboard](https://developer.playcanvas.com/user-manual/editor/projects/dashboard.md), select the Organization under **Organizations** in the sidebar.
2. Select the project's card to open its settings. If you aren't on the project yet, its settings show only **Team**, with a message that you aren't an admin for the project.
3. Select **ADD ME AS ADMIN**.

The project's full settings open, with you as an admin. You can then [add other team members](https://developer.playcanvas.com/user-manual/editor/projects/team-management.md#adding-team-members) as usual. See [Project Settings](https://developer.playcanvas.com/user-manual/editor/projects/dashboard.md#project-settings).
