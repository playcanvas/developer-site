---
title: チェックポイント - Create checkpoint
---

## ルートURL

```none
POST https://playcanvas.com/api/checkpoints
```

## 説明

ブランチの新しいチェックポイントを作成します。チェックポイントはブランチの現在の状態をキャプチャし、後で復元できるようにします。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"projectId": {projectId}, "branchId": "{branchId}", "description": "My checkpoint"}' "https://playcanvas.com/api/checkpoints"
```

HTTP リクエスト

```text
POST https://playcanvas.com/api/checkpoints
Authorization: Bearer {accessToken}
Content-Type: application/json

{
    "projectId": {projectId},
    "branchId": "{branchId}",
    "description": "My checkpoint"
}
```

## パラメーター

| 名前          | タイプ     | 必須 | 説明                                                                      |
| ------------- | -------- | :------: | -------------------------------------------------------------------------------- |
| `projectId`   | `number` | ✔️      | The id of the project.                                                           |
| `branchId`    | `string` | ✔️      | The id of the branch.                                                            |
| `description` | `string` | ✔️      | A description for the checkpoint. Must be non-empty and cannot exceed 10,000 characters. |

## レスポンススキーマ

```none
ステータス: 201 Created
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

| コード | 説明        |
| ---- | ------------------ |
| 400  | Invalid request    |
| 401  | Unauthorized       |
| 403  | Forbidden          |
| 404  | Project not found / Branch not found |
| 429  | Too many requests  |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
