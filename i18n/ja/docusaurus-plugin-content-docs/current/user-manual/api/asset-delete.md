---
title: アセット - Create asset
---

## ルートURL

```none
GET https://playcanvas.com/api/assets/:assetId?branchId=:branchId
```

## 説明

プロジェクトのブランチからアセットを完全に削除します。

:::warning

アセットを削除することは永続的で、取り消すことができるのはチェックポイントを取っている場合のみです。

:::

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -X DELETE "https://playcanvas.com/api/assets/{assetId}?branchId={branchId}"
```

HTTP リクエスト

```text
DELETE https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前       | タイプ     | Required | 説明                                    |
| ---------- | -------- | :------: | ---------------------------------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset to delete.                 |
| `branchId` | `string` | ✔️      | The id of the branch to delete the asset from. |

## レスポンススキーマ

```none
ステータス:200
```

## エラー

| コード | 説明                |
| ---- | -------------------------- |
| 401  | Unauthorized               |
| 403  | Forbidden                  |
| 404  | Project or Asset not found |
| 429  | Too many requests          |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
