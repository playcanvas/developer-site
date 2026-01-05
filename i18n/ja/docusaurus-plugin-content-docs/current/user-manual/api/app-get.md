---
title: アプリ - Get app
---

## ルートURL

```none
GET https://playcanvas.com/api/apps/:id
```

## 説明

指定したIDの公開済みアプリを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" https://playcanvas.com/api/apps/{id}
```

## パラメーター

| 名前 | タイプ     | 説明        |
| ---- | -------- | ------------------ |
| `id` | `number` | The id of the app. |

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

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | App not found     |
| 404  | Project not found |
| 429  | Too many requests |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
