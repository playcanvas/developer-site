---
title: Assets - List assets
---

## Route URL

```none
GET https://playcanvas.com/api/projects/:projectId/assets?branchId=:branchId&skip=:skip&limit=:limit
```

## Description

Get the details of all assets in a project for a specific branch

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/assets?branchId={branchId}&skip={number}&limit={number}"
```

HTTP Request

```text
GET https://playcanvas.com/api/projects/{projectId}/assets?branchId={branchId}&skip={number}&limit={number}
Authorization: Bearer {accessToken}
```

## Parameters

| Name        | Type       | Required | Description                                                                  |
| ----------- | ---------- | :------: | ---------------------------------------------------------------------------- |
| `projectId` | `number`   | ✔️      | The id of the project.                                                       |
| `branchId`  | `string`   | ✔️      | The id of the branch.                                                        |
| `skip`      | `number`   |          | Number of assets to skip before listing. Used for pagination. Defaults to 0. |
| `limit`     | `number`   |          | Maximum number of assets to list. Defaults to 16. Maximum 100000.            |

## Response Schema

```none
Status: 200
```

```json
{
    "result": [{
        "id": int,
        "modifiedAt": date,
        "createdAt": date,
        "state": "ready" | "processing" | "error",
        "name": string,
        "type": string,
        "scope":{
            "type": string,
            "id": int
        },
        "source": bool,
        "sourceId": bool,
        "tags": list of strings,
        "preload": bool,
        "file": {
            "hash": string,
            "filename": string,
            "size": int,
            "url": string
        },
        "parent": int
    }, ...],
    "pagination": {
        "skip": int,
        "limit": int,
        "total": int,
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
