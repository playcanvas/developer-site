---
title: ブランチ - Create branch
---

## ルートURL

```none
POST https://playcanvas.com/api/branches
```

## 説明

既存のブランチから、オプションで特定のチェックポイントを指定して、新しいブランチを作成します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"projectId": {projectId}, "name": "My New Branch", "sourceBranchId": "{sourceBranchId}"}' "https://playcanvas.com/api/branches"
```

HTTP リクエスト

```text
POST https://playcanvas.com/api/branches
Authorization: Bearer {accessToken}
Content-Type: application/json

{
    "projectId": {projectId},
    "name": "My New Branch",
    "sourceBranchId": "{sourceBranchId}"
}
```

## パラメーター

| 名前                   | タイプ     | 必須 | 説明                                                                                                          |
| ---------------------- | -------- | :------: | -------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string` | ✔️      | The name of the new branch. Must be non-empty and cannot exceed 1000 characters.                                     |
| `projectId`            | `number` | ✔️      | The id of the project.                                                                                               |
| `sourceBranchId`       | `string` | ✔️      | The id of the branch to create the new branch from.                                                                  |
| `sourceCheckpointId`   | `string` |          | The id of the checkpoint to create the new branch from. Must belong to the source branch. If not specified, the latest checkpoint of the source branch will be used. |

## レスポンススキーマ

```none
ステータス: 201 Created
```

```json
{
    "id": string,
    "projectId": int,
    "name": string,
    "createdAt": date,
    "closed": bool,
    "permanent": bool,
    "latestCheckpointId": string,
    "user": {
        "id": int,
        "fullName": string,
        "username": string
    }
}
```

## エラー

| コード | 説明                                        |
| ---- | -------------------------------------------------- |
| 400  | Invalid request / branch name already exists       |
| 401  | Unauthorized                                       |
| 403  | Forbidden                                          |
| 404  | Project not found / Branch not found               |
| 429  | Too many requests                                  |

## レート制限

このルートは[通常](/user-manual/api#rate-limiting)のレート制限を使用します。
