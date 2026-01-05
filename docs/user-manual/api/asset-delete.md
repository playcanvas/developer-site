---
title: Assets - Delete asset
---

## Route URL

```none
GET https://playcanvas.com/api/assets/:assetId?branchId=:branchId
```

## Description

Permanently delete an asset from a branch of your project.

:::warning

Deleting an asset is permanent and unrecoverable unless you have taken a checkpoint of it.

:::

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -X DELETE "https://playcanvas.com/api/assets/{assetId}?branchId={branchId}"
```

HTTP Request

```text
DELETE https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## Parameters

| Name       | Type     | Required | Description                                    |
| ---------- | -------- | :------: | ---------------------------------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset to delete.                 |
| `branchId` | `string` | ✔️      | The id of the branch to delete the asset from. |

## Response Schema

```none
Status: 200
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
