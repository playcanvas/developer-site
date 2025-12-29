---
title: ブランチ - List branches
---

## ルートURL

```none
GET https://playcanvas.com/api/projects/:projectId/branches
```

## 説明

プロジェクトの全てのオープンなブランチのリストを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/branches"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/projects/{projectId}/branches
Authorization: Bearer {accessToken}
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
    "result": [    {
      "id": string,
      "projectId": int,
      "name": "Branch Name",
      "createdAt": date,
      "closed": bool,
      "latestCheckpointId": string,
      "user": {
        "id": int,
        "fullName": string,
        "username": string
      }
    },, ...],
    "pagination": {
        "hasMore": bool
    }
}
```

このエンドポイントは、若干異なるページネーション方法を使用しています。レスポンスが `hasMore: true` の場合、追加の結果が利用可能です。最後に受信したブランチIDとともに `?skip=branchId` クエリパラメーターを使用して、アルファベット順により多くのブランチを受信します。

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 429  | Too many requests |

## レート制限

このルートは[通常][1]のレート制限を使用します。

[1]: /user-manual/api#rate-limiting
