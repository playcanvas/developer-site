---
title: Assets - Get Asset
---

## Route URL

```none
GET https://playcanvas.com/api/assets/:assetId?branchId=:branchId
```

## Description

Get the details of a single asset

## Example

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
```

HTTP Request

```text
GET https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## Parameters

| Name       | Type     | Required | Description           |
| ---------- | -------- | :------: | --------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset.  |
| `branchId` | `string` | ✔️      | The id of the branch. |

## Response Schema

```none
Status: 200
```

```json
{
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
}
```

## Errors

| Code | Description                |
| ---- | -------------------------- |
| 401  | Unauthorized               |
| 403  | Forbidden                  |
| 404  | Project or Asset not found |
| 429  | Too many requests          |

## Rate Limiting

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
