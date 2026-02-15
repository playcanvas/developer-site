---
title: Checkpoints - Create checkpoint
---

## Route URL

```none
POST https://playcanvas.com/api/checkpoints
```

## Description

Create a new checkpoint for a branch. A checkpoint captures the current state of a branch so that it can be restored later.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"projectId": {projectId}, "branchId": "{branchId}", "description": "My checkpoint"}' "https://playcanvas.com/api/checkpoints"
```

HTTP Request

```text
POST https://playcanvas.com/api/checkpoints
Authorization: Bearer {accessToken}
Content-Type: application/json

{
    "projectId": {projectId},
    "branchId": "{branchId}",
    "description": "My checkpoint"
}
```

## Parameters

| Name          | Type     | Required | Description                                                                      |
| ------------- | -------- | :------: | -------------------------------------------------------------------------------- |
| `projectId`   | `number` | ✔️      | The id of the project.                                                           |
| `branchId`    | `string` | ✔️      | The id of the branch.                                                            |
| `description` | `string` | ✔️      | A description for the checkpoint. Must be non-empty and cannot exceed 10,000 characters. |

## Response Schema

```none
Status: 201 Created
```

```json
{
    "id": string,
    "user": {
        "id": int,
        "fullName": string,
        "username": string
    },
    "createdAt": date,
    "description": string
}
```

## Errors

| Code | Description        |
| ---- | ------------------ |
| 400  | Invalid request    |
| 401  | Unauthorized       |
| 403  | Forbidden          |
| 404  | Project not found / Branch not found |
| 429  | Too many requests  |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
