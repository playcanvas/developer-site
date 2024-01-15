---
title: プロジェクト - Archive project
sidebar_position: 13
---

## ルートURL

```none
POST https://playcanvas.com/api/projects/:id/export
```

## 説明

これにより、プロジェクト全体のzipアーカイブをダウンロードできます。ダウンロード後、Projects Dashboardからそのアーカイブをインポートして、そのアーカイブから新しいプロジェクトを作成できます。プロジェクトのインポートに関する詳細は[こちら][3]をご覧ください。

リクエストはアーカイブジョブを開始し、ジョブの詳細がレスポンスで返されます。[idによってジョブの状態をポーリング][2]し、状態が「完了」または「エラー」になるまで待機することができます。ジョブが完了すると、そのデータにはプロジェクトアーカイブをダウンロードするURLが含まれます。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"branch_id": "99999999-9999-9999-9999-999999999999"}' "https://playcanvas.com/api/projects/{projectId}/export"
```

## パラメーター

| 名前        | タイプ     | Required | 説明                                                                |
| ----------- | -------- | :------: | -------------------------------------------------------------------------- |
| `projectId` | `number` | ✔️      | The id of the project.                                                     |
| `branch_id` | `string` |          | The id of the branch. If no id is specified, the main branch will be used. |

## レスポンススキーマ

```none
ステータス:201 Created
```

```json
{
    "id": int,
    "created_at": date,
    "modified_at": date,
    "status": "running" | "complete" | "error",
    "messages": [ list of strings ],
    "data": {
      "project": {
         'id': int
      },
      "url": string
    }
}
```

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 404  | Owner not found   |
| 429  | Too many requests |

## レート制限

このルートは[strict][1]なレート制限を使用します。

[1]: /user-manual/api#rate-limiting
[2]: /user-manual/api/job-get
[3]: /user-manual/profile/projects/#import-project
