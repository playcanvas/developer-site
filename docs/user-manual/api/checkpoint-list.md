---
title: Checkpoints - List checkpoints
---

## Route URL

```none
GET https://playcanvas.com/api/branches/:branchId/checkpoints
```

## Description

Get a list of checkpoints for a branch, sorted by newest first.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/branches/{branchId}/checkpoints"
```

HTTP Request

```text
GET https://playcanvas.com/api/branches/{branchId}/checkpoints
Authorization: Bearer {accessToken}
```

## Parameters

| Name       | Type     | Required | Description                                                                                           |
| ---------- | -------- | :------: | ----------------------------------------------------------------------------------------------------- |
| `branchId` | `string` | ✔️      | The id of the branch.                                                                                 |
| `limit`    | `number` |          | The maximum number of checkpoints to return. Cannot exceed 50.                                        |
| `skip`     | `string` |          | A checkpoint id. The result will only contain checkpoints that were created before this checkpoint.    |

## Response Schema

```none
Status: 200
```

```json
{
    "result": [{
        "id": string,
        "user": {
            "id": int,
            "fullName": string,
            "username": string
        },
        "createdAt": date,
        "description": string
    }, ...],
    "pagination": {
        "hasMore": bool
    }
}
```

This endpoint uses a slightly different pagination method. If a response contains the value `hasMore: true` then additional results are available. Use the `skip` query parameter with the id of the last received checkpoint to receive more results.

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Branch not found  |
| 429  | Too many requests |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
