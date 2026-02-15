---
title: チェックポイント - List checkpoints
---

## ルートURL

```none
GET https://playcanvas.com/api/branches/:branchId/checkpoints
```

## 説明

ブランチのチェックポイントのリストを新しい順に取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/branches/{branchId}/checkpoints"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/branches/{branchId}/checkpoints
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前       | タイプ     | Required | 説明                                                                                           |
| ---------- | -------- | :------: | ----------------------------------------------------------------------------------------------------- |
| `branchId` | `string` | ✔️      | The id of the branch.                                                                                 |
| `limit`    | `number` |          | The maximum number of checkpoints to return. Cannot exceed 50.                                        |
| `skip`     | `string` |          | A checkpoint id. The result will only contain checkpoints that were created before this checkpoint.    |

## レスポンススキーマ

```none
ステータス: 200
```

```json
{
    "result": [{
        "id": string,
        "user": {
            "id": int,
            "fullName": string,
            "username": string
        },
        "createdAt": date,
        "description": string
    }, ...],
    "pagination": {
        "hasMore": bool
    }
}
```

このエンドポイントは、若干異なるページネーション方法を使用しています。レスポンスが `hasMore: true` の場合、追加の結果が利用可能です。最後に受信したチェックポイントのIDとともに `skip` クエリパラメーターを使用して、さらに結果を取得できます。

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Branch not found  |
| 429  | Too many requests |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
