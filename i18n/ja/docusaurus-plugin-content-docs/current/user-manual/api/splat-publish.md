---
title: スプラットの公開
description: "REST 経由の SuperSplat 公開フロー：署名付き S3 アップロード URL、直接ファイルアップロード、Bearer 認証付きの処理ジョブエンドポイント。"
unlisted: true
---

#### 概要

スプラット（例：`.ply` または `.sog`）を、[SuperSplatプラットフォーム](/user-manual/supersplat/)にプログラム的に公開します — [Editorの公開ダイアログ](/user-manual/supersplat/editor/publishing)とsuperspl.atの[Direct Upload](/user-manual/supersplat/upload)フローが使うのと同じバックエンドです。公開後、スプラットはユーザーの[Manageページ](/user-manual/supersplat/manage)に表示され、[Studio](/user-manual/supersplat/studio/)で開いて視聴体験をキュレーションできます。

publish呼び出しの`settings`フィールドは[Experience Settings](/user-manual/supersplat/studio/experience-settings) JSON — Studioが書き、[SuperSplat Viewer](/user-manual/supersplat/viewer/)が読むのと同じコントラクト — を運びます。完全なスキーマはそちらのリファレンスを参照してください。

フローは主に次の 3 ステップで構成されます。

1. **バックエンドから署名付きアップロード URL を取得する**
2. **その署名付き URL を使ってファイルを S3 に直接アップロードする**
3. **バックエンド API を呼び出して処理ジョブを開始する**

すべての API リクエストには、`Authorization` ヘッダーに有効な Bearer トークンを含める必要があります。トークンの取得方法は[このドキュメント](https://developer.playcanvas.com/user-manual/api/#:~:text=You%20can%20generate%20an%20Access,you%20your%20new%20access%20token)を参照してください。

### ルート

#### AWS S3 アップロード用の署名付き URL を取得

```none
POST https://playcanvas.com/api/upload/signed-url

Body

{ "fileName": "scene.ply" }

Response

{ "signedUrl": "string", "s3Key": "string" }
```

例：

```javascript
const response = await fetch(`https://playcanvas.com/api/upload/signed-url`, {
    method: 'POST',
    body: JSON.stringify({
        fileName: filename
    }),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
```

#### 署名付き URL を使った AWS S3 へのアップロード

```none
PUT "signedUrl"

Response

{ "signedUrl": "string", "s3Key": "string" }
```

例：

```javascript
const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    body: fileData,
    headers: {
        'Content-Type': 'binary/octet-stream'
    }
});
```

#### 処理の開始

```none
POST https://playcanvas.com/api/splats/publish

Body

{
  "s3Key": "string",
  "title": "string",
  "description": "string",
  "listed": boolean,
  "settings": { /* Settings */ },
  "format": "compressed.ply" // or "sog"
}

Settings: 

const settings = {
    camera: {
        fov: 65, // field of view
        position: [1,1,-1], target: [-0.1,0.6,-0.2],
        startAnim: 'none',
        animTrack:null 
    },
    background: {
        color: [0.4,0.4,0.4]
    },
    animTracks:[]
};

Response (Splat data)

{
  "id": "string", 
  "hash": "string",
  "title": "string",
  "description": "string",
  "format": "compressed.ply | sog",
  "version": "string",
  "release_notes": "string",
  "thumbnails": number,
  "size": number,
  "views": number, 
  "comments": number, 
  "starred": number, 
  "listed": boolean,
  "completedAt": DateTime, 
  "createdAt": DateTime, 
  "modifiedAt": DateTime
}
```

例：

```javascript
const response = await fetch(`https://playcanvas.com/api/splats/publish`, {
    method: 'POST',
    body: JSON.stringify({
      s3Key: s3Key,
      title: 'Some Title',
      description: 'Some Description',
      listed: true,
      settings: settings,
      format: format
    }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
});
```

レスポンスの例

```json
{
  "comments": 0,
  "completedAt": null,
  "createdAt": "2025-10-21T12:42:13.331Z",
  "currentVersion": 1,
  "description": "Some Description",
  "featuredWeight": 0,
  "format": "",
  "hash": "982a2820",
  "hasThumbnails": false,
  "id": 50,
  "listed": true,
  "modifiedAt": "2025-10-21T12:42:13.331Z",
  "releaseNotes": null,
  "size": 0,
  "starred": 0,
  "tags": [],
  "task": { "status": "running", "message": "" },
  "title": "Some Title",
  "url": "https://superspl.at/view?id=982a2820",
  "userId": 7,
  "version": 0,
  "views": 0
}
```

ステータス — 201 成功

#### アップロードしたスプラットの状態を確認

```none
GET https://playcanvas.com/api/splats/{ID}

Response (Splat)


{
  "id": "string",
  "hash": "string",
  "title": "string",
  "description": "string",
  "format": "compressed.ply | sog"
}
```

例：

```javascript
const response = await fetch(`https://playcanvas.com/api/splats/1000`)
```

エラー

| コード | 説明 |
|------|-------------|
| 400  | 不正なリクエスト／無効なペイロード／ストレージ上限超過 |
| 401  | 未認証（トークンがない、または無効） |
| 403  | 禁止 |
| 404  | リソースが見つからない（例：`sceneId`） |
| 5xx  | アップロードまたは確定処理中のサーバー／S3 エラー |
