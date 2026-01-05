---
title: Assets - Update asset
---

## Route URL

```none
PUT https://playcanvas.com/api/assets/:assetId
```

## Description

Update an existing asset's file.

:::note

This endpoint currently only supports updating `script`, `html`, `css`, `text`, `shader` and `json` type assets.

:::

**Unlike other REST API endpoints. The Update Asset endpoint expects data to be sent in `multipart/form-data`**

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -X PUT -F 'pow2={pow2}' -F 'file=@./script.js' "https://playcanvas.com/api/assets/{assetId}"
```

## Parameters

| Name       | Type      | Required | Description                                                                                                 |
| ---------- | --------- | :------: | ----------------------------------------------------------------------------------------------------------- |
| `assetId`  | `number`  | ✔️      | The id of the asset.                                                                                        |
| `file`     | `file`    | ✔️      | Data to update asset file with.                                                                             |
| `pow2`     | `boolean` |          | Only used for textures and defaults to false. Resize the texture to power of two dimensions (true / false). |

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
    "data": {
        ... asset data
    },
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

This route uses an [assets](/user-manual/api#rate-limiting) rate limit.
