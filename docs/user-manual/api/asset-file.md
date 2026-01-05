---
title: Assets - Get Asset File
---

## Route URL

```none
GET https://playcanvas.com/api/assets/:assetId/file/:filename?branchId=:branchId
```

## Description

Get the details of a single asset

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/assets/{assetId}/file/{filename}?branchId={branchId}"
```

HTTP Request

```text
GET https://playcanvas.com/api/assets/{assetId}/file/{filename}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## Parameters

| Name       | Type     | Required | Description                |
| ---------- | -------- | :------: | -------------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset.       |
| `branchId` | `string` | ✔️      | The id of the branch.      |
| `filename` | `string` | ✔️      | The filename of the asset. |

## Response Schema

```none
Status: 200
```

```none
{fileContents}
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
