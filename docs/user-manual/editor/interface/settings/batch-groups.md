---
title: Batch Group Settings
sidebar_label: Batch Groups
---

Batch Groups combine multiple meshes into a single draw call to reduce CPU overhead and improve rendering performance.

## Adding a Batch Group

- Click **Add Group** to create a new batch group.
- Configure the properties:

| Setting | Description |
| --- | --- |
| **Name** | A label for the batch group. |
| **Dynamic** | If enabled, allows batched objects to move; otherwise, they are static for better performance. |
| **Max AABB** | Sets the maximum size of the batch's bounding box (Axis-Aligned Bounding Box) in world units. |
| **Layers** | Specifies which render layers the batch group will be applied to. |

### Notes

- Use **static batching** whenever possible for optimal performance.
- Keep **Max AABB** reasonable to avoid large batches that reduce culling efficiency.
 - Assign batch groups only to relevant layers to avoid unnecessary batching.
