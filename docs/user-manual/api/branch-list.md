---
title: Branches - List branches
---

## Route URL

```none
GET https://playcanvas.com/api/projects/:projectId/branches
```

## Description

Get a list of all open branches for a project

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/branches"
```

HTTP Request

```text
GET https://playcanvas.com/api/projects/{projectId}/branches
Authorization: Bearer {accessToken}
```

## Parameters

| Name        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `projectId` | `number` | The id of the project. |

## Response Schema

```none
Status: 200
```

```json
{
    "result": [    {
      "id": string,
      "projectId": int,
      "name": "Branch Name",
      "createdAt": date,
      "closed": bool,
      "latestCheckpointId": string,
      "user": {
        "id": int,
        "fullName": string,
        "username": string
      }
    },, ...],
    "pagination": {
        "hasMore": bool
    }
}
```

This endpoint uses a slightly different pagination method. If a response contains the value `hasMore: true` then additional results are available. Use `?skip=branchId` query parameter with the last received branch id to receive more branches in alphabetical order.

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 429  | Too many requests |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
