---
title: アプリ - Download app
---

## ルートURL

```none
POST https://playcanvas.com/api/apps/download
```

## 説明

自分のサーバーでセルフホストすることができるアプリをダウンロードできます。リクエストによりエクスポートジョブが開始され、ジョブの詳細がレスポンスで返されます。[idを指定してジョブをポール](/user-manual/api/job-get)して、そのステータスが「完了」または「エラー」になるまで待ちます。ジョブが完了すると、そのデータにはエクスポートされたアプリをダウンロードするためのURLが含まれます。

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"project_id": 9999999, "scenes": [9999999], "name": "My App"}' "https://playcanvas.com/api/apps/download"
```

## パラメーター

| 名前                    | タイプ       | Required | 説明                                                                                                                                                           |
| ----------------------- | ---------- | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`            | `number`   | ✔️      | The id of the project.                                                                                                                                                |
| `name`                  | `string`   | ✔️      | The name of the app. Must be less than 1000 characters.                                                                                                               |
| `scenes`                | `number[]` | ✔️      | A list of scene ids to be included in the app. When you specify scenes then the first scene in the list will be used as the initial scene of the application.         |
| `branch_id`             | `string`   |          | The id of the branch. If no id is specified the main branch will be used.                                                                                             |
| `description`           | `string`   |          | The description of the app. Must be less than 10,000 characters.                                                                                                      |
| `version`               | `string`   |          | The version of the app. Can be a string up to 20 characters.                                                                                                          |
| `release_notes`         | `string`   |          | Release notes for the app. Can be a string up to 10,000 characters.                                                                                                   |
| `scripts_concatenate`   | `boolean`  |          | Set it to true if you want scripts to be concatenated.                                                                                                                |
| `scripts_minify`        | `boolean`  |          | Set it to true if you want scripts to be minified. Defaults to true.                                                                                                  |
| `scripts_sourcemaps`    | `boolean`  |          | Set it to true if you want script sourcemaps to be generated. Defaults to false.                                                                                      |
| `optimize_scene_format` | `boolean`  |          | Set it to true if you want scenes to be in an optimized format (see [Optimize Scene Format](/user-manual/optimization/optimizing-scene-format) for more information). |
| `engine_version`        | `string`   |          | Set it to a Engine version string ([full list of releases](https://github.com/playcanvas/engine/releases)) if a specific version is needed for the app.               |

## レスポンススキーマ

```none
ステータス:201 Created
```

```json
{
    "status": "running" | "complete" | "error",
    "messages": list of strings,
    "created_at": date,
    "modified_at": date,
    "data": {
        "concatenate": boolean,
        "branch_id": string,
        "optimize_scene_format": boolean,
        "minify": boolean,
        "name": string,
        "sourcemaps": boolean,
        "scenes": list of int scene ids,
        "engineVersion": string,
        "preload_bundle": boolean,
        "project_id": int,
        "owner_id": int
    },
    "id": int
}
```

## エラー

| コード | 説明       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 404  | Owner not found   |
| 404  | Scene not found   |
| 429  | Too many requests |

## レート制限

このルートは[strict](/user-manual/api#rate-limiting)なレート制限を使用します。
