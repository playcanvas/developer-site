---
title: アプリ - Get primary app
---

## ルートURL

```none
GET https://playcanvas.com/api/projects/:projectId/app
```

## 説明

プロジェクトのプライマリーアプリを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/projects/{projectId}/app
```

## パラメーター

| 名前        | タイプ     | 説明            |
| ----------- | -------- | ---------------------- |
| `projectId` | `number` | The id of the project. |

## レスポンススキーマ

```none
ステータス:200
```

```json
{
    "id": int,
    "project_id": int,
    "owner_id": int,
    "name": string,
    "description": string,
    "version": string,
    "release_notes": string,
    "thumbnails": {
        "s": string,
        "m": string,
        "l": string,
        "xl": string
    },
    "size": int,
    "views": int,
    "completed_at": date,
    "created_at": date,
    "modified_at": date
}
```

## エラー

| コード | 説明                         |
| ---- | ----------------------------------- |
| 401  | Unauthorized                        |
| 403  | Forbidden                           |
| 404  | Project not found                   |
| 404  | Project does not have a primary app |
| 404  | App not found                       |
| 429  | Too many requests                   |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
