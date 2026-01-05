---
title: アセット - Get Asset
---

## ルートURL

```none
GET https://playcanvas.com/api/assets/:assetId?branchId=:branchId
```

## 説明

単一アセットの詳細を取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/assets/{assetId}?branchId={branchId}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前       | タイプ     | Required | 説明           |
| ---------- | -------- | :------: | --------------------- |
| `assetId`  | `number` | ✔️      | The id of the asset.  |
| `branchId` | `string` | ✔️      | The id of the branch. |

## レスポンススキーマ

```none
ステータス:200
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

## エラー

| コード | 説明                |
| ---- | -------------------------- |
| 401  | Unauthorized               |
| 403  | Forbidden                  |
| 404  | Project or Asset not found |
| 429  | Too many requests          |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
