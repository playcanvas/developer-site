---
title: アセット - Update asset
---

## ルートURL

```none
PUT https://playcanvas.com/api/assets/:assetId
```

## 説明

既存のアセットのファイルを更新します。

:::note

現在、このエンドポイントは `script`、`html`、`css`、`text`、`shader`、`json` のタイプのアセットの更新のみをサポートしています。

:::

**他のREST APIエンドポイントとは異なり、アップデートアセットエンドポイントはデータを `multipart/form-data` で送信することが必要です。**

## 例

```none
curl -H "Authorization: Bearer {accessToken}" -X PUT -F 'pow2={pow2}' -F 'file=@./script.js' "https://playcanvas.com/api/assets/{assetId}"
```

## パラメーター

| 名前       | タイプ      | Required | 説明                                                                                                 |
| ---------- | --------- | :------: | ----------------------------------------------------------------------------------------------------------- |
| `assetId`  | `number`  | ✔️      | The id of the asset.                                                                                        |
| `file`     | `file`    | ✔️      | Data to update asset file with.                                                                             |
| `pow2`     | `boolean` |          | Only used for textures and defaults to false. Resize the texture to power of two dimensions (true / false). |

## レスポンススキーマ

```none
ステータス:200
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

| コード | 説明                |
| ---- | -------------------------- |
| 401  | Unauthorized               |
| 403  | Forbidden                  |
| 404  | Project or Asset not found |
| 429  | Too many requests          |

## レート制限

This route uses an [assets](/user-manual/api#rate-limiting) rate limit.
