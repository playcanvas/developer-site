---
title: Jobs - Get job
---

## Route URL

```none
GET https://playcanvas.com/api/jobs/:id
```

## Description

Gets a Job by id.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/jobs/{id}"
```

## Parameters

| Name | Type     | Description        |
| ---- | -------- | ------------------ |
| `id` | `number` | The id of the job. |

## Response Schema

```none
Status: 200
```

```json
{
    "id": int,
    "created_at": date,
    "modified_at": date,
    "status": "running" | "complete" | "error",
    "messages": list of strings,
    "data": object - contents depend on the job
}
```

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Job not found     |
| 429  | Too many requests |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
