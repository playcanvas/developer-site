---
title: Checkpoints - Get checkpoint
---

## Route URL

```none
GET https://playcanvas.com/api/checkpoints/:id
```

## Description

Get a checkpoint by its id.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/checkpoints/{id}"
```

HTTP Request

```text
GET https://playcanvas.com/api/checkpoints/{id}
Authorization: Bearer {accessToken}
```

## Parameters

| Name | Type     | Description              |
| ---- | -------- | ------------------------ |
| `id` | `string` | The id of the checkpoint. |

## Response Schema

```none
Status: 200
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

| Code | Description          |
| ---- | -------------------- |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Checkpoint not found |
| 429  | Too many requests    |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
