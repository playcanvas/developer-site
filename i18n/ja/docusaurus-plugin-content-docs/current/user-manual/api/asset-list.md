---
title: アセット - List assets
---

## ルートURL

```none
GET https://playcanvas.com/api/projects/:projectId/assets?branchId=:branchId&skip=:skip&limit=:limit
```

## 説明

特定のブランチのプロジェクト内のすべてのアセットの詳細を取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/assets?branchId={branchId}&skip={number}&limit={number}"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/projects/{projectId}/assets?branchId={branchId}&skip={number}&limit={number}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前        | タイプ       | Required | 説明                                                                  |
| ----------- | ---------- | :------: | ---------------------------------------------------------------------------- |
| `projectId` | `number`   | ✔️      | The id of the project.                                                       |
| `branchId`  | `string`   | ✔️      | The id of the branch.                                                        |
| `skip`      | `number`   |          | Number of assets to skip before listing. Used for pagination. Defaults to 0. |
| `limit`     | `number`   |          | Maximum number of assets to list. Defaults to 16. Maximum 100000.            |

## レスポンススキーマ

```none
ステータス:200
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

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 429  | Too many requests |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
