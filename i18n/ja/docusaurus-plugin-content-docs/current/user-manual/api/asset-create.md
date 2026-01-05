---
title: アセット - Create asset
---

## ルートURL

```none
POST https://playcanvas.com/api/assets
```

## 説明

新しいアセットを作成します。

:::note

現時点では、このエンドポイントは `script`、`html`、`css`、`text`、`shader`、および `json` のタイプのアセットの作成のみをサポートしています。

:::

**他のREST APIエンドポイントと異なり、Create Assetエンドポイントはデータの送信に `multipart/form-data` を使用する必要があります。**

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -X POST -F 'name={name}' -F 'projectId={projectId}' -F 'parent={parent}' -F 'preload={preload}' -F 'pow2={pow2}' -F 'file=@./script.js' "https://playcanvas.com/api/assets"
```

HTTP リクエスト

```text
POST https://playcanvas.com/api/assets
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryTdsfsfT

------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="projectId"

{projectId}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="branchId"

{branchId}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="parent"

{parent}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="preload"

{preload}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name=""; filename="script.js"
Content-Type: application/javascript

{fileContent}
------WebKitFormBoundaryTdsfsfT--
```

## パラメーター

| 名前        | タイプ      | Required | 説明                                                                                                 |
| ----------- | --------- | :------: | ----------------------------------------------------------------------------------------------------------- |
| `name`      | `string`  | ✔️      | The name of the asset.                                                                                      |
| `projectId` | `number`  | ✔️      | The id of the project.                                                                                      |
| `branchId`  | `string`  | ✔️      | The id of the branch.                                                                                       |
| `parent`    | `number`  |          | Parent asset's id.                                                                                          |
| `preload`   | `boolean` |          | Preload the asset (true / false).                                                                           |
| `file`      | `file`    |          | Data to store as the asset file.                                                                            |
| `pow2`      | `boolean` |          | Only used for textures and defaults to false. Resize the texture to power of two dimensions (true / false). |

## レスポンススキーマ

```none
Status: 201
```

```json
{
    "id": int,
    "modifiedAt": date,
    "createdAt": date,
    "state": "ready" | "processing" | "error",
    "name": string,
    "type": string,
    "scope":{
        "type": string,
        "id": int
    },
    "source": bool,
    "sourceId": bool,
    "tags": list of strings,
    "preload": bool,
    "data": {
        ... asset data
    },
    "file": {
        "hash": string,
        "filename": string,
        "size": int,
        "url": string
    },
    "parent": int
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

This route uses an [assets](/user-manual/api#rate-limiting) rate limit.
