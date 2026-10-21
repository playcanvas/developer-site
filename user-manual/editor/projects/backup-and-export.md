# Backup and Export

Protecting your PlayCanvas projects with regular backups is essential for safeguarding against accidental deletion, malicious actions, or data loss. This section covers all the methods available for backing up and restoring your projects.

## Why Backup Your Projects?

Regular backups protect against:

- Accidental deletion of assets or scenes
- Malicious team member actions
- Account security issues
- Data corruption or technical problems
- Development mistakes that break your project

## Backup Methods

### 1. Forking

The simplest way to create a backup is to fork your own project. Forking is [covered comprehensively](https://developer.playcanvas.com/user-manual/editor/projects/creating.md#fork-an-existing-project) earlier in this section.

### 2. Exporting (from the Project Dashboard)

Export files provide complete project backups that can be stored offline and imported later.

[Image: Export Project]

To export a project:

1. Open the [Project Dashboard](https://developer.playcanvas.com/user-manual/editor/projects/dashboard.md) at [playcanvas.com/editor](https://playcanvas.com/editor)
2. Open the project's **⋮** menu
3. Select **Export**
4. Wait while the dashboard shows **Exporting &lt;project name&gt;...** and builds the export
5. The zip file downloads in a new tab when it is ready

:::danger

Exported projects **do not** include:

- Version control history
- Any branches other than `main`
- The project's [Dev Log](https://developer.playcanvas.com/user-manual/editor/projects/dev-logs.md)

:::

### 3. Exporting (via REST API)

For automated and advanced backup scenarios, use the PlayCanvas REST API.

#### API Advantages

- **Automated Backups**: Set up scheduled backup scripts
- **Branch Selection**: Choose which branch to export
- **CI Integration**: Include in continuous integration workflows
- **Bulk Operations**: Backup multiple projects programmatically

#### Using the API

The [Project Export API](https://developer.playcanvas.com/user-manual/api/project-export.md) allows you to:

```bash
# Export a project via REST API
curl -H "Authorization: Bearer {accessToken}" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{"branch_id": "99999999-9999-9999-9999-999999999999"}' \
     "https://playcanvas.com/api/projects/{projectId}/export"
```

#### Automation Tools

PlayCanvas provides an [open-source Node.js tool](https://github.com/playcanvas/playcanvas-rest-api-tools#exporting-a-project) to simplify automated backups:

- Command-line interface for easy scripting
- Support for multiple projects
- Configurable backup schedules
- Integration with cloud storage services

## Restoring Projects

### From Export Files

[Image: Import Project]

To restore a project from an export:

1. Open the [Project Dashboard](https://developer.playcanvas.com/user-manual/editor/projects/dashboard.md)
2. Select **Import project** in the sidebar
3. Choose your export `.zip` file
4. Wait while the file uploads and the project is imported
5. When the import is done, select **Open project**. If anything in the project had to be adjusted on import, such as materials, the dialog lists it

#### Restore Considerations

- Creates a completely new project
- Original project remains unchanged
- All team members must be re-added
- Project settings may need reconfiguration
- Version control history is not restored

### From Forks

Since forks are independent projects, "restoring" from a fork involves:

1. Accessing your forked backup project
2. Manually copying changed assets back to the original
3. Or using the forked project as your new main project
4. Updating team access and settings as needed

## Backup Strategies

### Regular Backup Schedule

Establish a consistent backup routine:

📅 **Daily Backups** (for active development):

- Fork projects before major changes
- Create exports for critical milestones

📅 **Weekly Backups** (for ongoing projects):

- Create comprehensive project exports
- Test restore procedures periodically

📆 **Monthly Backups** (for stable projects):

- Full project exports with documentation
- Long-term storage planning

### Backup Storage

Store your backups securely:

**Local Storage:**

- External hard drives or NAS devices
- Encrypted backup drives
- Regular verification of backup integrity

**Cloud Storage:**

- Google Drive, Dropbox, or OneDrive
- AWS S3 or similar cloud storage services
- Version-controlled backup repositories

**Distributed Storage:**

- Multiple backup locations
- Team member backup sharing
- Geographic distribution for disaster recovery

## Advanced Backup Techniques

### Version Control Integration

Coordinate backups with your [version control workflow](https://developer.playcanvas.com/user-manual/editor/version-control.md):

- **Branch-specific Backups**: Export different branches separately
- **Release Backups**: Export every stable release
- **Feature Backups**: Backup before merging major features

### Automated Workflows

Set up automated backup systems:

**Continuous Integration:**

- Trigger backups on specific events
- Integrate with GitHub Actions or similar services
- Automatic backup validation and testing

**Scheduled Scripts:**

- Daily/weekly backup scripts using the REST API
- Cloud storage integration
- Backup rotation and cleanup

### Team Backup Coordination

For team projects:

- **Designated Backup Manager**: Assign backup responsibilities
- **Shared Backup Storage**: Team-accessible backup locations
- **Backup Verification**: Regular restore testing
- **Documentation**: Clear backup and restore procedures

## Recovery Planning

### Disaster Recovery

Prepare for worst-case scenarios:

1. **Identify Critical Assets**: Determine what must be preserved
2. **Recovery Time Objectives**: How quickly you need to restore
3. **Recovery Point Objectives**: How much data loss is acceptable
4. **Communication Plan**: How to notify team members
5. **Alternative Workflows**: Temporary development procedures

### Testing Restores

Regularly test your backup system:

- **Partial Restores**: Test individual asset recovery
- **Full Restores**: Complete project restoration
- **Team Training**: Ensure team members understand procedures
- **Documentation Updates**: Keep recovery procedures current

:::warning

Untested backups are unreliable backups. Regular testing ensures your backup strategy works when you need it most.

:::
