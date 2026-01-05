---
title: アプリ - Get project apps
---

## ルートURL

```none
GET https://playcanvas.com/api/projects/:projectId/apps
```

## 説明

プロジェクトの公開されたすべてのアプリをリストアップします。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/projects/{projectId}/apps
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
  "result": [{
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
  }, ... ],
  "pagination": {
     ...
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
