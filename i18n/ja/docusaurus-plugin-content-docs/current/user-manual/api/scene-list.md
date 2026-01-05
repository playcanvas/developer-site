---
title: シーン - List scenes
---

## ルートURL

```none
GET https://playcanvas.com/api/projects/:projectId/scenes?branchId=:branchId
```

## 説明

プロジェクト内の全てのシーンのリストを取得します。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/scenes?branchId={branchId}"
```

HTTP リクエスト

```text
GET https://playcanvas.com/api/projects/{projectId}/scenes?branchId={branchId}
Authorization: Bearer {accessToken}
```

## パラメーター

| 名前        | タイプ     | Required | 説明                                                                |
| ----------- | -------- | :------: | -------------------------------------------------------------------------- |
| `projectId` | `number` | ✔️      | The id of the project.                                                     |
| `branchId`  | `string` |          | The id of the branch. If no id is specified, the main branch will be used. |

## レスポンススキーマ

```none
ステータス:200
```

```json
{
    "result": [{
      "id": int,
      "projectId": int,
      "name": string,
      "created": date,
      "modified": date
    }, ...]
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
