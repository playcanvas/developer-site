---
title: Batch Group Settings
sidebar_label: Batch Groups
---

Batch Groups combine multiple meshes into a single draw call to reduce CPU overhead and improve rendering performance.

:::note

These settings affect all users on the currently active [branch](../../version-control/branches.md) of the project.

:::

Navigate to the `BATCH GROUPS` section and expand the panel:

![Batch Groups Settings](/img/user-manual/editor/interface/settings/batch-groups.webp)

Here is a breakdown of the available settings:

## Adding a Batch Group

- Click **Add Group** to create a new batch group.
- Configure the properties:

| Setting | Description |
| --- | --- |
| **Name** | The name of the batch group. |
| **Dynamic** | Enable to allow objects in this batch group to move, rotate, or scale after being batched. If your objects are completely static, disable this setting. |
| **Max AABB** | The maximum size of any dimension of a bounding box around batched objects. Larger values batch more objects (fewer draw calls) but create bigger batched objects that are harder to cull. Smaller values create more draw calls but smaller, easier-to-cull batches. |
| **Layers** | The layers that this batch group belongs to. |

### Notes

- Use **static batching** whenever possible for optimal performance.
- Keep **Max AABB** reasonable to avoid large batches that reduce culling efficiency.
- Assign batch groups only to relevant layers to avoid unnecessary batching.
