---
title: アセット - Get Asset File
sidebar_position: 7
---

## ルートURL

```none
GET https://playcanvas.com/api/assets/:assetId/file/:filename?branchId=:branchId
```

## 説明

単一アセットの詳細を取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/assets/{assetId}/file/{filename}?branchId={branchId}"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/assets/{assetId}/file/{filename}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前       | タイプ     | Required | 説明                |
| ---------- | -------- | :------: | -------------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset.       |
| `branchId` | `string` | ✔️      | The id of the branch.      |
| `filename` | `string` | ✔️      | The filename of the asset. |

## レスポンススキーマ

```none
ステータス:200
```

```none
{fileContents}
```

## エラー

| コード | 説明                |
| ---- | -------------------------- |
| 401  | Unauthorized               |
| 403  | Forbidden                  |
| 404  | Project or Asset not found |
| 429  | Too many requests          |

## レート制限

このルートは[通常][1]のレート制限を使用します。

[1]: /user-manual/api#rate-limiting
