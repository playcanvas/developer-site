---
title: Apps - Get app
---

## Route URL

```none
GET https://playcanvas.com/api/apps/:id
```

## Description

Gets a published App by id.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/apps/{id}
```

## Parameters

| Name | Type     | Description        |
| ---- | -------- | ------------------ |
| `id` | `number` | The id of the app. |

## Response Schema

```none
Status: 200
```

```json
{
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
}
```

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | App not found     |
| 404  | Project not found |
| 429  | Too many requests |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
