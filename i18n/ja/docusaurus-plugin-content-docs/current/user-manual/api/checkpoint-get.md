---
title: チェックポイント - Get checkpoint
---

## ルートURL

```none
GET https://playcanvas.com/api/checkpoints/:id
```

## 説明

IDを指定してチェックポイントを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/checkpoints/{id}"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/checkpoints/{id}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前 | タイプ     | 説明              |
| ---- | -------- | ------------------------ |
| `id` | `string` | The id of the checkpoint. |

## レスポンススキーマ

```none
ステータス: 200
```

```json
{
    "id": string,
    "user": {
        "id": int,
        "fullName": string,
        "username": string
    },
    "createdAt": date,
    "description": string
}
```

## エラー

| コード | 説明          |
| ---- | -------------------- |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Checkpoint not found |
| 429  | Too many requests    |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
