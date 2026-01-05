---
title: ジョブ - Get job
---

## ルートURL

```none
GET https://playcanvas.com/api/jobs/:id
```

## 説明

指定されたIDのジョブを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/jobs/{id}"
```

## パラメーター

| 名前 | タイプ     | 説明        |
| ---- | -------- | ------------------ |
| `id` | `number` | The id of the job. |

## レスポンススキーマ

```none
ステータス:200
```

```json
{
    "id": int,
    "created_at": date,
    "modified_at": date,
    "status": "running" | "complete" | "error",
    "messages": list of strings,
    "data": object
}
```

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Job not found     |
| 429  | Too many requests |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
