---
title: Branches - Create branch
---

## Route URL

```none
POST https://playcanvas.com/api/branches
```

## Description

Create a new branch from an existing branch and optionally from a specific checkpoint.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"projectId": {projectId}, "name": "My New Branch", "sourceBranchId": "{sourceBranchId}"}' "https://playcanvas.com/api/branches"
```

HTTP Request

```text
POST https://playcanvas.com/api/branches
Authorization: Bearer {accessToken}
Content-Type: application/json

{
    "projectId": {projectId},
    "name": "My New Branch",
    "sourceBranchId": "{sourceBranchId}"
}
```

## Parameters

| Name                   | Type     | Required | Description                                                                                                          |
| ---------------------- | -------- | :------: | -------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string` | ✔️      | The name of the new branch. Must be non-empty and cannot exceed 1000 characters.                                     |
| `projectId`            | `number` | ✔️      | The id of the project.                                                                                               |
| `sourceBranchId`       | `string` | ✔️      | The id of the branch to create the new branch from.                                                                  |
| `sourceCheckpointId`   | `string` |          | The id of the checkpoint to create the new branch from. Must belong to the source branch. If not specified, the latest checkpoint of the source branch will be used. |

## Response Schema

```none
Status: 201 Created
```

```json
{
    "id": string,
    "projectId": int,
    "name": string,
    "createdAt": date,
    "closed": bool,
    "permanent": bool,
    "latestCheckpointId": string,
    "user": {
        "id": int,
        "fullName": string,
        "username": string
    }
}
```

## Errors

| Code | Description                                        |
| ---- | -------------------------------------------------- |
| 400  | Invalid request / branch name already exists       |
| 401  | Unauthorized                                       |
| 403  | Forbidden                                          |
| 404  | Project not found / Branch not found               |
| 429  | Too many requests                                  |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
