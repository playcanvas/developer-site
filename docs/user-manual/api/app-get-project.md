---
title: Apps - Get project apps
---

## Route URL

```none
GET https://playcanvas.com/api/projects/:projectId/apps
```

## Description

Lists all the published Apps of a Project.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/projects/{projectId}/apps
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
  "result": [{
    "id": int,
    "project_id": int,
    "owner_id": int,
    "name": string,
    "description": string,
    "version": string,
    "release_notes": string,
    "thumbnails": {
        "s": string,
        "m": string,
        "l": string,
        "xl": string
    },
    "size": int,
    "views": int,
    "completed_at": date,
    "created_at": date,
    "modified_at": date
  }, ... ],
  "pagination": {
     ...
  }
}
```

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 429  | Too many requests |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
