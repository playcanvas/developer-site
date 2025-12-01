---
title: Backup and Archiving
---

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

The simplest way to create a backup is to fork your own project. Forking is [covered comprehensively](creating.md#fork-an-existing-project) earlier in this section.

### 2. Archiving (via playcanvas.com)

Archive files provide complete project backups that can be stored offline and imported later.

#### From the Projects List

![Export Archive](/img/user-manual/editor/projects/export-project.png)

To export a project archive:

1. Ensure you are logged in
2. Visit the User Page that owns the project you wish to export
3. Locate the project in the project list
4. Click the down arrow next to the right of the project name
5. Select **"Export Project"**
6. Wait for the archive to be generated
7. Click **DOWNLOAD** to download the zip file

:::danger

Exported projects **do not** include:

- Version control history
- Any branches other than `main`
- The project's [Dev Log](dev-logs.md)

:::

### 3. Archiving (via REST API)

For automated and advanced backup scenarios, use the PlayCanvas REST API.

#### API Advantages

- **Automated Backups**: Set up scheduled backup scripts
- **Branch Selection**: Choose which branch to export
- **CI Integration**: Include in continuous integration workflows
- **Bulk Operations**: Backup multiple projects programmatically

#### Using the API

The [Project Archive API](/user-manual/api/project-archive/) allows you to:

```bash
# Export a project via REST API
curl -H "Authorization: Bearer {accessToken}" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{"branch_id": "99999999-9999-9999-9999-999999999999"}' \
     "https://playcanvas.com/api/projects/{projectId}/export"
```

#### Automation Tools

PlayCanvas provides an [open-source Node.js tool](https://github.com/playcanvas/playcanvas-rest-api-tools#archiving-a-project) to simplify automated backups:

- Command-line interface for easy scripting
- Support for multiple projects
- Configurable backup schedules
- Integration with cloud storage services

## Restoring Projects {#restoring-projects}

### From Archive Files

![Import Archive](/img/user-manual/editor/projects/import-project.png)

To restore a project from an archive:

1. Go to your [Projects Dashboard](https://playcanvas.com/projects)
2. Click **"Import Project"** on the left side
3. Select your archive ZIP file
4. Choose a name for the restored project
5. Wait for the import to complete

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
- Export archives for critical milestones

📅 **Weekly Backups** (for ongoing projects):

- Create comprehensive archive exports
- Test restore procedures periodically

📆 **Monthly Backups** (for stable projects):

- Full project archives with documentation
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

Coordinate backups with your [version control workflow](../version-control/index.md):

- **Branch-specific Backups**: Export different branches separately
- **Release Backups**: Archive every stable release
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
